"""Generate focused source-image menus for visual dropdown questions."""

from __future__ import annotations

import json
import re
import shutil
from difflib import SequenceMatcher
from pathlib import Path
from statistics import median

import numpy as np
from PIL import Image
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "public" / "visual-control-assets"
MANIFEST_FILE = ROOT / "lib" / "visual-control-data.ts"


def load_questions() -> list[dict]:
    source = (ROOT / "lib" / "questions.ts").read_text(encoding="utf-8")
    start = source.index("= [", source.index("export const questions")) + 2
    end = source.index("\n];", start) + 2
    return json.loads(source[start:end])


def is_list_question(question: dict) -> bool:
    prompt = question["prompt"]
    return question["type"] == "manual" and not re.search(
        r"DRAG DROP", prompt, re.I
    ) and bool(re.search(r"drop-down|dropdown|FILL IN THE BLANK", prompt, re.I))


def expected_slots(question: dict) -> int:
    boxes = [
        int(value)
        for value in re.findall(r"Box\s*(\d+)", question["explanation"], re.I)
    ]
    return max(boxes) if boxes else 2


def normalized_prompt(prompt: str) -> str:
    prompt = re.sub(r"\(Topic\s*\d+\)", " ", prompt, flags=re.I)
    prompt = re.sub(r"HOTSPOT|FILL IN THE BLANK|NOTE.*", " ", prompt, flags=re.I | re.S)
    return re.sub(r"[^a-z0-9]+", " ", prompt.lower()).strip()


def detect_menu_crops(image: Image.Image) -> list[tuple[float, tuple[int, int, int, int]]]:
    pixels = np.array(image.convert("L"))
    image_height, image_width = pixels.shape
    candidates: list[tuple[float, tuple[int, int, int, int]]] = []

    for threshold in (200, 220, 235, 245, 250):
        horizontal = ndimage.binary_opening(
            pixels < threshold,
            structure=np.ones((1, max(12, int(image_width * 0.012)))),
        )
        labels, count = ndimage.label(horizontal)
        lines: list[tuple[int, int, int, int]] = []
        for region in ndimage.find_objects(labels, count):
            if region is None:
                continue
            y_slice, x_slice = region
            x, y = x_slice.start, y_slice.start
            width, height = x_slice.stop - x, y_slice.stop - y
            if 70 <= width <= image_width * 0.72 and height <= 7:
                lines.append((x, y, width, height))

        groups: list[list[tuple[int, int, int, int]]] = []
        for line in sorted(lines, key=lambda item: (item[0], item[2], item[1])):
            for group in groups:
                if (
                    abs(line[0] - median(item[0] for item in group))
                    <= max(8, image_width * 0.012)
                    and abs(line[2] - median(item[2] for item in group))
                    <= max(14, image_width * 0.02)
                ):
                    group.append(line)
                    break
            else:
                groups.append([line])

        for group in groups:
            distinct: list[tuple[int, int, int, int]] = []
            for line in sorted(group, key=lambda item: item[1]):
                if distinct and line[1] - distinct[-1][1] <= 2:
                    if line[2] > distinct[-1][2]:
                        distinct[-1] = line
                else:
                    distinct.append(line)
            if len(distinct) < 3:
                continue

            gaps = [
                second[1] - first[1]
                for first, second in zip(distinct, distinct[1:])
                if 7 <= second[1] - first[1] <= 90
            ]
            if len(gaps) < 2:
                continue
            typical_gap = median(gaps)

            clusters: list[list[tuple[int, int, int, int]]] = []
            current = [distinct[0]]
            for previous, line in zip(distinct, distinct[1:]):
                if line[1] - previous[1] > max(55, typical_gap * 2.2):
                    if len(current) >= 3:
                        clusters.append(current)
                    current = [line]
                else:
                    current.append(line)
            if len(current) >= 3:
                clusters.append(current)

            for cluster in clusters:
                x = round(median(item[0] for item in cluster))
                width = round(median(item[2] for item in cluster))
                if x < image_width * 0.34:
                    continue
                row_gaps = [
                    second[1] - first[1]
                    for first, second in zip(cluster, cluster[1:])
                    if 7 <= second[1] - first[1] <= 90
                ]
                if len(row_gaps) < 2:
                    continue
                row_height = round(median(row_gaps))
                top = max(0, cluster[0][1] - row_height - 3)
                bottom = min(
                    image_height,
                    cluster[-1][1] + cluster[-1][3] + 4,
                )
                if bottom - top < 35:
                    continue
                score = (
                    (top / image_height) * 12
                    + (x / image_width) * 3
                    + min(len(cluster), 7) * 0.6
                    - ((bottom - top) / image_height) * 2
                )
                candidates.append((score, (x - 3, top, width + 6, bottom - top)))

    selected: list[tuple[float, tuple[int, int, int, int]]] = []
    for candidate in sorted(candidates, reverse=True, key=lambda item: item[0]):
        _, (x, y, width, height) = candidate
        overlaps = False
        for _, (other_x, other_y, other_width, other_height) in selected:
            same_column = abs(x - other_x) < 16 and abs(width - other_width) < 24
            vertical_overlap = max(y, other_y) < min(y + height, other_y + other_height)
            if same_column and vertical_overlap:
                overlaps = True
                break
        if not overlaps:
            selected.append(candidate)
    return selected


def main() -> None:
    questions = [question for question in load_questions() if is_list_question(question)]
    shutil.rmtree(OUT_DIR, ignore_errors=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict] = {}
    unresolved: list[dict] = []

    for question in questions:
        image_path = ROOT / "public" / question["image"].lstrip("/")
        image = Image.open(image_path).convert("RGB")
        slots = expected_slots(question)
        candidates = detect_menu_crops(image)
        crops = [bounds for _, bounds in candidates[:slots]]
        if len(crops) < slots:
            unresolved.append(question)
            continue

        menus = []
        for index, (x, y, width, height) in enumerate(sorted(crops, key=lambda item: item[1]), start=1):
            crop = image.crop((x, y, x + width, y + height))
            filename = f"{question['id']}-menu-{index}.webp"
            crop.save(OUT_DIR / filename, "WEBP", quality=94, method=6)
            menus.append(
                {
                    "image": f"/visual-control-assets/{filename}",
                    "width": crop.width,
                    "height": crop.height,
                }
            )
        manifest[question["id"]] = {"slots": slots, "menus": menus}

    # Several Topic 4 screenshots omit the answer area. Reuse a near-identical
    # complete source item when available; the wording is still shown from the
    # student's current question.
    available = [
        question
        for question in questions
        if question["id"] in manifest and question["id"].startswith("f1-")
    ]
    still_unresolved = []
    for question in unresolved:
        prompt = normalized_prompt(question["prompt"])
        matches = sorted(
            (
                (
                    SequenceMatcher(None, prompt, normalized_prompt(candidate["prompt"])).ratio(),
                    candidate,
                )
                for candidate in available
            ),
            reverse=True,
            key=lambda item: item[0],
        )
        if matches and matches[0][0] >= 0.58:
            source_id = matches[0][1]["id"]
            manifest[question["id"]] = {
                **manifest[source_id],
                "sourceQuestion": source_id,
            }
        else:
            still_unresolved.append(question["id"])

    output = (
        "export type VisualMenu = { image: string; width: number; height: number };\n\n"
        "export type VisualControlSpec = {\n"
        "  slots: number;\n"
        "  menus: VisualMenu[];\n"
        "  sourceQuestion?: string;\n"
        "};\n\n"
        "export const visualControlData: Record<string, VisualControlSpec> = "
        + json.dumps(manifest, ensure_ascii=False, indent=2)
        + ";\n"
    )
    MANIFEST_FILE.write_text(output, encoding="utf-8")
    print(
        json.dumps(
            {
                "questions": len(questions),
                "interactive": len(manifest),
                "unresolved": still_unresolved,
            },
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

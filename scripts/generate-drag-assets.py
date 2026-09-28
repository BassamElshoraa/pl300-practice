"""Generate interactive drag-and-drop choice tiles from the source screenshots.

The source banks encode these questions as screenshots rather than structured
HTML. This script detects the vertically stacked choice boxes in each screenshot,
crops them without changing their wording, and writes a small TypeScript manifest
used by the simulator.
"""

from __future__ import annotations

import json
import re
import shutil
from pathlib import Path
from statistics import median

import numpy as np
from PIL import Image
from scipy import ndimage


ROOT = Path(__file__).resolve().parents[1]
QUESTIONS_FILE = ROOT / "lib" / "questions.ts"
OUT_DIR = ROOT / "public" / "drag-assets"
MANIFEST_FILE = ROOT / "lib" / "drag-drop-data.ts"

NUMBER_WORDS = {
    "two": 2,
    "three": 3,
    "four": 4,
    "five": 5,
    "six": 6,
}

# The source wording for mapping questions rarely states how many destinations
# are visible, so keep the source-verified slot count explicit.
MATCHING_SLOTS = {
    "f1-006-5": 2,
    "f1-028-27": 2,
    "f1-091-90": 2,
    "f1-095-94": 3,
    "f1-098-97": 3,
    "f1-108-107": 2,
    "f1-122-121": 2,
    "f1-141-140": 2,
    "f1-176-175": 2,
    "f1-244-243": 3,
    "f1-246-245": 2,
    "f1-250-249": 3,
    "f1-262-261": 2,
    "f1-280-279": 2,
    "f1-290-289": 2,
    "f1-306-305": 2,
    "f1-319-318": 3,
    "f2-177-434": 2,
    "f2-318-479": 2,
    "f2-323-480": 2,
    "f2-331-482": 2,
    "f2-396-504": 3,
    "f2-403-506": 2,
}

SEQUENCE_SLOTS = {"f1-284-283": 4}

# A handful of source screenshots use a page break, a two-column choice grid,
# or a large data table immediately above the choices. Explicit source-pixel
# rectangles keep those exceptional crops deterministic.
BOX_OVERRIDES: dict[str, list[tuple[int, int, int, int]]] = {
    "f1-023-22": [
        (92, 1300, 354, 26),
        (92, 1332, 354, 24),
        (92, 1363, 354, 24),
        (92, 1394, 354, 24),
        (92, 1425, 354, 25),
    ],
    "f1-065-64": [
        (86, 246, 347, 15),
        (86, 263, 347, 21),
        (86, 287, 347, 20),
        (86, 310, 347, 21),
        (86, 334, 347, 21),
    ],
    "f1-306-305": [
        (110, 729, 144, 39),
        (258, 729, 144, 39),
        (110, 782, 144, 39),
        (258, 782, 144, 39),
    ],
    "f1-347-346": [
        (86, 2716, 343, 42),
        (86, 2761, 343, 41),
        (86, 2806, 343, 26),
        (86, 2836, 343, 25),
        (86, 2865, 343, 26),
    ],
    "f2-157-426": [
        (84, 432, 246, 17),
        (84, 449, 246, 16),
        (84, 467, 246, 16),
        (84, 484, 246, 25),
        (84, 511, 246, 25),
        (84, 538, 246, 16),
    ],
}


def load_questions() -> list[dict]:
    source = QUESTIONS_FILE.read_text(encoding="utf-8")
    start = source.index("= [", source.index("export const questions")) + 2
    end = source.index("\n];", start) + 2
    return json.loads(source[start:end])


def detect_choice_boxes(image: Image.Image) -> list[tuple[int, int, int, int]]:
    """Find the most likely vertical group of outlined source choices.

    Vendor screenshots draw each choice with long horizontal borders. Detecting
    those borders is much more reliable than OCR and preserves the exact source
    wording in the generated tiles.
    """
    pixels = np.array(image.convert("L"))
    image_height, image_width = pixels.shape
    results: list[tuple[float, list[tuple[int, int, int, int]]]] = []

    for threshold in (200, 210, 220, 230, 235, 240, 245, 250):
        left_mask = pixels[:, : int(image_width * 0.56)] < threshold
        horizontal = ndimage.binary_opening(
            left_mask,
            structure=np.ones((1, max(15, int(image_width * 0.025)))),
        )
        labels, count = ndimage.label(horizontal)
        lines: list[tuple[int, int, int, int]] = []
        for region in ndimage.find_objects(labels, count):
            if region is None:
                continue
            y_slice, x_slice = region
            x, y = x_slice.start, y_slice.start
            width, height = x_slice.stop - x, y_slice.stop - y
            if (
                max(35, image_width * 0.04) <= width <= image_width * 0.48
                and height <= 7
                and x < image_width * 0.54
            ):
                lines.append((x, y, width, height))

        groups: list[list[tuple[int, int, int, int]]] = []
        for line in sorted(lines, key=lambda item: (item[0], item[2], item[1])):
            for group in groups:
                if (
                    abs(line[0] - median(item[0] for item in group))
                    <= max(7, image_width * 0.01)
                    and abs(line[2] - median(item[2] for item in group))
                    <= max(10, image_width * 0.015)
                ):
                    group.append(line)
                    break
            else:
                groups.append([line])

        for group in groups:
            distinct_lines: list[tuple[int, int, int, int]] = []
            for line in sorted(group, key=lambda item: item[1]):
                if distinct_lines and line[1] - distinct_lines[-1][1] <= 2:
                    if line[2] > distinct_lines[-1][2]:
                        distinct_lines[-1] = line
                else:
                    distinct_lines.append(line)
            if len(distinct_lines) < 4:
                continue

            x = round(median(item[0] for item in distinct_lines))
            width = round(median(item[2] for item in distinct_lines))
            intervals = [
                (first, second, second[1] - (first[1] + first[3] - 1))
                for first, second in zip(distinct_lines, distinct_lines[1:])
                if 8 <= second[1] - (first[1] + first[3] - 1) <= 165
            ]
            if len(intervals) < 2:
                continue

            # Box height is consistently larger than the small gap between two
            # consecutive choice boxes. The median cleanly separates the two.
            minimum_box_gap = median(item[2] for item in intervals)
            boxes: list[tuple[int, int, int, int]] = []
            for first, second, gap in intervals:
                if gap < minimum_box_gap:
                    continue
                top = first[1] + first[3] - 1
                bottom = second[1]
                vertical_pixels = pixels[top : bottom + 1]
                edge_threshold = min(253, threshold + 20)
                left_edge = (
                    vertical_pixels[:, max(0, x - 2) : x + 4] < edge_threshold
                ).mean()
                right_edge = (
                    vertical_pixels[
                        :, max(0, x + width - 4) : min(image_width, x + width + 2)
                    ]
                    < edge_threshold
                ).mean()
                if (left_edge + right_edge) / 2 >= 0.22:
                    boxes.append(
                        (x, first[1], width, second[1] + second[3] - first[1])
                    )

            # The source bank uses at most eight draggable choices. Larger
            # groups are invariably source-table rows detected as boxes.
            if not 2 <= len(boxes) <= 8:
                continue
            middle_y = median(item[1] for item in boxes)
            vertical_span = boxes[-1][1] + boxes[-1][3] - boxes[0][1]
            # Source choices are a compact block and, in long screenshots, are
            # normally below source tables and scenario exhibits.
            score = (
                len(boxes) * 2
                + (width / image_width) * 5
                + (middle_y / image_height) * 15
                - (vertical_span / image_height) * 10
            )
            results.append((score, boxes))

    return max(results, key=lambda item: item[0])[1] if results else []


def sequence_slot_count(question: dict) -> int:
    if question["id"] in SEQUENCE_SLOTS:
        return SEQUENCE_SLOTS[question["id"]]
    prompt = question["prompt"].lower()
    match = re.search(r"which\s+(two|three|four|five|six)\s+actions", prompt)
    if not match:
        raise ValueError(f"Could not find sequence length for {question['id']}")
    return NUMBER_WORDS[match.group(1)]


def main() -> None:
    questions = [
        item
        for item in load_questions()
        if item["type"] == "manual" and "DRAG DROP" in item["prompt"].upper()
    ]
    shutil.rmtree(OUT_DIR, ignore_errors=True)
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    manifest: dict[str, dict] = {}
    failures: list[str] = []

    for question in questions:
        source_path = ROOT / "public" / question["image"].lstrip("/")
        image = Image.open(source_path).convert("RGB")
        boxes = BOX_OVERRIDES.get(question["id"], detect_choice_boxes(image))
        if len(boxes) < 2:
            failures.append(f"{question['id']}: detected only {len(boxes)} choices")
            continue

        options: list[dict] = []
        for index, (x, y, width, height) in enumerate(boxes, start=1):
            pad = max(2, round(min(image.size) * 0.003))
            crop = image.crop(
                (
                    max(0, x - pad),
                    max(0, y - pad),
                    min(image.width, x + width + pad),
                    min(image.height, y + height + pad),
                )
            )
            filename = f"{question['id']}-option-{index}.webp"
            crop.save(OUT_DIR / filename, "WEBP", quality=92, method=6)
            options.append(
                {
                    "image": f"/drag-assets/{filename}",
                    "width": crop.width,
                    "height": crop.height,
                }
            )

        is_sequence = bool(
            re.search(
                r"perform in sequence|arrange them in the correct order|drag the appropriate actions to the correct order",
                question["prompt"],
                flags=re.IGNORECASE,
            )
        )
        if is_sequence:
            slots = sequence_slot_count(question)
        else:
            slots = MATCHING_SLOTS.get(question["id"], 0)
            if not slots:
                failures.append(f"{question['id']}: missing verified target count")
                continue

        manifest[question["id"]] = {
            "mode": "sequence" if is_sequence else "matching",
            "slots": slots,
            "allowReuse": "more than once" in question["prompt"].lower(),
            "options": options,
        }
        print(
            f"{question['id']}: {len(options)} choices -> {slots} "
            f"{'steps' if is_sequence else 'targets'}"
        )

    if failures or len(manifest) != len(questions):
        raise RuntimeError(
            "Drag asset generation incomplete:\n"
            + "\n".join(failures)
            + f"\nGenerated {len(manifest)} of {len(questions)} questions."
        )

    manifest_json = json.dumps(manifest, ensure_ascii=False, indent=2)
    MANIFEST_FILE.write_text(
        "export type DragDropOption = {\n"
        + "  image: string;\n"
        + "  width: number;\n"
        + "  height: number;\n"
        + "};\n\n"
        + "export type DragDropSpec = {\n"
        + "  mode: 'sequence' | 'matching';\n"
        + "  slots: number;\n"
        + "  allowReuse: boolean;\n"
        + "  options: DragDropOption[];\n"
        + "};\n\n"
        + "export const dragDropData: Record<string, DragDropSpec> = "
        + manifest_json
        + ";\n",
        encoding="utf-8",
    )
    print(f"Generated all {len(manifest)} interactive drag questions.")


if __name__ == "__main__":
    main()



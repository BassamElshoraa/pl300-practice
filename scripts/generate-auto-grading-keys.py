"""Build reviewed automatic keys for image-based PL-300 interactions.

The source PDFs store drag/drop choices as pixels.  This helper OCRs the
already-cropped choice tiles, then matches those labels against the reviewed
explanation text.  Only high-confidence, complete keys are emitted; unresolved
items stay out of scored managed exams instead of receiving a guessed key.
"""

from __future__ import annotations

import json
import re
from difflib import SequenceMatcher
from pathlib import Path

import numpy as np
from PIL import Image
from rapidocr_onnxruntime import RapidOCR


ROOT = Path(__file__).resolve().parents[1]
OUTPUT = ROOT / "lib" / "managed-auto-grading-keys.ts"

# These entries were checked against the source answer image and its reviewed
# explanation.  They also correct OCR ambiguities such as "Left anti" versus
# "Left outer" and duplicate labels in sequence questions.
KEY_OVERRIDES: dict[str, list[int]] = {
    "f1-006-5": [1, 3],
    "f1-009-8": [3, 4, 1],
    "f1-015-14": [0, 2, 1],
    "f1-017-16": [1, 3, 0, 4],
    "f1-019-18": [0, 1, 2],
    "f1-028-27": [2, 1],
    "f1-065-64": [4, 3, 0, 1],
    "f1-066-65": [0, 2, 5],
    "f1-073-72": [2, 4, 1, 5],
    "f1-088-87": [1, 2, 3],
    "f1-091-90": [5, 1],
    "f1-095-94": [5, 4, 0],
    "f1-098-97": [3, 1, 2],
    "f1-108-107": [2, 1],
    "f1-122-121": [3, 1],
    "f1-141-140": [2, 0],
    "f1-176-175": [1, 2],
    "f1-185-184": [0, 3, 2],
    "f1-195-194": [2, 1, 0],
    "f1-198-197": [0, 1, 3, 4],
    "f1-205-204": [1, 2, 3],
    "f1-241-240": [3, 0, 1],
    "f1-243-242": [2, 4, 1],
    "f1-244-243": [0, 3, 1],
    "f1-246-245": [1, 3],
    "f1-250-249": [1, 3, 2],
    "f1-262-261": [3, 4],
    "f1-280-279": [4, 1],
    "f1-290-289": [1, 3],
    "f1-300-299": [3, 4, 1],
    "f1-306-305": [2, 1],
    "f1-319-318": [1, 2, 0],
    "f1-320-319": [4, 3, 2, 0],
    "f1-334-333": [3, 0, 2],
    "f1-347-346": [3, 1, 4, 2],
    "f2-059-397": [1, 3, 0, 4],
    "f2-157-426": [0, 2, 5],
    "f2-177-434": [3, 1],
    "f2-201-443": [2, 4, 0, 6],
    "f2-318-479": [2, 1],
    "f2-323-480": [1, 3],
    "f2-403-506": [3, 1],
}


def extract_json(text: str, marker: str, opening: str):
    marker_at = text.index(marker)
    equals_at = text.index("=", marker_at)
    start = text.index(opening, equals_at)
    closing = {"[": "]", "{": "}"}[opening]
    depth = 0
    quoted = False
    escaped = False
    for index in range(start, len(text)):
        character = text[index]
        if quoted:
            if escaped:
                escaped = False
            elif character == "\\":
                escaped = True
            elif character == '"':
                quoted = False
            continue
        if character == '"':
            quoted = True
        elif character == opening:
            depth += 1
        elif character == closing:
            depth -= 1
            if depth == 0:
                return json.loads(text[start : index + 1])
    raise ValueError(f"Could not parse {marker}")


def normalize(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "", value.lower())


def ocr_drag_labels(manifest: dict[str, dict]) -> dict[str, list[str]]:
    items: list[tuple[str, int, Image.Image]] = []
    for question_id, spec in manifest.items():
        for option_index, option in enumerate(spec["options"]):
            image = Image.open(
                ROOT / "public" / option["image"].lstrip("/")
            ).convert("RGB")
            if image.width < 500:
                image = image.resize(
                    (image.width * 2, image.height * 2), Image.Resampling.LANCZOS
                )
            items.append((question_id, option_index, image))

    engine = RapidOCR()
    labels = {
        question_id: [""] * len(spec["options"])
        for question_id, spec in manifest.items()
    }
    batch_size = 40
    for batch_start in range(0, len(items), batch_size):
        batch = items[batch_start : batch_start + batch_size]
        width = max(item[2].width for item in batch) + 40
        boundaries: list[tuple[str, int, int, int]] = []
        height = 0
        for question_id, option_index, image in batch:
            boundaries.append(
                (question_id, option_index, height, height + image.height + 20)
            )
            height += image.height + 20
        sheet = Image.new("RGB", (width, height), "white")
        y = 0
        for _, _, image in batch:
            sheet.paste(image, (10, y + 10))
            y += image.height + 20
        result, _ = engine(np.array(sheet))
        lines = result or []
        for question_id, option_index, top, bottom in boundaries:
            labels[question_id][option_index] = " ".join(
                line[1]
                for line in lines
                if top
                <= sum(point[1] for point in line[0]) / len(line[0])
                < bottom
            ).strip()
    return labels


def match_position(label: str, explanation: str) -> tuple[float, int]:
    needle = normalize(label)
    haystack = normalize(explanation)
    if not needle:
        return 0.0, len(haystack)
    exact = haystack.find(needle)
    if exact >= 0:
        return 1.0, exact
    match = SequenceMatcher(None, needle, haystack, autojunk=False).find_longest_match()
    coverage = match.size / len(needle)
    return coverage, match.b


def main() -> None:
    question_source = (ROOT / "lib" / "questions.ts").read_text(encoding="utf-8")
    questions = extract_json(question_source, "const sourceQuestions", "[")
    questions_by_id = {question["id"]: question for question in questions}
    drag_source = (ROOT / "lib" / "drag-drop-data.ts").read_text(encoding="utf-8")
    drag_manifest = extract_json(drag_source, "export const dragDropData", "{")
    labels = ocr_drag_labels(drag_manifest)

    keys: dict[str, list[int]] = {}
    unresolved: dict[str, dict] = {}
    for question_id, spec in drag_manifest.items():
        question = questions_by_id[question_id]
        candidates = []
        for option_index, label in enumerate(labels[question_id]):
            score, position = match_position(label, question["explanation"])
            candidates.append((score, position, option_index, label))
        confident = [candidate for candidate in candidates if candidate[0] >= 0.72]
        confident.sort(key=lambda item: (item[1], -item[0]))
        selected: list[int] = []
        for _, _, option_index, _ in confident:
            if option_index not in selected or spec["allowReuse"]:
                selected.append(option_index)
            if len(selected) == spec["slots"]:
                break
        if len(selected) == spec["slots"]:
            keys[question_id] = selected
        else:
            unresolved[question_id] = {
                "slots": spec["slots"],
                "labels": labels[question_id],
                "candidates": [
                    {
                        "index": option_index,
                        "score": round(score, 3),
                        "position": position,
                        "label": label,
                    }
                    for score, position, option_index, label in candidates
                ],
            }

    for question_id, key in KEY_OVERRIDES.items():
        spec = drag_manifest.get(question_id)
        if not spec:
            raise ValueError(f"Override references missing drag question: {question_id}")
        if len(key) != spec["slots"] or any(
            index < 0 or index >= len(spec["options"]) for index in key
        ):
            raise ValueError(f"Invalid reviewed key for {question_id}: {key}")
        keys[question_id] = key
        unresolved.pop(question_id, None)

    output = (
        "// Generated from source choice tiles and reviewed explanations.\n"
        "// Unresolved visual items are deliberately excluded from scored exams.\n\n"
        "export const managedAutoGradingKeys: Record<string, number[]> = "
        + json.dumps(keys, ensure_ascii=False, indent=2)
        + ";\n"
    )
    OUTPUT.write_text(output, encoding="utf-8")
    print(
        json.dumps(
            {
                "dragQuestions": len(drag_manifest),
                "keyed": len(keys),
                "unresolved": unresolved,
            },
            ensure_ascii=False,
            indent=2,
        )
    )


if __name__ == "__main__":
    main()

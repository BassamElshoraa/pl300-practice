from __future__ import annotations

import json
import re
import subprocess
import sys
from dataclasses import dataclass
from pathlib import Path

import pdfplumber
from PIL import Image


PROJECT = Path(__file__).resolve().parents[1]
QUESTIONS_FILE = PROJECT / "lib" / "questions.ts"
OUTPUT_DIR = PROJECT / "public" / "exhibit-assets"
TEMP_DIR = PROJECT.parents[1] / "tmp" / "pdfs" / "exhibit-recovery"
PDFTOPPM = Path(
    r"C:\Users\Bassam\.cache\codex-runtimes\codex-primary-runtime\dependencies\native\poppler\Library\bin\pdftoppm.exe"
)
PDFS = {
    "Final": Path(r"D:\# Courses By Me\# Digilians\Content\PL 300\Dump\PL-300 Final.pdf"),
    "Final 2": Path(r"D:\# Courses By Me\# Digilians\Content\PL 300\Dump\PL-300 Final 2.pdf"),
}
REFERENCE_PATTERN = re.compile(
    r"(?:following|shown in the|as shown in|shown below).{0,50}(?:exhibit|table|graphic|diagram)"
    r"|click the exhibit|the table shown",
    re.IGNORECASE | re.DOTALL,
)


@dataclass(frozen=True)
class Marker:
    number: int
    page: int
    top: float


def load_questions() -> list[dict]:
    source = QUESTIONS_FILE.read_text(encoding="utf-8")
    prefix = "export const questions: Question[] = "
    start = source.index(prefix) + len(prefix)
    end = source.index("\n];", start) + 2
    return json.loads(source[start:end])


def clean(value: str) -> str:
    return value.replace("\x00", "").strip()


def page_markers(page: pdfplumber.page.Page, page_index: int) -> tuple[list[Marker], list[float]]:
    words = page.extract_words(use_text_flow=True, keep_blank_chars=False)
    markers: list[Marker] = []
    answers: list[float] = []
    for index, word in enumerate(words):
        token = clean(word["text"])
        joined = token
        if token.lower() == "question:" and index + 1 < len(words):
            joined += clean(words[index + 1]["text"])
        if token.upper() == "NEW" and index + 2 < len(words):
            joined = " ".join(clean(item["text"]) for item in words[index:index + 3])
        match = re.match(r"(?:NEW\s+)?QUESTION\s*:?\s*(\d+)", joined, re.IGNORECASE)
        if match:
            markers.append(Marker(int(match.group(1)), page_index, float(word["top"])))
        if token.lower().startswith("answer:"):
            answers.append(float(word["top"]))
    return markers, answers


def render_page(pdf: Path, page_index: int, cache: dict[tuple[Path, int], Path]) -> Path:
    key = (pdf, page_index)
    if key in cache:
        return cache[key]
    stem = f"{pdf.stem.replace(' ', '-').lower()}-p{page_index + 1}"
    output_prefix = TEMP_DIR / stem
    output = output_prefix.with_suffix(".png")
    subprocess.run(
        [
            str(PDFTOPPM),
            "-f", str(page_index + 1),
            "-l", str(page_index + 1),
            "-singlefile",
            "-png",
            "-r", "120",
            str(pdf),
            str(output_prefix),
        ],
        check=True,
        stdout=subprocess.DEVNULL,
        stderr=subprocess.DEVNULL,
    )
    cache[key] = output
    return output


def trim_vertical(image: Image.Image) -> Image.Image:
    if image.height < 80:
        return image
    gray = image.convert("L")
    center = gray.crop((max(12, image.width // 30), 0, image.width - max(12, image.width // 30), image.height))
    dark_rows = []
    pixels = center.load()
    for y in range(center.height):
        if any(pixels[x, y] < 242 for x in range(center.width)):
            dark_rows.append(y)
    if not dark_rows:
        return image
    top = max(0, dark_rows[0] - 14)
    bottom = min(image.height, dark_rows[-1] + 15)
    return image.crop((0, top, image.width, bottom))


def compact_long_gaps(image: Image.Image) -> Image.Image:
    gray = image.convert("L")
    edge = max(18, image.width // 24)
    center = gray.crop((edge, 0, image.width - edge, image.height))
    pixels = center.load()
    active = [any(pixels[x, y] < 242 for x in range(center.width)) for y in range(center.height)]
    cuts: list[tuple[int, int]] = []
    gap_start: int | None = None
    for y, has_content in enumerate(active):
        if not has_content and gap_start is None:
            gap_start = y
        if has_content and gap_start is not None:
            if y - gap_start > 130:
                cuts.append((gap_start + 24, y - 24))
            gap_start = None
    if not cuts:
        return trim_vertical(image)

    kept: list[Image.Image] = []
    cursor = 0
    for start, end in cuts:
        if start > cursor:
            kept.append(image.crop((0, cursor, image.width, start)))
        cursor = end
    if cursor < image.height:
        kept.append(image.crop((0, cursor, image.width, image.height)))
    height = sum(part.height for part in kept)
    result = Image.new("RGB", (image.width, height), "white")
    y = 0
    for part in kept:
        result.paste(part, (0, y))
        y += part.height
    return trim_vertical(result)


def make_question_image(
    pdf: Path,
    document: pdfplumber.pdf.PDF,
    question_id: str,
    start: Marker,
    next_marker: Marker | None,
    answers_by_page: dict[int, list[float]],
    cache: dict[tuple[Path, int], Path],
) -> Path:
    last_page = next_marker.page if next_marker else start.page + 2
    segments: list[Image.Image] = []
    scale = 120 / 72
    page_index = start.page

    while page_index <= min(last_page, len(document.pages) - 1):
        top = start.top - 6 if page_index == start.page else 12
        answers = [value for value in answers_by_page.get(page_index, []) if page_index > start.page or value > start.top]
        bottom = min(answers) - 5 if answers else document.pages[page_index].height - 12
        if next_marker and page_index == next_marker.page:
            bottom = min(bottom, next_marker.top - 5)
        if bottom > top + 18:
            rendered = Image.open(render_page(pdf, page_index, cache)).convert("RGB")
            left_px = round(34 * scale)
            right_px = round((document.pages[page_index].width - 34) * scale)
            top_px = max(0, round(top * scale))
            bottom_px = min(rendered.height, round(bottom * scale))
            segments.append(trim_vertical(rendered.crop((left_px, top_px, right_px, bottom_px))))
        if answers:
            break
        if next_marker and page_index == next_marker.page:
            break
        page_index += 1

    if not segments:
        raise RuntimeError(f"Could not crop source block for {question_id}")

    width = max(segment.width for segment in segments)
    gap = 10
    height = sum(segment.height for segment in segments) + gap * (len(segments) - 1)
    combined = Image.new("RGB", (width, height), "white")
    y = 0
    for segment in segments:
        combined.paste(segment, (0, y))
        y += segment.height + gap
    combined = compact_long_gaps(combined)
    if combined.width > 1100:
        new_height = round(combined.height * 1100 / combined.width)
        combined = combined.resize((1100, new_height), Image.Resampling.LANCZOS)

    destination = OUTPUT_DIR / f"{question_id}.webp"
    combined.save(destination, "WEBP", quality=88, method=6)
    return destination


def add_image_references(question_ids: list[str]) -> None:
    source = QUESTIONS_FILE.read_text(encoding="utf-8")
    for question_id in question_ids:
        start = source.index(f'    "id": "{question_id}"')
        next_item = source.find('\n  {\n    "id":', start + 1)
        end = next_item if next_item != -1 else source.index("\n];", start)
        block = source[start:end]
        if '    "image":' in block:
            continue
        closing = block.rfind("\n  }")
        if closing == -1:
            raise RuntimeError(f"Could not update question object {question_id}")
        before = block[:closing].rstrip()
        if not before.endswith(","):
            before += ","
        block = before + f'\n    "image": "/exhibit-assets/{question_id}.webp"' + block[closing:]
        source = source[:start] + block + source[end:]
    QUESTIONS_FILE.write_text(source, encoding="utf-8", newline="\n")


def main() -> None:
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)
    TEMP_DIR.mkdir(parents=True, exist_ok=True)
    if "--compact-existing" in sys.argv:
        files = sorted(OUTPUT_DIR.glob("*.webp"))
        for file in files:
            image = compact_long_gaps(Image.open(file).convert("RGB"))
            image.save(file, "WEBP", quality=88, method=6)
        print(json.dumps({"status": "PASS", "imagesCompacted": len(files)}))
        return
    questions = load_questions()
    candidates = [
        question for question in questions
        if question["type"] != "manual"
        and not question.get("image")
        and REFERENCE_PATTERN.search(question["prompt"])
    ]
    by_source: dict[str, list[dict]] = {}
    for question in candidates:
        by_source.setdefault(question["source"], []).append(question)

    written: list[str] = []
    render_cache: dict[tuple[Path, int], Path] = {}
    for source_name, source_questions in by_source.items():
        pdf_path = PDFS[source_name]
        wanted = {question["sourceNumber"] for question in source_questions}
        with pdfplumber.open(pdf_path) as document:
            markers: list[Marker] = []
            answers_by_page: dict[int, list[float]] = {}
            for page_index, page in enumerate(document.pages):
                page_question_markers, page_answers = page_markers(page, page_index)
                markers.extend(page_question_markers)
                if page_answers:
                    answers_by_page[page_index] = page_answers
                if page_index % 50 == 0:
                    print(f"Indexed {source_name}: page {page_index + 1}/{len(document.pages)}", flush=True)

            marker_by_number = {marker.number: marker for marker in markers}
            ordered = sorted(markers, key=lambda marker: (marker.page, marker.top))
            next_by_number: dict[int, Marker] = {}
            for index, marker in enumerate(ordered[:-1]):
                next_by_number[marker.number] = ordered[index + 1]

            missing_markers = sorted(wanted - marker_by_number.keys())
            if missing_markers:
                raise RuntimeError(f"Question markers not found in {source_name}: {missing_markers}")

            for question in source_questions:
                number = question["sourceNumber"]
                destination = make_question_image(
                    pdf_path,
                    document,
                    question["id"],
                    marker_by_number[number],
                    next_by_number.get(number),
                    answers_by_page,
                    render_cache,
                )
                written.append(question["id"])
                print(f"Created {destination.name}", flush=True)

    add_image_references(written)
    print(json.dumps({"status": "PASS", "imagesCreated": len(written)}, ensure_ascii=False))


if __name__ == "__main__":
    try:
        main()
    except Exception as error:
        print(f"ERROR: {error}", file=sys.stderr)
        raise

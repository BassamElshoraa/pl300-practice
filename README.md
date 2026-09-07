# PL-300 Practice Exam Simulator

[![Open the live simulator](https://img.shields.io/badge/Live%20Simulator-Start%20Practicing-0078D4?style=for-the-badge&logo=microsoftpowerbi&logoColor=white)](https://pl300-practice-exam.bassamelshoraa.chatgpt.site/)
[![GitHub Pages](https://img.shields.io/badge/GitHub%20Pages-Alternative%20Link-24292F?style=for-the-badge&logo=github)](https://bassamelshoraa.github.io/pl300-practice/)

> Found an issue, a changed exam objective, or an improvement idea? I would be happy to hear from you. Connect with [Bassam Elshoraa on LinkedIn](https://www.linkedin.com/in/bassam-elshoraa/).

A responsive, browser-based practice environment for the **Microsoft PL-300: Power BI Data Analyst** exam. It combines realistic timed mock exams, a complete source-question bank, visual answer areas, automatic scoring, detailed review, and beginner-friendly Egyptian Arabic explanations.

## Try it online

- **Primary site:** [pl300-practice-exam.bassamelshoraa.chatgpt.site](https://pl300-practice-exam.bassamelshoraa.chatgpt.site/)
- **Short GitHub Pages link:** [bassamelshoraa.github.io/pl300-practice](https://bassamelshoraa.github.io/pl300-practice/)

No registration is required. Exam progress and the selected theme are stored locally in the browser.

## What is included

- **509 source questions** from the two owner-supplied collections; one empty vendor placeholder was excluded.
- **Four 50-question mock exams**, each with a 100-minute timer and balanced skill-area coverage.
- **Four non-overlapping bank parts** for working through the complete source collection.
- Single-choice, multiple-response, matching, ordering, drag-and-drop-style, hotspot, and visual answer-area interactions.
- **324 automatically graded questions** and **185 visual/manual-review questions**.
- Source exhibits and tables displayed with the questions that reference them.
- Question navigator, progress indicator, flags, unanswered-question warning, and resumable local progress.
- Final score, domain-level performance, correct-answer review, and source explanations.
- **“شعبولي الدنيا”**: expanded explanations in beginner-friendly Egyptian Arabic.
- Built-in Arabic usage guide, light/dark themes, responsive layouts, keyboard-friendly controls, and Cairo typography.

## Practice structure

| Mode | Questions | Time | Best for |
| --- | ---: | ---: | --- |
| Practice exam 1–4 | 50 each | 100 minutes | Realistic timed attempts |
| Bank Part 01–04 | 127–128 each | 2 minutes per question | Complete-bank study and revision |

The mock-exam builder targets the four PL-300 skill areas used by the simulator:

- Prepare the data — 28%
- Model the data — 26%
- Visualize and analyze the data — 26%
- Manage and secure Power BI — 20%

## Question interaction model

Every question displays a short instruction line before the prompt:

- **Single choice:** choose exactly one option.
- **Multiple response:** select every correct option.
- **Matching:** select one matching value for each row.
- **Sequence:** add every required step, then reorder it with the arrow controls.
- **Visual answer area / hotspot:** click the requested position or positions inside the source image; numbered markers preserve the selection order.

Visual items are separated from automatically graded items because their answers are image-based. The review screen shows the source answer image for direct comparison.

## Technology

- React 19 and TypeScript
- Vinext / Vite static export
- Tailwind CSS and shadcn-based UI components
- Lucide icons
- Cloudflare-compatible OpenAI Sites deployment
- GitHub Actions deployment to GitHub Pages

## Run locally

Requirements: **Node.js 22.13 or newer** and npm.

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Quality checks

```bash
npm run lint
npm run qa
npm run build
```

The project QA script checks question integrity, correct-answer indexes, mock composition, asset references, and complete-bank coverage.

## GitHub Pages deployment

Publishing is automated by [`.github/workflows/deploy-pages.yml`](.github/workflows/deploy-pages.yml). A push to `main` builds the static site with the `/pl300-practice/` base path and deploys `dist/client` to GitHub Pages.

Repository settings required by GitHub: **Settings → Pages → Source → GitHub Actions**.

## Project layout

```text
app/                  Main screens and global styling
components/           Reusable UI components
hooks/                Client-side React hooks
lib/                  Question bank, grading, exam builder, explanations
public/               Source exhibits, answer images, and static assets
scripts/              Extraction, repair, audit, and full QA utilities
.github/workflows/    GitHub Pages deployment workflow
.openai/              OpenAI Sites hosting configuration
```

## Content and trademark notice

Question text, choices, answer keys, explanations, and visual answer areas were extracted from files supplied by the collection owner. Some source items preserve legacy Power BI wording. **Microsoft, Power BI, and PL-300 are trademarks of Microsoft Corporation. This independent educational project is not affiliated with, sponsored by, or endorsed by Microsoft.**

## Feedback and updates

If you notice a broken exhibit, an answer that needs review, changed Microsoft terminology, or have an idea that would make the simulator better for students, please contact [Bassam Elshoraa on LinkedIn](https://www.linkedin.com/in/bassam-elshoraa/).

## Author

Designed and developed by **[Bassam Elshoraa](https://www.linkedin.com/in/bassam-elshoraa/)**.

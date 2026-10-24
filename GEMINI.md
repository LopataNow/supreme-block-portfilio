# Gemini & Antigravity IDE Guidelines

This project uses Payload CMS 3.x with Next.js (App Router), React, and TypeScript.

## Customizations & Skills
- The Payload CMS skill is configured under `.agents/skills/payload/`.
- Refer to `.agents/skills/payload/SKILL.md` for fast guidance on collections, fields, hooks, queries, and adapters.
- Detailed reference documents are available in `.agents/skills/payload/reference/`.

## Development Guidelines
- Always write type-safe code using TypeScript and Payload types (`src/payload-types.ts`).
- Respect Next.js App Router rules (distinguish client vs server components).
- Do not commit secrets, media uploads (`public/media/`), build outputs (`.next`, `dist`, `build`), or agent run artifacts (`.gemini/`, `.antigravity/`).

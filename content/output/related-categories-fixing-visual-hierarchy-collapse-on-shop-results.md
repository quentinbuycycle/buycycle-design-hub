---
title: "Related Categories — Fixing Visual Hierarchy Collapse on Shop Results"
author: "Quentin Guislain"
date: "2026-02-18"
team: "Design"
tags: ["Buyer","Pre-transactional XP"]
prototypes:
  - "/prototypes/related-categories-fixing-visual-hierarchy-collapse-on-shop-results.html"
finalPrototypes:
  - "/prototypes/related-categories-exploration.html"
---

## Problem
User interviews revealed that 100% of participants missed the related categories on the shop results page, defaulting to the nav bar or sidebar to navigate between categories. The root cause was visual hierarchy collapse — categories and filters shared identical chip styling, positioning, and lacked contextual framing, causing the brain to merge them into a single "filters" block.

## Solution
A contained browse section separates related categories from filters using three layered signals: a subtle background container, a "Browse" label for explicit purpose framing, and a distinct chip style (white with border) that contrasts with the rounded-rect filter buttons. This is the most proportionate fix — it solves discoverability without introducing new interaction patterns or repositioning elements.

## UX & UI Rationale
- **Gestalt Law of Common Region** — The background container groups category chips into a distinct visual zone, breaking the false grouping with filters
- **Hick's Law mitigation** — The "Browse" label reduces cognitive effort by naming the section's purpose, so users in task-oriented scanning mode don't skip it
- **Shape language differentiation** — Pill chips (24px radius) for categories vs rounded-rect (6px radius) for filters signals different functions: "navigate somewhere" vs "refine here"
- **Progressive disclosure preserved** — Categories remain in-context near filters rather than being moved to a separate navigation area, keeping the user's mental model intact
- **Proportionate intervention** — Solves a 100% miss rate with purely visual changes, no new interaction patterns or layout restructuring required

## System Limitations
- The `filters/chips` component only defines three variants (black, gray, white) — no "elevated" or "contained group" pattern exists for grouping chips inside a background section
- No design system token for section containers with semantic meaning (like a "browse group" or "category zone") — the #F3F3F3 background container was composed ad-hoc from `bgSecondary`
- The chip white variant spec uses #FFFFFF background, but inside a #F3F3F3 container the correct choice is `backgroundPrimary` (#FCFCFC) — this contextual adaptation isn't documented
- Shop-filter chevron at 21x21px felt oversized relative to the 14px label text in compact layouts — no "small" size variant exists

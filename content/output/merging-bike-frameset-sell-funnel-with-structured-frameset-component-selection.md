---
title: "Merging Bike & Frameset Sell Funnel with Structured Frameset Component Selection"
author: "Sophie Schoen"
date: "2026-03-04"
team: "Design"
tags: ["Seller","Seller XP"]
prototypes:
  - "/prototypes/pdp-frameset.html"
  - "/prototypes/index.html"
  - "/prototypes/merging-bike-frameset-sell-funnel-with-structured-frameset-component-selection.html"
finalPrototypes:
  - "/prototypes/Desktop Listing Flow.html"
  - "/prototypes/PDP - Frameset - Mobile.html"
  - "/prototypes/PDP - Frameset - Desktop.html"
  - "/prototypes/Mobile Listing Flow.html"
  - "/prototypes/Desktop Listing Flow.html"
---

## Problem
The sell landing page has 4 entry cards, leaving insufficient space for the allsports card. Reducing to 3 cards by merging bike and frameset entries gives the allsports card more prominence while streamlining the seller experience.

## Solution
A unified sell funnel entry merges bike and frameset into one card, with a new Step 1 selection that reveals a structured component toggle checklist for framesets. The frameset PDP gains a clear "Included with frameset" section showing which components the buyer will receive.

## UX & UI Rationale
- Reducing cognitive load by merging related categories (Hick’s Law)
- Progressive disclosure: component checklist only appears for frameset sellers
- Visual differentiation on PDP (green checkmarks vs gray X) leverages preattentive processing
- Toggle pattern familiar from settings UIs, reducing learning curve
- 3-column grid on PDP matches existing spec chip layout for visual consistency

## System Limitations
- No DS component for selection cards with illustrations — had to custom-build
- Toggle component exists in DS but has no documented "label + description" compound pattern
- No DS pattern for included/excluded item grids — created a new visual language
- Filter chips used for display-only specs on PDP are not semantically interactive, but DS only documents interactive chip variants

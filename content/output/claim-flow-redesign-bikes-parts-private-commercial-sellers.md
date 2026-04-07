---
title: "Claim Flow Redesign — Bikes & Parts, Private & Commercial Sellers"
author: "Sophie Schoen"
date: "2026-04-07"
team: "Product"
tags: ["Buyer & Seller","Post-transaction XP"]
prototypes:
  - "/prototypes/Claim form bikes commercial sale.html"
  - "/prototypes/Claim form bikes private sale.html"
  - "/prototypes/claim-summary.html"
  - "/prototypes/claim-form-parts-commercial.html"
  - "/prototypes/claim-form-parts.html"
  - "/prototypes/claim-form-modal-commercial.html"
  - "/prototypes/claim-flow-redesign-bikes-parts-private-commercial-sellers.html"
finalPrototypes: []
---

## Problem
The claim flow used generic damage tags that didn't adapt to product type, leading to imprecise claims and more back-and-forth during resolution. Commercial seller flows made premature assumptions about fault responsibility, and inconsistent copy and emoji usage eroded trust at a critical post-purchase moment.

## Solution
We built a taxonomy-driven claim system powered by 1,203 real claims that dynamically loads damage tags based on item subcategory, with universal tags, family defaults, and subcategory-specific overrides. We unified the copy across all four flows (bikes/parts × private/commercial), replaced emojis with SVG icons, added a translate button for cross-language claims, and removed premature responsibility assignments in the commercial flow.

## UX & UI Rationale
- **Recognition over recall** — Keyword-matched damage tags surface relevant issues from the buyer's free-text description, reducing cognitive load during a stressful moment
- **Progressive disclosure** — Universal tags always appear first; subcategory-specific tags only show when relevant, preventing overwhelm from 196 possible subcategories
- **Neutral language until verified** — Removing the "seller-paid shipping" banner in commercial flows avoids creating false expectations before buycycle reviews the claim
- **Cross-language support** — The translate button on the claim summary addresses buycycle's multi-country marketplace where buyer and seller often speak different languages
- **Consistency breeds trust** — Unified eligibility text, SVG icons replacing emojis, and standardized success states build confidence in a high-stakes post-purchase flow

## System Limitations
- No design system component for a "subcategory selector with grouped options" — had to style the native select with optgroups manually
- No standardized icon library — SVG icons were created inline per use case rather than pulled from a shared set
- The taxonomy data (keywords, families, overrides) is hardcoded in the prototype JS — in production this would need a proper backend data layer

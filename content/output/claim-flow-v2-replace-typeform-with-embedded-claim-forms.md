---
title: "Claim Flow v2 — Replace Typeform with Embedded Claim Forms"
author: "Sophie Schoen"
date: "2026-04-07"
team: "Product"
tags: ["Buyer & Seller","Post-transaction XP"]
prototypes:
  - "/prototypes/Claim form parts commercial sale.html"
  - "/prototypes/Claim form parts private sale.html"
  - "/prototypes/Claim form bikes commercial sale.html"
  - "/prototypes/claim-flow-v2-replace-typeform-with-embedded-claim-forms.html"
finalPrototypes: []
---

## Problem
The current claim intake relies on a Typeform that creates significant operational and product problems. No structured damage categories — buyers submit free text and vague cost ranges, so claims can't be auto-routed or cost-estimated. No real commitment upfront — buyers can stack claims by discovering additional issues after the fact with no "one claim per order" enforcement. No flow separation — the same form is used for private and commercial sales, so private seller buyers can accidentally trigger a commercial return flow. Anchoring doesn't work — we ask buyers what compensation they expect but never use it, agents start every negotiation from zero and can overshoot the buyer's own ask.

## Solution
We built an embedded 4-step claim modal in the Order Center chat that replaces Typeform entirely, covering all four scenarios (bikes/parts × private/commercial). The new flow gets a real first anchor by sending the buyer's compensation request directly to the seller as an opening offer, prevents claim stacking with explicit one-claim-per-order confirmation, categorizes damage with keyword-matched structured tags (based on 1,200+ real claims), and separates private from commercial seller flows with distinct return and resolution paths.

## UX & UI Rationale
- **Recognition over recall** — Keyword-matched damage tags surface relevant issues from the buyer's description, reducing cognitive load during a stressful moment
- **Progressive disclosure** — Universal tags always appear first; subcategory-specific tags only show when relevant, preventing overwhelm from 196 possible subcategories
- **Neutral language until verified** — Removing premature responsibility assumptions in commercial flows avoids creating false expectations before buycycle reviews the claim
- **Cross-language support** — The translate button on the claim summary addresses buycycle's multi-country marketplace where buyer and seller often speak different languages
- **Consistency breeds trust** — Unified eligibility text, SVG icons, and standardized success states build confidence in a high-stakes post-purchase flow

## System Limitations
- No design system component for a "subcategory selector with grouped options" — had to style the native select with optgroups manually
- No standardized icon library — SVG icons were created inline per use case rather than pulled from a shared set
- The taxonomy data (keywords, families, overrides) is hardcoded in the prototype JS — in production this needs a proper backend data layer

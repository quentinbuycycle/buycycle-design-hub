---
title: "Multi-Sport Product Cards"
description: "Designing a universal product card that adapts across bikes and new sport categories without requiring separate templates per vertical."
date: "2026-02-05"
author: "Quentin Musik"
tags: ["product-cards", "multi-sport", "expansion", "components"]
thumbnail: ""
---

# Multi-Sport Product Cards

## Problem

buycycle is expanding beyond bikes into additional sport categories. The existing product card was built with strong assumptions about bike-specific attributes: frame size in centimeters, wheel diameter, groupset manufacturer, and a condition badge tuned to bicycle wear patterns.

When the first non-bike category prototypes were mocked up, the card broke in subtle but compounding ways. Ski boots don't have a "frame size" — they have mondo point sizing. Surfboards don't have a "groupset" — they have fin setup and volume in liters. Forcing these into the bike card's attribute layout produced results that were technically functional but semantically wrong: labels didn't match expectations, the attribute hierarchy was off, and the card felt like a bike card wearing a costume.

The goal was to design a single card component that works across all sport categories — current and future — with a shared structure but category-aware attribute display. No separate card templates per sport. One component, many shapes of content.

## Solution

We restructured the product card around a content model that separates **universal fields** from **category-specific attributes**:

**Universal (always present):** Product image, title, price, condition badge, seller location, and listing age. These appear in the same position on every card regardless of category, giving users a consistent scanning pattern across mixed-category search results.

**Category attributes (variable):** Each sport category defines an ordered list of 2–3 key attributes that matter most for purchase decisions. For bikes: frame size, wheel size, groupset. For ski boots: mondo size, flex index, last width. For surfboards: length, volume, fin setup. The card renders whichever attributes the category defines, in a standardized attribute row beneath the title.

The attribute row uses a consistent visual format — icon + label + value — regardless of content. This means the card layout is identical across categories; only the data changes. A `CategoryAttributes` configuration map drives which attributes render for each sport type, so adding a new category requires only a config entry, not a component change.

**Condition badge adaptation:** The condition scale (Excellent / Good / Fair) remains universal, but the tooltip explanation is category-specific. "Good condition" means different things for a carbon road bike vs. a pair of climbing shoes. The badge itself is identical; the supporting context adapts.

## UX & UI Rationale

**Jakob's Law** is the driving principle: users spend most of their time on other sites, and they bring expectations about how product cards work. The universal fields — image, title, price, condition — are positioned where marketplace users expect them (image top, title below, price prominent right or below title). We're not innovating on card layout; we're being deliberately conventional so users can scan without learning.

**The variable attribute row** is the key design decision. We capped it at 3 attributes per category based on Miller's chunking principle and practical testing — more than 3 attributes in a card-sized space creates visual noise that slows scanning. The hard constraint forces each category team to make a genuine editorial decision about what matters most at the browse stage. Everything else lives on the detail page.

The icon + label + value format for attributes uses **redundant encoding** — the icon provides rapid visual recognition for repeat users (a ruler icon for size, a gear icon for groupset), while the text label ensures first-time clarity. Neither alone would be sufficient: icons without labels are ambiguous across sport contexts; labels without icons are slower to scan in a grid.

We deliberately avoided color-coding attributes by category. Early prototypes used subtle background tints (blue for bikes, green for outdoor gear) but this created a visual language users had to learn with no payoff — the category is already clear from the product image and title. The color was decorative complexity, not functional communication.

## System Assessment

### Where the design system was a strength

The component architecture made this feasible as a single-component solution. The card's existing slot-based layout — image slot, content slot, action slot — meant we could restructure the content slot's internals without touching the card shell, shadow, border radius, or hover behavior. The outer card is exactly the same component; only the content projection changed.

**Spacing tokens were critical** for the attribute row. The `--space-2` gap between attributes and `--space-3` vertical gap between the title block and attribute row created a density that works at card scale without feeling cramped. The 4px grid meant every spacing decision snapped cleanly, and the result looks intentional rather than arbitrary.

**The typography scale carried the hierarchy** without any overrides. `--text-base` / `--font-medium` for the title, `--text-sm` / `--content-tertiary` for attributes, and `--text-lg` / `--font-bold` for price created clear visual priority levels. We didn't need a single custom font size.

The condition badge component was already well-abstracted — it accepts a condition level and renders the appropriate color from semantic tokens (`--bg-positive` for Excellent, `--bg-attention` for Good, `--bg-warning` for Fair). Adding category-specific tooltips required zero visual changes to the badge itself.

### Where the design system limited the solution

**No icon system.** This was the biggest gap. The attribute row needs small, consistent icons for each attribute type (size, weight, material, flex, volume, etc.). The design system has no icon library, no icon sizing convention, and no guidance on icon + text pairing. We used inline SVGs as a stopgap, but this means every new attribute type requires a developer to source and size an icon manually. A curated icon set with defined sizes (16px, 20px, 24px) and consistent stroke weight would save significant time for every team building attribute displays.

**No "compact data" pattern.** The attribute row — small icon, short label, value, repeated 2–3 times horizontally — is a pattern that will appear in many contexts: product cards, comparison tables, filter summaries, order details. The design system doesn't define how to lay out compact key-value data. We built it ad-hoc with flexbox and the existing tokens, but there's no reusable pattern to point other teams to. This will result in subtle inconsistencies (different gaps, different label styles, different icon sizes) across features.

**Condition badge tooltip not defined.** The badge component existed, but tooltips are not part of the design system. We had to build a tooltip from scratch — positioning logic, arrow, background color, max-width, mobile behavior (tap vs. hover). This is a foundational UI primitive that should exist in the system. Without it, every team that needs a tooltip will build their own, and they'll all behave slightly differently.

**No guidance on mixed-category layouts.** When bike cards and ski boot cards appear in the same search results grid, the variable attribute rows create uneven card heights. The design system's card component doesn't address how to handle variable content height in a grid — should cards stretch to equal height? Should the attribute row have a fixed height? We went with equal-height cards using flexbox stretch, but this was a judgment call with no system-level guidance.

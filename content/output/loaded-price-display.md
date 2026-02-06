---
title: "Loaded Price Display"
description: "Showing total cost including shipping upfront to reduce buyer abandonment caused by late-stage pricing surprises."
date: "2026-02-06"
author: "Quentin Musik"
tags: ["pricing", "conversion", "trust", "checkout"]
thumbnail: ""
---

# Loaded Price Display

## Problem

Buyers on buycycle were dropping off at checkout when shipping costs appeared for the first time. Internal data showed a significant abandonment spike at the shipping step — users who had committed to a bike, entered their details, and then encountered an unexpected €40–€120 fee on top of the listed price.

The root cause wasn't the shipping cost itself. Used bikes are heavy, and most buyers understand logistics aren't free. The problem was *when* the cost appeared. By the time a buyer reached checkout, they had mentally anchored on the listed price. The shipping fee felt like a bait-and-switch, even though it wasn't intentional.

The brief: show the total cost — bike price plus estimated shipping — from the very first moment a buyer sees a listing. No surprises, no late reveals.

## Solution

We implemented a "loaded price" display that calculates and shows estimated total cost directly on the product card and listing page. The approach has three layers:

**Product cards (search results, category pages):** Each card now shows the bike price with a smaller "incl. ~€XX shipping" line directly beneath it. The shipping estimate is based on the buyer's country (detected via IP geolocation or their saved profile) and the seller's location. When no buyer location is available, we show a range (e.g., "shipping €45–€85") rather than hiding the cost entirely.

**Listing detail page:** The price section was restructured into a clear breakdown — bike price, estimated shipping, and a bold total line. This replaces the previous layout where only the bike price was prominent and shipping was mentioned in a footnote-style disclaimer.

**Checkout:** The shipping step now confirms the pre-shown estimate rather than introducing a new number. When the final calculated shipping differs from the estimate (due to exact address), the delta is highlighted with an explanation. In testing, most estimates were within €5 of the final cost.

## UX & UI Rationale

This solution leans on two well-documented principles:

**Anchoring effect (Tversky & Kahneman):** The first number a user sees becomes their reference point. Previously, the anchor was the bike-only price, making the total feel inflated. Now, the anchor is the total cost — which means the checkout confirmation feels like validation, not escalation.

**Progressive disclosure done right:** We're not hiding complexity — we're front-loading the most decision-critical information (total cost) while keeping the breakdown available for users who want it. The detail page shows the full split; the card shows the summary. This respects both the scanner and the researcher.

The visual hierarchy on cards uses size and weight contrast rather than color to differentiate the bike price from the shipping line. The total cost isn't a separate element — the bike price remains the primary number, with shipping presented as a natural addendum in a smaller, secondary-weight line. This avoids the "two competing prices" problem that earlier prototypes suffered from.

We chose not to merge everything into a single "total" number on cards because transparency matters more than simplicity here. Showing the components builds trust; a single inflated-looking number without context could have the opposite effect.

## System Assessment

### Where the design system was a strength

The typography scale made the price hierarchy straightforward. Using `--text-xl` for the bike price and `--text-sm` with `--content-tertiary` for the shipping line created exactly the right visual weight ratio without any custom sizing. The 4px spacing grid kept the two lines feeling like a single unit rather than disconnected elements.

The existing card component's flexible content slot meant we didn't need to modify the card structure itself — the loaded price display slotted into the existing price area. This kept the change scoped to the price presentation logic rather than requiring a card refactor.

Color tokens for semantic states (`--content-positive`, `--content-information`) were useful for the checkout confirmation step, where we needed to signal "estimate confirmed" vs. "slight difference" without inventing new visual patterns.

### Where the design system limited the solution

**No number formatting guidance.** The design system documents typography, colors, and spacing — but has no guidance on how to format prices, currency symbols, ranges, or estimates. We had to make ad-hoc decisions about whether to use "€45–€85" or "€45 – €85" or "€45 to €85", and whether the currency symbol goes before or after the number in different locales. This should be a documented pattern, especially for a marketplace where pricing is everywhere.

**Missing "secondary annotation" pattern.** The shipping line beneath the price is a pattern that doesn't exist in the component library — a small piece of contextual text tightly coupled to a primary value. We improvised using the tertiary text color and small font size, but this will recur (think: "per month" on financing, "was €X" on discounts). A reusable annotation/sub-value pattern would prevent each team from reinventing this.

**No responsive behavior defined for price stacks.** On narrow mobile cards, the price + shipping line stack was too cramped at the existing card padding. We had to add a mobile-specific override to reduce the gap. The design system doesn't define how multi-line value displays should behave at small widths — it only covers single-line text truncation.

---
title: "Post-Transaction Rating Flow & Seller Trust Badges"
author: "Lena Wittmann"
date: "2026-03-01"
team: "Design Team"
tags: ["Buyer & Seller","Post-transaction XP"]
prototypes:
  - "/prototypes/seller-profile.html"
  - "/prototypes/rating-flow.html"
  - "/prototypes/seller-profile.html"
  - "/prototypes/post-transaction-rating-flow-seller-trust-badges.html"
finalPrototypes: []
---

## Problem
Trust between buyers and sellers is a core challenge on buycycle: buyers can’t inspect items in person before committing, and sellers have no way to signal their reliability or listing quality upfront. Without a structured reputation system, buyer uncertainty stays high and high-quality sellers can’t differentiate themselves.

## Solution
Designed a seller trust & reputation system combining earned badges, aggregated post-transaction ratings with pre-written tag chips, and visible trust signals on the PDP. The system rewards high-quality seller behaviour, surfaces structured “what buyers say” highlights on the Seller Profile, and gives buyers the confidence signals they need before purchasing.

## UX & UI Rationale
- Pre-written chips reduce cognitive load (Hick’s Law) and boost completion rates by offering low-effort, high-signal input
- Hiding chips at 1–2 stars prevents forced positivity in negative-experience flows, preserving review authenticity
- The TOP SELLER badge leverages social proof and status mechanics to motivate sellers toward consistent quality
- Share/favourite overlaid inside the product photo keeps the nav bar clean — actions sit next to the content they affect (proximity principle)
- Auto-feedback fallback (silent 5★ for skipped reviews) sustains rating volume without fabricating visible review copy

## System Limitations
- `#757575` (borderSecondary) was used as a content colour in existing components — contentTertiary (#535353) wasn’t clearly documented for metadata text, causing widespread incorrect token reuse
- Font weights 600 and sizes 13/15/17px appeared throughout existing prototypes; only 400/500/700 and a strict size scale are supported, requiring manual correction
- No documented “button/sticky-app” pattern — gradient background, 44px top padding, and home indicator structure had to be inferred from spacing and navigation specs
- No chip component in the DS; assembled from scratch using borderTertiary, contentSecondary, and the 4px spacing grid

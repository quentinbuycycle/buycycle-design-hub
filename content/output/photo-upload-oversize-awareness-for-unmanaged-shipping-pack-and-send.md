---
title: "Photo Upload & Oversize Awareness for Unmanaged Shipping Pack-and-Send"
author: "Quentin Guislain"
date: "2026-02-25"
team: "Product Design"
tags: ["Seller","Seller XP"]
prototypes:
  - "/prototypes/photo-upload-oversize-awareness-for-unmanaged-shipping-pack-and-send.html"
finalPrototypes: []
---

## Problem
60%+ of unmanaged shipments incur oversize surcharges, and sellers lack awareness of packaging constraints at the time of sending. There was no photo upload step to verify package dimensions or support insurance claims.

## Solution
Added a photo upload step to the pack-and-send subflow with a commitment-recall callout that references the packaging size the seller chose at listing time. The callout reframes dimensional limits as a reminder of the seller's own choice rather than an imposed rule, leveraging consistency bias to drive compliance.

## UX & UI Rationale
- Commitment-recall framing ("You selected size M") uses Cialdini's consistency principle — sellers are more likely to honour their own prior choice than follow an external instruction.
- Photo upload follows the simple "Add photos" + placeholder grid pattern (matching the managed flow), avoiding over-engineering with progress bars and per-slot labels.
- Step numbering with completion badges gives clear progress feedback across the 4-step subflow (Jakob's visibility of system status).
- Confirm button stays disabled until all requirements are met (photos + T&C), with inline validation on attempt — preventing errors rather than correcting them.
- Oversize surcharge consequence is mentioned in both the callout and T&C checkbox, reinforcing the message at decision point and commitment point.

## System Limitations
- Toast component in the DS spec requires a 34×34px icon container, but the spec doesn't provide variant-specific icon SVGs — had to implement toasts as text-only.
- DS error toast guideline says "no auto-close" but doesn't define a dismiss mechanism (close button? swipe?), leaving the interaction incomplete.
- Button/main Small variant uses 13px font size which falls outside the DS typography scale (smallest defined token is 12px / text-xs).
- No DS component exists for file upload / photo upload patterns — had to build from primitives.

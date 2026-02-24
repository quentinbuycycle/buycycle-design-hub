---
title: "New App Profile Navigation"
author: "Jonas "
date: "2026-02-24"
team: "Product Design"
tags: ["Buyer & Seller","Seller XP"]
prototypes:
  - "/prototypes/new-app-profile-navigation.html"
finalPrototypes: []
---

## Problem
Problem:
The current profile screen is a flat 13-item settings menu that fails to motivate sellers or build buyer trust. Users must scroll past low-priority items (Language, Shipping Address) to reach support, and there are no performance signals or profile completion nudges.

## Solution
Restructured the profile into a seller hub with a completion card, stats row (47 sold · < 2h response · 128 views), and balance preview — reducing menu items from 13 to 8 by nesting Settings and Help into sub-screens. Added a camera icon on the avatar for direct photo upload and renamed "My Orders"/"My Sales" to "Purchases"/"Sales" for C2C clarity.

## UX & UI Rationale
Profile completion card with single next-step focus reduces cognitive load vs. full checklists (Vinted pattern)
Seller stats row answers "how am I doing?" at a glance without needing a separate dashboard
Navigation stack enables proper back behavior through nested screens (Settings → Notifications → back → Settings)
Balance preview in green (contentPositive) gives instant financial context without extra taps
Consolidating 4 settings + 2 support items into 2 sub-screen rows keeps everything above the fold


## System Limitations
none

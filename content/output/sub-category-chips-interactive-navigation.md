---
title: "Sub-Category Chips & Interactive Navigation"
author: "Quentin Guislain"
date: "2026-02-06"
team: "Design"
tags: ["Buyer","Pre-transactional XP"]
prototypes:
  - "/prototypes/sub-category-chips-interactive-navigation.html"
finalPrototypes: []
---

## Problem
Users who drilled into a product sub-category had no way to pivot to adjacent sub-categories without navigating back to the explore screen. This added unnecessary friction to the browse-and-discover flow in a multi-sport marketplace.

## Solution
A chip-based related category row on the search results screen lets users pivot sub-categories in a single tap — hiding the active chip, revealing the previous one, updating the filter panel, and adjusting results count. Three screens (Explore, Search Results, Filter Panel) are connected with directional slide transitions: right for forward navigation, bottom for the filter modal.

## UX & UI Rationale
- Related category chips as low-commitment pivots reduce sub-category switching from 2 taps to 1
- Hiding the active chip applies progressive disclosure — keeping every visible chip actionable
- Pill vs. bordered styling leverages Gestalt similarity to separate navigation from filter controls
- Directional transitions (slide-right for depth, slide-up for overlay) match iOS spatial mental models
- Edge-bleed on horizontal scroll rows signals hidden content without explicit affordances

## System Limitations
- No chip component — pills and filter chips built from scratch, causing 3-4 rounds of corrections
- No transition/animation guidelines — easing curves and directional patterns designed ad-hoc
- No edge-bleed scroll pattern documented — negative-margin technique needs rediscovery by other teams
- No filter panel / settings list row pattern — stacked rows with chevrons and tags hand-built

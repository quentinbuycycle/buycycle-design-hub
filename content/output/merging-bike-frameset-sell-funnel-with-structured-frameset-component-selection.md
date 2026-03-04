---
title: "Merging Bike & Frameset Sell Funnel with Structured Frameset Component Selection"
author: "Sophie Schoen"
date: "2026-03-04"
team: "Product Design"
tags: ["Seller","Seller XP"]
prototypes:
  - "/prototypes/merging-bike-frameset-sell-funnel-with-structured-frameset-component-selection.html"
finalPrototypes: []
---

## Problem
Sellers face two separate funnel entries for bikes and framesets, creating confusion about which path to choose — especially when selling a frame with some components attached. On the buyer side, frameset PDPs lack structured data about included parts, forcing buyers to parse free-text descriptions.

## Solution
A merged sell entry funnels into a new Step 1 where sellers choose "Complete Bike" or "Frameset Only," with a toggle checklist capturing exactly which components are included. This structured data then surfaces on the frameset PDP as a clear included/not-included grid, replacing ambiguous seller descriptions.

## UX & UI Rationale
- Hick's Law: Reducing landing page from 4 to 3 cards lowers decision complexity for sellers entering the funnel
- Progressive disclosure: Component checklist only appears when "Frameset Only" is selected, keeping the bike path clean
- Recognition over recall: Toggle switches with named components (Fork, Headset, Stem, etc.) eliminate guesswork vs. free-text input
- Structured data over free text: Seller input maps directly to buyer-facing UI, closing the information gap on frameset PDPs
- ~9% of bike sales are framesets — structured component data improves listing quality and buyer confidence for this segment

## System Limitations
- No DS pattern for selection cards (radio-card / option-card) — had to compose from primitives
- Toggle component spec in DS lacks explicit guidance on label placement
- No DS pattern for checklist/toggle-list groups
- Missing guidance on progressive disclosure animations in the DS

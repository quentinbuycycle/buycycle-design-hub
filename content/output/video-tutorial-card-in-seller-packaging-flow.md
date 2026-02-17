---
title: "Video Tutorial Card in Seller Packaging Flow"
author: "Quentin Guislain"
date: "2026-02-17"
team: "Design"
tags: ["Seller","Post-transaction XP"]
prototypes:
  - "/prototypes/packaging-preparation-chat-interface.html"
  - "/prototypes/video-tutorial-card-in-seller-packaging-flow.html"
finalPrototypes: []
---

## Problem
Sellers needed easy access to packing instructions during critical shipping steps, but the video tutorial link was buried in text and not prominent enough to drive engagement. Without clear guidance visibility, sellers might pack incorrectly, leading to shipping damage claims and poor buyer experience.

## Solution
Created an elevated video card component with a prominent play icon (44px circle), title, and duration metadata, placed at both packaging preparation and packaging shipped stages. Applied animation principles (hover scale, icon pulse, arrow movement) and ensured design system compliance with proper typography, spacing, and interaction states.

## UX & UI Rationale
- **Recognition over recall**: Prominent play icon immediately signals video content without requiring users to read descriptive text
- **Visual hierarchy**: Elevated card design with border, shadow, and strategic spacing separates instructional content from administrative messaging
- **Immediate feedback**: Hover animations (play icon scale 1.05, arrow translateX) follow Jakob's Law — users expect interactive elements to respond
- **Strategic placement**: Appears at critical decision moments (packaging prep + shipped) when sellers most need guidance, reducing cognitive load
- **Consistent interaction states**: Black border on active/focus prevents visual confusion and maintains brand color usage throughout interaction

## System Limitations
- Video card component pattern didn't exist in design system — had to adapt from external prototype (pack-order-v1.html)
- Typography scale contained non-standard font-weight (600) requiring manual conversion to system weights (400/500/700)
- No documented guidance on placement patterns for instructional CTAs within transactional message flows
- Animation principles skill lacked examples for attention-drawing patterns (icon pulse, staggered reveals)
- Button component specs didn't cover media-forward CTAs with play icons and metadata

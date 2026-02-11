---
title: "Price Adjustment Modal for Component Upgrades"
author: "Sophie Schoen"
date: "2026-02-11"
team: "Product Design"
tags: ["Seller","Seller XP"]
prototype: "/prototypes/price-adjustment-modal-for-component-upgrades.html"
---

## Problem
Sellers who upgrade bike components (e.g., premium wheels, better groupset) cannot communicate the added value, causing the default original price (UVP) to undervalue upgraded bikes. This leads buyers to see misleading discount percentages that don't reflect true value, reducing perceived deal quality and hurting conversion rates.

## Solution
A modal prompting sellers to adjust the original price after editing components during upload, showing before/after price comparison with real-time validation and optional skip. The modal triggers on "Continue" only if components were modified, uses generic messaging to avoid repetition, and was built in both responsive web (adaptive Modal) and native app (BottomSheet) versions.

## UX & UI Rationale
- **Recognition over recall**: Modal appears at the moment of component modification (Continue button), when upgrade context is fresh in seller's mind, reducing cognitive load
- **Visibility of system status**: Before/after price comparison with live-updating "After" field provides immediate feedback, following transparent system response principles
- **Error prevention**: Real-time validation (price > €0) with disabled confirm button prevents invalid submissions (Nielsen's heuristic #5)
- **Progressive disclosure**: Modal only appears when components are modified, reducing interruption for sellers who haven't made changes
- **Platform-appropriate patterns**: Web uses centered/slide-up Modal, app uses BottomSheet with drag handle—respecting platform conventions for familiarity (Jakob's Law)

## System Limitations
- No existing BottomSheet component in design system required building from scratch, including drag handle specs and slide-up animations
- Modal header layout (title + close button in same row) wasn't documented, requiring custom implementation
- Currency input with live formatting and € prefix had no design system pattern, forcing manual creation
- Success toast specs existed but lacked responsive behavior guidance (full-width on mobile vs max-width on desktop)
- Generic messaging strategy (avoiding component names) wasn't covered in content guidelines, leaving copy approach to designer discretion

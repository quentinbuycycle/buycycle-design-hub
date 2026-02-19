---
title: "Filter & Chip Component Enhancement — Visual Hierarchy, Dismiss Behavior, and Active-First Sorting"
author: "Quentin Guislain"
date: "2026-02-19"
team: "Design"
tags: ["Buyer & Seller","Pre-transactional XP"]
prototypes:
  - "/prototypes/filter-chip-component-enhancement-visual-hierarchy-dismiss-behavior-and-active-first-sorting.html"
finalPrototypes: []
---

## Problem
The filter zone suffered from visual hierarchy collapse — browse chips and shop filters shared nearly identical styling, making it impossible to distinguish category context from refinement tools at a glance. With 16 filters displayed simultaneously, active filters were buried in the grid with no scanability, violating Hick's Law and Nielsen's Visibility of System Status.

## Solution
Introduced a two-tier visual system: filled pills (24px radius) for browse categories vs outlined rounded-rects (10px radius) for shop filters, creating instant Gestalt differentiation. Added click-to-dismiss behavior for browse chips, active-first DOM sorting for shop filters, chevron rotation on open, and a refined dropdown with subtle bg-tint selection states — all with 120-150ms transitions tuned for high-frequency filter interactions.

## UX & UI Rationale
- **Gestalt Law of Similarity**: Pill vs rounded-rect shapes create two distinct component classes, solving the hierarchy collapse between browse chips and shop filters
- **Hick's Law mitigation**: Active-first sorting surfaces applied filters to the front of the row, reducing scan time across 16 filters
- **Emil Kowalski's frequency rule**: 120-150ms transitions (not 200ms) because filters are tapped rapidly and repeatedly — speed over ceremony
- **Von Restorff Effect**: Active filters use font-weight 500 + border change + badge, creating a triple-signal that pops against inactive neighbors
- **Zero layout reflow**: Dropdown selection uses opacity + bg-tint (not borders or margin changes), preventing content shift per props-transform-opacity

## System Limitations
- **No filter component in design system**: Filters had to be built from scratch — no base component, no documented states, no token guidance specific to filter patterns
- **IconChevronDown viewBox mismatch**: The design system icon sits in a 64×64 viewBox with excessive whitespace, requiring manual viewBox cropping (16 20 32 23) to render at appropriate size
- **No active-first sorting pattern**: The design system has no guidance on dynamic reordering of filter rows — this UX pattern had to be invented and validated independently
- **Missing dropdown component spec**: The filter dropdown (text rows + checkmark + action buttons) has no documented spec — states, spacing, and animation had to be derived from production screenshots

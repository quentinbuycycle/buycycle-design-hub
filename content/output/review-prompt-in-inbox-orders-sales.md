---
title: "Review Prompt in Inbox & Orders & Sales"
author: "Lena Wittmann"
date: "2026-03-24"
team: "Transaction Experience"
tags: ["Buyer & Seller","Post-transaction XP"]
prototypes:
  - "/prototypes/review-prompt-in-inbox-orders-sales.html"
finalPrototypes: []
---

## Problem
After a successful transaction, buyers and sellers had no direct prompt to leave a review from the Inbox or Orders & Sales sections — only from within the chat. This limited review completion rates by not surfacing the action in the high-traffic areas of the account.

## Solution
A Leave a review row was added to inbox conversation items and order list rows, visible only when booking_status = paid_out and no review has been submitted yet. Once a review is submitted the row disappears silently, keeping the interface clean.

## UX & UI Rationale
- **Visibility (Nielsen #1):** Surfacing the prompt in two high-traffic locations increases discoverability without requiring users to re-enter the chat
- **Progressive disclosure:** The review row only appears when actionable — hiding it post-submission avoids noise and respects cognitive load
- **Gestalt proximity:** Stars and Leave a review are grouped inline, clearly associating the action with a specific order
- **Consistency:** Reuses the star + link pattern already established in the mobile app, maintaining cross-platform coherence
- **Minimal interruption:** Embedded in existing list items rather than a modal or banner, preserving the browsing flow

## System Limitations
- No DS token for star/rating color — #F5A623 had to be hardcoded as a decorative value
- No explicit DS pattern for inline text links within list items; contentInformation (#1D4ED8) was the closest available token
- The DS skips font-weight 600 (jumping from 500 to 700), causing a minor mismatch when aligning with existing web list item styles
- No DS component defined for account/order list items — layout had to be built from scratch using only foundation tokens

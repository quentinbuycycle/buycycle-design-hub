---
title: "Seller Fit Opinion in Listing Funnel & PDP"
author: "Sophie Schoen"
date: "2026-02-11"
team: "Product Design"
tags: ["Buyer & Seller","Seller XP"]
prototypes:
  - "/prototypes/seller-fit-opinion-in-listing-funnel-pdp.html"
finalPrototypes:
  - "/prototypes/buycycle-listing-funnel-size-fit_final_web.html"
  - "/prototypes/buycycle-listing-funnel-size-fit-app.html"
---

## Problem
Buyers lack trustworthy sizing guidance when purchasing a used bike, while sellers possess first-hand knowledge about how their bike fits that goes uncaptured. There was no mechanism to collect the seller's subjective fit opinion during listing and surface it on the product detail page alongside objective size data.

## Solution
We designed a Seller Fit Opinion feature across the listing funnel and PDP on both web and app, allowing sellers to share their fit experience and buyers to see it alongside size recommendations. Both web prototypes were made fully responsive for mobile browsers while the app prototypes follow native mobile patterns.

## UX & UI Rationale
- Seller fit opinions add a qualitative, human layer to data-driven size recommendations, building buyer confidence
- Capturing input at listing time minimizes friction since sellers are already describing their bike
- Surfacing fit feedback prominently on the PDP ensures maximum buyer visibility
- Supporting both web and app ensures consistent experience across all platforms
- Reducing size-related uncertainty helps decrease returns and increase conversion

## System Limitations
- Prototypes use inline React with Babel standalone for rapid iteration rather than the production component library
- The combined viewer uses base64-encoded iframes to bundle all four prototypes into a single file
- Production implementation would require API integration for persisting and retrieving seller fit data

# Rental Analytics - Project Plan

## Epic
A real estate rental analytics app for making personal investment decisions based on data.

## Target User
Personal investor looking to make smarter rental property investment decisions.

## Problem
Making rental property investment decisions without clear data on potential returns, neighborhood comparisons, and property metrics.

## Solution
An analytics dashboard that scrapes property data, compares listings side-by-side, and provides neighborhood-level insights to identify the best investment opportunities.

---

## Features

### Feature 1: Property Comparison Dashboard ⭐ MVP

**User Stories:**
```
As an investor,
I want to see multiple properties side-by-side,
So that I can quickly identify the best opportunities.

As an investor,
I want to sort properties by rental yield,
So that I can focus on highest-return options.
```

**Acceptance Criteria:**
- [ ] Display properties in a comparison table/grid
- [ ] Show key metrics: price, rent, yield, location
- [ ] Sort by yield, price, or other metrics
- [ ] Filter by neighborhood or price range

---

### Feature 2: Neighborhood Analytics

**User Stories:**
```
As an investor,
I want to compare average rents across neighborhoods,
So that I can target the most profitable areas.

As an investor,
I want to see yield trends by area,
So that I can identify up-and-coming neighborhoods.
```

**Acceptance Criteria:**
- [ ] Aggregate data by neighborhood
- [ ] Show average rent, price, and yield per area
- [ ] Visualize neighborhood comparisons

---

### Feature 3: Data Scraping Pipeline

**User Stories:**
```
As an investor,
I want property data pulled automatically from listing sites,
So that I don't have to manually enter each property.
```

**Acceptance Criteria:**
- [ ] Scrape from real estate sites (Idealista, Fotocasa, etc.)
- [ ] Parse and normalize property data
- [ ] Store in database for analysis
- [ ] Update data periodically

---

### Feature 4: Investment Calculator

**User Stories:**
```
As an investor,
I want to calculate ROI and cash flow projections,
So that I can evaluate if a property meets my investment criteria.
```

**Acceptance Criteria:**
- [ ] Input purchase price, down payment, expected rent
- [ ] Calculate: rental yield, cap rate, cash-on-cash return
- [ ] Show monthly cash flow projection

---

## Today's Goal

Build **Feature 1: Property Comparison Dashboard** with:
- Side-by-side property comparison view
- Key metrics display (price, rent, yield, location)
- Sorting and filtering capabilities
- Mock data to start (scraping comes later)

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** shadcn/ui
- **Database:** TBD (Supabase or Convex)
- **Scraping:** TBD (Puppeteer, Playwright, or API)

---

*Planned at Claude Code Masterclass Barcelona 2026*

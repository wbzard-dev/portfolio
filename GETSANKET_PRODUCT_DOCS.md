# GetSanket — Product Documentation

> Version: July 2026  
> Stack: React 18 + Vite (frontend) · Node/Express + PostgreSQL (backend)  
> Hosted at: `/app` route of the portfolio site · Backend: Render

---

## Table of Contents

1. [Product Overview](#1-product-overview)
2. [Architecture](#2-architecture)
3. [Data Model](#3-data-model)
4. [Authentication & Plans](#4-authentication--plans)
5. [Feature: Forms](#5-feature-forms)
6. [Feature: Email Leads](#6-feature-email-leads)
7. [Feature: QR Campaigns](#7-feature-qr-campaigns)
8. [Feature: Overview Dashboard](#8-feature-overview-dashboard)
9. [Feature: Settings](#9-feature-settings)
10. [API Reference](#10-api-reference)
11. [Frontend Structure](#11-frontend-structure)
12. [Design System](#12-design-system)
13. [Plan Limits & Upgrade Flow](#13-plan-limits--upgrade-flow)
14. [Key Design Decisions](#14-key-design-decisions)
15. [Roadmap / Known Gaps](#15-roadmap--known-gaps)

---

## 1. Product Overview

GetSanket is a two-in-one lead intelligence tool combining:

- **Form backends** — zero-code HTTP endpoints that collect HTML form submissions into a searchable dashboard, with built-in email outreach to those leads.
- **QR campaigns** — a PDF personalisation engine that generates per-recipient PDFs with embedded QR codes, then tracks every scan in real time.

The target user is a small business owner, event organiser, or marketer who wants to collect leads and run traceable offline campaigns (badges, flyers, mailers) without needing a developer.

### Core user journey

```
Sign up → Create a form → Drop the endpoint into your HTML → Leads arrive in dashboard
         → Select leads → Send templated emails in one click

OR

Sign up → New campaign → Pick a template → Design PDF in-browser → Upload CSV
         → Generate personalised PDFs with unique QR per person → Distribute
         → Watch scans roll in live
```

---

## 2. Architecture

### Frontend

```
portfolio/src/getsanket/
├── GetsanketApp.jsx          # Root: AuthProvider + React Router sub-tree
├── context/
│   └── AuthContext.jsx       # JWT auth state, authFetch helper
├── pages/
│   ├── Login.jsx
│   ├── Signup.jsx
│   └── Dashboard.jsx         # All authenticated views (sidebar + main content)
├── components/
│   ├── LandingPage.jsx       # Marketing page at /app
│   ├── CampaignsPage.jsx     # Entire campaigns feature (wizard + detail)
│   ├── GuidedTour.jsx        # First-run product tour
│   └── UpgradeModal.jsx      # Razorpay subscription checkout modal
├── utils/
│   ├── csv.js                # CSV text → array-of-objects parser
│   ├── emailTemplates.js     # Pre-built email template renderers
│   └── campaignTemplates.js  # Starter pdfme template definitions
└── getsanket.css             # All GetSanket-specific styles (scoped to .gs-root)
```

The entire app is mounted inside the portfolio at `/app/*` via `GetsanketApp`. It runs in a separate CSS scope (`.gs-root`) so it never conflicts with the portfolio's own dark-theme styles.

### Backend

```
lead-tracker/formfreedom-backend/
├── index.js / server.js      # Express app, CORS, rate limiting
├── db.js                     # PostgreSQL connection (run/get/all helpers)
├── middleware/
│   ├── auth.js               # JWT verify → req.user
│   └── planLimits.js         # checkFormLimit, checkCampaignLimit
└── routes/
    ├── auth.js               # /api/auth/*
    ├── forms.js              # /api/forms/* + /api/s/:id (public submission endpoint)
    ├── campaigns.js          # /api/campaigns/*
    ├── stats.js              # /api/stats/overview, /api/stats/scans
    ├── email.js              # /api/email/send (Resend)
    └── subscriptions.js      # /api/subscriptions/* + Razorpay webhook
```

### Request flow for a form submission

```
User's HTML form  →  POST /api/s/:formId  →  INSERT submissions  →  200 OK
                                                    ↓
                               (future: webhook + email notification)
```

### Request flow for a QR scan

```
Recipient scans QR  →  GET /api/t/:trackingId  →  INSERT campaign_scans
                                                 →  302 redirect to campaign.redirect_url
```

---

## 3. Data Model

### `users`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| name | TEXT | |
| email | TEXT UNIQUE | |
| password_hash | TEXT | bcrypt, 10 rounds |
| plan | TEXT | `'free'` or `'pro'` or `'team'` |
| company_name | TEXT | Used in email templates |
| company_website | TEXT | |
| created_at | ISO timestamp | |

### `forms`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | Also used as the public submission endpoint ID |
| user_id | UUID FK | |
| name | TEXT | |
| use_case | TEXT | Optional description |
| created_at | ISO timestamp | |
| active | INTEGER | 1 = active |

### `submissions`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| form_id | UUID FK | |
| data | TEXT | JSON-encoded form body |
| submitted_at | ISO timestamp | |

### `campaigns`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK | |
| name | TEXT | |
| description | TEXT | Optional |
| redirect_url | TEXT | Where QR scans redirect after tracking |
| template_json | TEXT | JSON-encoded pdfme template (set during design step) |
| created_at | ISO timestamp | |

### `campaign_recipients`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| campaign_id | UUID FK | |
| display_name | TEXT | Primary name fallback |
| csv_data | TEXT | Full JSON of the CSV row for that recipient |
| tracking_id | UUID | Embedded in the QR code URL |
| created_at | ISO timestamp | |

### `campaign_scans`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| campaign_id | UUID FK | |
| tracking_id | TEXT | Links back to `campaign_recipients.tracking_id` |
| scanned_at | ISO timestamp | |
| user_agent | TEXT | Optional |
| ip | TEXT | Optional |

### `subscriptions`
| Column | Type | Notes |
|---|---|---|
| id | UUID PK | |
| user_id | UUID FK | |
| razorpay_subscription_id | TEXT UNIQUE | |
| plan | TEXT | `'pro'` or `'team'` |
| status | TEXT | `'active'` or `'cancelled'` |
| current_period_end | ISO timestamp | Updated by webhook |
| created_at | ISO timestamp | |

---

## 4. Authentication & Plans

### Auth mechanism
- Email + password signup. Password hashed with bcrypt (10 rounds).
- On login/signup, a signed JWT is issued. Payload: `{ userId, email, name, plan }`. Expiry: 7 days.
- Token stored in `localStorage`. All authenticated requests include `Authorization: Bearer <token>`.
- `AuthContext` exposes `user`, `loading`, `login`, `logout`, `authFetch`, `refreshUser`, `updateProfile`.
- `authFetch` is a wrapper around `fetch` that auto-attaches the token and defaults `Content-Type: application/json`.

### Route protection
- `ProtectedRoute` — redirects to `/app/login` if no user.
- `PublicRoute` — redirects to `/app/dashboard` if already logged in.
- `authenticate` middleware on the backend validates the JWT on every protected route.

### Plans

| Feature | Free | Pro (₹799/mo) |
|---|---|---|
| Forms | 3 | Unlimited |
| Campaigns | 2 | Unlimited |
| Submissions/month | 500 | 50,000 |
| Email sends | Included | Included |
| Support | Community | Priority |

Plan enforcement happens in `middleware/planLimits.js` via `checkFormLimit` and `checkCampaignLimit` middleware. If a limit is hit, the response includes `upgrade_required: true` and the frontend opens the `UpgradeModal`.

### Subscription lifecycle
1. User clicks "Upgrade" → `UpgradeModal` opens.
2. Frontend calls `POST /api/subscriptions/create` → gets a Razorpay `subscription_id`.
3. Razorpay checkout opens in-browser.
4. On success, frontend calls `POST /api/subscriptions/verify` with payment + subscription IDs + signature.
5. Backend HMAC-verifies the signature, updates `subscriptions` table, sets `users.plan = 'pro'`, returns a new JWT with the updated plan.
6. Razorpay also fires webhook events (`subscription.activated`, `subscription.charged`, `subscription.cancelled`, etc.) to `POST /api/subscriptions/webhook`. The webhook keeps `subscriptions.status` and `users.plan` in sync independently of the frontend.

---

## 5. Feature: Forms

### What it does
Creates a unique HTTP endpoint for any HTML form. No JavaScript needed on the user's site — just set `action="<endpoint>"` and `method="POST"`. Submissions land in the dashboard instantly.

### Creating a form
1. Click **New Form** (sidebar or overview page).
2. Enter a name and optional description.
3. The backend creates a record and returns a `formId`.
4. The endpoint URL is: `https://formfreedom-backend.onrender.com/api/s/<formId>`

### Viewing submissions
The Forms page is a split panel:
- **Left** — list of forms with submission count badges.
- **Right** — selected form's detail: the endpoint URL (with one-click copy), a search bar, and the submissions table.

The submissions table shows up to the first 5 columns from the form data, with a "more" indicator for wider forms. Submissions are searchable by any field value.

### Submission endpoint (public)
`POST /api/s/:formId`
- No auth required.
- Accepts `application/x-www-form-urlencoded` or `application/json`.
- Stores the entire body as JSON in `submissions.data`.
- Returns `200 OK` with a redirect or JSON response.

### Form deletion
Deleting a form cascades to delete all its submissions. Irreversible — confirmed via browser `confirm()`.

---

## 6. Feature: Email Leads

### What it does
A cross-form inbox of all submissions. Users can select any subset of leads and send them a templated email in bulk, with a live preview before sending.

### Email Leads page
- Shows all submissions across all forms in a single searchable table (up to 2000 most recent).
- Search filters across form name and any field value.
- Rows are selectable via checkboxes. Selecting any row reveals the **Email N leads** button.

### Email compose flow
Two-step modal:

**Step 1 — Pick a template**  
Built-in templates defined in `utils/emailTemplates.js`:
- Welcome / Thank You
- Follow-up
- Reminder
- Special Offer (with offer code + deadline fields)
- Custom (free-form)

**Step 2 — Compose & Preview**  
- Left panel: shows template name, subject preview, optional custom message, and template-specific fields (offer code, deadline).
- Right panel: an `<iframe>` rendering the actual HTML email for the first selected lead's data.
- Leads without an `email` / `Email` / `EMAIL` field in their data are silently skipped (count shown in modal header).
- Clicking **Send** fires `POST /api/email/send` sequentially for each lead. Progress counter updates in real time.

### Email sending
Backend uses Resend (`resend` npm package). Sender address: `GetSanket <vivek@wbzard.com>`. Each email is personalised by rendering the template with the lead's data merged in as variables (name, email, custom_message, offer_code, deadline, company_name, sender_name).

---

## 7. Feature: QR Campaigns

This is the most complex feature. It combines a multi-step wizard to create campaigns, an in-browser PDF designer (pdfme), CSV-driven personalisation, and live scan tracking.

### Core concept
Each campaign produces N personalised PDFs — one per row in a CSV. Every PDF contains a unique QR code. When a recipient scans their QR, the scan is logged and they are redirected to a configured URL. The dashboard shows who has and hasn't scanned.

### Campaign lifecycle

```
Draft → [wizard] → Active (frozen)
```

Once a campaign has recipients (i.e., PDFs have been generated and distributed), it is **frozen**. No re-generation, no template editing. If a new run is needed, create a new campaign. This prevents accidental history wipe.

### Creation wizard (4 steps)

#### Step 0 — Setup
Name the campaign and optionally set a redirect URL (where the QR code sends people after logging the scan). Both are stored on the campaign record.

#### Step 1 — Template Gallery
Choose a starter template or start blank. Starter templates are defined in `utils/campaignTemplates.js` with categories: Events, Marketing, Education, Real Estate. Each is a valid pdfme template object.

#### Step 2 — Designer
An in-browser PDF designer powered by `@pdfme/ui`. The toolbar exposes:

| Button | Action |
|---|---|
| Add Page | Appends a blank page to the template schema |
| Base PDF | Upload a PDF file to use as background (stored as base64 data URL) |
| Templates | Open the starter template picker modal to replace current design |
| Import | Load a previously exported `.json` template file |
| Export | Download the current design as `<campaign-name>.json` |

The designer canvas supports all pdfme schema types: Text, Multi-Variable Text, Table, Line, Rectangle, Ellipse, Image, SVG, QR code, EAN-13, Code 128, DateTime, Date, Time, Select, Checkbox, Radio Group.

**QR field tip:** Any field of type `qrcode` / `qr` is automatically filled at generate time with each recipient's unique tracking URL. The designer shows a hint about this.

Template is passed to the Generate step as a JavaScript object (not saved to the backend until the campaign is frozen, unless the user is editing an existing unfrozen campaign via the DesignTab).

#### Step 3 — Generate
1. **Upload CSV** — drag-and-drop or click. The CSV is parsed client-side via `utils/csv.js` into an array of objects (column headers become keys).
2. **Preview table** — first 5 rows shown so the user can confirm column mapping.
3. **QR status indicator** — green if a QR field is detected, amber warning if not.
4. **Generate button** — triggers the full pipeline:
   a. `POST /api/campaigns` — creates campaign record.
   b. `POST /api/campaigns/:id/recipients` — saves all recipients with their CSV data and assigns each a UUID `tracking_id`.
   c. PDF generation runs entirely in-browser via `@pdfme/generator`. Each recipient's row is merged into the template inputs. The QR field is set to `<apiBase>/api/t/<tracking_id>`.
   d. All PDFs are bundled into a single PDF and offered as a download.
5. After generation, the wizard auto-navigates to the campaign detail page (scans view).

### Campaign detail (post-generation)

#### Frozen state
A campaign is frozen when `recipient_count > 0`. In this state:
- An **Active** green badge appears in the header.
- Generate and Edit Template buttons are hidden.
- The view is locked to Scans.
- The backend enforces this: `POST /api/campaigns/:id/recipients` returns 409 if recipients already exist. `PUT /api/campaigns/:id` returns 409 if `template_json` is in the payload and recipients exist.

#### Scans view (default)
The scans dashboard shows the full recipient list with scan tracking:

**Stats bar:**
- Recipients (total)
- Scanned (unique recipients with ≥1 scan)
- Not Yet (0 scans)
- Total Scans (all-time count, including repeat scans)
- Scan Rate progress bar

**Filter pills:** All · Scanned · Not yet

**Sort controls:** Scans (desc) · Name (asc) · Last Scan (desc)

**Table columns:**
- Name — resolved from CSV data using field priority: `name`, `Name`, `full_name`, `Full_Name`, `fullname`, `first_name`, `First_Name`, `email`, `Email`, then falls back to `display_name`.
- All CSV fields not used for the name column, capped at 6 extra columns to keep the table readable.
- Scans badge (green if >0, grey if 0).
- Last Scanned timestamp.

#### Unfrozen campaigns (no recipients yet)
- **Generate** button opens the GenerateTab in-panel.
- **Edit Template** button opens the DesignTab (pdfme designer with Save button). Saving calls `PUT /api/campaigns/:id` with `template_json`.

### Scan Analytics panel
Accessible via the bar-chart icon in the campaigns list header. Shows:
- Total scans all-time
- Campaigns with any scans
- Scans in selected period (7d / 30d / 90d)
- Area chart of daily scan volume
- Per-campaign table: recipients, scans, scan rate bar, last scanned date

### QR tracking endpoint (public)
`GET /api/t/:trackingId`
- No auth required.
- Looks up the `campaign_recipients` row by `tracking_id`.
- Inserts a `campaign_scans` record.
- Redirects to `campaigns.redirect_url` (or a fallback page if none set).

---

## 8. Feature: Overview Dashboard

The landing page after login. Combines all data sources into a single-page summary.

### KPI cards
Four stat cards with period comparison (7d / 30d / 90d toggle):
- **Leads [period]** — form submissions in the selected window, with delta badge vs prior period.
- **Total Forms** — count of all forms created.
- **QR Campaigns** — count of all campaigns.
- **Scans [period]** — QR scans in the selected window, with delta badge.

Delta badges show percentage change (green TrendingUp / red TrendingDown). If the previous period was zero and now is positive, shows "New" in green.

### Submissions chart
Area chart of daily form submission volume for the selected period. Fills zeros for days with no submissions so the chart always spans the full window.

### Top Forms
A ranked list of the user's forms by submission count, with a link to the Forms page.

### Recent Activity
The 10 most recent submissions across all forms. Each row shows a "preview" — the first meaningful value found in the submission data (tries name, email, phone, then first field).

### Guided Tour
A first-run overlay tour (`GuidedTour` component) walks new users through the key sections. Triggered automatically on first login (based on localStorage) or manually via the "Tour" button.

---

## 9. Feature: Settings

### Profile
Editable fields: Full name, Company name (injected into email templates as `company_name`), Company website. Saved via `PATCH /api/auth/profile`.

### Billing & Plan
- Free users see their limits and an Upgrade CTA.
- Pro/Team users see their plan name, next billing date (from `subscription.current_period_end`), and a Cancel subscription button.
- Cancellation calls `POST /api/subscriptions/cancel` which cancels the Razorpay subscription and downgrades the user to free immediately.

### Coming soon
- Email notifications (on new form submissions)
- Webhooks & Integrations (POST to external URL on submission)
- Security / password change

---

## 10. API Reference

All authenticated endpoints require `Authorization: Bearer <token>`.

### Auth

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/auth/signup` | No | Create account. Body: `{ name, email, password }` |
| POST | `/api/auth/login` | No | Login. Body: `{ email, password }` |
| GET | `/api/auth/me` | Yes | Get current user profile |
| PATCH | `/api/auth/profile` | Yes | Update name, company_name, company_website |

### Forms

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/forms` | Yes | List all forms with submission counts |
| POST | `/api/forms` | Yes | Create form. Body: `{ name, useCase? }` |
| DELETE | `/api/forms/:id` | Yes | Delete form and all submissions |
| GET | `/api/forms/submissions` | Yes | All submissions across all forms (latest 2000) |
| GET | `/api/forms/:id/submissions` | Yes | Submissions for a specific form |
| POST | `/api/s/:formId` | No | Public submission endpoint (form action target) |

### Campaigns

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/campaigns` | Yes | List all campaigns with recipient + scan counts |
| POST | `/api/campaigns` | Yes | Create campaign. Body: `{ name, description?, redirect_url? }` |
| GET | `/api/campaigns/:id` | Yes | Get single campaign |
| PUT | `/api/campaigns/:id` | Yes | Update fields. Blocks `template_json` if frozen (409) |
| DELETE | `/api/campaigns/:id` | Yes | Delete campaign, recipients, scans |
| POST | `/api/campaigns/:id/recipients` | Yes | Save recipients. Returns 409 if campaign is frozen |
| GET | `/api/campaigns/:id/recipients` | Yes | List recipients with scan counts and last scan |

**409 freeze response body:**
```json
{
  "success": false,
  "frozen": true,
  "message": "Campaign is frozen — it already has recipients. Create a new campaign to generate again."
}
```

### Stats

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/stats/overview?days=30` | Yes | KPIs, chart, recent activity (max 90 days) |
| GET | `/api/stats/scans?days=30` | Yes | Scan KPIs, daily chart, per-campaign breakdown |

### Email

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/email/send` | Yes | Send one email via Resend. Body: `{ to, toName?, subject, html }` |

### Subscriptions

| Method | Path | Auth | Description |
|---|---|---|---|
| POST | `/api/subscriptions/create` | Yes | Create Razorpay subscription. Body: `{ plan }` |
| POST | `/api/subscriptions/verify` | Yes | Verify payment and activate plan |
| GET | `/api/subscriptions/status` | Yes | Current plan and subscription record |
| POST | `/api/subscriptions/cancel` | Yes | Cancel active subscription |
| POST | `/api/subscriptions/webhook` | No | Razorpay webhook receiver (raw body) |

### QR tracking

| Method | Path | Auth | Description |
|---|---|---|---|
| GET | `/api/t/:trackingId` | No | Log scan + redirect to campaign URL |

---

## 11. Frontend Structure

### Routing

```
/app                  → LandingPage (marketing)
/app/login            → Login (public only)
/app/signup           → Signup (public only)
/app/dashboard        → Dashboard (protected)
/app/dashboard/*      → Dashboard (catches sub-paths)
/app/*                → Redirect to /app
```

`Dashboard.jsx` handles all internal navigation via a `view` state string — it is a single-page app within a single route, not multiple routes. Views: `overview`, `forms`, `leads`, `campaigns`, `settings`.

### CampaignsPage internals

`CampaignsPage` manages:
- Top-level `view`: `'list'` (split panel) or `'wizard'`
- Within the split panel, a `selected` campaign drives the right pane

`CampaignDetail` manages:
- `mode`: `'scans'` | `'edit'` | `'generate'` (only `'scans'` is accessible when frozen)
- `local` campaign state (updated optimistically on edits)
- `isFrozen` derived from `Number(local.recipient_count || 0) > 0`

### AuthContext

Key exports:
- `user` — decoded JWT payload (userId, email, name, plan)
- `loading` — true while checking localStorage for existing token
- `authFetch(path, options)` — fetch wrapper, prepends API base URL, adds Authorization header, sets JSON content type
- `login(token, user)` — stores token, sets user state
- `logout()` — clears token, resets user
- `refreshUser()` — re-fetches `/api/auth/me` and updates user state
- `updateProfile(name, company_name, company_website)` — calls PATCH profile, refreshes user

API base URL logic: in dev, uses `window.location.origin` (proxied by Vite). In production, hardcoded to `https://formfreedom-backend.onrender.com`.

### PDF generation (client-side)

All PDF work happens in the browser — the backend never touches a PDF file.

Libraries used:
- `@pdfme/ui` — the `Designer` class for the in-browser design canvas
- `@pdfme/generator` — the `generate` function that produces the final PDF buffer
- `@pdfme/common` — `getDefaultFont`, `getInputFromTemplate`, `checkTemplate`
- `@pdfme/schemas` — all field type plugins (text, image, barcode, table, shapes, datetime, etc.)

Plugins are lazily loaded and cached in a module-level `_plugins` variable to avoid re-importing on every wizard session.

`basePdf` in a template can be:
- `{ width: 210, height: 297, padding: [20, 10, 20, 10] }` — blank A4 (default)
- A base64 data URL of a PDF file (when user uploads a background PDF)

---

## 12. Design System

All styles live in `getsanket.css`, scoped to `.gs-root`.

### Typography
- `Anton` (display/headings) — used for large numeric values, plan names, counters
- `Satoshi` (UI) — labels, buttons, table data, most interface text

### CSS Custom Properties

```css
--bg          /* page background */
--bg-subtle   /* slightly elevated surface */
--surface     /* cards, sidebars, modals */
--border      /* primary border */
--border-2    /* subtler dividers within tables */
--ink         /* primary text */
--muted       /* secondary/label text */
--accent      /* #2563EB — blue */
--accent-tint /* light blue background for accents */
--success     /* green */
--danger      /* red */
--warning     /* amber */
--r-sm / --r-md / --r-lg / --r-xl / --r-pill  /* border radius scale */
--shadow-xs / --shadow-md / --shadow-lg         /* shadow scale */
```

### Key utility classes
- `.btn-primary` — filled blue button with icon support
- `.btn-ghost` — outlined/transparent button
- `.btn-danger` — red destructive button
- `.icon-btn` — square icon-only button
- `.input-field` — styled text input
- `.field-label` — uppercase label
- `.modal-overlay` / `.modal` — centered modal with backdrop
- `.sidebar` / `.sidebar-item` / `.sidebar-item.active` — left navigation
- `.form-list` / `.form-list-item` / `.form-list-item.active` — list panel
- `.stat-card` — KPI card with icon, value, label slots
- `.empty-state` — centered placeholder with icon + text
- `.page-layout` — flex row: list panel + detail panel
- `.gen-bar-wrap` / `.gen-bar-fill` — PDF generation progress bar
- `.gen-counter` — large Anton-font number during generation

---

## 13. Plan Limits & Upgrade Flow

### Enforcement (backend)

`checkFormLimit` middleware:
- Free: max 3 forms
- Pro/Team: unlimited

`checkCampaignLimit` middleware:
- Free: max 2 campaigns
- Pro/Team: unlimited

On limit hit, the route returns:
```json
{ "success": false, "upgrade_required": true, "message": "..." }
```

### Upgrade flow (frontend)
1. Any action that returns `upgrade_required: true` opens `UpgradeModal`.
2. `UpgradeModal` calls `POST /api/subscriptions/create` to get a Razorpay `subscription_id`.
3. The Razorpay checkout script is dynamically loaded and opened.
4. On `payment.success`, calls `POST /api/subscriptions/verify`.
5. On success, stores the new token (which now carries `plan: 'pro'`) in localStorage and refreshes the React user state.

Free users also see a persistent upgrade nudge in the sidebar footer.

---

## 14. Key Design Decisions

### Campaign freeze (immutability after generation)
Once a campaign has recipients, it cannot be re-generated or have its template changed. The backend enforces this with a 409 response on `POST /api/campaigns/:id/recipients` and `PUT /api/campaigns/:id` (if `template_json` is in the body). The reason: re-generation would require deleting all recipients and their scan history, wiping the entire campaign's tracking data. Instead, users create a new campaign for a new run.

### Client-side PDF generation
PDF generation happens entirely in the browser using `@pdfme/generator`. This means:
- No PDF data is ever uploaded to the backend.
- Generation scales with the user's device (not server resources).
- Large batches (thousands of pages) run as long as the browser tab stays open.
- The backend only stores a JSON template (not the rendered PDFs).

### CSV data stored per recipient
The entire CSV row is stored as a JSON string in `campaign_recipients.csv_data`. This enables the Scans dashboard to display all the recipient's personalised data alongside their scan count — not just a name. The name shown in the UI is resolved from the CSV data at render time using a field-name priority list.

### No backend email storage for campaigns
Campaign emails are sent directly from the frontend through the `/api/email/send` endpoint without any batching or queue. Each lead gets one call. This is intentional simplicity — no bounce handling, no retry logic, no unsubscribe management at this stage.

### Wizard auto-navigation
After the generation wizard completes, the UI automatically transitions to the new campaign's detail page (scans view). This eliminates the "where did my campaign go?" confusion that came from the user having to manually find it in the list.

### pdfme Designer toolbar
The pdfme `Designer` component has a built-in toolbar, but it does not expose base PDF upload or template JSON import/export. A custom `DesignerToolbar` component sits above the designer DOM node and calls `designer.getTemplate()` / `designer.updateTemplate()` directly. This is used in both the wizard (step 2) and the campaign detail edit mode.

---

## 15. Roadmap / Known Gaps

### Coming soon (placeholder in Settings)
- **Email notifications** — Notify the user's own email when a new form submission arrives.
- **Webhooks & Integrations** — Fire a POST to a user-configured URL on each new submission. Enables Zapier / Make integration.
- **Security / Password change** — Currently users cannot change their password without contacting support.

### Current known limitations
- **Submission volume** — The `GET /api/forms/submissions` all-leads endpoint is capped at 2000 rows. Pagination not yet implemented.
- **Campaign recipients cap** — No hard cap, but very large CSVs (10,000+ rows) may cause browser memory pressure during generation. In-browser batching is not implemented.
- **No bulk email queue** — Emails are sent one at a time in a sequential for-loop. Sending to 500 leads will block the browser tab for the duration.
- **No duplicate submission protection** — The public form endpoint has no deduplication or spam protection beyond basic rate limiting at the server level.
- **Scan geo/device data** — `campaign_scans` has `user_agent` and `ip` columns but they are not surfaced in the UI yet.
- **No CSV export** — There is no way to export submissions or scan data as CSV from the dashboard.
- **Single PDF bundle** — Generated PDFs are packed into a single multi-page PDF bundle. There is no option to download individual PDFs per recipient.
- **Team plan** — Defined in the pricing constants and Razorpay config but the feature (multi-user access, shared workspace) is not implemented.

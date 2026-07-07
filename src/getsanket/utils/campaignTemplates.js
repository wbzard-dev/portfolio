// Starter templates for QR campaigns.
// All coordinates in mm. basePdf uses blank page dimensions (no background PDF required).
// Each template has a qr_tracking field (type: qrcode) — it gets auto-filled at generation time.

const BLANK = (width, height) => ({ width, height, padding: [0, 0, 0, 0] })

// ── shared helpers ────────────────────────────────────────────────────────────

const text = (name, content, x, y, w, h, opts = {}) => ({
    type: 'text',
    name,
    content,
    position: { x, y },
    width: w,
    height: h,
    fontSize: opts.fontSize ?? 12,
    fontColor: opts.fontColor ?? '#1a1a1a',
    backgroundColor: opts.backgroundColor ?? '',
    alignment: opts.alignment ?? 'left',
    verticalAlignment: opts.verticalAlignment ?? 'top',
    lineHeight: opts.lineHeight ?? 1.3,
    characterSpacing: opts.characterSpacing ?? 0,
    ...(opts.readOnly ? { readOnly: true } : {}),
})

const rect = (name, x, y, w, h, opts = {}) => ({
    type: 'rectangle',
    name,
    position: { x, y },
    width: w,
    height: h,
    color: opts.color ?? '',
    borderColor: opts.borderColor ?? '',
    borderWidth: opts.borderWidth ?? 0,
    ...(opts.radius ? { radius: opts.radius } : {}),
    ...(opts.readOnly !== false ? { readOnly: true } : {}),
})

const qr = (name, x, y, size) => ({
    type: 'qrcode',
    name,
    content: 'https://example.com/scan',
    position: { x, y },
    width: size,
    height: size,
})


// ── Template 1: Event Badge (A6 portrait 105×148mm) ───────────────────────────

export const eventBadge = {
    label: 'Event Badge',
    description: 'Name badge for events & conferences',
    icon: '🎟️',
    category: 'Events',
    template: {
        basePdf: BLANK(105, 148),
        schemas: [[
            rect('header_bg', 0, 0, 105, 42, { color: '#0f172a' }),
            rect('accent_strip', 0, 38, 105, 4, { color: '#6366f1' }),

            text('event_name', 'ANNUAL SUMMIT 2025', 5, 10, 95, 14, {
                fontSize: 13, fontColor: '#ffffff', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 1, lineHeight: 1.2, readOnly: false,
            }),
            text('badge_type_label', 'ATTENDEE', 5, 27, 95, 8, {
                fontSize: 7, fontColor: '#818cf8', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 3, readOnly: true,
            }),

            text('attendee_name', 'Jane Smith', 5, 54, 95, 20, {
                fontSize: 22, fontColor: '#0f172a', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1.1,
            }),
            text('role', 'Product Manager', 5, 76, 95, 10, {
                fontSize: 11, fontColor: '#475569', alignment: 'center',
                verticalAlignment: 'middle',
            }),
            text('organization', 'Acme Corp', 5, 88, 95, 8, {
                fontSize: 9, fontColor: '#94a3b8', alignment: 'center',
                verticalAlignment: 'middle',
            }),

            rect('qr_bg', 30, 99, 45, 45, { color: '#f8fafc', borderColor: '#e2e8f0', borderWidth: 0.3, radius: 2 }),
            qr('qr_tracking', 35, 102, 35),

            text('scan_hint', 'Scan to verify', 5, 139, 95, 7, {
                fontSize: 7, fontColor: '#cbd5e1', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),
        ]],
    },
}

// ── Template 2: Certificate of Participation (A4 210×297mm) ──────────────────

export const certificate = {
    label: 'Certificate',
    description: 'Certificate of participation or achievement',
    icon: '🎓',
    category: 'Education',
    template: {
        basePdf: BLANK(210, 297),
        schemas: [[
            rect('outer_border', 8, 8, 194, 281, { borderColor: '#d4a83a', borderWidth: 0.8 }),
            rect('inner_border', 12, 12, 186, 273, { borderColor: '#d4a83a', borderWidth: 0.3 }),
            rect('top_accent', 18, 20, 174, 1.5, { color: '#d4a83a' }),

            text('cert_title', 'CERTIFICATE OF PARTICIPATION', 18, 30, 174, 16, {
                fontSize: 16, fontColor: '#1a1a1a', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 2, readOnly: true,
            }),
            text('cert_subtitle', 'This is to certify that', 18, 54, 174, 10, {
                fontSize: 11, fontColor: '#64748b', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),

            text('recipient_name', 'John Smith', 18, 68, 174, 28, {
                fontSize: 30, fontColor: '#0f172a', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1.1,
            }),

            rect('name_underline', 35, 98, 140, 0.5, { color: '#d4a83a' }),

            text('participated_label', 'has successfully participated in', 18, 104, 174, 10, {
                fontSize: 11, fontColor: '#64748b', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),
            text('event_title', 'Annual Technology Summit 2025', 18, 118, 174, 18, {
                fontSize: 18, fontColor: '#1e3a5f', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1.2,
            }),
            text('event_date', 'July 15–17, 2025', 18, 140, 174, 10, {
                fontSize: 10, fontColor: '#94a3b8', alignment: 'center',
                verticalAlignment: 'middle',
            }),

            rect('bottom_accent', 18, 260, 174, 1.5, { color: '#d4a83a' }),

            text('organizer_label', 'Organizer', 25, 265, 80, 8, {
                fontSize: 8, fontColor: '#94a3b8', alignment: 'center', readOnly: true,
            }),
            text('organizer_name', 'Acme Events Ltd.', 25, 273, 80, 9, {
                fontSize: 10, fontColor: '#1a1a1a', alignment: 'center',
            }),

            qr('qr_tracking', 140, 255, 32),
            text('verify_label', 'Scan to verify', 140, 288, 32, 6, {
                fontSize: 6, fontColor: '#94a3b8', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),
        ]],
    },
}

// ── Template 3: Promotional Voucher (A5 landscape 210×148mm) ─────────────────

export const promoVoucher = {
    label: 'Promo Voucher',
    description: 'Discount voucher or gift card with QR',
    icon: '🎁',
    category: 'Marketing',
    template: {
        basePdf: BLANK(210, 148),
        schemas: [[
            rect('left_panel', 0, 0, 72, 148, { color: '#7c3aed' }),
            rect('left_panel_accent', 0, 0, 6, 148, { color: '#5b21b6' }),

            text('offer_label', 'EXCLUSIVE\nOFFER', 6, 28, 60, 36, {
                fontSize: 20, fontColor: '#ffffff', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1.2, readOnly: true,
            }),
            text('discount_value', '20% OFF', 8, 78, 58, 22, {
                fontSize: 22, fontColor: '#e9d5ff', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1, characterSpacing: 0,
            }),
            text('voucher_label', 'YOUR PURCHASE', 6, 100, 60, 8, {
                fontSize: 7, fontColor: '#c4b5fd', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 1, readOnly: true,
            }),

            text('brand_name', 'GetSanket', 82, 12, 120, 10, {
                fontSize: 10, fontColor: '#7c3aed', alignment: 'left',
                verticalAlignment: 'middle', characterSpacing: 0, readOnly: true,
            }),
            rect('brand_divider', 82, 24, 120, 0.4, { color: '#e2e8f0' }),

            text('recipient_label', 'For:', 82, 30, 30, 7, {
                fontSize: 7, fontColor: '#94a3b8', alignment: 'left',
                verticalAlignment: 'middle', readOnly: true,
            }),
            text('recipient_name', 'Sarah Johnson', 82, 38, 120, 14, {
                fontSize: 16, fontColor: '#0f172a', alignment: 'left',
                verticalAlignment: 'middle',
            }),

            text('validity_label', 'Valid until:', 82, 56, 40, 7, {
                fontSize: 7, fontColor: '#94a3b8', alignment: 'left',
                verticalAlignment: 'middle', readOnly: true,
            }),
            text('valid_until', 'December 31, 2025', 82, 64, 120, 9, {
                fontSize: 9, fontColor: '#475569', alignment: 'left',
                verticalAlignment: 'middle',
            }),

            text('code_label', 'Voucher Code:', 82, 78, 50, 7, {
                fontSize: 7, fontColor: '#94a3b8', alignment: 'left',
                verticalAlignment: 'middle', readOnly: true,
            }),
            rect('code_bg', 82, 86, 70, 12, { color: '#f5f3ff', borderColor: '#ddd6fe', borderWidth: 0.4, radius: 1 }),
            text('voucher_code', 'SAVE20-2025', 82, 86, 70, 12, {
                fontSize: 11, fontColor: '#5b21b6', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 2,
            }),

            qr('qr_tracking', 166, 90, 38),
            text('scan_to_redeem', 'Scan to redeem', 166, 128, 38, 7, {
                fontSize: 6, fontColor: '#94a3b8', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),

            text('terms', '* Valid on a single transaction. Cannot be combined with other offers.', 82, 138, 120, 7, {
                fontSize: 6, fontColor: '#cbd5e1', alignment: 'left',
                verticalAlignment: 'middle', readOnly: true,
            }),
        ]],
    },
}

// ── Template 4: Conference Pass (90×55mm — business card) ────────────────────

export const conferencePass = {
    label: 'Conference Pass',
    description: 'Compact pass for exhibitions & meetups',
    icon: '🪪',
    category: 'Events',
    template: {
        basePdf: BLANK(90, 55),
        schemas: [[
            rect('left_bar', 0, 0, 14, 55, { color: '#0ea5e9' }),
            rect('left_bar_accent', 0, 0, 3, 55, { color: '#0284c7' }),

            text('pass_label', 'P\nA\nS\nS', 3, 10, 8, 35, {
                fontSize: 6, fontColor: '#ffffff', alignment: 'center',
                verticalAlignment: 'top', lineHeight: 1.6, characterSpacing: 0, readOnly: true,
            }),

            text('event_abbr', 'SUMMIT 25', 18, 5, 55, 8, {
                fontSize: 7, fontColor: '#0ea5e9', alignment: 'left',
                verticalAlignment: 'middle', characterSpacing: 1, readOnly: false,
            }),
            rect('event_divider', 18, 14, 55, 0.3, { color: '#e2e8f0' }),

            text('attendee_name', 'Alex Johnson', 18, 17, 55, 14, {
                fontSize: 14, fontColor: '#0f172a', alignment: 'left',
                verticalAlignment: 'middle', lineHeight: 1.1,
            }),
            text('job_title', 'Lead Developer', 18, 33, 55, 8, {
                fontSize: 8, fontColor: '#64748b', alignment: 'left',
                verticalAlignment: 'middle',
            }),
            text('company', 'Tech Solutions Inc.', 18, 42, 55, 7, {
                fontSize: 7, fontColor: '#94a3b8', alignment: 'left',
                verticalAlignment: 'middle',
            }),

            qr('qr_tracking', 77, 5, 10),
        ]],
    },
}

// ── Template 5: Workshop / Webinar Ticket (A5 portrait 148×210mm) ────────────

export const workshopTicket = {
    label: 'Workshop Ticket',
    description: 'Ticket stub for workshops or webinars',
    icon: '🎫',
    category: 'Education',
    template: {
        basePdf: BLANK(148, 210),
        schemas: [[
            rect('ticket_header', 0, 0, 148, 60, { color: '#064e3b' }),
            rect('header_accent', 0, 56, 148, 4, { color: '#10b981' }),

            text('ticket_type', 'WORKSHOP TICKET', 10, 14, 128, 9, {
                fontSize: 7, fontColor: '#6ee7b7', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 2, readOnly: true,
            }),
            text('workshop_title', 'Advanced UI Design\nMasterclass', 10, 26, 128, 26, {
                fontSize: 17, fontColor: '#ffffff', alignment: 'center',
                verticalAlignment: 'middle', lineHeight: 1.3,
            }),

            rect('separator', 10, 66, 128, 0.3, { color: '#d1d5db' }),

            text('attendee_label', 'ATTENDEE', 10, 72, 128, 6, {
                fontSize: 6, fontColor: '#9ca3af', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 2, readOnly: true,
            }),
            text('attendee_name', 'Maria Garcia', 10, 80, 128, 18, {
                fontSize: 20, fontColor: '#111827', alignment: 'center',
                verticalAlignment: 'middle',
            }),

            rect('details_bg', 10, 104, 128, 38, { color: '#f9fafb', borderColor: '#e5e7eb', borderWidth: 0.3, radius: 2 }),

            text('date_label', 'DATE', 18, 110, 50, 6, {
                fontSize: 6, fontColor: '#9ca3af', characterSpacing: 1, readOnly: true,
            }),
            text('event_date', 'August 20, 2025', 18, 117, 50, 9, {
                fontSize: 9, fontColor: '#111827',
            }),
            text('time_label', 'TIME', 80, 110, 50, 6, {
                fontSize: 6, fontColor: '#9ca3af', characterSpacing: 1, readOnly: true,
            }),
            text('event_time', '10:00 AM – 5:00 PM', 80, 117, 58, 9, {
                fontSize: 9, fontColor: '#111827',
            }),
            text('venue_label', 'VENUE', 18, 128, 50, 6, {
                fontSize: 6, fontColor: '#9ca3af', characterSpacing: 1, readOnly: true,
            }),
            text('venue', 'Online – Zoom', 18, 135, 110, 8, {
                fontSize: 9, fontColor: '#111827',
            }),

            rect('qr_area_bg', 10, 152, 128, 48, { color: '#ffffff', borderColor: '#e5e7eb', borderWidth: 0.3, radius: 2 }),
            qr('qr_tracking', 54, 155, 38),
            text('ticket_id_label', 'Scan at check-in', 10, 196, 128, 6, {
                fontSize: 6, fontColor: '#9ca3af', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),

            rect('bottom_accent', 0, 204, 148, 6, { color: '#064e3b' }),
            text('organizer', 'Powered by GetSanket', 10, 205, 128, 5, {
                fontSize: 6, fontColor: '#6ee7b7', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),
        ]],
    },
}

// ── Template 6: Real Estate Property Card (A5 portrait 148×210mm) ─────────────

export const realEstateCard = {
    label: 'Real Estate Card',
    description: 'Property listing card with QR virtual tour',
    icon: '🏡',
    category: 'Real Estate',
    template: {
        basePdf: BLANK(148, 210),
        schemas: [[
            // ── Header
            rect('header', 0, 0, 148, 18, { color: '#1e293b' }),
            text('for_sale', 'PROPERTY FOR SALE', 8, 6, 132, 8, {
                fontSize: 7, fontColor: '#c9a84c', alignment: 'center',
                verticalAlignment: 'middle', characterSpacing: 2.5, readOnly: true,
            }),

            // ── Image area (simulated)
            rect('image_bg', 0, 18, 148, 58, { color: '#dde3ee' }),
            rect('image_inner', 4, 22, 140, 50, { color: '#c8d0e0' }),

            // ── Price overlay band
            rect('price_band', 0, 56, 148, 20, { color: '#0f172a' }),
            text('property_price', '1,25,00,000', 8, 59, 132, 14, {
                fontSize: 16, fontColor: '#c9a84c', alignment: 'center',
                verticalAlignment: 'middle',
            }),

            // ── Property name
            text('property_title', '3 BHK Premium Apartment', 8, 82, 132, 14, {
                fontSize: 13, fontColor: '#0f172a', alignment: 'left',
                verticalAlignment: 'middle', lineHeight: 1.2,
            }),

            // ── Specs row
            rect('specs_bg', 8, 98, 132, 16, { color: '#f8fafc', borderColor: '#cbd5e1', borderWidth: 0.4, radius: 2 }),
            text('spec_beds', '3 Beds', 12, 98, 28, 16, { fontSize: 8, fontColor: '#334155', alignment: 'center', verticalAlignment: 'middle' }),
            rect('spec_div1', 40, 101, 0.5, 10, { color: '#cbd5e1' }),
            text('spec_baths', '2 Baths', 43, 98, 28, 16, { fontSize: 8, fontColor: '#334155', alignment: 'center', verticalAlignment: 'middle' }),
            rect('spec_div2', 72, 101, 0.5, 10, { color: '#cbd5e1' }),
            text('spec_area', '1850 sqft', 75, 98, 30, 16, { fontSize: 8, fontColor: '#334155', alignment: 'center', verticalAlignment: 'middle' }),
            rect('spec_div3', 106, 101, 0.5, 10, { color: '#cbd5e1' }),
            text('spec_parking', '1 Park', 108, 98, 26, 16, { fontSize: 8, fontColor: '#334155', alignment: 'center', verticalAlignment: 'middle' }),

            // ── Location
            text('location_label', 'LOCATION', 8, 118, 132, 6, {
                fontSize: 6, fontColor: '#94a3b8', characterSpacing: 1, readOnly: true,
            }),
            text('property_location', 'Whitefield, Bengaluru 560066', 8, 125, 132, 9, {
                fontSize: 9, fontColor: '#475569',
            }),

            // ── Divider
            rect('hr', 8, 138, 132, 0.4, { color: '#e2e8f0' }),

            // ── Agent + QR
            text('agent_label', 'CONTACT AGENT', 8, 143, 80, 6, {
                fontSize: 6, fontColor: '#94a3b8', characterSpacing: 1, readOnly: true,
            }),
            text('agent_name', 'Rajesh Kumar', 8, 150, 80, 10, {
                fontSize: 10, fontColor: '#0f172a',
            }),
            text('agent_phone', '+91 98765 43210', 8, 162, 80, 8, {
                fontSize: 8, fontColor: '#64748b',
            }),
            text('agent_email', 'rajesh@property.com', 8, 171, 80, 8, {
                fontSize: 8, fontColor: '#2563eb',
            }),

            rect('qr_bg', 100, 140, 40, 40, { color: '#f8fafc', borderColor: '#e2e8f0', borderWidth: 0.4, radius: 2 }),
            qr('qr_tracking', 103, 143, 34),
            text('scan_hint', 'Scan — Virtual Tour', 100, 182, 40, 7, {
                fontSize: 5.5, fontColor: '#94a3b8', alignment: 'center', readOnly: true,
            }),

            // ── Footer
            rect('footer', 0, 194, 148, 16, { color: '#1e293b' }),
            text('brand_footer', 'GetSanket · getsanket.com', 8, 199, 132, 6, {
                fontSize: 6, fontColor: '#94a3b8', alignment: 'center',
                verticalAlignment: 'middle', readOnly: true,
            }),
        ]],
    },
}


export const STARTER_TEMPLATES = [
    eventBadge,
    certificate,
    promoVoucher,
    conferencePass,
    workshopTicket,
    realEstateCard,
]

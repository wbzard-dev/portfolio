// HTML email templates for lead retargeting.
// Each template exports: id, label, description, icon, color,
//   subject(vars) → string, render(vars) → HTML string.
// Variables are substituted from submission data + {form_name, custom_message}.

const sub = (str, vars) =>
    str.replace(/\{\{(\w+)\}\}/g, (_, k) => vars[k] ?? vars[k.toLowerCase()] ?? '')

const wrap = (content, accentBg = '#2563EB') => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>GetSanket</title>
</head>
<body style="margin:0;padding:0;background:#F2F1EE;font-family:-apple-system,'Segoe UI',Helvetica,Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#F2F1EE;padding:40px 20px;">
    <tr><td align="center">
      <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;">

        <!-- Logo bar -->
        <tr>
          <td style="background:${accentBg};padding:20px 32px;border-radius:12px 12px 0 0;">
            <span style="font-size:18px;font-weight:800;color:#fff;letter-spacing:-0.02em;">GetSanket</span>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#ffffff;padding:36px 32px;">
            ${content}
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#F9F9F7;padding:18px 32px;border-radius:0 0 12px 12px;border-top:1px solid #E5E4E0;">
            <p style="margin:0;font-size:12px;color:#9CA3AF;text-align:center;line-height:1.6;">
              Sent via <strong>GetSanket</strong> · You're receiving this because you submitted a form.
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>`

const h2Style = 'margin:0 0 12px;font-size:22px;font-weight:700;color:#0D0D0D;letter-spacing:-0.02em;line-height:1.2;'
const pStyle = 'margin:0 0 16px;font-size:15px;color:#4B5563;line-height:1.7;'
const ctaStyle = 'display:inline-block;background:#2563EB;color:#ffffff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;font-size:15px;letter-spacing:-0.01em;'
const dividerStyle = 'border:none;border-top:1px solid #E5E4E0;margin:24px 0;'


// ── 1. Follow Up ──────────────────────────────────────────────────────────────

export const followUp = {
    id: 'follow-up',
    label: 'Follow Up',
    description: "Re-engage leads who haven't heard back",
    icon: '↩️',
    color: '#2563EB',
    subject: (vars) => `Following up on ${vars.form_name || 'your inquiry'}, ${vars.name || 'there'}`,
    render: (vars) => wrap(`
        <h2 style="${h2Style}">Hey ${vars.name || 'there'}, just following up 👋</h2>
        <p style="${pStyle}">
          We noticed you submitted <strong>${vars.form_name || 'a form'}</strong> and we wanted to make sure
          we got a chance to connect. We'd love to help you out.
        </p>
        ${vars.custom_message ? `<p style="${pStyle}">${vars.custom_message}</p>` : ''}
        <p style="${pStyle}">
          Do you have a few minutes for a quick chat? We're here whenever you're ready.
        </p>
        <hr style="${dividerStyle}">
        <p style="margin:0;font-size:13px;color:#9CA3AF;line-height:1.6;">
          Replied to the wrong thread? Just hit reply and we'll sort it out.
        </p>
    `, '#2563EB'),
}

// ── 2. Thank You ──────────────────────────────────────────────────────────────

export const thankYou = {
    id: 'thank-you',
    label: 'Thank You',
    description: 'Warm acknowledgment after form submission',
    icon: '🙏',
    color: '#16a34a',
    subject: (vars) => `Thank you, ${vars.name || 'there'}! We received your submission`,
    render: (vars) => wrap(`
        <h2 style="${h2Style.replace('#0D0D0D', '#064e3b')}">Thank you, ${vars.name || 'there'}! 🎉</h2>
        <p style="${pStyle}">
          We've received your submission for <strong>${vars.form_name || 'our form'}</strong> and we're
          thrilled to have you on board.
        </p>
        <p style="${pStyle}">
          Our team will review your details and get back to you within <strong>1–2 business days</strong>.
          In the meantime, feel free to reply to this email with any questions.
        </p>
        ${vars.custom_message ? `<p style="${pStyle}">${vars.custom_message}</p>` : ''}
        <hr style="${dividerStyle}">
        <p style="margin:16px 0 0;font-size:14px;color:#374151;">
          Warm regards,<br>
          <strong>The GetSanket Team</strong>
        </p>
    `, '#16a34a'),
}

// ── 3. Special Offer ──────────────────────────────────────────────────────────

export const specialOffer = {
    id: 'special-offer',
    label: 'Special Offer',
    description: 'Promotional deal for your leads',
    icon: '🔥',
    color: '#d97706',
    subject: (vars) => `${vars.name ? vars.name + ', ' : ''}exclusive offer just for you`,
    render: (vars) => wrap(`
        <div style="background:#fffbeb;border:1.5px solid #fde68a;border-radius:10px;padding:20px 24px;margin-bottom:24px;text-align:center;">
          <p style="margin:0 0 4px;font-size:12px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:#92400e;">Limited Time</p>
          <p style="margin:0;font-size:36px;font-weight:800;color:#d97706;letter-spacing:-0.03em;line-height:1;">
            ${vars.offer_code ? vars.offer_code : 'SPECIAL OFFER'}
          </p>
        </div>
        <h2 style="${h2Style}">Hey ${vars.name || 'there'}, this one's for you 🎁</h2>
        <p style="${pStyle}">
          As a valued contact from <strong>${vars.form_name || 'our form'}</strong>, we're offering you
          an exclusive deal you won't find anywhere else.
        </p>
        ${vars.custom_message ? `<p style="${pStyle}">${vars.custom_message}</p>` : ''}
        ${vars.deadline ? `<p style="${pStyle}">⏰ <strong>Offer expires:</strong> ${vars.deadline}</p>` : ''}
        <hr style="${dividerStyle}">
        <p style="margin:0;font-size:13px;color:#9CA3AF;">
          This offer is exclusive to you and cannot be transferred.
        </p>
    `, '#d97706'),
}

// ── 4. Welcome ────────────────────────────────────────────────────────────────

export const welcome = {
    id: 'welcome',
    label: 'Welcome',
    description: 'Onboarding email for new leads',
    icon: '👋',
    color: '#7c3aed',
    subject: (vars) => `Welcome to the community, ${vars.name || 'there'}!`,
    render: (vars) => wrap(`
        <h2 style="${h2Style}">Welcome aboard, ${vars.name || 'there'}! 🚀</h2>
        <p style="${pStyle}">
          We're so glad you reached out via <strong>${vars.form_name || 'our form'}</strong>.
          You're now part of a growing community and we can't wait to help you succeed.
        </p>
        ${vars.custom_message ? `<p style="${pStyle}">${vars.custom_message}</p>` : ''}
        <div style="background:#F5F3FF;border-radius:10px;padding:20px 24px;margin:24px 0;">
          <p style="margin:0 0 8px;font-weight:700;color:#5b21b6;font-size:14px;">Here's what happens next:</p>
          <p style="margin:0;font-size:14px;color:#4B5563;line-height:1.8;">
            ✔ Our team reviews your submission<br>
            ✔ You'll receive a personalized follow-up<br>
            ✔ We'll get started on your goals together
          </p>
        </div>
        <hr style="${dividerStyle}">
        <p style="margin:0;font-size:13px;color:#9CA3AF;">
          Questions? Just reply to this email — we read every message.
        </p>
    `, '#7c3aed'),
}

// ── 5. Reminder ───────────────────────────────────────────────────────────────

export const reminder = {
    id: 'reminder',
    label: 'Reminder',
    description: 'Gentle nudge to complete an action',
    icon: '⏰',
    color: '#0ea5e9',
    subject: (vars) => `A quick reminder, ${vars.name || 'there'} — don't miss out`,
    render: (vars) => wrap(`
        <h2 style="${h2Style}">Just a gentle reminder, ${vars.name || 'there'} ⏰</h2>
        <p style="${pStyle}">
          We wanted to follow up on your submission from <strong>${vars.form_name || 'our form'}</strong>.
          We'd hate for you to miss out on what we have for you.
        </p>
        ${vars.custom_message ? `<p style="${pStyle}">${vars.custom_message}</p>` : ''}
        ${vars.deadline ? `
        <div style="background:#f0f9ff;border:1.5px solid #bae6fd;border-radius:10px;padding:16px 20px;margin:20px 0;">
          <p style="margin:0;font-size:14px;color:#0369a1;">
            <strong>Act before:</strong> ${vars.deadline}
          </p>
        </div>` : ''}
        <p style="${pStyle}">
          If you have any questions or need help with anything, we're just a reply away.
        </p>
        <hr style="${dividerStyle}">
        <p style="margin:0;font-size:13px;color:#9CA3AF;">
          Not interested? No worries — just ignore this email.
        </p>
    `, '#0ea5e9'),
}

// ── 6. Newsletter / Update ────────────────────────────────────────────────────

export const newsletter = {
    id: 'newsletter',
    label: 'Newsletter',
    description: 'Product updates and news for your leads',
    icon: '📰',
    color: '#374151',
    subject: (vars) => `Latest from GetSanket — ${vars.name ? 'for you, ' + vars.name : 'updates & news'}`,
    render: (vars) => wrap(`
        <h2 style="${h2Style}">What's new at GetSanket 📬</h2>
        <p style="${pStyle}">Hi ${vars.name || 'there'}, here's a quick update from the team.</p>
        ${vars.custom_message ? `
        <div style="border-left:3px solid #2563EB;padding:12px 20px;margin:20px 0;background:#EFF6FF;border-radius:0 8px 8px 0;">
          <p style="margin:0;font-size:15px;color:#1e40af;line-height:1.7;">${vars.custom_message}</p>
        </div>` : `
        <div style="border-left:3px solid #2563EB;padding:12px 20px;margin:20px 0;background:#EFF6FF;border-radius:0 8px 8px 0;">
          <p style="margin:0;font-size:15px;color:#1e40af;line-height:1.7;">
            We've been working hard on new features to help you capture and convert more leads —
            faster and smarter than ever before.
          </p>
        </div>`}
        <p style="${pStyle}">
          Stay tuned for more updates. As always, if there's anything we can do for you, just reach out.
        </p>
        <hr style="${dividerStyle}">
        <p style="margin:0;font-size:13px;color:#9CA3AF;line-height:1.6;">
          You're receiving this because you submitted <strong>${vars.form_name || 'a form'}</strong> on GetSanket.
        </p>
    `, '#374151'),
}


export const EMAIL_TEMPLATES = [followUp, thankYou, specialOffer, welcome, reminder, newsletter]

// Substitute {{vars}} in subject/html with actual values
export const renderTemplate = (template, vars = {}) => ({
    subject: template.subject(vars),
    html: template.render(vars),
})

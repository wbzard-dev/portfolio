import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../config/site";
import { getAttribution, trackLead } from "../lib/analytics";

const needsOptions = ["Website", "App / MVP", "Social media", "SEO", "Meta / Google Ads", "Not sure yet"];

const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--text)" }}>
        {children}
    </label>
);

// The site's single enquiry form (lives on the Launch Package page — see site.formPath).
const LeadForm = () => {
    const navigate = useNavigate();
    const [needs, setNeeds]   = useState([]);
    const [status, setStatus] = useState("idle"); // idle | sending | error

    const toggleNeed = (n) => setNeeds(cur => cur.includes(n) ? cur.filter(x => x !== n) : [...cur, n]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const lead = {
            name:     form.get("name"),
            phone:    form.get("phone"),
            email:    form.get("email"),
            city:     form.get("city"),
            needs:    needs.join(", ") || "Not specified",
            message:  form.get("message"),
            page:     window.location.pathname,
            ...getAttribution(),
        };

        setStatus("sending");
        try {
            if (site.leadFormEndpoint) {
                const res = await fetch(site.leadFormEndpoint, {
                    method:  "POST",
                    headers: { "Content-Type": "application/json", Accept: "application/json" },
                    body:    JSON.stringify({ ...lead, _subject: `New launch enquiry — ${lead.name} (${lead.city})` }),
                });
                if (!res.ok) throw new Error(`Lead endpoint responded ${res.status}`);
            } else {
                // No form backend configured — hand the enquiry to the visitor's email client.
                const body = Object.entries(lead).filter(([, v]) => v).map(([k, v]) => `${k}: ${v}`).join("\n");
                window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(`Launch enquiry — ${lead.name}`)}&body=${encodeURIComponent(body)}`;
            }
            trackLead("lead_form", { city: lead.city });
            navigate("/thank-you");
        } catch {
            setStatus("error");
        }
    };

    const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1rem" };

    return (
        <form onSubmit={handleSubmit} className="lead-form" style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div style={grid2}>
                <div>
                    <Label htmlFor="lf-name">Your name *</Label>
                    <input id="lf-name" name="name" required autoComplete="name" className="form-input" placeholder="Full name" />
                </div>
                <div>
                    <Label htmlFor="lf-phone">Phone / WhatsApp *</Label>
                    <input id="lf-phone" name="phone" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" title="10-digit mobile number, optionally with +91" className="form-input" placeholder="+91 98765 43210" />
                </div>
            </div>
            <div style={grid2}>
                <div>
                    <Label htmlFor="lf-email">Email</Label>
                    <input id="lf-email" name="email" type="email" autoComplete="email" className="form-input" placeholder="you@business.com" />
                </div>
                <div>
                    <Label htmlFor="lf-city">City *</Label>
                    <select id="lf-city" name="city" required className="form-input" defaultValue="">
                        <option value="" disabled>Select your city</option>
                        <option>Bangalore</option>
                        <option>Shivamogga</option>
                        <option>Other (Karnataka)</option>
                        <option>Other (India)</option>
                    </select>
                </div>
            </div>

            <fieldset style={{ border: "none", padding: 0 }}>
                <legend style={{ fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.6rem" }}>What do you need help with?</legend>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                    {needsOptions.map(n => (
                        <button
                            type="button"
                            key={n}
                            onClick={() => toggleNeed(n)}
                            aria-pressed={needs.includes(n)}
                            className={`chip ${needs.includes(n) ? "chip-on" : ""}`}
                        >
                            {n}
                        </button>
                    ))}
                </div>
            </fieldset>

            <div>
                <Label htmlFor="lf-message">About your business (optional)</Label>
                <textarea id="lf-message" name="message" rows={2} className="form-input" placeholder="What you sell, and what you'd like to achieve in the next 3 months." />
            </div>

            <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                <input type="checkbox" name="consent" required style={{ marginTop: "0.2rem" }} />
                <span>
                    I agree to be contacted by {site.name} by phone, WhatsApp or email about my enquiry. See our <a href="/privacy-policy" style={{ textDecoration: "underline" }}>privacy policy</a>.
                </span>
            </label>

            <button type="submit" className="btn-primary" disabled={status === "sending"} style={{ justifyContent: "center", padding: "1rem 1.75rem", opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending…" : <>Get My Free Launch Plan <ArrowRight size={15} /></>}
            </button>
            {status === "error" && (
                <p role="alert" style={{ fontSize: "0.85rem", color: "#DC2626" }}>
                    Something went wrong sending your enquiry. Please WhatsApp or email us at <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a>.
                </p>
            )}
        </form>
    );
};

export default LeadForm;

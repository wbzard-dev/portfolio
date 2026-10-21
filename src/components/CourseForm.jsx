import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../config/site";
import { courseList } from "../data/courses";
import { getAttribution, trackLead } from "../lib/analytics";

const levels = ["College student", "Fresh graduate", "Working professional", "Career switcher", "Self-taught developer"];

const Label = ({ children, htmlFor }) => (
    <label htmlFor={htmlFor} style={{ display: "block", fontSize: "0.78rem", fontWeight: 600, marginBottom: "0.4rem", color: "var(--text)" }}>
        {children}
    </label>
);

// Student enquiry form for the developer courses — posts to site.courseFormEndpoint.
const CourseForm = ({ defaultCourse }) => {
    const navigate = useNavigate();
    const [status, setStatus] = useState("idle");
    const grid2 = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 220px), 1fr))", gap: "1rem" };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = new FormData(e.currentTarget);
        const enquiry = {
            name:     form.get("name"),
            phone:    form.get("phone"),
            email:    form.get("email"),
            course:   form.get("course"),
            level:    form.get("level"),
            college:  form.get("college"),
            city:     form.get("city"),
            message:  form.get("message"),
            consent:  "Agreed to be contacted by phone, WhatsApp or email",
            page:     window.location.pathname,
            ...getAttribution(),
        };
        setStatus("sending");
        try {
            const res = await fetch(site.courseFormEndpoint, {
                method:  "POST",
                headers: { "Content-Type": "application/json", Accept: "application/json" },
                body:    JSON.stringify({ ...enquiry, _subject: `New course enquiry — ${enquiry.course} — ${enquiry.name}` }),
            });
            if (!res.ok) throw new Error(`Course form endpoint responded ${res.status}`);
            trackLead("course_form", { course: enquiry.course });
            navigate("/courses/thank-you");
        } catch {
            setStatus("error");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="lead-form" style={{ display: "flex", flexDirection: "column", gap: "1.1rem" }}>
            <div style={grid2}>
                <div>
                    <Label htmlFor="cf-name">Your name *</Label>
                    <input id="cf-name" name="name" required autoComplete="name" className="form-input" placeholder="Full name" />
                </div>
                <div>
                    <Label htmlFor="cf-phone">Phone / WhatsApp *</Label>
                    <input id="cf-phone" name="phone" required type="tel" autoComplete="tel" inputMode="tel" pattern="[0-9+\s\-]{10,15}" title="10-digit mobile number, optionally with +91" className="form-input" placeholder="+91 98765 43210" />
                </div>
            </div>
            <div style={grid2}>
                <div>
                    <Label htmlFor="cf-email">Email</Label>
                    <input id="cf-email" name="email" type="email" autoComplete="email" className="form-input" placeholder="you@email.com" />
                </div>
                <div>
                    <Label htmlFor="cf-course">Course *</Label>
                    <select id="cf-course" name="course" required className="form-input" defaultValue={defaultCourse || ""}>
                        <option value="" disabled>Select a course</option>
                        {courseList.map(c => <option key={c.slug} value={c.short}>{c.short} (₹{c.fee.toLocaleString("en-IN")})</option>)}
                        <option value="Both">Both courses</option>
                    </select>
                </div>
            </div>
            <div style={grid2}>
                <div>
                    <Label htmlFor="cf-level">Where are you now? *</Label>
                    <select id="cf-level" name="level" required className="form-input" defaultValue="">
                        <option value="" disabled>Select one</option>
                        {levels.map(l => <option key={l}>{l}</option>)}
                    </select>
                </div>
                <div>
                    <Label htmlFor="cf-city">City</Label>
                    <input id="cf-city" name="city" className="form-input" defaultValue="Shivamogga" autoComplete="address-level2" />
                </div>
            </div>
            <div>
                <Label htmlFor="cf-college">College or company (optional)</Label>
                <input id="cf-college" name="college" className="form-input" placeholder="e.g. JNNCE, PESITM, Kuvempu University" />
            </div>
            <div>
                <Label htmlFor="cf-message">Anything you'd like to ask? (optional)</Label>
                <textarea id="cf-message" name="message" rows={2} className="form-input" placeholder="What you already know, your goals, preferred timings…" />
            </div>
            <label style={{ display: "flex", gap: "0.6rem", alignItems: "flex-start", fontSize: "0.78rem", color: "var(--text-muted)", lineHeight: 1.5 }}>
                <input type="checkbox" name="consent" required style={{ marginTop: "0.2rem" }} />
                <span>
                    I agree to be contacted by {site.name} by phone, WhatsApp or email about the course. See our <a href="/privacy-policy" style={{ textDecoration: "underline" }}>privacy policy</a>.
                </span>
            </label>
            <button type="submit" className="btn-primary" disabled={status === "sending"} style={{ justifyContent: "center", padding: "1rem 1.75rem", opacity: status === "sending" ? 0.7 : 1 }}>
                {status === "sending" ? "Sending…" : <>Register My Interest <ArrowRight size={15} /></>}
            </button>
            {status === "error" && (
                <p role="alert" style={{ fontSize: "0.85rem", color: "#DC2626" }}>
                    Something went wrong. Please WhatsApp us or email <a href={`mailto:${site.email}`} style={{ textDecoration: "underline" }}>{site.email}</a>.
                </p>
            )}
        </form>
    );
};

export default CourseForm;

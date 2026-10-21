import React from "react";
import { useLocation } from "react-router-dom";
import { MessageCircle } from "lucide-react";
import FormCTA from "./FormCTA";
import { site, whatsappUrl } from "../config/site";

// Hidden on the form page itself, conversion pages, and course pages (students have their own CTA).
const isHidden = (path) => path === site.formPath.split("#")[0] || path === "/thank-you" || path.startsWith("/courses");

// Sticky bottom bar on phones — most ad traffic is mobile, so the form is always one tap away.
const MobileCTABar = () => {
    const { pathname } = useLocation();
    if (isHidden(pathname)) return null;
    const wa = whatsappUrl();

    return (
        <>
            <div className="mobile-cta-spacer" aria-hidden="true" />
            <div className="mobile-cta-bar">
                <FormCTA location="mobile-bar" style={{ flex: 1, justifyContent: "center", padding: "0.85rem 1rem" }} />
                {wa && (
                    <a href={wa} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp" className="mobile-cta-wa">
                        <MessageCircle size={20} />
                    </a>
                )}
            </div>
        </>
    );
};

export default MobileCTABar;

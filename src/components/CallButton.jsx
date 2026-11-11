import React from "react";
import { Phone } from "lucide-react";
import { site, telHref } from "../config/site";

// One-tap call link. Clicks are tracked globally as a "phone" contact event (src/lib/analytics.js).
const CallButton = ({ className = "btn-secondary", children, showNumber = false, style }) => {
    if (!telHref) return null;
    return (
        <a href={telHref} className={className} style={style}>
            <Phone size={16} /> {children || (showNumber ? `Call ${site.phone}` : "Call Now")}
        </a>
    );
};

export default CallButton;

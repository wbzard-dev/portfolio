import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { site } from "../config/site";
import { track } from "../lib/analytics";

const [formPage, formAnchor] = site.formPath.split("#");

// Primary call to action used across the site — always leads to the one enquiry form.
const FormCTA = ({ children = "Get Your Free Launch Plan", className = "btn-primary", style, arrow = true, location: ctaLocation }) => {
    const { pathname } = useLocation();

    const handleClick = (e) => {
        track("form_cta_click", { from: pathname, location: ctaLocation });
        // Already on the form's page: just scroll (a same-hash Link wouldn't re-trigger the scroll).
        if (pathname === formPage) {
            e.preventDefault();
            document.getElementById(formAnchor)?.scrollIntoView({ behavior: "smooth", block: "start" });
        }
    };

    return (
        <Link to={site.formPath} className={className} style={style} onClick={handleClick}>
            {children} {arrow && <ArrowRight size={15} />}
        </Link>
    );
};

export default FormCTA;

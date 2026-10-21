import { site } from "../config/site";

const { ga4, googleAdsId, googleAdsLeadLabel, metaPixelId } = site.tracking;
const ATTRIBUTION_KEY = "wbz_attribution";
const ATTRIBUTION_PARAMS = ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content", "gclid", "fbclid", "gbraid", "wbraid"];

const isBrowser = typeof window !== "undefined";
const gtag  = (...args) => isBrowser && window.gtag && window.gtag(...args);
const fbq   = (...args) => isBrowser && window.fbq && window.fbq(...args);

let initialised = false;

function loadMetaPixel() {
    if (!metaPixelId || window.fbq) return;
    !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
    n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
    document,'script','https://connect.facebook.net/en_US/fbevents.js');
    window.fbq("init", metaPixelId);
}

// First-touch attribution: keep the UTM / click IDs from the ad that brought the visitor in,
// so they can be attached to the lead even after they browse a few pages.
function captureAttribution() {
    try {
        const params = new URLSearchParams(window.location.search);
        const found = {};
        ATTRIBUTION_PARAMS.forEach(k => { if (params.get(k)) found[k] = params.get(k); });
        if (Object.keys(found).length && !sessionStorage.getItem(ATTRIBUTION_KEY)) {
            found.landing_page = window.location.pathname;
            sessionStorage.setItem(ATTRIBUTION_KEY, JSON.stringify(found));
        }
    } catch { /* storage blocked — attribution is best-effort */ }
}

export function getAttribution() {
    try { return JSON.parse(sessionStorage.getItem(ATTRIBUTION_KEY) || "{}"); }
    catch { return {}; }
}

export function initAnalytics() {
    if (!isBrowser || initialised) return;
    initialised = true;

    captureAttribution();
    if (googleAdsId) gtag("config", googleAdsId);
    loadMetaPixel();

    // Every "book a call" button carries data-cal-link — count clicks as intent.
    document.addEventListener("click", (e) => {
        const cal = e.target.closest?.("[data-cal-link]");
        if (cal) track("book_call_click", { location: window.location.pathname });
        const wa = e.target.closest?.("a[href^='https://wa.me']");
        if (wa) trackContact("whatsapp");
        const mail = e.target.closest?.("a[href^='mailto:']");
        if (mail) trackContact("email");
        const tel = e.target.closest?.("a[href^='tel:']");
        if (tel) trackContact("phone");
    });

    // Cal.com embed fires this when a booking is confirmed — that's our strongest conversion.
    if (window.Cal) {
        const onBooked = () => trackLead("cal_booking");
        window.Cal("on", { action: "bookingSuccessfulV2", callback: onBooked });
        window.Cal("on", { action: "bookingSuccessful",   callback: onBooked });
    }
}

export function trackPageView(path) {
    if (!isBrowser) return;
    if (ga4) gtag("config", ga4, { page_path: path });
    fbq("track", "PageView");
}

export function track(event, params = {}) {
    gtag("event", event, params);
}

export function trackContact(method) {
    gtag("event", "contact", { method });
    fbq("track", "Contact", { method });
}

export function trackLead(source, params = {}) {
    gtag("event", "generate_lead", { source, ...params });
    if (googleAdsId && googleAdsLeadLabel) {
        gtag("event", "conversion", { send_to: `${googleAdsId}/${googleAdsLeadLabel}` });
    }
    fbq("track", "Lead", { content_name: source });
    if (source === "cal_booking") fbq("track", "Schedule");
}

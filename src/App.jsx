import React, { useEffect, useRef, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Header           from "./components/Header";
import Footer           from "./components/Footer";
import MobileCTABar     from "./components/MobileCTABar";
import SEO              from "./components/SEO";
import { faqSchema, websiteSchema } from "./lib/schema";
import { homeFaqs }     from "./data/faqs";
import { initAnalytics, trackPageView } from "./lib/analytics";

// Homepage sections
import Hero             from "./components/Hero";
import ProblemSection   from "./components/ProblemSection";
import ApproachTimeline from "./components/ApproachTimeline";
import Services         from "./components/Services";
import Work             from "./components/Work";
import WhyDifferent     from "./components/WhyDifferent";
import ServiceAreas     from "./components/ServiceAreas";
import LatestPosts      from "./components/LatestPosts";
import DiscoverySection from "./components/DiscoverySection";
import FAQSection       from "./components/FAQSection";

// Marketing pages
import Blog           from "./components/Blog";
import BlogPost       from "./components/BlogPost";
import ServicePage    from "./components/ServicePage";
import LocationPage   from "./components/LocationPage";
import LaunchPage     from "./components/LaunchPage";
import AboutPage      from "./components/AboutPage";
import CoursePage     from "./components/CoursePage";
import CoursesIndex   from "./components/CoursesIndex";
import LocalServicePage from "./components/LocalServicePage";
import ThankYou       from "./components/ThankYou";
import LegalPage      from "./components/LegalPage";
import NotFound       from "./components/NotFound";

// Side projects — lazy so they don't weigh down the marketing pages
const Blokz        = lazy(() => import("./components/Blokz"));
const OneHabit     = lazy(() => import("./components/OneHabit"));
const CohortV1     = lazy(() => import("./components/CohortV1"));

function App() {
    const location = useLocation();
    const lenisRef = useRef(null);

    useEffect(() => { initAnalytics(); }, []);

    useEffect(() => {
        trackPageView(location.pathname + location.search);
    }, [location]);

    // New page → start at the top; "/#section" links → scroll to that section once it renders.
    useEffect(() => {
        if (location.hash) {
            const t = setTimeout(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: "smooth" }), 400);
            return () => clearTimeout(t);
        }
        if (lenisRef.current) lenisRef.current.scrollTo(0, { immediate: true });
        else window.scrollTo(0, 0);
    }, [location.pathname, location.hash]);

    useEffect(() => {
        const lenis = new Lenis({
            duration:        1.8,
            easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth:          true,
            syncTouch:       true,
            touchMultiplier: 1.4,
        });
        lenisRef.current = lenis;
        let frame;
        const raf = (time) => { lenis.raf(time); frame = requestAnimationFrame(raf); };
        frame = requestAnimationFrame(raf);
        return () => { cancelAnimationFrame(frame); lenis.destroy(); lenisRef.current = null; };
    }, []);

    return (
        <div className="App">
            <Header />
            <Suspense fallback={null}>
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route
                            path="/"
                            element={
                                <main>
                                    <SEO jsonLd={[websiteSchema, faqSchema(homeFaqs)]} />
                                    <Hero />
                                    <ProblemSection />
                                    <ApproachTimeline />
                                    <Services />
                                    <Work />
                                    <WhyDifferent />
                                    <ServiceAreas />
                                    <LatestPosts />
                                    <DiscoverySection />
                                    <FAQSection />
                                </main>
                            }
                        />
                        <Route path="/services/:slug"          element={<ServicePage />} />
                        <Route path="/locations/:city"         element={<LocationPage />} />
                        <Route path="/startup-launch-package"  element={<LaunchPage />} />
                        <Route path="/about"                   element={<AboutPage />} />
                        <Route path="/shivamogga/:service"     element={<LocalServicePage />} />
                        <Route path="/courses"                 element={<CoursesIndex />} />
                        <Route path="/courses/thank-you"       element={<ThankYou variant="course" />} />
                        <Route path="/courses/:slug"           element={<CoursePage />} />
                        <Route path="/blog"                    element={<Blog />} />
                        <Route path="/blog/:id"                element={<BlogPost />} />
                        <Route path="/thank-you"               element={<ThankYou />} />
                        <Route path="/privacy-policy"          element={<LegalPage kind="privacy" />} />
                        <Route path="/terms"                   element={<LegalPage kind="terms" />} />

                        <Route path="/blokz"                   element={<Blokz />} />
                        <Route path="/one-habit"               element={<OneHabit />} />
                        <Route path="/cohort/v1"               element={<CohortV1 />} />

                        <Route path="*"                        element={<NotFound />} />
                    </Routes>
                </AnimatePresence>
            </Suspense>
            <Footer />
            <MobileCTABar />
        </div>
    );
}

export default App;

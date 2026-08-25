import React, { useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Header           from "./components/Header";
import Footer           from "./components/Footer";
import SEO              from "./components/SEO";

// Homepage sections
import Hero             from "./components/Hero";
import ProblemSection   from "./components/ProblemSection";
import ApproachTimeline from "./components/ApproachTimeline";
import Services         from "./components/Services";
import Work             from "./components/Work";
import WhyDifferent     from "./components/WhyDifferent";
import DiscoverySection from "./components/DiscoverySection";
import FAQSection       from "./components/FAQSection";

// Other pages
import Blog           from "./components/Blog";
import BlogPost       from "./components/BlogPost";
import Blokz          from "./components/Blokz";
import OneHabit       from "./components/OneHabit";
import ServicePage    from "./components/ServicePage";
import CohortV1       from "./components/CohortV1";
import PrformnceApp   from "./prformnce/PrformnceApp";

function App() {
    const location = useLocation();
    const isPrformnce = location.pathname.startsWith("/prformnce");

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-7WMQSEW2DZ", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    useEffect(() => {
        if (isPrformnce) return;
        const lenis = new Lenis({
            duration:        1.8,
            easing:          (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth:          true,
            syncTouch:       true,
            touchMultiplier: 1.4,
        });
        const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf); };
        requestAnimationFrame(raf);
        return () => lenis.destroy();
    }, [isPrformnce]);

    return (
        <div className="App">
            {!isPrformnce && <Header />}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <main>
                                <SEO />
                                <Hero />
                                <ProblemSection />
                                <ApproachTimeline />
                                <Services />
                                <Work />
                                <WhyDifferent />
                                <DiscoverySection />
                                <FAQSection />
                            </main>
                        }
                    />
                    <Route path="/blog"            element={<Blog />} />
                    <Route path="/blog/:id"        element={<BlogPost />} />
                    <Route path="/services/:slug"  element={<ServicePage />} />
                    <Route path="/blokz"           element={<Blokz />} />
                    <Route path="/one-habit"       element={<OneHabit />} />
                    <Route path="/cohort/v1"       element={<CohortV1 />} />
                    <Route path="/prformnce/*"           element={<PrformnceApp />} />
                </Routes>
            </AnimatePresence>
            {!isPrformnce && <Footer />}
        </div>
    );
}

export default App;

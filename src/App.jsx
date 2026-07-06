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
import WhyDifferent     from "./components/WhyDifferent";
import DiscoverySection from "./components/DiscoverySection";
import FAQSection       from "./components/FAQSection";

// Other pages
import Blog        from "./components/Blog";
import BlogPost    from "./components/BlogPost";
import Blokz       from "./components/Blokz";
import OneHabit    from "./components/OneHabit";
import ServicePage from "./components/ServicePage";
import CohortV1    from "./components/CohortV1";

function App() {
    const location = useLocation();

    useEffect(() => {
        if (window.gtag) {
            window.gtag("config", "G-7WMQSEW2DZ", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    useEffect(() => {
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
    }, []);

    return (
        <div className="App">
            <Header />
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
                </Routes>
            </AnimatePresence>
            <Footer />
        </div>
    );
}

export default App;

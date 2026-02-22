import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Lenis from "@studio-freight/lenis";

import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blokz from "./components/Blokz";
import OneHabit from "./components/OneHabit";
import Blog from "./components/Blog";
import BlogPost from "./components/BlogPost";
import SEO from "./components/SEO";
import ClubRegistration from "./components/ClubRegistration";

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const isRegistrationPage = location.pathname === "/club-registration";

    useEffect(() => {
        // Track page view on route change
        if (window.gtag) {
            window.gtag("config", "G-7WMQSEW2DZ", {
                page_path: location.pathname + location.search,
            });
        }
    }, [location]);

    useEffect(() => {
        // Disable Lenis for the registration page to allow native momentum scroll
        if (isRegistrationPage) return;

        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smooth: true,
            syncTouch: true,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        return () => {
            lenis.destroy();
        };
    }, [isRegistrationPage]);



    return (
        <div className="App">
            {!isRegistrationPage && <Header />}
            <AnimatePresence mode="wait">
                <Routes location={location} key={location.pathname}>
                    <Route
                        path="/"
                        element={
                            <main>
                                <SEO />
                                <Hero />
                                <Portfolio />
                                <Services />
                                <Testimonials />
                                <About />
                                <Contact />
                            </main>
                        }
                    />
                    <Route path="/blokz" element={<Blokz />} />
                    <Route path="/one-habit" element={<OneHabit />} />
                    <Route path="/blog" element={<Blog />} />
                    <Route path="/blog/:id" element={<BlogPost />} />
                    <Route path="/club-registration" element={<ClubRegistration />} />
                </Routes>
            </AnimatePresence>
            {!isRegistrationPage && <Footer />}
        </div>
    );
}

export default App;

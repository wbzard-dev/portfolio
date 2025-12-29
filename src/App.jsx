import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import Blokz from "./components/Blokz";

function App() {
    return (
        <div className="App">
            <Header />
            <Routes>
                <Route
                    path="/"
                    element={
                        <main>
                            <Hero />
                            <Services />
                            <Portfolio />
                            <Testimonials />
                            <About />
                            <Contact />
                        </main>
                    }
                />
                <Route path="/blokz" element={<Blokz />} />
            </Routes>
            <Footer />
        </div>
    );
}

export default App;

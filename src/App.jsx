import React from "react";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Testimonials from "./components/Testimonials";
import About from "./components/About";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
    return (
        <div className="App">
            <Header />
            <main>
                <Hero />
                <Services />
                <Portfolio />
                <Testimonials />
                <About />
                <Contact />
            </main>
            <Footer />
        </div>
    );
}

export default App;

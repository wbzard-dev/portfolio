import React from "react";
import {
    FaStore,
    FaHandHoldingHeart,
    FaBolt,
    FaTags,
    FaUserCheck,
    FaChartLine,
    FaExclamationTriangle,
    FaLightbulb,
    FaRocket,
} from "react-icons/fa";
import "../styles/blokz.css";

const Blokz = () => {
    return (
        <div className="about-container">
            {/* --- HERO SECTION --- */}
            <section className="about-hero">
                <div className="hero-content">
                    <img
                        src="https://ik.imagekit.io/ugdlmxlzt/logo.svg?updatedAt=1764950686563"
                        alt="Blokz Logo"
                        className="about-logo"
                    />
                    <h1 className="hero-title">
                        Lighting Up{" "}
                        <span className="highlight-orange">Kirana Stores</span>
                    </h1>
                    <h2 className="hero-subtitle">
                        We don't build dark stores. We empower the 13 million
                        local shops that built India[cite: 22].
                    </h2>
                </div>
            </section>

            {/* --- THE REALITY CHECK (New Section) --- */}
            <section className="reality-section">
                <div className="reality-container">
                    <div className="reality-text">
                        <h3 className="section-label">The Problem</h3>
                        <h2>The Crisis of Community Retail</h2>
                        <p>
                            The rise of quick commerce has come at a cost.{" "}
                            <strong>40-45% of consumers</strong> have reduced
                            spending at local Kiranas[cite: 23]. Traditional
                            platforms are bleeding cash while neighborhood
                            stores lose footfall daily[cite: 24].
                        </p>
                        <div className="stat-row">
                            <div className="stat-item">
                                <span className="stat-number">13M+</span>
                                <span className="stat-desc">
                                    Kirana Stores at Risk [cite: 22]
                                </span>
                            </div>
                            <div className="stat-item">
                                <span className="stat-number">25%</span>
                                <span className="stat-desc">
                                    Drop in Footfall [cite: 24]
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="reality-card glass-effect">
                        <FaExclamationTriangle className="warning-icon" />
                        <h4>The "Dark Store" Trap</h4>
                        <p>
                            Competitors burn investor money on expensive
                            warehouses ("dark stores") and delivery fleets,
                            losing <strong>₹80-120 per order</strong>[cite: 18].
                            This model is unsustainable and bypasses local
                            businesses entirely[cite: 26].
                        </p>
                    </div>
                </div>
            </section>

            {/* --- THE BLOKZ SOLUTION (Ecosystem) --- */}
            <section className="ecosystem-section">
                <div className="ecosystem-header">
                    <h3 className="section-label">The Solution</h3>
                    <h2>Two Sides, One Mission</h2>
                    <p>
                        We are not building a new supply chain. We are
                        digitizing the one that already exists[cite: 36].
                    </p>
                </div>

                <div className="ecosystem-grid">
                    {/* CUSTOMER SIDE */}
                    <div className="ecosystem-card customer-card">
                        <div className="card-badge">For Customers</div>
                        <h3>Convenience Without Compromise</h3>
                        <ul className="benefit-list">
                            <li>
                                <FaBolt className="list-icon" />
                                <div>
                                    <strong>Fast Local Delivery</strong>
                                    <p>
                                        Get orders in 30-60 minutes directly
                                        from your trusted neighborhood
                                        store[cite: 106].
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaTags className="list-icon" />
                                <div>
                                    <strong>Fair Pricing</strong>
                                    <p>
                                        No hidden fees. You pay honest prices
                                        set by real shopkeepers[cite: 107].
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaHandHoldingHeart className="list-icon" />
                                <div>
                                    <strong>Community Impact</strong>
                                    <p>
                                        Support local families. Your spending
                                        strengthens your own neighborhood[cite:
                                        110].
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>

                    {/* SHOPKEEPER SIDE */}
                    <div className="ecosystem-card merchant-card">
                        <div className="card-badge orange">For Shopkeepers</div>
                        <h3>Profitable Growth</h3>
                        <ul className="benefit-list">
                            <li>
                                <FaChartLine className="list-icon" />
                                <div>
                                    <strong>Zero Commissions</strong>
                                    <p>
                                        Stop losing 20-35%. Pay a fixed
                                        subscription (₹99-₹499) and keep 100% of
                                        your margin[cite: 29, 95].
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaLightbulb className="list-icon" />
                                <div>
                                    <strong>Convenience Fees</strong>
                                    <p>
                                        Unlike other apps, the convenience fee
                                        goes directly to YOU, not the
                                        platform[cite: 8].
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaUserCheck className="list-icon" />
                                <div>
                                    <strong>Brand Partnerships</strong>
                                    <p>
                                        Access exclusive coupons and loyalty
                                        programs to attract more customers[cite:
                                        8].
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- HOW IT WORKS (New Section) --- */}
            <section className="steps-section">
                <h2 className="section-heading">Go Online in Minutes</h2>
                <div className="steps-wrapper">
                    <div className="step-card">
                        <div className="step-icon">1</div>
                        <h4>Create Store</h4>
                        <p>
                            Sign up in 5 minutes. Simple account setup and
                            inventory upload[cite: 6].
                        </p>
                    </div>
                    <div className="step-line"></div>
                    <div className="step-card">
                        <div className="step-icon">2</div>
                        <h4>Set Radius</h4>
                        <p>
                            You decide how far you deliver. Complete control
                            over your logistics[cite: 6].
                        </p>
                    </div>
                    <div className="step-line"></div>
                    <div className="step-card">
                        <div className="step-icon">3</div>
                        <h4>Start Earning</h4>
                        <p>
                            Go live instantly. Accept orders and keep the
                            profits[cite: 7].
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SUSTAINABILITY (Comparison) --- */}
            <section className="comparison-section">
                <h2 className="section-heading">
                    The Economics of "Real" Retail
                </h2>
                <p className="section-desc">
                    Competitors run on VC money. Blokz runs on sustainable unit
                    economics[cite: 138].
                </p>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Aspect</th>
                                <th className="text-red">
                                    Competitors (Zepto/Blinkit) [cite: 13]
                                </th>
                                <th className="text-orange">
                                    Blokz [cite: 29]
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Merchant Cost</strong>
                                </td>
                                <td>20-35% Commission per order</td>
                                <td>
                                    <strong>₹99 - ₹499 Subscription</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Infrastructure</strong>
                                </td>
                                <td>Expensive Dark Stores (~₹5-10Cr)</td>
                                <td>
                                    <strong>
                                        Existing Kirana Network (Zero Cost)
                                    </strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Unit Economics</strong>
                                </td>
                                <td>Loss making (burns cash)</td>
                                <td>
                                    <strong>Profitable from Day 1</strong>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Goal</strong>
                                </td>
                                <td>Replace Local Shops</td>
                                <td>
                                    <strong>Empower Local Shops</strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* --- FOUNDER VISION --- */}
            <section className="vision-cta">
                <div className="vision-content">
                    <h3 className="vision-label">From the Founder</h3>
                    <h2>
                        "We're not just building an app. We're saving 13 million
                        kirana stores."
                    </h2>
                    <p className="vision-quote">
                        "Blokz proves that doing good and doing well are not
                        mutually exclusive. We are preserving community retail
                        while delivering modern convenience." — Vivek[cite:
                        164].
                    </p>
                    <div className="cta-group">
                        <a
                            target="blank"
                            href="https://blokz.store/"
                            className="cta-button primary"
                        >
                            Join us now
                        </a>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Blokz;

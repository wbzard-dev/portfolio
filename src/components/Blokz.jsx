import React from "react";
import {
    FaStore,
    FaHandHoldingHeart,
    FaBolt,
    FaTags,
    FaUserCheck,
    FaChartLine,
} from "react-icons/fa";
import "../styles/blokz.css"; // Assuming you create a CSS file for styling

const Blokz = () => {
    return (
        <div className="about-container">
            {/* --- HERO SECTION WITH LOGO --- */}
            <section className="about-hero">
                <div className="hero-content">
                    {/* LOGO ADDED HERE */}
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
                        local shops that built India. [cite: 22, 34]
                    </h2>
                </div>
            </section>

            {/* --- FOR CUSTOMERS & SHOPKEEPERS (NEW SECTION) --- */}
            <section className="ecosystem-section">
                <div className="ecosystem-header">
                    <h2>Two Sides, One Mission</h2>
                    <p>
                        Blokz bridges the gap between modern convenience and
                        community trust.
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
                                        from your trusted neighborhood store.
                                        [cite: 106]
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaTags className="list-icon" />
                                <div>
                                    <strong>Fair Pricing</strong>
                                    <p>
                                        No crazy markups or hidden fees. You pay
                                        honest prices set by real shopkeepers.
                                        [cite: 107]
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaHandHoldingHeart className="list-icon" />
                                <div>
                                    <strong>Support Local</strong>
                                    <p>
                                        Your money stays in the community,
                                        helping local families instead of dark
                                        stores. [cite: 110]
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
                                        We don't take a cut. You pay a small
                                        subscription (₹99-₹499) and keep 100% of
                                        the margin. [cite: 9, 95]
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaStore className="list-icon" />
                                <div>
                                    <strong>Digital Identity</strong>
                                    <p>
                                        Create your online store in minutes and
                                        set your own delivery radius. [cite: 6,
                                        81]
                                    </p>
                                </div>
                            </li>
                            <li>
                                <FaUserCheck className="list-icon" />
                                <div>
                                    <strong>Direct Connection</strong>
                                    <p>
                                        Own your customer relationships and earn
                                        convenience fees directly. [cite: 8, 96]
                                    </p>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </section>

            {/* --- THE BLOKZ DIFFERENCE (COMPARISON) --- */}
            <section className="comparison-section">
                <h2 className="section-heading">Why Blokz is Different</h2>
                <p className="section-desc">
                    Traditional quick commerce burns cash. We burn inefficiency.
                    [cite: 36]
                </p>

                <div className="comparison-table-wrapper">
                    <table className="comparison-table">
                        <thead>
                            <tr>
                                <th>Aspect</th>
                                <th className="text-red">
                                    Competitors (Zepto/Blinkit)
                                </th>
                                <th className="text-orange">Blokz</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <strong>Merchant Cost</strong>
                                </td>
                                <td>20-35% Commission per order </td>
                                <td>
                                    <strong>₹99 - ₹499 Subscription</strong>{" "}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Infrastructure</strong>
                                </td>
                                <td>Expensive Dark Stores </td>
                                <td>
                                    <strong>Existing Kirana Network</strong>{" "}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Pricing</strong>
                                </td>
                                <td>Inflated prices to cover costs</td>
                                <td>
                                    <strong>Fair Market Prices</strong> [cite:
                                    107]
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <strong>Sustainability</strong>
                                </td>
                                <td>VC Funded Loss Making </td>
                                <td>
                                    <strong>Profitable from Day 1</strong>{" "}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </section>

            {/* --- FOUNDER VISION / CTA --- */}
            <section className="vision-cta">
                <div className="vision-content">
                    <h2>
                        "We're not just building a website. We're saving
                        community retail."
                    </h2>
                    <p>
                        Whether you are a shopper or a shopkeeper, be part of
                        the sustainable future.
                    </p>
                    <div className="cta-group">
                        <a
                            href="https://blokz.store/"
                            className="cta-button primary"
                            target="blank"
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

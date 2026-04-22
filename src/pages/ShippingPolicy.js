import Layout from '../layout/Layout';
import PolicyLayout from '../components/PolicyLayout';

const ShippingPolicy = () => (
    <Layout>
        <PolicyLayout
            title="Shipping Policy"
            subtitle="Everything you need to know about how and when your order will arrive."
            icon="📦"
            lastUpdated="January 2025"
        >
            <div className="highlight-box">
                <p>
                    We take great care in packing each handcrafted piece to ensure it reaches you safely. Please read our shipping details below.
                </p>
            </div>

            <h2>1. Processing Time</h2>
            <p>
                All orders are processed within <strong>1–3 business days</strong> of payment confirmation. During peak periods (festive seasons, sale events), processing may take up to 5 business days. You will receive an email notification once your order has been dispatched.
            </p>
            <div className="highlight-box">
                <p>
                    Orders placed on weekends or public holidays will be processed on the next working business day.
                </p>
            </div>

            <h2>2. Shipping Methods & Timelines</h2>
            <h3>Domestic Shipping (India)</h3>
            <ul>
                <li><strong>Standard Shipping</strong> — 5–8 business days</li>
                <li><strong>Express Shipping</strong> — 2–4 business days (additional charges apply)</li>
                <li><strong>Same-Day Delivery</strong> — Available in Patna only (order before 12pm)</li>
            </ul>

            <h3>International Shipping</h3>
            <ul>
                <li><strong>South Asia</strong> — 7–12 business days</li>
                <li><strong>Middle East & Europe</strong> — 10–18 business days</li>
                <li><strong>USA & Canada</strong> — 12–20 business days</li>
                <li><strong>Rest of World</strong> — 15–25 business days</li>
            </ul>
            <p>
                International shipping timelines may vary due to customs clearance, which is beyond our control. Please note that the recipient is responsible for any customs duties or import taxes levied by their country.
            </p>

            <h2>3. Shipping Charges</h2>
            <ul>
                <li><strong>Free shipping</strong> on domestic orders above ₹999</li>
                <li><strong>₹79</strong> flat rate for domestic orders below ₹999</li>
                <li>International shipping charges are calculated at checkout based on destination and weight</li>
            </ul>

            <h2>4. Order Tracking</h2>
            <p>
                Once your order is dispatched, you will receive a tracking number via email and SMS. You can track your order through our shipping partner's website or by logging into your account on our website.
            </p>

            <h2>5. Packaging</h2>
            <p>
                Every order is carefully packed in protective, eco-friendly packaging to prevent damage during transit. Fragile ceramic items are wrapped in bubble wrap and placed in sturdy boxes with cushioning material. We use minimal plastic — most of our packaging is recyclable or biodegradable.
            </p>

            <h2>6. Failed Delivery Attempts</h2>
            <p>
                If a delivery attempt is unsuccessful, the courier will make up to 3 attempts. After 3 failed attempts, the package will be returned to us. Re-delivery will incur additional shipping charges. Please ensure someone is available to receive your order or provide accurate delivery instructions.
            </p>

            <h2>7. Lost or Damaged Shipments</h2>
            <p>
                If your order arrives damaged or is lost in transit, please contact us within <strong>48 hours</strong> of the expected delivery date. We will work with the courier to resolve the issue and either resend the order or issue a full refund.
            </p>
            <p>
                Please retain all original packaging materials and take photographs of any damage for claim purposes.
            </p>

            <h2>8. Shipping Restrictions</h2>
            <p>
                We currently do not ship to P.O. boxes or military addresses. Some remote areas may have limited delivery options or longer delivery times. We will notify you if your address falls outside our serviceable area.
            </p>
        </PolicyLayout>
    </Layout>
);

export default ShippingPolicy;
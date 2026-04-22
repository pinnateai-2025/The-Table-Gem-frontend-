import Layout from '../layout/Layout';
import PolicyLayout from '../components/PolicyLayout';

const PrivacyPolicy = () => (
    <Layout>
        <PolicyLayout
            title="Privacy Policy"
            subtitle="How we collect, use, and protect your personal information."
            icon="🔒"
            lastUpdated="January 2025"
        >
            <div className="highlight-box">
                <p>
                    At The Table Gem, your privacy is our priority. This policy explains how we handle your personal data when you shop with us or visit our website.
                </p>
            </div>

            <h2>1. Information We Collect</h2>
            <h3>Personal Information</h3>
            <p>When you place an order or create an account, we collect:</p>
            <ul>
                <li>Full name and contact details (email, phone number)</li>
                <li>Billing and shipping address</li>
                <li>Payment information (processed securely — we do not store card details)</li>
                <li>Order history and preferences</li>
            </ul>

            <h3>Automatically Collected Data</h3>
            <p>When you browse our website, we automatically collect:</p>
            <ul>
                <li>IP address and browser type</li>
                <li>Pages visited and time spent on site</li>
                <li>Referring website or search terms</li>
                <li>Device and operating system information</li>
            </ul>

            <h2>2. How We Use Your Information</h2>
            <p>We use your personal information to:</p>
            <ul>
                <li>Process and fulfill your orders</li>
                <li>Send order confirmations and shipping updates</li>
                <li>Respond to your inquiries and customer service requests</li>
                <li>Send promotional emails (only if you opt in)</li>
                <li>Improve our website and shopping experience</li>
                <li>Prevent fraud and maintain security</li>
            </ul>

            <h2>3. How We Protect Your Data</h2>
            <p>
                We implement industry-standard SSL encryption across our website. Payment transactions are processed through secure, PCI-compliant payment gateways. We do not store your full card number on our servers.
            </p>
            <div className="highlight-box">
                <p>
                    We will never sell, rent, or trade your personal information to third parties for marketing purposes.
                </p>
            </div>

            <h2>4. Cookies</h2>
            <p>
                We use cookies to enhance your browsing experience, remember your cart, and understand how our site is used. You can disable cookies in your browser settings, though some features may not function correctly.
            </p>
            <ul>
                <li><strong>Essential cookies</strong> — required for the website to function</li>
                <li><strong>Analytics cookies</strong> — help us understand visitor behaviour</li>
                <li><strong>Marketing cookies</strong> — used to show relevant advertisements</li>
            </ul>

            <h2>5. Third-Party Services</h2>
            <p>We may share limited data with trusted third parties to operate our business:</p>
            <ul>
                <li>Payment processors (Razorpay, Stripe)</li>
                <li>Shipping partners (for order delivery)</li>
                <li>Analytics platforms (Google Analytics)</li>
                <li>Email service providers (for transactional emails)</li>
            </ul>
            <p>These parties are contractually obligated to protect your data and may only use it for the specified purpose.</p>

            <h2>6. Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data ("right to be forgotten")</li>
                <li>Opt out of marketing communications at any time</li>
                <li>Lodge a complaint with a supervisory authority</li>
            </ul>

            <h2>7. Data Retention</h2>
            <p>
                We retain your personal data for as long as necessary to fulfill the purposes outlined in this policy, or as required by law. Order data is typically retained for 7 years for tax and legal compliance.
            </p>

            <h2>8. Children's Privacy</h2>
            <p>
                Our website is not directed at children under the age of 13. We do not knowingly collect personal data from minors. If you believe we have inadvertently collected such information, please contact us immediately.
            </p>

            <h2>9. Changes to This Policy</h2>
            <p>
                We may update this Privacy Policy from time to time. We will notify you of significant changes by email or a prominent notice on our website. Continued use of our site constitutes acceptance of the updated policy.
            </p>
        </PolicyLayout>
    </Layout>
);

export default PrivacyPolicy;
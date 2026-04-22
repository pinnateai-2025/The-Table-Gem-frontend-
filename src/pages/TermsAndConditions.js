import Layout from '../layout/Layout';
import PolicyLayout from '../components/PolicyLayout';

const TermsAndConditions = () => (
    <Layout>
        <PolicyLayout
            title="Terms & Conditions"
            subtitle="Please read these terms carefully before using our website or placing an order."
            icon="📋"
            lastUpdated="January 2025"
        >
            <div className="highlight-box">
                <p>
                    By accessing or using The Table Gem website and services, you agree to be bound by these Terms & Conditions. If you do not agree, please do not use our site.
                </p>
            </div>

            <h2>1. About Us</h2>
            <p>
                The Table Gem is a handcrafted ceramics and tableware brand based in Patna, Bihar, India. Our website at <a href="https://www.thetablegem.com">thetablegem.com</a> offers products for retail and wholesale purchase.
            </p>

            <h2>2. Use of Website</h2>
            <p>You agree to use our website only for lawful purposes. You must not:</p>
            <ul>
                <li>Use the site in any way that violates applicable laws or regulations</li>
                <li>Attempt to gain unauthorised access to any part of the website</li>
                <li>Transmit any unsolicited or unauthorised advertising material</li>
                <li>Reproduce, duplicate, or resell any part of our website without permission</li>
                <li>Use automated tools to scrape or collect data from our website</li>
            </ul>

            <h2>3. Account Registration</h2>
            <p>
                To place orders, you may need to register an account. You are responsible for maintaining the confidentiality of your login credentials and for all activity under your account. Please notify us immediately of any unauthorised use.
            </p>

            <h2>4. Products & Pricing</h2>
            <p>
                All products are subject to availability. Prices are listed in Indian Rupees (₹) and include applicable taxes unless stated otherwise. We reserve the right to change prices at any time without prior notice. Prices at the time of order confirmation are binding.
            </p>
            <div className="highlight-box">
                <p>
                    As our products are handcrafted, slight variations in colour, texture, and finish are natural and not considered defects. Each piece is unique.
                </p>
            </div>

            <h2>5. Orders & Payment</h2>
            <p>
                By placing an order, you make an offer to purchase. Your order is accepted when we send an order confirmation email. We reserve the right to refuse or cancel any order for reasons including product unavailability, pricing errors, or suspected fraud.
            </p>
            <ul>
                <li>Payment must be made in full at the time of ordering</li>
                <li>We accept major credit/debit cards, UPI, and net banking</li>
                <li>All transactions are secured with SSL encryption</li>
            </ul>

            <h2>6. Intellectual Property</h2>
            <p>
                All content on this website — including text, images, logos, designs, and product photographs — is owned by or licensed to The Table Gem and is protected by copyright law. You may not reproduce, distribute, or create derivative works without our express written permission.
            </p>

            <h2>7. Limitation of Liability</h2>
            <p>
                To the maximum extent permitted by law, The Table Gem shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of our website or products. Our total liability shall not exceed the amount paid for the specific product giving rise to the claim.
            </p>

            <h2>8. Governing Law</h2>
            <p>
                These Terms & Conditions are governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts of Patna, Bihar.
            </p>

            <h2>9. Modifications</h2>
            <p>
                We reserve the right to modify these terms at any time. Changes take effect immediately upon posting on the website. Your continued use constitutes acceptance of the modified terms.
            </p>

            <h2>10. Contact</h2>
            <p>
                For questions about these Terms & Conditions, please contact us at <a href="mailto:thetablegem@gmail.com">thetablegem@gmail.com</a> or call <a href="tel:+918051550460">+91-8051550460</a>.
            </p>
        </PolicyLayout>
    </Layout>
);

export default TermsAndConditions;
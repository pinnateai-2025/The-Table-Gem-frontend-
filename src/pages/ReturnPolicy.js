import Layout from '../layout/Layout';
import PolicyLayout from '../components/PolicyLayout';

const ReturnPolicy = () => (
    <Layout>
        <PolicyLayout
            title="Return & Replacement Policy"
            subtitle="We stand behind every piece we make. Your satisfaction is our commitment."
            icon="🔄"
            lastUpdated="January 2025"
        >
            <div className="highlight-box">
                <p>
                    We want you to love your purchase. If something isn't right, we'll do our best to make it right — quickly and without hassle.
                </p>
            </div>

            <h2>1. Return Eligibility</h2>
            <p>You may return an item if:</p>
            <ul>
                <li>The item was received damaged or broken</li>
                <li>You received the wrong item</li>
                <li>The item is significantly different from the product description</li>
                <li>The item has a manufacturing defect</li>
            </ul>

            <div className="highlight-box">
                <p>
                    <strong>Please note:</strong> As each item is handcrafted, minor variations in glaze colour, texture, or finish are natural and are not considered defects. These unique characteristics are what make each piece special.
                </p>
            </div>

            <h2>2. Non-Returnable Items</h2>
            <p>The following items cannot be returned or exchanged:</p>
            <ul>
                <li>Items that have been used, washed, or damaged after delivery</li>
                <li>Custom-made or personalised orders</li>
                <li>Items returned without original packaging</li>
                <li>Gift cards and promotional items</li>
                <li>Sale items (unless defective)</li>
                <li>Items returned after the 7-day return window</li>
            </ul>

            <h2>3. Return Window</h2>
            <p>
                Returns must be initiated within <strong>7 days of delivery</strong>. After this period, we are unable to process returns or exchanges. For damaged items, please contact us within <strong>48 hours</strong> of receiving your order.
            </p>

            <h2>4. How to Initiate a Return</h2>
            <p>To return an item, please follow these steps:</p>
            <ul>
                <li>Email us at <a href="mailto:thetablegem@gmail.com">thetablegem@gmail.com</a> with your order number</li>
                <li>Include clear photographs of the item and the packaging</li>
                <li>Describe the issue in detail</li>
                <li>Our team will respond within 24–48 hours with return instructions</li>
                <li>Pack the item securely in its original packaging</li>
                <li>Ship it back using the label we provide (for eligible returns)</li>
            </ul>

            <h2>5. Return Shipping Costs</h2>
            <ul>
                <li><strong>Defective / wrong item:</strong> We bear the return shipping cost and provide a prepaid return label</li>
                <li><strong>Change of mind:</strong> Return shipping is at the customer's expense</li>
                <li>We recommend using a trackable shipping service for returns</li>
            </ul>

            <h2>6. Replacements</h2>
            <p>
                For defective or damaged items, we offer a free replacement as our preferred resolution. Replacements are dispatched within <strong>3–5 business days</strong> of receiving the returned item and verifying the defect.
            </p>
            <p>
                If the exact same item is unavailable, we will offer you a replacement of equal or greater value, or a full refund.
            </p>

            <h2>7. Refunds</h2>
            <p>
                Refunds are processed after we receive and inspect the returned item. Once approved:
            </p>
            <ul>
                <li>Refunds are credited to the original payment method</li>
                <li>Processing takes <strong>5–10 business days</strong> after approval</li>
                <li>Bank processing time may add an additional 2–5 days</li>
                <li>Original shipping charges are non-refundable (except for our error)</li>
            </ul>

            <h2>8. Cancellations</h2>
            <p>
                Orders can be cancelled within <strong>12 hours</strong> of placement, provided they have not been dispatched. To cancel, email us immediately with your order number. Once dispatched, the standard return process applies.
            </p>
            <p>
                Custom or personalised orders cannot be cancelled once production has begun.
            </p>

            <h2>9. Exchanges</h2>
            <p>
                We do not offer direct exchanges. If you wish to exchange an item, please initiate a return for the original item and place a new order for the desired product.
            </p>
        </PolicyLayout>
    </Layout>
);

export default ReturnPolicy;
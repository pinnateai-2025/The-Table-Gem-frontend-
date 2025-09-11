import { useNavigate } from "react-router-dom";
// import wholesaleImg from "../assets/wholesale.png"; // <- place your uploaded image in assets & rename

const Wholesale = () => {
  const navigate = useNavigate();

  return (
    <div className="px-4 sm:px-10 py-10 mt-10 font-lato text-black">
      {/* Hero Section */}
      <div className="flex flex-col items-center">
        {/* <img
        //   src={wholesaleImg}
          alt="Wholesale at The Table Gem"
          className="w-full max-w-4xl rounded-2xl shadow-lg"
        /> */}
        <h2 className="text-[40px] max-[500px]:text-[24px] font-trajan font-semibold mt-6 uppercase tracking-[0.02em] text-center">
          Wholesale at The Table Gem
        </h2>
        <p className="text-center text-[20px] max-[500px]:text-[16px] mt-4 font-semibold leading-relaxed">
          Looking to source handcrafted, eco-friendly ceramics in bulk?  
          At <span className="font-bold">The Table Gem</span>, we partner with restaurants, cafés, hotels, retailers, and event curators to provide elegant, sustainable, and durable ceramic products at wholesale prices.
        </p>
      </div>

      {/* Why Choose Section */}
      <section className="mt-12 text-center">
        <h3 className="text-[24px] max-[500px]:text-[20px] font-bold mb-6">
          Why Choose The Table Gem?
        </h3>
        <ul className="space-y-3 text-[16px] max-[500px]:text-[14px] font-medium leading-relaxed">
          <li>✨ <span className="font-semibold">Handcrafted Quality</span> – Every piece is made with care by skilled artisans.</li>
          <li>🌱 <span className="font-semibold">Eco-Friendly & Sustainable</span> – Non-toxic, food-safe glazes and responsible materials.</li>
          <li>🎨 <span className="font-semibold">Customizable Options</span> – Shapes, glazes, and finishes tailored for your brand.</li>
          <li>📦 <span className="font-semibold">Scalable Orders</span> – From small-batch to large-volume requirements.</li>
          <li>🌍 <span className="font-semibold">Global Shipping</span> – Secure delivery across India and worldwide.</li>
        </ul>
      </section>

      {/* Who We Work With */}
      <section className="mt-12">
        <h3 className="text-[24px] font-bold text-center mb-6">
          Who We Work With
        </h3>
        <div className="grid md:grid-cols-2 gap-6 text-center text-[16px] max-[500px]:text-[14px] font-medium">
          <p>🍽 <b>Restaurants & Cafés</b> – Elevate your dining experience with our unique tableware.</p>
          <p>🏨 <b>Hotels & Resorts</b> – Enhance guest experiences with our elegant ceramics.</p>
          <p>🛍 <b>Retailers</b> – Offer your customers exclusive, handcrafted products.</p>
          <p>🎉 <b>Event Curators</b> – Create memorable events with our customizable table settings.</p>
        </div>
      </section>

      {/* Wholesale Benefits */}
      <section className="mt-12 text-center">
        <h3 className="text-[24px] font-bold mb-6">Wholesale Benefits</h3>
        <ul className="space-y-3 text-[16px] max-[500px]:text-[14px] font-medium leading-relaxed">
          <li>💰 <b>Competitive Pricing</b> – Significant savings on bulk orders.</li>
          <li>🤝 <b>Priority Support</b> – Dedicated account management for seamless service.</li>
          <li>🌟 <b>Exclusive Previews</b> – Early access to new collections & designs.</li>
          <li>♻️ <b>Sustainability Commitment</b> – Partner with a brand that values eco-friendly practices.</li>
        </ul>
      </section>

      {/* How It Works */}
      <section className="mt-12">
        <h3 className="text-[24px] font-bold text-center mb-6">How It Works</h3>
        <ol className="list-decimal list-inside space-y-2 text-[16px] max-[500px]:text-[14px] font-medium leading-relaxed">
          <li>Inquiry – Reach out via our contact form or email to discuss your needs.</li>
          <li>Consultation – Our team will understand your requirements & recommend solutions.</li>
          <li>Sample Approval – Receive samples for review & approval.</li>
          <li>Order Placement – Confirm details, quantities & delivery timelines.</li>
          <li>Production & Delivery – Timely production & secure shipping.</li>
        </ol>
      </section>

      {/* Key Information */}
      <section className="mt-12">
        <h3 className="text-[24px] font-bold text-center mb-6">Key Information</h3>
        <ul className="space-y-3 text-[16px] max-[500px]:text-[14px] font-medium leading-relaxed text-center">
          <li>📦 <b>MOQ</b> – Varies by product; contact us for details.</li>
          <li>⏳ <b>Lead Time</b> – Typically 4–6 weeks.</li>
          <li>💳 <b>Payment Terms</b> – Flexible options available during consultation.</li>
        </ul>
      </section>

      {/* FAQ Section */}
      <section className="mt-12">
        <h3 className="text-[24px] font-bold text-center mb-6">
          Frequently Asked Questions
        </h3>
        <div className="space-y-4 text-[16px] max-[500px]:text-[14px] font-medium leading-relaxed">
          <p><b>1. MOQ?</b> Flexible depending on category. Most ceramics start from 20–50 pieces.</p>
          <p><b>2. Customization?</b> Yes! Shapes, glazes & finishes can be tailored.</p>
          <p><b>3. Lead time?</b> 4–6 weeks depending on order size & customization.</p>
          <p><b>4. International Shipping?</b> Yes, we ship worldwide securely.</p>
          <p><b>5. Payment Methods?</b> Bank transfer, credit card, PayPal (flexible terms).</p>
          <p><b>6. Getting Started?</b> Reach out via contact form/email & our team will guide you.</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="mt-16 text-center">
        <h2 className="text-[20px] font-bold">
          For any customisation and bulk order, our team will respond within 24–48 hours.
        </h2>
        <div className="mt-8 flex justify-center">
          <button
            onClick={() => navigate("/contact")}
            className="px-10 py-4 bg-[#0D4017] text-white rounded-2xl font-semibold text-[20px] hover:bg-white hover:text-[#0D4017] border border-[#0D4017] transition"
          >
            Contact Us
          </button>
        </div>
        <div className="mt-10 flex justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-2 bg-[#0D4017] text-white rounded-md font-medium text-[14px] hover:bg-white hover:text-[#0D4017] border border-[#0D4017] transition"
          >
            Back
          </button>
        </div>
      </section>
    </div>
  );
};

export default Wholesale;

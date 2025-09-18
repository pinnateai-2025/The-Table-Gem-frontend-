import { useNavigate } from 'react-router-dom';

const WholesaleProduct = () => {

  const navigate = useNavigate();

  return (
    <div className="w-full">
      <div className="px-6 py-10 max-[500px]:py-5">
        <h2
          className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
        >
          Wholesale at The Table Gem
        </h2>

        <p className="text-center text-[20px] max-[500px]:text-[16px] mt-4 font-semibold leading-relaxed">
          Looking to source handcrafted, eco-friendly ceramics in bulk?
          At <span className="font-bold">The Table Gem</span>, we partner with restaurants, cafés, hotels, retailers, and event curators to provide elegant, sustainable, and durable ceramic products at wholesale prices.
        </p>
      </div>

      <div className="w-full mt-[80px]">
        <div className="flex justify-center text-center text-[40px] max-[500px]:text-[30px] max-[375px]:text-[26px] max-[320px]:text-[22px] mt-[20px] font-semibold">
          <h3 className="text-[rgba(13,64,23,1)]"> Why Choose The Table Gem?</h3>
        </div>
        <div className="grid grid-cols-2 gap-[30px] px-[150px] py-[50px] mx-[200px] max-[1024px]:px-[0px] max-[1024px]:mx-[100px] max-[700px]:mx-[50px] max-[500px]:grid-cols-1 max-[500px]:grid-rows-6 max-[500px]:mx-[20px]">
          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">
              Handcrafted Quality
            </h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">
              Every piece is made with care by skilled artisans.
            </p>
          </div>

          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">
              Eco-Friendly & Sustainable
            </h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">
              Non-toxic, food-safe glazes and responsible materials.
            </p>
          </div>

          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">
              Customizable Options
            </h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">
              Shapes, glazes, and finishes tailored for your brand.
            </p>
          </div>

          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">
              Scalable Orders
            </h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">
              From small-batch to large-volume requirements.
            </p>
          </div>

          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)] last:col-span-2 last:justify-self-center last:w-1/2 max-[500px]:last:col-auto max-[500px]:last:justify-self-stretch max-[500px]:last:w-full">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">
              Global Shipping
            </h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">
              Secure delivery across India and worldwide.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 px-6 bg-[rgba(13,64,23,1)] mt-[50px] max-[500px]:mt-[-60px]">
        <div className="flex justify-center text-center text-[40px] max-[500px]:text-[36px] max-[375px]:text-[32px] max-[320px]:text-[26px] font-semibold">
          <h3 className="text-white">Who We Work With</h3>
        </div>
        <div className="grid grid-cols-4 gap-[20px] px-[30px] py-[30px] mt-[20px] max-[1024px]:grid-cols-2 max-[1024px]:grid-rows-2 max-[600px]:grid-cols-1 max-[600px]:grid-rows-4  max-[500px]:mt-[0px]">
          <div className="group bg-[rgba(13,64,23,1)] rounded-[10px] p-[10px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[20px] text-white text-center mt-[10px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Restaurants & Cafes
            </h6>
            <p className="text-[20px] text-white text-center mt-[20px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Elevate your dining experience with our unique tableware.
            </p>
          </div>

          <div className="group bg-[rgba(13,64,23,1)] rounded-[10px] p-[10px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[20px] text-white text-center mt-[10px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Hotels & Resorts
            </h6>
            <p className="text-[20px] text-white text-center mt-[20px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Enhance guest experiences with our elegant ceramics.
            </p>
          </div>

          <div className="group bg-[rgba(13,64,23,1)] rounded-[10px] p-[10px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[20px] text-white text-center mt-[10px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Retailers
            </h6>
            <p className="text-[20px] text-white text-center mt-[20px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Offer your customers exclusive, handcrafted products.
            </p>
          </div>

          <div className="group bg-[rgba(13,64,23,1)] rounded-[10px] p-[10px] border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[20px] text-white text-center mt-[10px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Event Curators
            </h6>
            <p className="text-[20px] text-white text-center mt-[20px] transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
              Create memorable events with our customizable table settings.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-[80px]">
        <div className="flex justify-center text-center text-[40px] max-[500px]:text-[30px] max-[375px]:text-[26px] mt-[20px] font-semibold">
          <h3 className="text-[rgba(13,64,23,1)]">Wholesale Benefits</h3>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-[30px] px-[150px] py-[50px] mx-[200px] max-[1024px]:px-[0px] max-[1024px]:mx-[100px] max-[700px]:mx-[50px] max-[500px]:grid-cols-1 max-[500px]:grid-rows-6 max-[500px]:mx-[20px]">
          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">Competitive Pricing</h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">Significant savings on bulk orders.</p>
          </div>
          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">Priority Support</h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">Dedicated account management for seamless service.</p>
          </div>
          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">Exclusive Previews</h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">Early access to new collections & designs.</p>
          </div>
          <div className="group border border-gray-200 shadow-lg rounded-[10px] p-[10px] transition-all duration-300 ease-in-out hover:bg-[rgba(13,64,23,1)]">
            <h6 className="font-bold text-[18px] text-[rgba(13,64,23,1)] text-center group-hover:text-white">Sustainability Commitment</h6>
            <p className="text-[18px] text-black text-center group-hover:text-white">Partner with a brand that values eco-friendly practices.</p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 px-6 bg-[rgba(13,64,23,1)] max-[500px]:mt-[-250px]">
        <div className="flex justify-center text-center text-[40px] max-[500px]:text-[30px] max-[375px]:text-[26px] font-semibold">
          <h3 className="text-white">How It Works</h3>
        </div>
        <div className="grid gap-6 justify-center p-[50px] max-[500px]:p-[30px]">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="bg-[rgba(13,64,23,1)] flex flex-col justify-center items-center min-h-[140px] group rounded-[5px] p-4 border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
              <h6 className="font-bold text-[20px] text-white text-center transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
                Inquiry
              </h6>
              <p className="text-[16px] text-white text-center mt-2 transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)] leading-relaxed">
                Reach out via our contact form or email to discuss your needs.
              </p>
            </div>
            <div className="bg-[rgba(13,64,23,1)] flex flex-col justify-center items-center min-h-[140px] group rounded-[5px] p-4 border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
              <h6 className="font-bold text-[20px] text-white text-center transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
                Consultation
              </h6>
              <p className="text-[16px] text-white text-center mt-2 transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)] leading-relaxed">
                Our team will understand your requirements & recommend solutions.
              </p>
            </div>
            <div className="bg-[rgba(13,64,23,1)] flex flex-col justify-center items-center min-h-[140px] group rounded-[5px] p-4 border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
              <h6 className="font-bold text-[20px] text-white text-center transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
                Sample Approval
              </h6>
              <p className="text-[16px] text-white text-center mt-2 transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)] leading-relaxed">
                Receive samples for review & approval.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-[rgba(13,64,23,1)] flex flex-col justify-center items-center min-h-[140px] group rounded-[5px] p-4 border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
              <h6 className="font-bold text-[20px] text-white text-center transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
                Order Placement
              </h6>
              <p className="text-[16px] text-white text-center mt-2 transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)] leading-relaxed">
                Confirm details, quantities & delivery timelines.
              </p>
            </div>
            <div className="bg-[rgba(13,64,23,1)] flex flex-col justify-center items-center min-h-[140px] group rounded-[5px] p-4 border border-white transition-all duration-300 ease-in-out hover:bg-white hover:border-[rgba(13,64,23,1)]">
              <h6 className="font-bold text-[20px] text-white text-center transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)]">
                Production & Delivery
              </h6>
              <p className="text-[16px] text-white text-center mt-2 transition-colors duration-300 ease-in-out group-hover:text-[rgba(13,64,23,1)] leading-relaxed">
                Timely production & secure shipping.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full mt-[50px] px-6">
        <div className="flex justify-center text-center mb-10">
          <h3 className="text-[40px] max-[500px]:text-[30px] max-[375px]:text-[26px] font-semibold text-[rgba(13,64,23,1)]">
            Key Information
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 group hover:bg-[rgba(13,64,23,1)] hover:border-[rgba(13,64,23,1)] transition-all duration-300 ease-in-out">
            <h6 className="text-xl font-bold text-[rgba(13,64,23,1)] mb-3 text-center group-hover:text-white">
              MOQ
            </h6>
            <p className="text-black text-center group-hover:text-white">
              Varies by product; contact us for details.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 group hover:bg-[rgba(13,64,23,1)] hover:border-[rgba(13,64,23,1)] transition-all duration-300 ease-in-out">
            <h6 className="text-xl font-bold text-[rgba(13,64,23,1)] mb-3 text-center group-hover:text-white">
              Lead Time
            </h6>
            <p className="text-black text-center group-hover:text-white">
              Typically 4–6 weeks.
            </p>
          </div>

          <div className="bg-white shadow-lg rounded-xl p-6 border border-gray-200 group hover:bg-[rgba(13,64,23,1)] hover:border-[rgba(13,64,23,1)] transition-all duration-300 ease-in-out">
            <h6 className="text-xl font-bold text-[rgba(13,64,23,1)] mb-3 text-center group-hover:text-white">
              Payment Terms
            </h6>
            <p className="text-black text-center group-hover:text-white">
              Flexible options available during consultation.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full py-16 px-6 bg-[rgba(13,64,23,1)] mt-[50px]">
        <div className="text-center mb-12">
          <h3 className="text-4xl max-[500px]:text-2xl font-semibold text-white">
            Frequently Asked Questions
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">MOQ?</h6>
            <p className="text-black">
              Flexible depending on category. Most ceramics start from 20–50 pieces.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">Customization?</h6>
            <p className="text-black">
              Yes! Shapes, glazes & finishes can be tailored.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">Lead time?</h6>
            <p className="text-black">
              4–6 weeks depending on order size & customization.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">International Shipping?</h6>
            <p className="text-black">
              Yes, we ship worldwide securely.
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">Payment Methods?</h6>
            <p className="text-black">
              Bank transfer, credit card, PayPal (flexible terms).
            </p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6 transition-all duration-300 hover:shadow-lg hover:scale-105">
            <h6 className="font-bold text-[rgba(13,64,23,1)] text-lg mb-3">Getting Started?</h6>
            <p className="text-black">
              Reach out via contact form/email & our team will guide you.
            </p>
          </div>
        </div>
      </div>

      <div className="w-full mt-[50px]">
        <div className="text-center">
          <h2 className="text-[28px] max-[1024px]:text-[28px] max-[768px]:text-[26px] max-[425px]:text-[22px] max-[1024px]:px-[20px] font-semibold text-black leading-relaxed">
            For any customization and bulk order, our team will respond within24–48 hours
          </h2>
        </div>

        <div className="flex justify-center items-center mt-[50px]">
          <div className="flex flex-col justify-center items-center text-center gap-[30px]">
            <button
              onClick={() => navigate("/contact")}
              className="w-[210px] h-[50px] max-[500px]:w-[120px] max-[500px]:h-[35px] font-lato font-semibold text-[16px] max-[500px]:text-[12px] leading-[120%] tracking-[0.02em] border border-green-900 bg-[#0D4017] text-white rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300"
            >
              Contact Us
            </button>

            <button
              className="w-[110px] h-[40px] max-[500px]:w-[90px] max-[500px]:h-[30px] font-lato font-semibold text-[14px] max-[500px]:text-[12px] leading-[120%] tracking-[0.02em] border border-green-900 bg-[#0D4017] text-white rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300"
              onClick={() => navigate('/')}
            >
              Back
            </button>
          </div>
        </div>
      </div>

    </div>
  )
}

export default WholesaleProduct;

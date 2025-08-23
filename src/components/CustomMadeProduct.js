import { useNavigate } from "react-router-dom"

const CustomMadeProduct = () => {

    const navigate = useNavigate()
    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Custom Made
            </h2>
            <h3
                className="text-center font-lato font-semibold text-[24px] leading-[120%] tracking-[0.02em] align-middle text-black py-3 mb-6"
            >
                Yes! We can Customise your Orders.
            </h3>
            <div>
                <p className="w-full text-base font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mb-2 px-4 sm:px-40">
                    At The Table Gem, we believe every piece should be as unique as you are. Whether you're seeking a one-of-a-kind tableware set for your home, a personalized gift, or bespoke items for your special event, we offer customisation tailored to your style and needs.
                </p>

                <p className="w-full text-base font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mt-5 px-4 sm:px-40">
                    <span className="font-extrabold">Key Information:</span> <br />
                        ○ Choose your favorite patterns, colors, or add a special message. <br />

                        ○ Our artisans work with you to craft tableware that reflects your taste, ensuring quality and attention to detail in every item. <br />

                        ○ Perfect for weddings, corporate events, or home décor upgrades. <br />

                        No matter the occasion or requirement, our team is dedicated to transforming your ideas into beautiful, functional tableware.
                </p>

                <p className="w-full text-base font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mb-2 px-4 sm:px-40 mt-5">
                    Please note: <br />

                       ○ Custom orders may have additional production and delivery times depending on design complexity and quantity. <br />

                       ○ Bulk order options are available — ideal for gifting, events, or business needs.
                </p>
                <h2
                    className="text-center font-lato font-bold text-[18px] leading-[120%] tracking-[0.02em] align-middle mt-10"
                >
                    For any customisation and bulk order
                </h2>

                <div className="mt-[50px] flex justify-center">
                    <button
                        onClick={() => navigate('/contact')}
                        className='flex justify-center items-center w-[200px] h-[70px] text-center font-lato border border-green-900 bg-[#0D4017] text-white px-15 py-2 rounded-2xl cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 text-[24px]'
                    >
                        Contact us
                    </button>
                </div>

                <div className="mt-[100px] flex justify-center">
                    <button
                        className="w-[110px] h-[40px] font-lato font-semibold text-[14px] leading-[120%] tracking-[0.02em] text-center align-middle border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                        onClick={() => navigate('/')}
                    >
                        Back
                    </button>
                </div>
            </div>
        </div>
    )
}

export default CustomMadeProduct;
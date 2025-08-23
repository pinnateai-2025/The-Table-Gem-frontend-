import { useNavigate } from "react-router-dom";
const ContactForm = () => {

    const navigate = useNavigate()
    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Contact
            </h2>
            <div className='mt-[70px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto text-center'>
                <div className="bg-gray-200 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Get in Touch with us</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                        If you have a question or a comment, please<br />
                        Call: <a href="tel:+91-8051550460" className="text-blue-600 hover:underline">+91-8051550460</a><br />
                        Mail: <a href="mailto:query@thetablegem.com" className="text-blue-600 hover:underline">query@thetablegem.com</a>
                    </p>
                </div>

                <div className="bg-gray-200 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Visit us</h3>
                    <p className="text-gray-700 text-sm sm:text-base">Mon-Fri 10:30am - 6:30pm</p>
                </div>

                <div className="bg-gray-200 rounded-lg p-4 sm:p-6 shadow-md hover:shadow-lg transition-shadow">
                    <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Find our store</h3>
                    <p className="text-gray-700 text-sm sm:text-base">
                        <span className='font-bold'>The Table Gem</span><br />
                        456 ground floor,<br />
                        sector-20 gurgaon-Haryana-123456
                    </p>
                </div>
            </div>


            <div className="mt-[100px] flex items-center justify-center bg-white">
                <form className="max-w-xl w-full bg-white rounded-lg">
                    <h2 className="text-center font-trajan font-bold text-[24px] leading-[0%] tracking-[0.02em] align-middle mb-[50px]">
                        Contact Form
                    </h2>

                    <div className="flex flex-col sm:flex-row gap-4 mb-4">
                        <input
                            type="text"
                            placeholder="Name"
                            className="w-full sm:w-[370px] h-[48px] rounded-[11px] border-[1.5px] border-black p-2 text-base sm:text-lg placeholder:text-black/70"
                            required
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full sm:w-[370px] h-[48px] rounded-[11px] border-[1.5px] border-black p-2 text-base sm:text-lg placeholder:text-black/70"
                            required
                        />
                    </div>

                    <input
                        type="tel"
                        placeholder="Phone Number"
                        className="w-[575px] max-[426px]:w-full h-[48px] rounded-[11px] border-[1.5px] border-black p-2 mb-4 text-base placeholder:text-black/70"
                        required
                    />

                    <textarea
                        placeholder="Comment"
                        className="w-[575px] max-[426px]:w-full h-[230px] rounded-[11px] border-[1.5px] border-black p-2 mb-4 text-base placeholder:text-black/70"
                        required
                    ></textarea>

                    <div className="flex items-center gap-4 mb-4">
                        <button
                            type="submit"
                            className="bg-green-900 text-white px-6 py-2 rounded-md hover:bg-green-800 transition"
                        >
                            Send
                        </button>
                    </div>

                    <div className="flex justify-center mt-[150px]">
                        <button
                            className="w-[110px] h-[40px] font-lato font-semibold text-[14px] leading-[120%] tracking-[0.02em] text-center align-middle border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                            onClick={() => navigate('/')}
                        >
                            Back
                        </button>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default ContactForm;
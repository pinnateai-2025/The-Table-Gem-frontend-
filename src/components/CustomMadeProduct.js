import { useNavigate } from "react-router-dom"

const CustomMadeProduct = () => {

    const navigate = useNavigate()

    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Custom Made
            </h2>
            <h3
                className="text-center font-lato font-semibold text-[24px] max-[500px]:text-[18px] leading-[120%] tracking-[0.02em] align-middle text-black py-3 mb-6"
            >
                Yes! We can Customise your Orders.
            </h3>
            <div>
                <p className="w-full text-base max-[500px]:text-[12px] font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mb-2 px-4">
                    Lorem ipsum dolor sit amet. Non velit magni id corporis delectus aut distinctio perferendis eos harum repudiandae et sequi reprehenderit aut <br />
                    nihil ullam ut sunt alias. Vel quia excepturi eos obcaecati atque aut esse error hic minima inventore qui nemo doloremque hic dolore nobis.
                </p>

                <p className="w-full text-base max-[500px]:text-[12px] font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mt-5 px-4">
                    <span className="font-extrabold">Key Information:</span> Lorem ipsum dolor sit amet. Non velit magni id corporis delectus aut distinctio perferendis eos harum repudiandae et sequi reprehenderit aut nihil ullam ut sunt alias. Vel quia excepturi eos obcaecati atque aut esse error hic minima inventore qui nemo doloremque hic dolore nobis.
                </p>

                <p className="w-full text-base max-[500px]:text-[12px] font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mb-2 px-4 mt-5">
                    Lorem ipsum dolor sit amet. Non velit magni id corporis delectus aut distinctio perferendis eos harum repudiandae et sequi reprehenderit aut <br />
                    nihil ullam ut sunt alias. Vel quia excepturi eos obcaecati atque aut esse error hic minima inventore qui nemo doloremque hic dolore nobis.
                </p>

                <p className="w-full text-base max-[500px]:text-[12px] font-lato font-semibold leading-[120%] tracking-[0.02em] text-center align-middle text-black mb-2 px-4 mt-5">
                    <span className="font-extrabold">Please note:</span> Lorem ipsum dolor sit amet. Non velit magni id corporis delectus aut distinctio perferendis eos harum repudiandae et sequi reprehenderit aut nihil ullam ut sunt alias. Vel quia excepturi eos obcaecati atque aut esse error hic minima inventore qui nemo doloremque hic dolore nobis.
                </p>

                <h2
                    className="text-center font-lato font-bold text-[18px] leading-[120%] tracking-[0.02em] align-middle mt-10"
                >
                    For any customisation and bulk order
                </h2>

                <div className="mt-[50px] flex justify-center">
                    <button
                        onClick={() => navigate('/contact')}
                        className='flex justify-center items-center w-[200px] h-[70px] max-[500px]:w-[150px] max-[500px]:h-[50px] max-[350px]:w-[120px] max-[350px]:h-[40px] font-lato border border-green-900 bg-[#0D4017] text-white px-15 py-2 rounded-2xl cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 text-[24px] max-[500px]:text-[18px] max-[350px]:text-[16px]'
                    >
                        Contact us
                    </button>
                </div>

                <div className="flex justify-center mt-[100px] w-full">
                    <button
                        className="flex items-center justify-center w-[110px] h-[40px] max-[500px]:w-[90px] max-[500px]:h-[30px] font-lato font-semibold text-[14px] max-[500px]:text-[12px] leading-[120%] tracking-[0.02em] border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
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
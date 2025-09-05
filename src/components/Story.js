import { useNavigate } from 'react-router-dom';
import img9 from '../image/img9.jpg';

const Story = () => {

    const navigate = useNavigate();

    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Our Story
            </h2>
            <div className="grid grid-cols-1 min-[1025px]:grid-cols-2 gap-6 p-4 mt-[40px]">
                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <img
                        src={img9}
                        alt="Team"
                        className="w-full h-auto max-w-[100%] rounded-[14px] p-2"
                    />
                </div>

                {/* Text Section */}
                <div className="text-justify space-y-4 p-2 text-[16px] text-black">
                    <p>
                        Hi there! I’m <strong>Shahinda Abid</strong>, and I founded <strong>The Table Gem</strong> in 2025 with a heartfelt vision: to create 
                        a space where sustainability meets elegance in everyday living. What started as a simple idea—to make 
                        eco-friendly choices more accessible—has blossomed into a brand dedicated to offering thoughtfully designed, 
                        earth-conscious products.
                    </p>
                    <p>
                        At <strong>The Table Gem</strong>, every piece is crafted to reflect both beauty and responsibility. From eco-friendly tableware 
                        to sustainable lifestyle essentials, our mission is to bring you products that not only elevate your home but 
                        also nurture the planet. With a passionate team beside me, we work to deliver more than just products—we deliver 
                        a movement towards conscious, sustainable living, where every choice makes a difference.
                    </p>
                </div>
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
    )
}

export default Story;
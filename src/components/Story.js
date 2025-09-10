import { useNavigate } from 'react-router-dom';
import OurStory from '../image/ourstory.jpeg';

const Story = () => {

    const navigate = useNavigate();

    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] max-[500px]:text-[20px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
            >
                Our Story
            </h2>
            <div className="grid grid-cols-1 min-[1025px]:grid-cols-2 gap-6 p-4 mt-[40px] max-[768px]:mt-[20px]">
                {/* Image Section */}
                <div className="flex justify-center items-center">
                    <img
                        src={OurStory}
                        alt="Team"
                        className="w-[70%] h-[700px] max-[768px]:w-[100%] max-[425px]:h-[500px] max-[375px]:h-[400px] max-[320px]:h-[300px] rounded-[14px] p-2"
                    />
                </div>

                {/* Text Section */}
                <div className="text-justify space-y-4 p-2 text-[16px] text-black pr-[100px] max-[1024px]:pr-[0px]">
                    <p>
                        Hi there, I’m <strong>Shahinda Abid</strong>, and <strong>The Table Gem</strong> is a dream that grew straight from my heart.
                    </p>
                    <p>
                        I’ve always believed that the things we bring into our homes should carry more than just beauty—they should hold meaning, care,
                        and responsibility. In 2025, I turned this belief into a journey by starting The Table Gem, with the hope of making eco-friendly
                        living not only accessible but also elegant and joyful.
                    </p>
                    <p>
                        What began as a small idea at my table has now become a community that celebrates mindful choices and sustainable living. Every
                        product we create is a reflection of my vision—to design pieces that bring warmth to your home while also being gentle on the Earth.
                    </p>
                    <p>
                        For me, The Table Gem is not just a brand—it’s a reminder that little choices add up, and together, they can shape a more beautiful,
                        conscious world.
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
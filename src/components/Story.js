import { useNavigate } from 'react-router-dom';
import img9 from '../image/img9.jpg';

const Story = () => {

    const navigate = useNavigate();

    return (
        <div className="px-2 sm:px-6 py-10 mt-10">
            <h2
                className="flex items-center justify-center h-[48px] font-trajan text-[40px] font-normal leading-none tracking-[0.02em] text-black rounded-md shadow-sm mb-6 bg-gradient-to-r from-white via-gray-300 to-white uppercase"
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
                        <strong>The Table gem</strong> Lorem ipsum dolor sit amet. Sed molestias dolor sit
                        inventore galisum et asperiores incidunt eum quidem repellat non architecto
                        aliquam vel quod rerum qui voluptas minima.
                    </p>
                    <p>
                        Quo quis quam et architecto tempore ea mollitia consequatur. Et maiores itaque sit
                        architecto ipsam est eligendi illum 33 veniam deleniti id ipsa vero. Id animi perspiciatis
                        est dolores nostrum aut fuga mollitia sit autem blanditiis est necessitatibus consequatur.
                    </p>
                    <p>
                        Et minus impedit aut nulla eligendi ea dolores quam est voluptatum voluptatibus ut enim aspernatur.
                        Ut esse corporis sit nesciunt nihil et itaque quod quo voluptatum culpa et aspernatur quia aut modi aspernatur.
                    </p>
                    <p>
                        Ea delectus voluptas id tenetur aliquam ut repellat debitis quo cupiditate amet. Aut galisum debitis vel veritatis
                        rerum et illo dolorem id velit voluptate non doloribus vitae. Ea rerum velit et galisum velit ab quia neque. Et
                        facere quam sed deleniti rerum et aliquid laudantium et recusandae fuga et sunt quaerat et facilis facere
                    </p>
                    <p>
                        Et illum omnis ut molestias cupiditate ut sunt sequi aut dignissimos dolor. Ad
                        rerum ducimus eos doloremque quae et illo recusandae eos itaque iste.
                    </p>
                    <p>
                        Qui cupiditate dolor qui possimus mollitia ut neque earum sit voluptatem debitis ea
                        dolorem voluptates. Nam provident nisi id dolor earum qui enim officia.
                    </p>
                    <p>
                        Aut quaerat quae At excepturi minus ut dolore sunt est nostrum veniam. Ut esse
                        corporis sit nesciunt nihil et itaque quod quo voluptatum.
                    </p>
                </div>
            </div>

            <div className="flex justify-center mt-[100px] w-full">
                <button
                    className="w-[110px] h-[40px] font-lato font-semibold text-[14px] leading-[120%] tracking-[0.02em] text-center align-middle border border-green-900 bg-[#0D4017] text-white px-6 py-2 rounded-md cursor-pointer hover:bg-white hover:text-[#0D4017] transition duration-300 mt-15"
                    onClick={() => navigate('/')}
                >
                    Back
                </button>
            </div>
        </div>
    )
}

export default Story;
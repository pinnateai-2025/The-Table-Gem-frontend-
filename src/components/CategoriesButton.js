import { useNavigate } from "react-router-dom";

const CategoriesButton = ({ categories = [] }) => {
  const navigate = useNavigate();

  const handleClick = (category) => {
    if (category.onClick) {
      category.onClick();
    } else if (!category.disabled && category.path) {
      navigate(category.path, { state: category.state || {} });
    }
  };

  // Dynamically set grid columns when 3, 4, or 5 items
  const getGridCols = () => {
    if (categories.length === 3) return "grid-cols-3";
    if (categories.length === 4) return "grid-cols-4";
    if (categories.length === 5) return "grid-cols-5";
    return "auto-cols-auto"; // default for scroll
  };

  return (
    <div className="bg-white w-full flex items-center justify-center py-6 px-3 sm:py-6 sm:px-4 md:py-10 md:px-5">
      <div
        className={`
          flex gap-4 overflow-x-auto no-scrollbar
          sm:gap-6
          md:gap-8
          lg:grid ${getGridCols()} lg:gap-8 lg:overflow-visible lg:w-full
        `}
      >
        {categories.map((category) => (
          <button
            key={category.name}
            onClick={() => handleClick(category)}
            className={`
              bg-[#0f2e0f] text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold
              rounded-[15px] px-4 py-2 sm:px-6 sm:py-3 border border-[#6b6b4f]
              hover:bg-white hover:text-[#0f2e0f] hover:border-[#0f2e0f] hover:border-[3px]
              transition duration-300 flex-shrink-0 lg:w-full max-[768px]:w-[200px] max-[500px]:w-[150px]  max-[375px]:w-[130px]
              ${category.disabled ? "pointer-events-none" : "cursor-pointer"}
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesButton;

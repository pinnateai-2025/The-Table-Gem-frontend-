const CategoriesButton = () => {
  const categories = [
    "Coffee Mugs",
    "Dinner Sets",
    "Drinkware",
    "Tableware",
    "Kitchenware",
  ];

  return (
    <div className="bg-white w-full flex items-center justify-center py-6 px-3 sm:py-6 sm:px-4 md:py-10 md:px-5">
      {/* Wrapper */}
      <div
        className="
          flex gap-4 overflow-x-auto no-scrollbar
          sm:gap-6
          md:gap-8
          lg:grid lg:grid-cols-5 lg:gap-8 lg:overflow-visible lg:w-full
        "
      >
        {categories.map((category) => (
          <button
            key={category}
            className="bg-[#0f2e0f] text-white text-sm sm:text-base md:text-lg lg:text-xl font-semibold
              rounded-[15px] px-4 py-2 sm:px-6 sm:py-3 border border-[#6b6b4f]
              hover:bg-white hover:text-[#0f2e0f] hover:border-[#0f2e0f] hover:border-[3px]
              transition duration-300 min-w-[120px] sm:min-w-[150px] md:min-w-[200px] h-[50px] sm:h-[60px] cursor-pointer flex-shrink-0
              lg:min-w-0 lg:w-full
            "
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesButton;

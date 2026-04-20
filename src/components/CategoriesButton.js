import { useNavigate } from "react-router-dom";

const CategoriesButton = ({ categories = [] }) => {
  const navigate = useNavigate();

  if (!categories.length) return null;

  const handleClick = (category) => {
    if (category.onClick) category.onClick();
    else if (!category.disabled && category.path)
      navigate(category.path, { state: category.state || {} });
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&display=swap');
        .cat-btn { font-family: 'Cormorant Garamond', serif; position: relative; overflow: hidden; }
        .cat-btn::before { content: ''; position: absolute; inset: 0; background: #0D4017; transform: scaleX(0); transform-origin: left; transition: transform 0.35s ease; z-index: 0; }
        .cat-btn:hover::before { transform: scaleX(1); }
        .cat-btn span { position: relative; z-index: 1; }
      `}</style>

      <section className="w-full py-10 px-6 bg-[#FAFAF7]">
        <p className="text-center text-[10px] tracking-[0.35em] text-[#0D4017]/50 uppercase mb-6" style={{ fontFamily: "'Cormorant Garamond', serif" }}>
          Browse by Category
        </p>

        <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => handleClick(category)}
              disabled={category.disabled}
              className={`cat-btn border border-[#0D4017] text-[#0D4017] hover:text-white text-sm px-7 py-2.5 rounded-full transition-colors duration-300 tracking-wider disabled:opacity-40 disabled:cursor-not-allowed`}
              style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '15px', fontWeight: 500, letterSpacing: '0.1em' }}
            >
              <span>{category.name}</span>
            </button>
          ))}
        </div>
      </section>
    </>
  );
};

export default CategoriesButton;
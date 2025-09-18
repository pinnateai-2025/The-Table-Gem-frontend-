
const Footer2 = () => {
  return (
    <footer className="bg-[#0D4017] text-white text-center px-10 py-6">
      <p>&copy; {new Date().getFullYear()} The Table Gem. All rights reserved.</p> <br />
       <p>
        Designed and Developed by{" "}
        <a 
          href="https://pinnate.vercel.app/" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="text-white-400 hover:underline"
        >
          Pinnate Technologies
        </a>
      </p>
    </footer>
  );
};

export default Footer2;


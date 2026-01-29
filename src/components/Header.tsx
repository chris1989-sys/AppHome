import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
            <span className="text-slate-500">App</span>
            <span className="text-slate-700">Store</span>
            <img src={'/images/MyAPP.png'} alt="App Store Logo" className="h-5 w-5 ml-2" />
          </h1>
        </Link>

        <ul className="flex gap-4">
          <Link to="/">
            <li className="hidden sm:inline text-slate-700 hover:underline">
              Home
            </li>
          </Link>
        </ul>
      </div>
    </header>
  );
};

export default Header;

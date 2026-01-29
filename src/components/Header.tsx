import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-slate-100 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to="/">
          <div className="flex items-center">
            <img src={'/images/MyAPP.jpg'} alt="App Store Logo" className="h-5 w-5 mr-2" />
            <h1 className="font-bold text-sm sm:text-xl flex flex-wrap">
              <span className="text-slate-500">My</span>
              <span className="text-slate-700">AppHome</span>
            </h1>
          </div>
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

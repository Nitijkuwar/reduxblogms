import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, LogIn, UserPlus, Search } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "../../../store/searchSlice";

const Navbar = () => {
  const dispatch = useDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const { token: user } = useSelector((state) => state.auth);
  const searchQuery = useSelector((state) => state.search.query);

  useEffect(() => {
    const token = localStorage.getItem("jwt");
    setIsLoggedIn(!!token || !!user);
  }, [user]);

  const handleLogout = () => {
    localStorage.removeItem("jwt");
    setIsLoggedIn(false);
  };

  const handleSearch = (e) => {
    dispatch(setSearchQuery(e.target.value));
  };

  const toggleMobileSearch = () => {
    setShowMobileSearch((prev) => !prev);
  };

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Brand */}
        <span className="text-xl font-bold text-blue-700 dark:text-white">
          MyBlog
        </span>

        {/* Mobile Icons & Hamburger (Visible <640px) */}
        <div className="flex items-center gap-3 md:hidden">
          {/* Login Icon */}
          <NavLink
            to="/login"
            className="text-blue-700 dark:text-white"
            title="Login"
          >
            <LogIn size={24} />
          </NavLink>

          {/* Signup Icon */}
          <NavLink
            to="/register"
            className="text-blue-700 dark:text-white"
            title="Signup"
          >
            <UserPlus size={24} />
          </NavLink>

          {/* Search Icon toggles search input */}
          <button
            onClick={toggleMobileSearch}
            className="text-blue-700 dark:text-white"
            title="Search"
          >
            <Search size={24} />
          </button>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Search Input Mobile (only when toggled and on mobile) */}
        {showMobileSearch && (
          <div className="w-full px-4 py-2 md:hidden">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by title or author..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
          </div>
        )}

        {/* Tablet & Desktop Navigation (≥640px) */}
        <div className="hidden md:flex md:items-center md:gap-6 lg:gap-8">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearch}
              placeholder="Search by title or author..."
              className="px-4 py-2 w-72 md:w-80 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 text-white bg-blue-600 rounded-md hover:bg-white hover:text-black transition-colors">
              Search
            </button>
          </div>

          {/* Nav Links (Home and AddBlog) */}
          <NavLink
            to="/"
            className="text-lg font-medium text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
          >
            Home
          </NavLink>
          <NavLink
            to="/blog/add"
            className="text-lg font-medium text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
          >
            AddBlog
          </NavLink>

          {/* Authentication Buttons */}
          {isLoggedIn ? (
            <NavLink
              onClick={handleLogout}
              to="/login"
              className="ml-auto text-lg text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Logout
            </NavLink>
          ) : (
            <div className="ml-auto flex gap-3">
              <NavLink
                to="/login"
                className="text-lg text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className="text-lg text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
              >
                Signup
              </NavLink>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Menu (visible only below md when hamburger clicked) */}
      {isOpen && (
        <div className="md:hidden px-4 pb-4 space-y-4">
          <NavLink
            to="/"
            className="block text-lg font-medium text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/blog/add"
            className="block text-lg font-medium text-gray-700 hover:text-blue-700 dark:text-white dark:hover:text-blue-400"
            onClick={() => setIsOpen(false)}
          >
            AddBlog
          </NavLink>
          {isLoggedIn ? (
            <NavLink
              to="/login"
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="block text-lg text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-4 py-2 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
            >
              Logout
            </NavLink>
          ) : (
            <></>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;

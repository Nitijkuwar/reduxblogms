import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        {/* Brand */}
        <span className="text-xl font-bold text-blue-700 dark:text-white">
          MyBlog
        </span>

        {/* Hamburger Menu */}
        <div className="flex items-center gap-4 lg:hidden">
          {/* Login & Signup (Always visible) */}
          <NavLink
            to="/login"
            className="text-sm text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-3 py-1 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
          >
            Login
          </NavLink>
          <NavLink
            to="/register"
            className="text-sm text-blue-700 border border-blue-700 hover:bg-blue-700 hover:text-white font-medium rounded-lg px-3 py-1 dark:text-white dark:border-white dark:hover:bg-white dark:hover:text-gray-900"
          >
            Signup
          </NavLink>

          {/* Hamburger Icon */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-gray-700 dark:text-white focus:outline-none"
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-6">
          <div className="relative">
            <input
              type="text"
              placeholder="Search..."
              className="px-4 py-2 w-80 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
            />
            <button className="absolute right-1 top-1 bottom-1 px-3 text-lg text-white bg-blue-600 rounded-md hover:bg-white hover:text-black">
              Search
            </button>
          </div>
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
        </div>

        {/* Desktop Login/Signup */}
        <div className="hidden lg:flex items-center gap-2">
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
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden px-4 pb-4 space-y-4">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white dark:border-gray-600"
          />
          <div className="flex flex-col gap-2">
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
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

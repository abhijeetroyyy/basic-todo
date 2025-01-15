import React, { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../store/themeAction";
import logo from "../images/logo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const dispatch = useDispatch();

  // Access theme state from Redux
  const isDarkMode = useSelector((state) => state.theme.isDarkMode);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  // Close menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        closeMenu();
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isMenuOpen]);

  return (
    <nav className={`w-full lg:p-5 ${isDarkMode ? "bg-[#242424] text-white" : "bg-white text-black"}`}>
      {/* Desktop Navigation */}
      <div className="hidden md:flex items-center justify-between px-6 py-4">
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer text-2xl ri-menu-line"
            aria-label="Menu"
            onClick={toggleMenu}
          />
          <img className="h-8" src={logo} alt="Logo" />
        </div>
        <div className="flex items-center gap-6">
          <button
            className="cursor-pointer text-2xl ri-search-line"
            aria-label="Search"
          />
          <button
            className="cursor-pointer text-2xl ri-layout-grid-line"
            aria-label="Grid"
          />
          <button
            className={`cursor-pointer text-2xl ${
              isDarkMode ? "ri-sun-line" : "ri-moon-clear-line"
            }`}
            aria-label="Toggle Theme"
            onClick={handleThemeToggle}
          />
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden flex items-center justify-between px-4 py-3">
        <button
          className="cursor-pointer text-3xl ri-menu-line"
          aria-label="Menu"
          aria-expanded={isMenuOpen}
          onClick={toggleMenu}
        />
        <img className="h-6" src={logo} alt="Logo" />
        <button
          className={`cursor-pointer text-3xl ${
            isDarkMode ? "ri-sun-line" : "ri-moon-clear-line"
          }`}
          aria-label="Toggle Theme"
          onClick={handleThemeToggle}
        />
      </div>  

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div
          ref={menuRef}
          className={`md:hidden absolute top-16 left-0 w-full ${
            isDarkMode ? "bg-[#242424]" : "bg-gray-100"
          } shadow-lg py-4 animate-slide-down`}
        >
          <div className="flex flex-col items-center gap-4">
            <button
              className={`cursor-pointer text-xl flex items-center gap-2 px-4 py-2 rounded-md ${
                isDarkMode ? "hover:bg-[#3a3a3a]" : "hover:bg-gray-200"
              }`}
              aria-label="Search"
            >
              <i className="ri-search-line text-xl"></i> Search
            </button>
            <button
              className={`cursor-pointer text-xl flex items-center gap-2 px-4 py-2 rounded-md ${
                isDarkMode ? "hover:bg-[#3a3a3a]" : "hover:bg-gray-200"
              }`}
              aria-label="Grid"
            >
              <i className="ri-layout-grid-line text-xl"></i> Grid
            </button>
            <button
              className={`cursor-pointer text-xl flex items-center gap-2 px-4 py-2 rounded-md ${
                isDarkMode ? "hover:bg-[#3a3a3a]" : "hover:bg-gray-200"
              }`}
              aria-label="Close Menu"
              onClick={closeMenu}
            >
              <i className="ri-close-line text-xl"></i> Close
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const { isDark, toggleTheme } = useTheme();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Products', path: '/products' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blogs', path: '/blogs' },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-white dark:bg-gray-800 shadow-lg sticky top-0 z-50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img
              src="/Final grace bg removed.png"
              alt="Grace.ev Logo"
              className="h-10 w-10 rounded-md p-1 dark:bg-white"
            />
            <span className="text-2xl font-bold text-green-700 dark:text-green-400">
              Grace.ev
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${isActive(link.path)
                    ? 'text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                    : 'text-gray-600 hover:text-green-700 hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20'
                  }`}
              >
                {link.name}
              </Link>
            ))}

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20 transition-colors duration-200"
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md text-gray-600 hover:text-green-700 hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20 transition-colors duration-200"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${isActive(link.path)
                      ? 'text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20'
                      : 'text-gray-600 hover:text-green-700 hover:bg-green-50 dark:text-gray-300 dark:hover:text-green-400 dark:hover:bg-green-900/20'
                    }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

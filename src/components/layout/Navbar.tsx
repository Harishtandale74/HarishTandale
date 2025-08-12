import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Menu, X, Moon, Sun, Code, ChevronDown, Award, Briefcase, GraduationCap } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
    setIsDropdownOpen(false);
  }, [location.pathname]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Skills', path: '/skills' },
    { name: 'Projects', path: '/projects' },
    { name: 'Resume', path: '/resume' },
    { name: 'Contact', path: '/contact' },
  ];

  const certificationItems = [
    { 
      name: 'Internship', 
      path: '/certifications/internship',
      icon: <Briefcase className="h-4 w-4" />,
      description: 'Professional internship experiences'
    },
    { 
      name: 'Coursework Certification', 
      path: '/certifications/coursework',
      icon: <GraduationCap className="h-4 w-4" />,
      description: 'Academic and online course certificates'
    },
  ];
  const navbarClasses = `
    fixed w-full z-50 transition-all duration-300 
    ${scrolled ? 'bg-white dark:bg-gray-900 shadow-md' : 'bg-transparent'}
  `;

  return (
    <nav className={navbarClasses}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <Code className="h-8 w-8 text-primary-600 dark:text-primary-400" />
              <span className="ml-2 text-xl font-bold text-gray-900 dark:text-white">
                Harish 
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  px-1 py-2 text-sm font-medium relative
                  ${location.pathname === item.path 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}
                `}
              >
                {item.name}
                {location.pathname === item.path && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 w-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            ))}
            
            {/* Certification Dropdown */}
            <div 
              className="relative"
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
            >
              <button
                className={`
                  flex items-center px-1 py-2 text-sm font-medium relative
                  ${location.pathname.startsWith('/certifications') 
                    ? 'text-primary-600 dark:text-primary-400' 
                    : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'}
                  transition-colors duration-200
                `}
              >
                <Award className="h-4 w-4 mr-1" />
                Certification
                <ChevronDown className={`h-4 w-4 ml-1 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                {location.pathname.startsWith('/certifications') && (
                  <motion.div 
                    className="absolute bottom-0 left-0 h-0.5 bg-primary-600 dark:bg-primary-400 w-full"
                    layoutId="navbar-indicator"
                  />
                )}
              </button>
              
              {/* Dropdown Menu */}
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ 
                  opacity: isDropdownOpen ? 1 : 0, 
                  y: isDropdownOpen ? 0 : -10,
                  scale: isDropdownOpen ? 1 : 0.95
                }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={`
                  absolute top-full left-0 mt-2 w-72 bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden
                  ${isDropdownOpen ? 'pointer-events-auto' : 'pointer-events-none'}
                `}
              >
                <div className="py-2">
                  {certificationItems.map((item, index) => (
                    <Link
                      key={item.name}
                      to={item.path}
                      className="flex items-start px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors duration-200 group"
                    >
                      <div className="flex-shrink-0 mt-0.5 text-primary-600 dark:text-primary-400 group-hover:text-primary-700 dark:group-hover:text-primary-300">
                        {item.icon}
                      </div>
                      <div className="ml-3">
                        <div className="text-sm font-medium text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400">
                          {item.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                          {item.description}
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                
                {/* Dropdown Footer */}
                <div className="px-4 py-3 bg-gray-50 dark:bg-gray-700/50 border-t border-gray-200 dark:border-gray-600">
                  <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Award className="h-3 w-3 mr-1" />
                    View all certifications and achievements
                  </div>
                </div>
              </motion.div>
            </div>
            
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5 text-yellow-400" />
              ) : (
                <Moon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            <button
              onClick={handleToggle}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <X className="block h-6 w-6" aria-hidden="true" />
              ) : (
                <Menu className="block h-6 w-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          className="md:hidden bg-white dark:bg-gray-900 shadow-xl"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`
                  block px-3 py-2 rounded-md text-base font-medium
                  ${location.pathname === item.path 
                    ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800' 
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                `}
              >
                {item.name}
              </Link>
            ))}
            
            {/* Mobile Certification Section */}
            <div className="border-t border-gray-200 dark:border-gray-700 pt-2 mt-2">
              <div className="px-3 py-2 text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                Certification
              </div>
              {certificationItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`
                    flex items-center px-3 py-2 rounded-md text-base font-medium
                    ${location.pathname === item.path 
                      ? 'text-primary-600 dark:text-primary-400 bg-gray-100 dark:bg-gray-800' 
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'}
                  `}
                >
                  <div className="mr-3 text-primary-600 dark:text-primary-400">
                    {item.icon}
                  </div>
                  <div>
                    <div className="text-sm">{item.name}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">
                      {item.description}
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </nav>
  );
};

export default Navbar;
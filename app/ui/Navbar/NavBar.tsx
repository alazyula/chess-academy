"use client"
import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

interface Course {
  name: string;
  href: string;
}

const courses: Course[] = [
  { name: "Course 1", href: "/course-1" },
  { name: "Course 2", href: "/course-2" },
  { name: "Course 3", href: "/course-3" }
];

interface DropdownProps {
  links: Course[];
}

const Dropdown = ({ links }: DropdownProps) => {
  return (
    <div className="md:absolute md:left-1/2 md:transform md:-translate-x-1/2 mt-2 w-48 md:rounded-md md:shadow-lg bg-slate-200 dark:bg-slate-600 dark:text-slate-300 md:ring-1 ring-black ring-opacity-5 z-50">
      <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
        {links.map((link, index) => (
          <Link key={index} href={link.href}>
            <p className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600" role="menuitem">
              {link.name}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileDropdownOpen, setMobileDropdownOpen] = useState(false);
  const dropdownTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleMouseEnter = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
    setDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 2000);
  };

  const handleMouseEnterDropdown = () => {
    if (dropdownTimeoutRef.current) {
      clearTimeout(dropdownTimeoutRef.current);
      dropdownTimeoutRef.current = null;
    }
  };

  const handleMouseLeaveDropdown = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setDropdownOpen(false);
    }, 250);
  };

  const toggleMobileDropdown = () => {
    setMobileDropdownOpen(!mobileDropdownOpen);
  };

  useEffect(() => {
    return () => {
      if (dropdownTimeoutRef.current) {
        clearTimeout(dropdownTimeoutRef.current);
      }
    };
  }, []);

  return (
    <nav className="bg-slate-200 dark:bg-slate-600 dark:text-slate-300 relative z-50">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/"><Logo /></Link>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <p>Hakkımızda</p>
            <div 
              className="relative"
              onMouseEnter={handleMouseEnter} 
              onMouseLeave={handleMouseLeave}
            >
              <button className="text-gray-700 dark:text-gray-200">Eğitimler</button>
              {dropdownOpen && (
                <div 
                  onMouseEnter={handleMouseEnterDropdown}
                  onMouseLeave={handleMouseLeaveDropdown}
                >
                  <Dropdown links={courses} />
                </div>
              )}
            </div>
            <Link href="/blog">Blog</Link>
            <Link href="/contact">İletişim</Link>
          </div>
          <div className="hidden md:flex items-center">
            <ThemeSwitch />
          </div>
          <div className="md:hidden flex items-center">
            <button
              type="button"
              onClick={toggleMenu}
              className="text-gray-800 dark:text-gray-200 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">Hakkımızda</p>
            <div className="relative">
              <button onClick={toggleMobileDropdown} className="block w-full text-left px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">
                Eğitimler
              </button>
              {mobileDropdownOpen && (
                <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                  <Dropdown links={courses} />
                </div>
              )}
            </div>
            <Link href="/blog">
              <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">Blog</p>
            </Link>
            <Link href="/contact">
              <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">İletişim</p>
            </Link>
            <div className="px-3 py-2">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;

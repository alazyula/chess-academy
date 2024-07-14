"use client"
import { useState } from 'react';
import Link from 'next/link';
import ThemeSwitch from './ThemeSwitch';
import Logo from './Logo';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-slate-200 dark:bg-slate-600 dark:text-slate-300">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/"><Logo/></Link>
          </div>
          <div className="hidden md:flex items-center space-x-10">
            <p>Hakkımızda</p>
            <p>Eğitimler</p>
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
            <p className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 dark:text-gray-200">Eğitimler</p>
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

// src/components/Navbar/Navbar.tsx
'use client'

import Link from 'next/link'
import { useState } from 'react'
import { MagnifyingGlassIcon, Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Left Section */}
          <div className="flex items-center space-x-8">
            {/* Logo */}
            <Link href="/" className="text-gray-600 text-2xl font-bold text-primary">
              MedToHeal
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/upload-prescription"
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Upload Prescription
              </Link>
              <Link
                href="/doctors"
                className="text-gray-600 hover:text-primary transition-colors duration-200"
              >
                Search Doctor
              </Link>
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-6">
            {/* Search Icon */}
            <button className="text-gray-600 hover:text-primary">
              <MagnifyingGlassIcon className="h-6 w-6" />
            </button>

            {/* Auth Links */}
            <div className="hidden md:flex items-center space-x-4">
              <Link
                href="/auth/login"
                className="text-gray-600 hover:text-primary px-3 py-2 transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="text-gray-600 hover:text-primary px-3 py-2 transition-colors duration-200"
              >
                Register
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-gray-600 hover:text-primary"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-16 inset-x-0 bg-white shadow-lg">
            <div className="px-4 py-4 space-y-4">
              <Link
                href="/"
                className="block text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/upload-prescription"
                className="block text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Upload Prescription
              </Link>
              <Link
                href="/doctors"
                className="block text-gray-600 hover:text-primary"
                onClick={() => setIsOpen(false)}
              >
                Search Doctor
              </Link>
              <div className="pt-4 border-t border-gray-200">
                <Link
                  href="/auth/login"
                  className="block text-gray-600 hover:text-primary py-2"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link
                  href="/auth/register"
                  className="block bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary-dark"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
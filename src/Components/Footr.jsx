import React from 'react';
import { AcademicCapIcon, GlobeAltIcon, CameraIcon, BriefcaseIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-blue-100 text-black py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 hidden md:inline-block">
            <h3 className="text-lg font-semibold mb-2">Company</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">About Us</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Careers</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Contact Us</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 hidden md:inline-block">
            <h3 className="text-lg font-semibold mb-2">Support</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Help Center</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Safety Information</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Cancellation Options</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6 hidden md:inline-block">
            <h3 className="text-lg font-semibold mb-2">Community</h3>
            <ul>
              <li className="mb-2">
                <a href="#" className="hover:underline">Events</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Blog</a>
              </li>
              <li className="mb-2">
                <a href="#" className="hover:underline">Forum</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 mb-6">
            <h3 className="text-lg font-semibold mb-2">Follow Us</h3>
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:underline">
                  <AcademicCapIcon className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <GlobeAltIcon className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <CameraIcon className="w-6 h-6" />
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  <BriefcaseIcon className="w-6 h-6" />
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-8 text-center text-black-400">
          &copy; 2024 BubyKu. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

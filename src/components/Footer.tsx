import React from 'react';
import { Mail, Phone, MapPin, Linkedin, Twitter, Instagram } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-white transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <img
                src="/Final grace bg removed.png"
                alt="Grace.ev Logo"
                className="h-8 w-8"
              />
              <span className="text-xl font-bold">Grace.ev</span>
            </div>
            <p className="text-gray-300 mb-4">
              Empowering independence through innovative assistive technology.
              We create advanced mobility solutions to help people live their lives to the fullest.
            </p>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail size={16} className="text-green-400" />
                <span className="text-gray-300">info@gracemobility.in</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone size={16} className="text-green-400" />
                <span className="text-gray-300">+91 9886665410</span>
              </div>
              <div className="flex items-start space-x-3">
                <MapPin size={16} className="text-green-400 mt-1" />
                <span className="text-gray-300">
                  Da Costa Layout, 2nd cross, Wheeler Rd Ext<br />
                  St Thomas Town, Bengaluru, Karnataka 560084
                </span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/about" className="text-gray-300 hover:text-green-400 transition-colors">About Us</a></li>
              <li><a href="/products" className="text-gray-300 hover:text-green-400 transition-colors">Products</a></li>
              <li><a href="/careers" className="text-gray-300 hover:text-green-400 transition-colors">Careers</a></li>
              <li><a href="/blogs" className="text-gray-300 hover:text-green-400 transition-colors">Blog</a></li>
              <li><a href="#" className="text-gray-300 hover:text-green-400 transition-colors">Support</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            © {new Date().getFullYear()} Grace.ev. All rights reserved. | Privacy Policy | Terms of Service
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
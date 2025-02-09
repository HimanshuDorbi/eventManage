import React from "react";
import { Home, Mail, Phone, Instagram, Twitter, Facebook } from "lucide-react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-gray-200">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-white">
              EventManage<span className="text-indigo-500">.</span>
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Discover and join amazing events happening near you. Your one-stop
              platform for event management and discovery.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter size={20} />
              </a>
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors inline-flex items-center"
                >
                  <Home size={16} className="mr-2" /> Home
                </a>
              </li>
              <li>
                <a
                  href="/register"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Signup
                </a>
              </li>
              <li>
                <a
                  href="/dashboard"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/dashboard/profile"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Profile
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Terms of Service
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <a
                  href="/"
                  className="text-gray-400 hover:text-indigo-400 transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-white">Contact Us</h4>
            <ul className="space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail size={16} className="mr-2" />
                <span>codeewithdorbi@gmail.com</span>
              </li>
              <li className="flex items-center text-gray-400">
                <Phone size={10} className="mr-2" />
                <span>+91-7017258457</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} EventManage. All rights
              reserved.
            </p>
            <div className="flex space-x-6">
              <a
                href="/terms"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Terms
              </a>
              <a
                href="/privacy"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Privacy
              </a>
              <a
                href="/cookies"
                className="text-sm text-gray-400 hover:text-indigo-400 transition-colors"
              >
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

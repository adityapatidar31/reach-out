import { Facebook, Twitter, Instagram, HeartHandshake } from "lucide-react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bg-blue-950 text-white py-6 mt-6">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        {/* Logo & Name */}
        <div className="text-center md:text-left">
          <div className="flex items-center gap-2">
            <HeartHandshake className="w-7 h-7 text-white" />
            <h2 className="text-2xl font-bold">Reach-Out</h2>
          </div>
          <p className="text-sm opacity-75">
            Connecting people, one help at a time.
          </p>
        </div>

        {/* Navigation */}
        <nav className="flex space-x-6 my-4 md:my-0">
          <Link to="/" className="hover:underline">
            Home
          </Link>
          <Link to="/help" className="hover:underline">
            Help
          </Link>
          <Link to="/about" className="hover:underline">
            About
          </Link>
          <Link to="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>

        {/* Social Icons */}
        <div className="flex space-x-4">
          <a href="#" className="hover:opacity-75" aria-label="Facebook">
            <Facebook size={24} />
          </a>
          <a href="#" className="hover:opacity-75" aria-label="Twitter">
            <Twitter size={24} />
          </a>
          <a href="#" className="hover:opacity-75" aria-label="Instagram">
            <Instagram size={24} />
          </a>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-sm opacity-75 mt-4 pr md:pl-32">
        &copy; {new Date().getFullYear()} Reach-Out. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;

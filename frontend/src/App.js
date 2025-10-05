import React, { useState, useEffect } from "react";
import "./App.css";
import { Mail, Linkedin, Menu, X, Calendar, User, PenTool, Brain, Target, BookOpen, MessageSquare } from "lucide-react";
import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Common Section Component
const Section = ({ id, title, subtitle, children, className = "" }) => (
  <section id={id} className={`py-16 px-5 sm:px-8 ${className}`}>
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">{title}</h2>
        {subtitle && <p className="mt-4 text-lg text-gray-600">{subtitle}</p>}
      </div>
      {children}
    </div>
  </section>
);

// Navigation Component
const Nav = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const navLinks = [
    { href: "#focus", label: "Focus" },
    { href: "#experience", label: "Experience" },
    { href: "#tools", label: "Tools" },
    { href: "#blog", label: "Blog" },
    { href: "#ethics", label: "Ethics" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <nav className="fixed top-0 z-50 w-full bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#top" className="text-xl font-bold text-gray-900">
            Robin J. Taylor
          </a>
          
          <div className="hidden md:flex space-x-8">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 text-gray-600 hover:text-gray-900"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden border-t border-gray-200 py-4">
            {navLinks.map(link => (
              <a
                key={link.href}
                href={link.href}
                className="block py-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

// Hero Component
const Hero = () => (
  <section 
    id="top" 
    className="pt-20 pb-16 px-5 sm:px-8 relative overflow-hidden"
    style={{
      backgroundImage: 'url(https://images.unsplash.com/photo-1612151387614-0d29a04ff5f3?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDk1Nzl8MHwxfHNlYXJjaHwxfHxiYXNrZXRiYWxsJTIwYW5hbHl0aWNzfGVufDB8fHx8MTc1OTYxOTgxN3ww&ixlib=rb-4.1.0&q=85)',
      backgroundSize: 'cover',
      backgroundPosition: 'center'
    }}
  >
    <div className="absolute inset-0 bg-black bg-opacity-60"></div>
    
    <div className="mx-auto max-w-6xl relative z-10">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white sm:text-6xl drop-shadow-lg">
          Robin J. Taylor
        </h1>
        <p className="mt-6 text-xl text-gray-100 max-w-3xl mx-auto drop-shadow-md">
          AI-Powered Basketball Analytics Expert | Bringing Real-Time Intelligence to Your Bench
        </p>
        <p className="mt-4 text-lg text-gray-200 italic drop-shadow-md">
          "Think smarter and faster, not harder and slower with AI!"
        </p>
        <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="#contact"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-lg"
          >
            Get In Touch
          </a>
          <a
            href="#focus"
            className="inline-flex items-center px-6 py-3 border border-white text-base font-medium rounded-md text-white bg-white bg-opacity-20 hover:bg-opacity-30 backdrop-blur-sm transition-colors"
          >
            Learn More
          </a>
        </div>
      </div>
    </div>
  </section>
);

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      <Nav />
      <Hero />
    </div>
  );
}

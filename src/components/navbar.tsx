'use client';

import Image from "next/image";
import { ReactElement, useState } from "react";

export default function Navbar(): ReactElement {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header>
      <nav className="px-2 sm:px-6 py-4 flex flex-row items-center justify-center sm:justify-normal gap-8">
        <Image 
          src="/images/img_logo.png" 
          width={180} 
          height={50} 
          alt="Open BO Logo" 
        />
        <div className="hidden sm:flex flex-row items-center gap-2">
          <a href="/" className="text-md font-medium hover:cursor-pointer hover:opacity-40 transition-all duration-200">
            Home
          </a>
        </div>

        {/* Mobile Navigation */}
        <button 
          onClick={() => {
            setShowMenu(!showMenu);
            console.log(showMenu);
          }} 
          className="absolute sm:hidden bg-slate-100 hover:bg-slate-200 transition-all duration-200 rounded-sm right-4"
        >
          <Image 
            width={30} 
            height={30} 
            src="/icons/ic_hamburger.png" 
            alt="Hamburger Icon" 
          />
        </button>
      </nav>
      {showMenu && (
        <nav className="flex flex-col gap-2">
          <a href="/" className="bg-slate-100 px-4 py-2 rounded-md mx-4">
            Home
          </a>
        </nav>
      )}
    </header>
  )
}
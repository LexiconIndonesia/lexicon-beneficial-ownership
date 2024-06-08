'use client'

import Image from 'next/image'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

const navigations: Array<{
  title: string
  link: string
}> = [
  {
    title: 'Data',
    link: '/data'
  },
  {
    title: 'Visualization',
    link: '/visualization'
  }
]

export default function Navbar (): React.ReactElement {
  const [showMenu, setShowMenu] = useState(false)
  const path = usePathname()

  return (
    <header>
      <nav className="px-2 sm:px-32 py-4 h-20  flex flex-row items-center justify-center sm:justify-normal gap-8">
        <a href="/">
          <Image
            src="/images/img_logo.png"
            width={154}
            height={40}
            alt="Lexicon BO Logo"
          />
        </a>
        <div className="hidden sm:flex flex-row items-center gap-8 justify-end w-full">
          {navigations.map((navigation, index) => (
            <div key={index}>
              <a href={navigation.link} className={'text-md font-medium hover:cursor-pointer hover:opacity-40 transition-all duration-200'}>
                {navigation.title}
              </a>
              <div className={`w-full h-1 rounded-md mt-0.5 ${path === navigation.link ? 'bg-colorPrimary' : 'bg-transparent'}`} />
            </div>
          ))}
        </div>

        {/* Mobile Navigation */}
        <button
          onClick={() => {
            setShowMenu(!showMenu)
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
          {navigations.map((navigation, index) => (
            <a key={index} href={navigation.link} className="bg-slate-100 px-4 py-2 rounded-md mx-4">
              {navigation.title}
            </a>
          ))}
        </nav>
      )}
      <div className={'w-full h-[1px] bg-gray20 rounded-md hidden sm:block'} />
    </header>
  )
}

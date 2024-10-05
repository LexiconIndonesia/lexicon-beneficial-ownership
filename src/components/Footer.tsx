import Image from 'next/image'
import React from 'react'
import InstagramIcon from './icons/InstagramIcon'
import LinkedInIcon from './icons/LinkedInIcon'
import GithubIcon from './icons/GithubIcon'

export default function Footer (): React.ReactElement {
  return (
    <footer className="sm:px-32 sm:py-12 px-6 py-10 bg-lightGray flex sm:flex-row flex-col gap-4">
      <div className='w-full sm:w-3/5 flex flex-col'>
        <Image src={'/images/img_logo.png'} width={155} height={40} alt='Lexicon Logo' />
        <p className='text-textGray text-xs font-normal mt-5'>
          Lexicon Beneficial Ownership is a tool designed to help procurement
          officials quickly find individuals or companies with a history of
          fraud and corruption by utilizing advanced keyword and filter systems,
          making the background check process efficient and reliable.
        </p>
        <ul className='flex flex-row gap-2 mt-4'>
          <li>
            <a href="https://www.instagram.com/lexiconsearch/" target='_blank' rel="noreferrer" className='cursor-pointer hover:opacity-80 transition-all duration-200'>
              <InstagramIcon />
            </a>
          </li>
          <li>
            <a href="https://www.linkedin.com/company/lexicon-indo" target='_blank' rel="noreferrer" className='cursor-pointer hover:opacity-80 transition-all duration-200'>
              <LinkedInIcon />
            </a>
          </li>
        </ul>
        <p className='mt-12 text-textGray40 text-sm'>
          © {new Date().getFullYear()} Lexicon Beneficial Ownership. All rights reserved.
        </p>
      </div>
      <div className='flex flex-col items-end flex-1'>
        <a
          href="https://github.com/LexiconIndonesia"
          target='_blank'
          className='flex flex-row justify-center items-center gap-2 bg-gray-200 hover:opacity-80 transition-all duration-200 px-4 py-2 rounded-lg'
          rel="noreferrer">
          <GithubIcon />
          <span className='text-sm font-semibold'>Let&apos;s Contribute!</span>
        </a>
      </div>
    </footer>
  )
}

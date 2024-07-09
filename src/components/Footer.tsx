import Image from 'next/image'
import React from 'react'

export default function Footer (): React.ReactElement {
  return (
    <footer className="sm:px-32 sm:py-12 px-6 py-10 bg-lightGray">
      <div className='w-full sm:w-3/5 flex flex-col'>
        <Image src={'/images/img_logo.png'} width={155} height={40} alt='Lexicon Logo' />
        <p className='text-textGray text-xs font-normal mt-5'>
          LexiconBO is a tool designed to help procurement officials quickly find individuals or companies with a history of fraud and corruption by utilizing advanced keyword and filter systems, making the background check process efficient and reliable.
        </p>
        <p className='mt-12 text-textGray40 text-sm'>
          © {new Date().getFullYear()} LexiconBO. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

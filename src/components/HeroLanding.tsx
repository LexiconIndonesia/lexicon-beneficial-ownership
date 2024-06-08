'use client'

import React from 'react'
import SearchIcon from './ui/SearchIcon'
import { useRouter } from 'next/navigation'

export default function HeroLanding (): React.ReactElement {
  const router = useRouter()
  return (
    <div className="py-10 sm:py-32 flex flex-col justify-center items-center">
      <h1 className='text-[36px] font-bold'>Discover Procurement Integrity with <span className='text-colorPrimary'>LexiconBO</span></h1>
      <h3 className='text-textGrayBold text-xl mt-2 font-normal'>Quickly identify individuals or companies with a track record of fraud and corruption.</h3>
      {/* <Input
        placeholder='Enter Company name or individual'
        className="w-3/5 mt-9"
        startContent={<SearchIcon />}
         /> */}
      <div className='w-full sm:w-3/5 flex flex-row items-center gap-3 px-5 border rounded-full mt-9'>
        <SearchIcon />
        <input onKeyDown={(event) => {
          if (event.key === 'Enter') {
            router.replace('/data?query=' + event.currentTarget.value)
          }
        }} className='w-full flex-1 py-3 px-1 sm:px-2 outline-none' type="search" placeholder='Enter company name or individual...' />
      </div>
    </div>
  )
}

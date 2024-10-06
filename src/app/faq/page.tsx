'use client'

import ChevronIcon from '@/components/icons/ChevronIcon'
import { Divider } from '@nextui-org/react'
import React, { useState } from 'react'

function DropdownItem ({ value }: { value: string }): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className='border-1 rounded-md shadow-sm active:shadow-md transition-all duration-200'>
        <div className="header flex flex-row justify-between w-full cursor-pointer px-4 py-4" onClick={() => { setIsOpen(!isOpen) }}>
            <h1 className='font-semibold text-lg select-none'>Test?</h1>
            <ChevronIcon rotation={isOpen ? 'up' : 'down'} />
        </div>
        <div className={`${isOpen ? 'block' : 'hidden'} px-4 pb-4`}>
            <Divider className='mb-2' />
            <div className="content">
                <p className='font-light text-sm mt-2 leading-6'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa optio hic numquam velit perferendis quae. Sed sint alias modi ullam repellendus odit beatae provident! Deserunt, sint minima sunt voluptates molestiae veritatis iusto similique, obcaecati est illo consequuntur, error excepturi accusantium laudantium officiis vitae ad sapiente aut voluptas nobis? Quos in facere ipsa blanditiis illum minima pariatur, iure nihil necessitatibus, ea suscipit. Maiores rerum dolores autem eum provident facere eius consequatur amet sequi magni adipisci deleniti pariatur suscipit, eos fugiat? Nostrum hic soluta possimus, sequi fuga maxime? Exercitationem cupiditate consectetur magnam libero repudiandae praesentium nesciunt voluptas autem, quo aliquid voluptatibus error!</p>
            </div>
        </div>
    </div>
  )
}

export default function FaqPage (): React.ReactElement {
  return (
    <main className='py-8 flex flex-col justify-center items-center'>
      <div className='py-16'>
        <img src="/images/img_background_small.png" alt="Background Hero" className='absolute top-0 left-0 right-0 -z-10 mt-2 hidden sm:block' />
        <div className='flex flex-col items-center bg-white z-10'>
          <h1 className='text-[40px] font-semibold'>Explore Common Questions</h1>
        </div>
      </div>
      <div className="flex flex-col w-full px-32 py-16 gap-4">
        <DropdownItem value='Test' />
        <DropdownItem value='Test' />
        <DropdownItem value='Test' />
        <DropdownItem value='Test' />
      </div>
    </main>
  )
}

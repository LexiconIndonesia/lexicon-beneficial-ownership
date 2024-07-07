'use client'

import { type GetCasesResponse } from '@/types/cases'
import React from 'react'
import { Button, Divider } from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/utils/strings'
import PageBreakIcon from './icons/PageBreakIcon'
import LocationOnIcon from './icons/LocationOnIcon'
import DateIcon from './icons/DateIcon'

export default function DetailPersonTable ({
  data
}: {
  data?: GetCasesResponse
}): React.ReactElement {
  return (
    <>
    <div className='flex flex-row justify-between'>
      <div className='flex flex-col gap-2'>
        <p className='text-base text-colorSecondaryText'>
          {capitalizeFirstLetter(data?.subject_type ?? '')}
        </p>
        <h1 className='text-2xl font-medium'>
          {data?.subject}
        </h1>
      </div>
      <Button onClick={() => { window.open(data?.link, '_blank', 'rel=noopener noreferrer') }} radius='full' className='bg-colorSecondaryBackground text-colorPrimary font-semibold'>
        Check Source
      </Button>
      </div>
      <Divider className='border border-colorBorder mt-[18px]' />
      <div className='flex flex-row items-center my-3 gap-6'>
        <div className='flex flex-row items-center gap-1'>
          <PageBreakIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(data?.type ?? '')}</h6>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <LocationOnIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(data?.nation ?? '')}</h6>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <DateIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(data?.year ?? '')}</h6>
        </div>
      </div>
      <Divider className='border border-colorBorder' />
      <h3 className='text-colorPrimaryText text-xl font-bold mt-8'>Summary</h3>
      <p className='mt-2 text-colorSecondaryText'>
        {data?.summary ?? []}
      </p>
    </>
  )
}

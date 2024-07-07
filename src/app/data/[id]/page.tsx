'use server'

import React from 'react'
import { getCase } from '@/services/cases'
import { capitalizeFirstLetter } from '@/utils/strings'
import { Button, Divider } from '@nextui-org/react'
import PageBreakIcon from '@/components/icons/PageBreakIcon'
import LocationOnIcon from '@/components/icons/LocationOnIcon'
import DateIcon from '@/components/icons/DateIcon'

export default async function DetailPage ({ params }: { params: { id: string } }): Promise<React.ReactElement> {
  const response = await getCase(params.id)

  if (response.error != null) {
    throw new Error(response.error)
  }

  return (
    <main className="mt-16 mb-36 mx-[297px]">
      <div className='flex flex-row justify-between'>
        <div className='flex flex-col gap-2'>
          <p className='text-base text-colorSecondaryText'>
            {capitalizeFirstLetter(response.success?.data?.subject_type ?? '')}
          </p>
          <h1 className='text-2xl font-medium'>
            {response?.success?.data?.subject}
          </h1>
        </div>
        <Button radius='full' className='bg-colorSecondaryBackground text-colorPrimary font-semibold'>
          Check Source
        </Button>
      </div>
      <Divider className='border border-colorBorder mt-[18px]' />
      <div className='flex flex-row items-center my-3 gap-6'>
        <div className='flex flex-row items-center gap-1'>
          <PageBreakIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(response.success?.data?.type ?? '')}</h6>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <LocationOnIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(response.success?.data?.nation ?? '')}</h6>
        </div>
        <div className='flex flex-row items-center gap-1'>
          <DateIcon />
          <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(response.success?.data?.year ?? '')}</h6>
        </div>
      </div>
      <Divider className='border border-colorBorder' />
      <h3 className='text-colorPrimaryText text-xl font-bold mt-8'>Summary</h3>
      <p className='mt-2 text-colorSecondaryText'>
        {response.success?.data?.summary ?? []}
      </p>
      {/* <section className="card-detail flex-1">
        <DetailPersonTable data={response.success?.data} />
      </section>
      <section className="card-source">
        <div className="card-detail flex-1 flex flex-col px-6 py-4 gap-2 border rounded-lg">
          <DetailPersonButton link={response.success?.data?.link ?? ''} />
        </div>
      </section> */}
    </main>
  )
}

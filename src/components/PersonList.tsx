'use client'

import { getCases } from '@/services/cases'
import { type GetCasesParams, type GetCasesResponse } from '@/types/cases'
import { type BaseResponse } from '@/types/responses'
import { type Return } from '@/types/returns'
import { capitalizeFirstLetter } from '@/utils/strings'
import React, { useEffect, useState, type ReactElement } from 'react'
import useSWR, { type Fetcher } from 'swr'
import PageBreakIcon from './icons/PageBreakIcon'
import LocationOnIcon from './icons/LocationOnIcon'
import DateIcon from './icons/DateIcon'
import { Button, CircularProgress } from '@nextui-org/react'
import { useRouter } from 'next/navigation'

const fetcher: Fetcher<Return<BaseResponse<GetCasesResponse[]>>, GetCasesParams> = async (params) => await getCases(params)

export default function PersonList ({
  query, nations, subjects, types, year, page, setPage, setTotal
}: {
  query: string
  nations: string[]
  subjects: string[]
  types: string[]
  year: string
  page: number
  setPage: (page: number) => void
  setTotal: (page: number) => void
}): ReactElement {
  const [persons, setPersons] = useState<GetCasesResponse[]>([])
  const router = useRouter()

  const { data, isLoading } = useSWR<Return<BaseResponse<GetCasesResponse[]>>>(
    { page, query, nations, subjects, types, year },
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false,
      revalidateIfStale: false
    }
  )

  useEffect(() => {
    setTotal(data?.success?.meta?.total ?? 0)
    if (page === 1) {
      setPersons(data?.success?.data ?? [])
    } else {
      setPersons([...persons, ...(data?.success?.data ?? [])])
    }
  }, [data])

  return (
    <section className='w-full'>
      <div className='grid grid-cols-2 gap-5'>
        {persons.map((value) => {
          return (
            <div key={value.id} onClick={() => { router.push('/data/' + value.id) }} className='border border-colorBorder rounded-xl p-5 cursor-pointer hover:opacity-hover transition-all duration-200'>
              <h6 className='text-sm font-normal text-colorSecondaryText'>
                {capitalizeFirstLetter(value.subject_type ?? '')}
              </h6>
              <h3 className='font-bold text-xl text-colorPrimaryText'>
                {value.subject}
              </h3>
              <div className='flex flex-row items-center mt-4 gap-6'>
                <div className='flex flex-row items-center gap-1'>
                  <PageBreakIcon />
                  <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(value.type ?? '')}</h6>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <LocationOnIcon />
                  <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(value.nation ?? '')}</h6>
                </div>
                <div className='flex flex-row items-center gap-1'>
                  <DateIcon />
                  <h6 className='text-xs p-0 text-colorTertiaryText'>{capitalizeFirstLetter(value.year ?? '')}</h6>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      {!isLoading && (data?.success?.meta?.current_page ?? 0) < (data?.success?.meta?.last_page ?? 0) && (
        <div className='flex flex-col items-center py-16 gap-5'>
          <p className='text-colorPrimaryText'>
            Showing <span className='font-bold'>{(data?.success?.meta?.current_page ?? 0) * 20} </span>
            out of <span className='font-bold'>{data?.success?.meta?.total}</span></p>
            <Button
              onClick={() => { setPage(page + 1) }}
              radius='full'
              className='bg-colorPrimaryBackground font-semibold text-colorPrimaryText'
            >
              Load more entities
            </Button>
        </div>
      )}
      {isLoading && (<CircularProgress className={`mx-auto mt-${page === 1 ? '0' : '4'}`} />)}
    </section>
  )
}

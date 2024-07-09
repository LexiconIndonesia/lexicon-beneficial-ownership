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
import { useRouter, useSearchParams } from 'next/navigation'

const fetcher: Fetcher<Return<BaseResponse<GetCasesResponse[]>>, GetCasesParams> = async (params) => await getCases(params)

export default function PersonList ({ setTotal }: { setTotal: (page: number) => void }): ReactElement {
  const router = useRouter()
  const params = useSearchParams()

  const [persons, setPersons] = useState<GetCasesResponse[]>([])
  const [page, setPage] = useState<number>()
  const [query, setQuery] = useState('')
  const [subjects, setSubjects] = useState<string[]>([])
  const [nations, setNations] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [year, setYear] = useState<string>('')

  const { data, isLoading } = useSWR<Return<BaseResponse<GetCasesResponse[]>>>(
    { page, query, nations, subjects, types, year },
    fetcher,
    {
      revalidateOnMount: false,
      revalidateIfStale: false,
      revalidateOnFocus: false
    }
  )

  useEffect(() => {
    setQuery(params.get('query') ?? '')
    setSubjects(params.getAll('subjects') ?? [])
    setTypes(params.getAll('types') ?? [])
    setNations(params.getAll('nations') ?? [])
    setYear(`${params.get('from') ?? ''}-${params.get('to') ?? ''}`)
    setPage(1)
  }, [params])

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
      {!isLoading && data?.error != null && (
        <h3 className='text-center'>Data tidak ditemukan</h3>
      )}
      <div className='grid grid-cols-1 sm:grid-cols-2 gap-5'>
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
              onClick={() => { setPage((page ?? 0) + 1) }}
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

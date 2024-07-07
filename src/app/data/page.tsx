'use client'

import React, { useEffect, useState } from 'react'
import PersonList from '@/components/PersonList'
import FilterSubjectType from '@/components/FilterSubjectType'
import FilterYear from '@/components/FilterYear'
import FilterType from '@/components/FilterType'
import FilterNation from '@/components/FilterNation'
import { useSearchParams } from 'next/navigation'
import { Button, Divider } from '@nextui-org/react'
import SearchIcon from '@/components/icons/SearchIcon'

export default function DataPage (): React.ReactElement {
  const params = useSearchParams()
  const [query, setQuery] = useState('')
  const [nations, setNations] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [year, setYear] = useState<string>('')
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)

  useEffect(() => {
    setQuery(params.get('query') ?? '')
    setNations(params.getAll('nations') ?? [])
    setSubjects(params.getAll('subjects') ?? [])
    setTypes(params.getAll('types') ?? [])
    setYear(`${params.get('from') ?? ''}-${params.get('to') ?? ''}`)
    setPage(1)
  }, [params])

  return (
    <main className="flex flex-col">
      <div className='py-16'>
        <img src="/images/img_background_small.png" alt="Background Hero" className='absolute top-0 -z-10 mt-2 hidden sm:block' />
        <div className='w-auto mx-[150px] py-4 px-5 bg-white border border-colorBorder rounded-xl flex flex-row gap-6 z-10 items-center'>
          <div className='w-full flex flex-col gap-3'>
            <input className='outline-none w-full font-normal text-sm placeholder-textGray40' placeholder='Enter individual or company name...' />
            <Divider className='border border-colorBorder' />
            <div className='flex flex-col sm:flex-row gap-6'>
              <FilterSubjectType />
              <FilterType />
              <FilterNation />
              <FilterYear />
              <Button className='block sm:hidden bg-colorPrimary text-md font-semibold text-white'>
                Search
              </Button>
            </div>
          </div>
          <Button isIconOnly radius='full' className='hidden sm:flex bg-colorPrimaryBackground'>
            <SearchIcon />
          </Button>
        </div>
      </div>
      <div className='flex flex-col py-12 items-center px-[120px] bg-white gap-8'>
        <h3 className='px-[177px] text-2xl text-center font-semibold'>{total} entities in all subject types, all record types, all nationalities, and every year.</h3>
        <PersonList
          query={query}
          nations={nations}
          subjects={subjects}
          types={types}
          year={year}
          page={page}
          setPage={setPage}
          setTotal={setTotal}
        />
      </div>
    </main>
  )
}

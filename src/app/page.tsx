'use client'

import React, { useEffect, useState } from 'react'
import PersonList from '@/components/PersonList'
import FilterSubjectType from '@/components/FilterSubjectType'
import FilterYear from '@/components/FilterYear'
import FilterType from '@/components/FilterType'
import FilterNation from '@/components/FilterNation'
import SearchBar from '@/components/ui/SearchBar'
import { useSearchParams } from 'next/navigation'

export default function Home (): React.ReactElement {
  const params = useSearchParams()
  const [query, setQuery] = useState('')
  const [nations, setNations] = useState<string[]>([])
  const [subjects, setSubjects] = useState<string[]>([])
  const [types, setTypes] = useState<string[]>([])
  const [year, setYear] = useState<string>('')
  const [page, setPage] = useState(1)

  useEffect(() => {
    setQuery(params.get('query') ?? '')
    setNations(params.getAll('nations') ?? [])
    setSubjects(params.getAll('subjects') ?? [])
    setTypes(params.getAll('types') ?? [])
    setYear(`${params.get('from') ?? ''}-${params.get('to') ?? ''}`)
    setPage(1)
  }, [params])

  return (
    <main className="py-8 px-4 sm:px-12">
      <SearchBar />
      <section className="mt-4 flex flex-row gap-2">
        <FilterSubjectType />
        <FilterYear />
        <FilterType />
        <FilterNation />
      </section>
      <PersonList query={query} nations={nations} subjects={subjects} types={types} year={year} page={page} setPage={setPage} />
    </main>
  )
}

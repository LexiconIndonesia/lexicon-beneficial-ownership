'use client'

import Image from 'next/image'
import { usePathname, useSearchParams, useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function SearchBar (): React.ReactElement {
  const [query, setQuery] = useState('')

  const params = useSearchParams()
  const path = usePathname()
  const router = useRouter()

  const handleSubmitClicked = (): void => {
    const newParams = new URLSearchParams(params)
    newParams.set('query', query)
    newParams.delete('page')
    router.replace(`${path}?${newParams.toString()}`, { scroll: false })
  }

  return (
    <section className="w-full border rounded-md flex flex-row gap-1">
      <div className="flex flex-col items-center justify-center px-2">
        <Image width={24} height={24} className="" src="/icons/ic_search.png" alt="Search Icon" />
      </div>
      <input
        value={query}
        onInput={(el) => { setQuery(el.currentTarget.value) }}
        className="flex-grow px-4 py-3"
        type="text"
        placeholder="Search by name" />
      <button
        onClick={handleSubmitClicked}
        className="bg-indigo-200 hover:bg-indigo-100 px-4 py-1 rounded-md font-medium transition-all duration-200"
      >Search</button>
    </section>
  )
}

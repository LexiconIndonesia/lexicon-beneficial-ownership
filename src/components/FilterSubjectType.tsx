'use client'

import { filters } from '@/utils/constants'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import React, { type ReactElement, useEffect, useMemo, useState } from 'react'
import SearchPersonIcon from './icons/SearchPersonIcon'
import ExpandMoreIcon from './icons/ExpandMoreIcon'
import { capitalizeFirstLetter } from '@/utils/strings'
import { useSearchParams } from 'next/navigation'

export default function FilterSubjectType (
  {
    onSelectedSubjects
  }: {
    onSelectedSubjects: (subjects: string[]) => void
  }
): ReactElement {
  const params = useSearchParams()
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string> | null>(new Set())

  useEffect(() => {
    setSelectedSubjects(new Set(params.getAll('subjects') ?? []))
  }, [params])

  useEffect(() => {
    if ((selectedSubjects?.size ?? 0) > 0) {
      console.log('selected', selectedSubjects)
      onSelectedSubjects(Array.from(selectedSubjects ?? []))
    }
  }, [selectedSubjects])

  const selectedSubjectsFormatted = useMemo(
    () => {
      if ((selectedSubjects?.size ?? 0) > 1) {
        return `Subject Type (${selectedSubjects?.size ?? 0})`
      } else {
        return capitalizeFirstLetter(Array.from(selectedSubjects ?? []).toString())
      }
    },
    [selectedSubjects]
  )

  return (
    <Dropdown showArrow shouldCloseOnInteractOutside={() => true}>
      <DropdownTrigger>
        <div className='flex flex-row gap-2 flex-1 items-center cursor-pointer hover:opacity-hover transition-all duration-200'>
          <SearchPersonIcon />
          <span className='text-xs text-textGray40 flex-1 pr-6'>
            {(selectedSubjects?.size ?? 0) > 0 ? selectedSubjectsFormatted : 'Select Subject Type'}
          </span>
          <ExpandMoreIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="shadow"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedSubjects ?? []}
        onSelectionChange={setSelectedSubjects as any}
      >
        <DropdownSection>
          {filters.subjects.map((subject) => (
            <DropdownItem key={`${subject.toLowerCase()}`} value={`${subject.toLowerCase()}`}>{subject}</DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

'use client'

import { filters } from '@/utils/constants'
import { capitalizeFirstLetter } from '@/utils/strings'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { type ReactElement, useEffect, useMemo, useState } from 'react'

export default function FilterSubjectType (): ReactElement {
  const [selectedSubjects, setSelectedSubjects] = useState<Set<string> | null>()
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    // TODO: Add validation for params
    setSelectedSubjects(new Set(params.getAll('subjects') ?? []))
  }, [])

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

  useEffect(() => {
    if (selectedSubjects != null) {
      console.log(selectedSubjects)
      const newParams = new URLSearchParams(params)
      newParams.delete('subjects')
      Array.from(selectedSubjects.values()).forEach((subject) => {
        newParams.append('subjects', subject)
      })
      router.replace(`${path}?${newParams.toString()}`, { scroll: true })
    }
  }, [selectedSubjects])

  return (
    <Dropdown showArrow shouldCloseOnInteractOutside={() => true}>
        <DropdownTrigger>
          <button
            className={`px-4 py-2 ${(selectedSubjects?.size ?? 0) > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}
          >{(selectedSubjects?.size ?? 0) > 0 ? selectedSubjectsFormatted : 'Subject Type'}</button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedSubjects ?? []}
          onSelectionChange={setSelectedSubjects as any}
        >
          <DropdownSection title="Subject Type">
            {filters.subjects.map((subject) => (
              <DropdownItem key={`${subject.toLowerCase()}`} value={`${subject.toLowerCase()}`}>{subject}</DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}

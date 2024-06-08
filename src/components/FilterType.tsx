'use client'

import React, { type ReactElement, useEffect, useMemo, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { capitalizeFirstLetter } from '@/utils/strings'
import { filters } from '@/utils/constants'

export default function FilterType (): ReactElement {
  const [selectedTypes, setSelectedTypes] = useState<Set<string> | null>()
  const router = useRouter()
  const params = useSearchParams()
  const path = usePathname()

  useEffect(() => {
    // TODO: Add validation for params
    setSelectedTypes(new Set(params.getAll('types') ?? []))
  }, [])

  const selectedTypesFormatted = useMemo(
    () => {
      if ((selectedTypes?.size ?? 0) > 1) {
        return `Type (${(selectedTypes?.size ?? 0)})`
      } else {
        return capitalizeFirstLetter(Array.from(selectedTypes ?? []).toString())
      }
    },
    [selectedTypes]
  )

  useEffect(() => {
    if (selectedTypes != null) {
      const newParams = new URLSearchParams(params)
      newParams.delete('types')
      Array.from((selectedTypes ?? []).values()).forEach((subject) => {
        newParams.append('types', subject)
      })
      router.replace(`${path}?${newParams.toString()}`, { scroll: false })
    }
  }, [selectedTypes])

  return (
    <Dropdown showArrow shouldCloseOnInteractOutside={() => true}>
        <DropdownTrigger>
          <button className={`px-4 py-2 ${(selectedTypes?.size ?? 0) > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}>
            {(selectedTypes?.size ?? 0) > 0 ? selectedTypesFormatted : 'Type'}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedTypes ?? []}
          onSelectionChange={setSelectedTypes as any}
        >
          <DropdownSection title="Type">
            {filters.types.map((type) => (
              <DropdownItem key={`${type.toLowerCase()}`} value={`${type.toLowerCase()}`}>{type}</DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}

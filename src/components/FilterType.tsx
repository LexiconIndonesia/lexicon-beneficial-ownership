'use client'

import React, { type ReactElement, useEffect, useMemo, useState } from 'react'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { useSearchParams } from 'next/navigation'
import { capitalizeFirstLetter } from '@/utils/strings'
import { filters } from '@/utils/constants'
import PlagiarismIcon from './icons/PlagiarismIcon'
import ExpandMoreIcon from './icons/ExpandMoreIcon'

export default function FilterType (
  {
    onSelectedTypes
  }: {
    onSelectedTypes: (types: string[]) => void
  }
): ReactElement {
  const params = useSearchParams()

  const [selectedTypes, setSelectedTypes] = useState<Set<string> | null>(new Set())

  useEffect(() => {
    setSelectedTypes(new Set(params.getAll('types') ?? []))
  }, [params])

  useEffect(() => {
    if ((selectedTypes?.size ?? 0) > 0) {
      console.log('selected', selectedTypes)
      onSelectedTypes(Array.from(selectedTypes ?? []))
    }
  }, [selectedTypes])

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

  return (
    <Dropdown showArrow shouldCloseOnInteractOutside={() => true}>
        <DropdownTrigger>
          <div className='flex flex-row gap-2 flex-1 items-center cursor-pointer hover:opacity-hover transition-all duration-200'>
            <PlagiarismIcon />
            <span className='text-xs text-textGray40 flex-1 pr-6'>
              {(selectedTypes?.size ?? 0) > 0 ? selectedTypesFormatted : 'Select Record Type'}
            </span>
            <ExpandMoreIcon />
          </div>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedTypes ?? []}
          onSelectionChange={setSelectedTypes as any}
        >
          <DropdownSection>
            {filters.types.map((type) => (
              <DropdownItem key={`${type.toLowerCase()}`} value={`${type.toLowerCase()}`}>{type}</DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}

'use client'

import { filters } from '@/utils/constants'
import { capitalizeFirstLetter } from '@/utils/strings'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { type ReactElement, useEffect, useMemo, useState } from 'react'
import LocationIcon from './icons/LocationIcon'
import ExpandMoreIcon from './icons/ExpandMoreIcon'

export default function FilterNation (): ReactElement {
  const [selectedNations, setSelectedNations] = useState<Set<string> | null>()
  const params = useSearchParams()
  const router = useRouter()
  const path = usePathname()

  useEffect(() => {
    // TODO: Add validation for params
    setSelectedNations(new Set(params.getAll('nations') ?? []))
  }, [])

  const selectedNationsFormatted = useMemo(
    () => {
      if ((selectedNations?.size ?? 0) > 1) {
        return `Nationality (${(selectedNations?.size ?? 0)})`
      } else {
        return capitalizeFirstLetter(Array.from(selectedNations ?? []).toString())
      }
    },
    [selectedNations]
  )

  useEffect(() => {
    if (selectedNations != null) {
      const newParams = new URLSearchParams(params)
      newParams.delete('nations')
      Array.from((selectedNations ?? []).values()).forEach((subject) => {
        newParams.append('nations', subject)
      })
      if ((selectedNations?.size ?? 0) > 0) {
        router.replace(`${path}?${newParams.toString()}`, { scroll: true })
      } else {
        router.replace(`${path}`, { scroll: true })
      }
    }
  }, [selectedNations])

  return (
    <Dropdown showArrow shouldCloseOnInteractOutside={() => true}>
      <DropdownTrigger>
        <div className='flex flex-row gap-2 flex-1 items-center cursor-pointer hover:opacity-hover transition-all duration-200'>
          <LocationIcon />
          <span className='text-xs text-textGray40 flex-1 pr-6'>
            {(selectedNations?.size ?? 0) > 0 ? selectedNationsFormatted : 'Select Nationality'}
          </span>
          <ExpandMoreIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
        aria-label="Multiple selection example"
        variant="shadow"
        closeOnSelect={false}
        selectionMode="multiple"
        selectedKeys={selectedNations ?? []}
        onSelectionChange={setSelectedNations as any}
      >
        <DropdownSection>
          {filters.nations.map((nation) => (
            <DropdownItem key={`${nation.toLowerCase()}`} value={`${nation.toLowerCase()}`}>{nation}</DropdownItem>
          ))}
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  )
}

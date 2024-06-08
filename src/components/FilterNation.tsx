'use client'

import { filters } from '@/utils/constants'
import { capitalizeFirstLetter } from '@/utils/strings'
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { type ReactElement, useEffect, useMemo, useState } from 'react'

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
        return `Nation (${(selectedNations?.size ?? 0)})`
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
          <button
            className={`px-4 py-2 ${(selectedNations?.size ?? 0) > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}
          >{(selectedNations?.size ?? 0) > 0 ? selectedNationsFormatted : 'Nation'}</button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedNations ?? []}
          onSelectionChange={setSelectedNations as any}
        >
          <DropdownSection title="Type">
            {filters.nations.map((nation) => (
              <DropdownItem key={`${nation.toLowerCase()}`} value={`${nation.toLowerCase()}`}>{nation}</DropdownItem>
            ))}
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}

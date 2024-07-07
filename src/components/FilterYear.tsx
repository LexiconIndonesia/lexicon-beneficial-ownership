'use client'

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import React, { createRef, useEffect, useState } from 'react'
import CalendarIcon from './icons/CalendarIcon'
import ExpandMoreIcon from './icons/ExpandMoreIcon'

enum CurrentForm {
  FROM, TO, BUTTON
}

export default function FilterYear (): React.ReactElement {
  const params = useSearchParams()
  const path = usePathname()
  const router = useRouter()
  const fromYearRef = createRef<HTMLInputElement>()
  const toYearRef = createRef<HTMLInputElement>()
  const buttonRef = createRef<HTMLButtonElement>()

  const [isOpen, setIsOpen] = useState(false)
  const [from, setFrom] = useState('')
  const [to, setTo] = useState('')
  const [currentForm, setCurrentForm] = useState(CurrentForm.FROM)

  useEffect(() => {
    // TODO: Add validation for params
    setFrom(params.get('from') ?? '')
    setTo(params.get('to') ?? '')
  }, [])

  const handleSubmitClicked = (): void => {
    const newParams = new URLSearchParams(params)
    newParams.delete('from')
    newParams.delete('to')
    if (from.length > 0) {
      newParams.set('from', from)
    }
    if (to.length > 0) {
      newParams.set('to', to)
    }
    setIsOpen(false)
    router.replace(`${path}?${newParams.toString()}`, { scroll: true })
  }

  return (
    <Dropdown
      isOpen={isOpen}
      showArrow
      shouldCloseOnInteractOutside={() => true}
      onClose={() => { setIsOpen(false) }}
      onKeyUpCapture={(event) => {
        event.preventDefault()
        if (event.key === 'Tab') {
          switch (currentForm) {
            case CurrentForm.FROM: {
              toYearRef.current?.focus()
              setCurrentForm(CurrentForm.TO)
              break
            }

            case CurrentForm.TO: {
              buttonRef.current?.focus()
              setCurrentForm(CurrentForm.BUTTON)
              break
            }

            case CurrentForm.BUTTON: {
              fromYearRef.current?.focus()
              setCurrentForm(CurrentForm.FROM)
              break
            }
          }
        } else if (event.key === 'Enter') {
          handleSubmitClicked()
        }
      }}
    >
      <DropdownTrigger>
        <div onClick={() => { setIsOpen(true) }} className='flex flex-row gap-2 flex-1 items-center cursor-pointer hover:opacity-hover transition-all duration-200'>
          <CalendarIcon />
          <span className='text-xs text-textGray40 flex-1 pr-6'>
            {from.length > 0 && to.length > 0 ? `${from}-${to}` : 'Select Year'}
          </span>
          <ExpandMoreIcon />
        </div>
      </DropdownTrigger>
      <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          disabledKeys={'year-range'}
        >
          <DropdownItem isReadOnly key="year-range">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="from" className="font-medium text-xs">From</label>
                <input
                  className="bg-slate-100 px-2 py-2 rounded-md focus:outline-none"
                  type="text"
                  placeholder="ex. 2020"
                  name="from"
                  value={from}
                  ref={fromYearRef}
                  onInput={(target) => { setFrom(target.currentTarget.value) }}
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="to" className="font-medium text-xs">To</label>
                <input
                  className="bg-slate-100 px-2 py-2 rounded-md focus:outline-none"
                  type="text"
                  placeholder="ex. 2024"
                  name="to"
                  value={to}
                  ref={toYearRef}
                  onInput={(target) => { setTo(target.currentTarget.value) }}
                />
              </div>
              <Button
                ref={buttonRef}
                title="Submit"
                variant="flat"
                color="primary"
                onClick={handleSubmitClicked}
               >Submit</Button>
            </div>
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}

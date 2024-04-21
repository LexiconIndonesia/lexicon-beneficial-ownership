"use client";

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger, useDropdown } from "@nextui-org/react";
import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";

export default function FilterYear() {
  
  const params = useSearchParams();
  const path = usePathname();
  const router = useRouter();

  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setFrom(params.get('from') ?? '');
    setTo(params.get('to') ?? '');
  }, [params, path])

  useEffect(() => {
    const from = params.get('from');
    const to = params.get('to');
    setFrom(from ?? '');
    setTo(to ?? '');
  }, [])

  const handleSubmitClicked = () => {
    const newParams = new URLSearchParams(params);
    newParams.set('from', from);
    newParams.set('to', to);
    setIsOpen(false);
    router.replace(`${path}?${newParams.toString()}`, { scroll: true });
  }

  return (
    <Dropdown showArrow isOpen={isOpen}>
      <DropdownTrigger>
        <button onClick={() => setIsOpen(!isOpen)} className={`px-4 py-2 ${from.length > 0 && to.length > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}>
          Year
        </button>
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
                  onInput={(target) => setFrom(target.currentTarget.value)}
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
                  onInput={(target) => setTo(target.currentTarget.value)}
                />
              </div>
              <Button title="Submit" variant="flat" color="primary" onClick={handleSubmitClicked}>Submit</Button>
            </div>
          </DropdownItem>
        </DropdownMenu>
    </Dropdown>
  )
}
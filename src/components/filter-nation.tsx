import StringUtils from "@/utils/strings";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function FilterNation() {
  const [selectedNations, setSelectedNations] = useState(new Set<string>());
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const selectedNationsFormatted = useMemo(
    () => {
      if (selectedNations.size > 1) {
        return `Nation (${selectedNations.size})`;
      } else {
        return StringUtils.capitalizeFirstLetter(Array.from(selectedNations).toString());
      }
    }, 
    [selectedNations]
  )

  useEffect(() => {
    const nations = params.getAll('nations');
    setSelectedNations(new Set(nations));
  }, [])

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.delete('nations');
    Array.from(selectedNations.values()).forEach((subject) => {
      newParams.append('nations', subject);
    })
    router.replace(`${path}?${newParams.toString()}`, { scroll: true });
  }, [selectedNations]);

  return (
    <Dropdown showArrow isOpen={isOpen}>
        <DropdownTrigger>
          <button 
            onClick={() => setIsOpen(!isOpen)}  
            className={`px-4 py-2 ${selectedNations.size > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}
          > {selectedNations.size > 0 ? selectedNationsFormatted : 'Nation'} </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="single"
          selectedKeys={selectedNations}
          onSelectionChange={setSelectedNations as any}
        >
          <DropdownSection title="Type">
            <DropdownItem key="indonesia" value={'indonesia'}>Indonesia</DropdownItem>
            <DropdownItem key="singapore" value={'singapore'}>Singapore</DropdownItem>
            <DropdownItem key="malaysia" value={'malaysia'}>Malaysia</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}
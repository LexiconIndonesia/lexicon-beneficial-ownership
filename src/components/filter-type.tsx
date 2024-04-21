import StringUtils from "@/utils/strings";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function FilterType() {
  const [selectedTypes, setSelectedTypes] = useState(new Set<string>());
  const router = useRouter();
  const params = useSearchParams();
  const path = usePathname();

  const selectedTypesFormatted = useMemo(
    () => {
      if (selectedTypes.size > 1) {
        return `Type (${selectedTypes.size})`;
      } else {
        return StringUtils.capitalizeFirstLetter(Array.from(selectedTypes).toString());
      }
    }, 
    [selectedTypes]
  )

  useEffect(() => {
    const types = params.getAll('types');
    setSelectedTypes(new Set(types));
  }, [])

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.delete('types');
    Array.from(selectedTypes.values()).forEach((subject) => {
      newParams.append('types', subject);
    })
    router.replace(`${path}?${newParams.toString()}`, { scroll: true });
  }, [selectedTypes]);

  return (
    <Dropdown showArrow>
        <DropdownTrigger>
          <button className={`px-4 py-2 ${selectedTypes.size > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}>
            {selectedTypes.size > 0 ? selectedTypesFormatted : 'Type'}
          </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedTypes}
          onSelectionChange={setSelectedTypes as any}
        >
          <DropdownSection title="Type">
            <DropdownItem key="verdict" value={'verdict'}>Verdict</DropdownItem>
            <DropdownItem key="blacklist" value={'blacklist'}>Blacklist</DropdownItem>
            <DropdownItem key="sanction" value={'sanction'}>Sanction</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}
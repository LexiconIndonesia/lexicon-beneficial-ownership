import StringUtils from "@/utils/strings";
import { Dropdown, DropdownItem, DropdownMenu, DropdownSection, DropdownTrigger } from "@nextui-org/react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function FilterSubjectType() {
  const [selectedSubjects, setSelectedSubjects] = useState(new Set<string>());
  const [isOpen, setIsOpen] = useState(false);
  const params = useSearchParams();
  const router = useRouter();
  const path = usePathname();

  const selectedSubjectsFormatted = useMemo(
    () => {
      if (selectedSubjects.size > 1) {
        return `Subject Type (${selectedSubjects.size})`;
      } else {
        return StringUtils.capitalizeFirstLetter(Array.from(selectedSubjects).toString());
      }
    }, 
    [selectedSubjects]
  )

  useEffect(() => {
    const subjects = params.getAll('subjects');
    setSelectedSubjects(new Set(subjects));
  }, [])

  useEffect(() => {
    const newParams = new URLSearchParams(params);
    newParams.delete('subjects');
    Array.from(selectedSubjects.values()).forEach((subject) => {
      newParams.append('subjects', subject);
    })
    router.replace(`${path}?${newParams.toString()}`, { scroll: true });
  }, [selectedSubjects]);

  return (
    <Dropdown showArrow isOpen={isOpen}>
        <DropdownTrigger>
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className={`px-4 py-2 ${selectedSubjects.size > 0 ? 'bg-blue-100' : 'bg-slate-200'} rounded-lg font-semibold text-sm`}
          > {selectedSubjects.size > 0 ? selectedSubjectsFormatted : 'Subject Type'} </button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Multiple selection example"
          variant="shadow"
          closeOnSelect={false}
          selectionMode="multiple"
          selectedKeys={selectedSubjects}
          onSelectionChange={setSelectedSubjects as any}
        >
          <DropdownSection title="Subject Type">
            <DropdownItem key="individual" value={'individual'}>Individual</DropdownItem>
            <DropdownItem key="company" value={'company'}>Company</DropdownItem>
          </DropdownSection>
        </DropdownMenu>
      </Dropdown>
  )
}
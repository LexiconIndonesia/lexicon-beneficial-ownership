"use client";

import { GetCasesResponse } from "@/data/response";
import StringUtils from "@/utils/strings";
import { CircularProgress, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { ReactElement, useMemo, useState } from "react";

interface PersonListProps {
  cases: GetCasesResponse[]
  isLoading: boolean
}

export default function PersonList(param: PersonListProps): ReactElement {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const pages = Math.ceil(param.cases.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return param.cases.slice(start, end);
  }, [page, param]);

  return (
    <section className="mt-4">
      <Table 
        shadow="sm" 
        aria-label="Test" 
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={pages == 0 ? 1 : pages}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>Name</TableColumn>
          <TableColumn>Subject Type</TableColumn>
          <TableColumn>Person in Charge</TableColumn>
          <TableColumn>Type</TableColumn>
          <TableColumn>Year</TableColumn>
          <TableColumn>Nationality</TableColumn>
          <TableColumn>Beneficiary Ownership</TableColumn>
        </TableHeader>
        <TableBody 
          isLoading={param.isLoading} 
          loadingContent={<CircularProgress />} 
          emptyContent={"Data not found"}
          items={items}
        >
          {(item) => (
            <TableRow 
              key={item.id}
              className="hover:cursor-pointer hover:bg-slate-100 transition-all duration-200 active:bg-slate-200" 
              onClick={() => router.push('/detail?id=' + item.id)}
            >
              <TableCell>{item.subject ?? ''}</TableCell>
              <TableCell>{StringUtils.capitalizeFirstLetter(item.subject_type ?? '')}</TableCell>
              <TableCell>{item.person_in_charge ?? ''}</TableCell>
              <TableCell>{StringUtils.capitalizeFirstLetter(item.type ?? '')}</TableCell>
              <TableCell>{item.year ?? ''}</TableCell>
              <TableCell>{item.nation ?? ''}</TableCell>
              <TableCell>{item.beneficary_ownership ?? '-'}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </section>
  )
}
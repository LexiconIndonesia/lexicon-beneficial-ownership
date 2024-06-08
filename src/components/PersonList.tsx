'use client'

import { getCases } from '@/services/getCases'
import { type GetCasesParams, type GetCasesResponse } from '@/types/cases'
import { type BaseResponse } from '@/types/responses'
import { type Return } from '@/types/returns'
import { capitalizeFirstLetter } from '@/utils/strings'
import { CircularProgress, Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { useRouter } from 'next/navigation'
import React, { useMemo, type ReactElement } from 'react'
import useSWR, { type Fetcher } from 'swr'

const fetcher: Fetcher<Return<BaseResponse<GetCasesResponse[]>>, GetCasesParams> = async (params) => await getCases(params)

export default function PersonList ({
  query, nations, subjects, types, year, page, setPage
}: {
  query: string
  nations: string[]
  subjects: string[]
  types: string[]
  year: string
  page: number
  setPage: (page: number) => void
}): ReactElement {
  const router = useRouter()

  const { data, isLoading } = useSWR<Return<BaseResponse<GetCasesResponse[]>>>(
    { page, query, nations, subjects, types, year },
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnMount: false
    }
  )

  const pages = useMemo(() => {
    return data?.success?.meta?.total != null ? Math.ceil(data?.success?.meta?.total / (data?.success?.meta?.per_page ?? 0)) : 0
  }, [data?.success?.meta?.total, data?.success?.meta?.per_page])

  return (
    <section className="mt-4">
      <Table
        shadow="sm"
        aria-label="Test"
        bottomContent={
          pages > 0 && (
            <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="secondary"
              page={page}
              total={data?.success?.meta?.last_page ?? 0}
              onChange={(page) => { setPage(page) }}
            />
          </div>
          )
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
          isLoading={isLoading}
          loadingContent={<CircularProgress />}
          emptyContent={data?.error !== '' ? data?.error : 'Data is not found'}
          items={data?.success?.data ?? []}
        >
          {(item) => (
            <TableRow
              key={item.id}
              className="hover:cursor-pointer hover:bg-slate-100 transition-all duration-200 active:bg-slate-200"
              onClick={() => { router.push('/detail?id=' + item.id) }}
            >
              <TableCell>{item.subject ?? ''}</TableCell>
              <TableCell>{capitalizeFirstLetter(item.subject_type ?? '')}</TableCell>
              <TableCell>{item.person_in_charge ?? ''}</TableCell>
              <TableCell>{capitalizeFirstLetter(item.type ?? '')}</TableCell>
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

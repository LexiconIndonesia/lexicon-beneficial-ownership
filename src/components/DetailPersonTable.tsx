'use client'

import { type GetCasesResponse } from '@/types/cases'
import React from 'react'
import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react'
import { capitalizeFirstLetter } from '@/utils/strings'

export default function DetailPersonTable ({
  data
}: {
  data?: GetCasesResponse
}): React.ReactElement {
  return (
    <Table hideHeader shadow="sm" radius="sm" cellPadding={0} cellSpacing={0}>
      <TableHeader>
        <TableColumn>Subject Type</TableColumn>
        <TableColumn>Space</TableColumn>
        <TableColumn>Individual</TableColumn>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-semibold text-xl" colSpan={3}>{data?.subject ?? ''}</TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold" colSpan={3}><hr className="h-0 mt-4" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold">Subject Type</TableCell>
          <TableCell width={30}> </TableCell>
          <TableCell>{capitalizeFirstLetter(data?.subject_type ?? '')}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Person in Charge</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.person_in_charge ?? ''}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Year</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.year ?? ''}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Type</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{capitalizeFirstLetter(data?.type ?? '')}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Decision Number</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.decision_number ?? ''}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Nation</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.nation ?? ''}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Duration</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.punishment_duration ?? ''}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell width={200} className="font-semibold" colSpan={3}><hr className="h-0" /></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold">Beneficiary Ownership</TableCell>
          <TableCell>&nbsp;</TableCell>
          <TableCell>{data?.beneficary_ownership ?? '-'}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-semibold text-xl" colSpan={3}><h4 className="mt-6">Summary</h4></TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="text-sm text-justify" colSpan={3}>{data?.summary ?? ''}</TableCell>
          <TableCell className="hidden"> </TableCell>
          <TableCell className="hidden"> </TableCell>
        </TableRow>
      </TableBody>
  </Table>
  )
}

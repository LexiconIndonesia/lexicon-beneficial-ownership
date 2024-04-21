"use client";

import { getCase } from "@/data/get-cases";
import { GetCasesParams, GetCasesResponse } from "@/data/response";
import StringUtils from "@/utils/strings";
import { Button, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function DetailPage() {
  const [isLoading, setIsLoading] = useState(false);
  const param = useSearchParams();
  const router = useRouter();
  const [data, setData] = useState<GetCasesResponse | undefined>(undefined);

  async function getCasesFirebase() {
    setIsLoading(true);
    const response = await getCase(param.get('id') ?? '');
    setData(response as GetCasesResponse);
    setIsLoading(false);
  }

  useEffect(() => {
    getCasesFirebase()
  }, []);

  return (
    <main className="py-4 px-4 sm:px-8 flex gap-4 mt-4">
      <section className="card-detail flex-1">
      <Table hideHeader shadow="sm" radius="sm" cellPadding={0} cellSpacing={0}>
          <TableHeader>
            <TableColumn>Subject Type</TableColumn>
            <TableColumn>Space</TableColumn>
            <TableColumn>Individual</TableColumn>
          </TableHeader>
          <TableBody isLoading={isLoading}>
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
              <TableCell>{StringUtils.capitalizeFirstLetter(data?.subject_type ?? '')}</TableCell>
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
              <TableCell>{StringUtils.capitalizeFirstLetter(data?.type ?? '')}</TableCell>
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
      </section>
      <section className="card-source">
        <div className="card-detail flex-1 flex flex-col px-6 py-4 gap-2 border rounded-lg">
          <Button 
            variant="flat" 
            color="primary" 
            className="px-28 font-semibold" 
            radius="sm"
            onClick={() => router.push(data?.link ?? '')}
          >Source</Button>
        </div>
      </section>
    </main>
  )
}
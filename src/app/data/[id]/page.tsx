'use server'

import React from 'react'
import { getCase } from '@/services/cases'
import DetailPersonTable from '@/components/DetailPersonTable'

export default async function DetailPage ({ params }: { params: { id: string } }): Promise<React.ReactElement> {
  const response = await getCase(params.id)

  if (response.error != null) {
    throw new Error(response.error)
  }

  return (
    <main className="mt-8 sm:mt-16 mb-12 sm:mb-36 mx-4 sm:mx-[297px]">
      <DetailPersonTable data={response.success?.data} />
    </main>
  )
}

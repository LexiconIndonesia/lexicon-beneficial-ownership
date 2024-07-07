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
    <main className="mt-16 mb-36 mx-[297px]">
      <DetailPersonTable data={response.success?.data} />
      {/* <section className="card-detail flex-1">
        <DetailPersonTable data={response.success?.data} />
      </section>
      <section className="card-source">
        <div className="card-detail flex-1 flex flex-col px-6 py-4 gap-2 border rounded-lg">
          <DetailPersonButton link={response.success?.data?.link ?? ''} />
        </div>
      </section> */}
    </main>
  )
}

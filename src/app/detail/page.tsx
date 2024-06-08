'use server'

import React from 'react'
import { getCase } from '@/services/getCases'
import DetailPersonTable from '@/components/DetailPersonTable'
import { DetailPersonButton } from '@/components/DetailPersonButton'

export default async function DetailPage ({ searchParams }: { searchParams: { id: string } }): Promise<React.ReactElement> {
  const response = await getCase(searchParams.id)

  if (response.error != null) {
    throw new Error(response.error)
  }

  return (
    <main className="py-4 px-4 sm:px-8 flex gap-4 mt-4">
      <section className="card-detail flex-1">
        <DetailPersonTable data={response.success?.data} />
      </section>
      <section className="card-source">
        <div className="card-detail flex-1 flex flex-col px-6 py-4 gap-2 border rounded-lg">
          <DetailPersonButton link={response.success?.data?.link ?? ''} />
        </div>
      </section>
    </main>
  )
}

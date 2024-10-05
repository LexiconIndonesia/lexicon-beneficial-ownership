'use client'

import React, { useState } from 'react'
import dynamic from 'next/dynamic'
import 'chart.js/auto'

const Bar = dynamic(async () => await import('react-chartjs-2').then((mod) => mod.Bar), {
  ssr: false
})

export default function VisualizationPage (): React.ReactElement {
  const [data] = useState({
    labels: ['Indonesia', 'Singapore', 'Malaysia', 'Global'],
    datasets: [
      {
        label: 'Cases',
        data: [9521, 3, 8, 1],
        backgroundColor: [
          'rgba(255, 159, 64, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 205, 86, 0.2)',
          'rgb(40, 100, 90, 0.2)'
        ],
        borderColor: [
          'rgb(255, 159, 64)',
          'rgb(255, 99, 132)',
          'rgb(255, 205, 86)',
          'rgb(40, 100, 90)'
        ],
        borderWidth: 1
      }
    ]
  })

  return (
    <main className='py-8 flex flex-col justify-center items-center'>
      <div className='py-16'>
        <img src="/images/img_background_small.png" alt="Background Hero" className='absolute top-0 left-0 right-0 -z-10 mt-2 hidden sm:block' />
        <div className='flex flex-col items-center bg-white z-10'>
          <h1 className='text-[40px] font-semibold'>Cases Insights</h1>
          <h5 className='text-[16px] font-normal text-gray-500'>Interactive Data Visualizations of Case Trends and Insights</h5>
        </div>
      </div>
      <div className='flex flex-col w-full px-32 py-16 gap-4'>
        <h3 className='text-2xl font-semibold'>Cases by Nations</h3>
        <Bar className='mt-10' data={data} options={{ plugins: { legend: { display: false } } }} />
      </div>
    </main>
  )
}

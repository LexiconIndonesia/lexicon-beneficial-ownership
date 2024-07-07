import { CircularProgress } from '@nextui-org/react'
import React from 'react'

export default function Loading (): React.ReactElement {
  return (
    <div className='w-full flex flex-col items-center justify-center py-14'>
      <CircularProgress color='primary' />
    </div>
  )
}

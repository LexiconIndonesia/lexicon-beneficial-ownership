'use client'

import { Button } from '@nextui-org/react'
import React from 'react'

export const DetailPersonButton = ({ link }: { link: string }): React.ReactElement => {
  return (
    <Button
      variant="flat"
      color="primary"
      className="px-28 font-semibold"
      radius="sm"
      onClick={() => {
        window.open(link, '_blank', 'rel=noopener noreferrer')
      }}
    >Source</Button>
  )
}

import { Button } from '@nextui-org/react'
import React from 'react'

export default function LandingCTA (): React.ReactElement {
  return (
    <div className="flex flex-col py-4 px-4 sm:py-[100px] mb-4 relative">
      <img
        src="/images/img_background_cta.png"
        alt="Background Hero"
        className="absolute top-0 -z-10 mt-2 hidden sm:block"
      />
      <div className="flex flex-col items-center bg-white z-10">
        <h1 className="text-[40px] font-semibold">
          Find Trustworthy Partners in Procurement Easily
        </h1>
        <h3 className="text-textGrayBold text-xl mt-2 font-normal">
          Use our advanced search and filter tools to ensure your procurement
          decisions are secure and trustworthy.
        </h3>
      </div>
      <Button
        className="bg-colorPrimaryBackground mx-0 sm:mx-auto mt-9"
        radius="full"
      >
        Find Now
      </Button>
    </div>
  )
}

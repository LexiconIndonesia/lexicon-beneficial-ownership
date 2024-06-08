import Image from 'next/image'
import React from 'react'

const sponsors = [
  {
    name: 'Accountability Lab',
    imageSrc: '/images/sponsors/AL.png',
    imageSize: {
      width: 380,
      height: 56
    }
  },
  {
    name: 'CIPE',
    imageSrc: '/images/sponsors/CIPE.png',
    imageSize: {
      width: 225,
      height: 141
    }
  },
  {
    name: 'Development Gateway',
    imageSrc: '/images/sponsors/DG_IREX.png',
    imageSize: {
      width: 384,
      height: 117
    }
  }
]

export default function SponsorsArea (): React.ReactElement {
  return (
    <div className='px-4 sm:px-32 py-16 flex flex-col items-center gap-6 text-2xl font-bold'>
      <h3>Supported by</h3>
      <div className='flex flex-col sm:flex-row overflow-y-auto gap-10 sm:gap-6'>
        {sponsors.map((sponsor, index) => (
          <div key={index} className='flex flex-col items-center justify-center'>
            <Image
              src={sponsor.imageSrc}
              className='object-cover'
              width={`${sponsor.imageSize.width}`}
              height={sponsor.imageSize.height}
              alt={sponsor.name}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

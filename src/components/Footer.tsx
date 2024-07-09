import Image from 'next/image'
import React from 'react'

export default function Footer (): React.ReactElement {
  const sponsors = [
    {
      name: 'Accountability Lab',
      imageSrc: '/images/sponsors/AL.png',
      imageSize: {
        width: 150,
        height: 100
      }
    },
    {
      name: 'CIPE',
      imageSrc: '/images/sponsors/CIPE.png',
      imageSize: {
        width: 120,
        height: 100
      }
    },
    {
      name: 'Development Gateway',
      imageSrc: '/images/sponsors/DG_IREX.png',
      imageSize: {
        width: 150,
        height: 100
      }
    }
  ]

  return (
    <footer className="px-4 sm:px-12 py-8 bg-[#fff4fb]">
      <h3 className="text-center font-semibold">Supported by</h3>
      <div className="flex flex-wrap gap-10 justify-center items-center mt-8">
        {sponsors.map((sponsor, index) => {
          return (
            <Image
              key={index}
              width={sponsor.imageSize.width}
              height={sponsor.imageSize.height}
              src={sponsor.imageSrc}
              alt={sponsor.name}
            />
          )
        })}
      </div>
    </footer>
  )
}

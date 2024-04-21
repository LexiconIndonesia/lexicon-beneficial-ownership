import Image from "next/image";
import { ReactElement } from "react";

export default function Footer(): ReactElement {

  const sponsors = [
    {
      name: 'Accountability Lab',
      imageSrc: '/images/sponsors/AL.png',
      imageSize: {
        width: 150,
        height: 100
      }
    },
    // {
    //   name: 'ASET: Anticorruption Solution Through Emerging Technologies',
    //   imageSrc: '/images/sponsors/ASET.png',
    //   imageSize: {
    //     width: 100,
    //     height: 100
    //   }
    // },
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
    },
    // {
    //   name: 'INLE',
    //   imageSrc: '/images/sponsors/INLE.png',
    //   imageSize: {
    //     width: 70,
    //     height: 100
    //   }
    // },
    // {
    //   name: 'ODC',
    //   imageSrc: '/images/sponsors/ODC.png',
    //   imageSize: {
    //     width: 150,
    //     height: 100
    //   }
    // },
    // {
    //   name: 'USAID',
    //   imageSrc: '/images/sponsors/USAID.png',
    //   imageSize: {
    //     width: 200,
    //     height: 100
    //   }
    // }
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
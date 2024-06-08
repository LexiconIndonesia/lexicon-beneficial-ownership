import HeroLanding from '@/components/HeroLanding'
import MainFeatures from '@/components/MainFeatures'
import SponsorsArea from '@/components/SponsorsArea'
import React from 'react'

export default function HomePage (): React.ReactElement {
  return (
    <main className="py-8 px-4 sm:px-12">
      <HeroLanding />
      <MainFeatures />
      <SponsorsArea />
    </main>
  )
}

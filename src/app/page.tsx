import HeroLanding from '@/components/HeroLanding'
import LandingCTA from '@/components/LandingCTA'
import MainFeatures from '@/components/MainFeatures'
import SponsorsArea from '@/components/SponsorsArea'
import React from 'react'

export default function HomePage (): React.ReactElement {
  return (
    <main>
      <HeroLanding />
      <MainFeatures />
      <SponsorsArea />
      <LandingCTA />
    </main>
  )
}

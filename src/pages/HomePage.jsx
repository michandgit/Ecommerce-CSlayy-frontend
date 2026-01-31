import React from 'react'
import Hero from '../components/Hero'
import Latestfits from '../components/LatestFits'

const HomePage = () => {
  return (
  <main className="bg-[#fafafa] min-h-screen">
      <Hero />
      <section className="container mx-auto">
        <Latestfits />
      </section>
    </main>
  )
}

export default HomePage

import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import PetCarousel from '../common/PetCarousel'

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <PetCarousel />
        <Parallax />
      </section>
    </section>
  )
}

export default Home
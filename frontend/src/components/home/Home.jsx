import React from 'react'
import MainHeader from '../layout/MainHeader'
import Parallax from '../common/Parallax'
import PetCarousel from '../common/PetCarousel'
import FeedbackCarousel from '../common/FeedbackCarousel'

const Home = () => {
  return (
    <section>
      <MainHeader />
      <section className='container'>
        <PetCarousel />
        <FeedbackCarousel />
      </section>
      <Parallax />
    </section>
  )
}

export default Home
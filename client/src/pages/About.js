import React from 'react'
import CustomCarousel from '../components/HeroSection';
import WhyUs from '../components/WhyUs';
import Meet from '../components/MeetOurTeam';
import '../MeetOurTeam.css'

const about = () => {
  return (
    <>
    <CustomCarousel
      heading="Why Us?"
      description="Providing excellence and quality products </br> for more than 5 years."
      buttonText="SHOP NOW"
      image="/images/why.jpg"
    />
    <WhyUs/>
    <Meet/>


    </>
    


  )
}

export default about
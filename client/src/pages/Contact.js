import React from 'react'
import Contact from '../components/ContactUs'
import PageBanner from '../components/PageBanner';
const contact = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Contact', link: '/contact' }
  ];
  return (
    <>
      <PageBanner pageTitle="Contact Us" breadcrumbs={breadcrumbs} />

      <Contact />
    </>
  )
}

export default contact
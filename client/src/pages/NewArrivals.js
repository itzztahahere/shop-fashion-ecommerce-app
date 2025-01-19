import React from 'react'
import NewArrivals from '../components/NewArrivals';
import Pb from '../components/PageBanner'

const newarrivals = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'New Arrivals', link: '/new-arrivals' }
  ];
  return (
    
   <>
    <Pb pageTitle="New Arrivals" breadcrumbs={breadcrumbs}/>

    <NewArrivals/>
   </>
  );
}

export default newarrivals
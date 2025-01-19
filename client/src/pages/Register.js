import React from 'react'
import Reg from '../components/Register'
import Pb from '../components/PageBanner'

const register = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Register', link: '/create-account' }
  ];
  return (
    
   <>
    <Pb pageTitle="Register" breadcrumbs={breadcrumbs}/>
    <Reg/>
   </>
  );
}

export default register
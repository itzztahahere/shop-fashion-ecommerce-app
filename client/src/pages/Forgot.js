import React from 'react'
import Reset from '../components/ForgotPassword'
import Pb from '../components/PageBanner'

const forgot = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Login', link: '/login' },
    { label: 'Reset Password', link: '/forgot-password' }
  ];
  return (
    
   <>
    <Pb pageTitle="Reset Password" breadcrumbs={breadcrumbs}/>
    <Reset/>
   </>
  );
}

export default forgot
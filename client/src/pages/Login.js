import Log from '../components/Login'
import Pb from '../components/PageBanner'

const Login = () => {
  const breadcrumbs = [
    { label: 'Home', link: '/' },
    { label: 'Login', link: '/login' }
  ];
  return (
    
   <>
    <Pb pageTitle="Login" breadcrumbs={breadcrumbs}/>
    <Log/>
   </>
  );
};

export default Login;

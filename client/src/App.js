import './App.css';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'; // Do not import Router here anymore
import { useUser } from './context/userAuth'; // Import User Context

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Navbar2 from './components/Navbar2';

import NewArrivals from './pages/NewArrivals';
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import S from './pages/Shop';
import Login from './pages/Login';
import Register from './pages/Register';
import Reset from './pages/Forgot';
import Wishlist from './pages/Wishlist';
import DashboardPage from './pages/Admin/Dashboard';
import CategoryPageProducts from './pages/Shop2';
import CartPage from './pages/CartPage';
import FAQs from './pages/Faqs';
import SearchPage from './pages/Search';
function App() {



  return (
    <ConditionalLayout>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/new-arrivals" element={<NewArrivals />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/shop" element={<S />} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<Register />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/forgot-password" element={<Reset />} />
        {/* <Route path="/get-products-by-category/Men" element={<CategoryPageProducts category="Men" />} />
        <Route path="/get-products-by-category/Women" element={<CategoryPageProducts category="Women" />} />
        <Route path="/get-products-by-category/Kids" element={<CategoryPageProducts category="Kids" />} /> */}
        <Route path="/get-products-by-category/:categoryName" element={<CategoryPageProducts/>} />
        <Route path="/Cart" element={<CartPage/>} />
        <Route path="/faqs" element={<FAQs/>} />
        <Route path="/search-products/:keyword" element={<SearchPage/>} />


        

        {/* Protected Routes */}
        {/* <Route
          path="/dashboard/*"
          element={<ProtectedRoute component={DashboardPage} />}
        /> */}
        {/* Protected Routes */}
        <Route
          path="/dashboard/*"
          element={<ProtectedRoute component={DashboardPage} allowedRoles={[0]} />}
        />

      </Routes>


    </ConditionalLayout>
  );
}

function ConditionalLayout({ children }) {
  const location = useLocation();
  const isDashboardPath = location.pathname.startsWith('/dashboard');

  return (
    <>
      {!isDashboardPath && (
        <>
          <Navbar />
          <Navbar2 />
        </>
      )}
      <div className="main-content">{children}</div>
      {!isDashboardPath && <Footer />}
    </>
  );
}

// function ProtectedRoute({ component: Component }) {
//   const { isLoggedIn } = useUser();

//   return isLoggedIn ? <Component /> : <Navigate to="/login" />;
// }
// function ProtectedRoute({ component: Component, allowedRoles }) {
//   const { isLoggedIn, user } = useUser();

//   return isLoggedIn ? <Component /> : <Navigate to='/login' />


//   if (!allowedRoles.includes(user?.role)) {
//     return <Navigate to="/" replace />;
//   }

// }
function ProtectedRoute({ component: Component, allowedRoles }) {
  const { isLoggedIn, user } = useUser();

  if (!isLoggedIn) {
      return <Navigate to="/login" />;
  }

  if (!allowedRoles.includes(user?.u_role)) {
      return <Navigate to="/" replace />; // Redirect non-allowed users
  }

  return <Component />;
}


export default App;

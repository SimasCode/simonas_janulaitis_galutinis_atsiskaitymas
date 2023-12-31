import './reset.scss';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Shops from './pages/Shops';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import RegisterPage from './pages/RegisterPage';
import AddShopPage from './pages/AddShopPage';
import SingleAddPage from './pages/SingleAddPage';
import NotFoundPage from './pages/NotFoundPage';
import Footer from './components/layout/footer/Footer';
import MyAccountPage from './pages/MyAccountPage';
import Header from './components/layout/header/Header';

export default function App() {
  const ctx = useAuth();
  const { isUserLoggedIn } = ctx;

  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route
          path='/'
          element={isUserLoggedIn ? <Shops /> : <Navigate to={'/login'} />}
        />
        <Route path='/adds/:addId' element={<SingleAddPage />} />

        <Route
          path='/add-shop'
          element={
            isUserLoggedIn ? <AddShopPage /> : <Navigate to={'/login'} />
          }
        />

        <Route
          path='/register'
          element={
            !isUserLoggedIn ? <RegisterPage /> : <Navigate to={'/login'} />
          }
        />

        <Route
          path='/my-account-page'
          element={isUserLoggedIn ? <MyAccountPage /> : <LoginPage />}
        />

        <Route
          path='/login'
          element={isUserLoggedIn ? <Navigate to={'/'} /> : <LoginPage />}
        />
        <Route path='*' element={<NotFoundPage />} />
      </Routes>

      <Footer />
    </div>
  );
}

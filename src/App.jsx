import './reset.scss';
import './App.scss';
import { Navigate, Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';
import Shops from './pages/Shops';
import AddShop from './pages/AddShop';
import { useAuth } from './store/AuthProvider';
import { Toaster } from 'react-hot-toast';
import Register from './pages/Register';

export default function App() {
  const ctx = useAuth();
  const { isUserLoggedIn } = ctx;
  return (
    <div>
      <Toaster />
      <Header />
      <Routes>
        <Route path='/' element={<Shops />} />
        <Route path='/add-shop' element={<AddShop />} />
        <Route path='/register' element={<Register />} />

        <Route
          path='/login'
          element={isUserLoggedIn ? <Navigate to={'/'} /> : <LoginPage />}
        />
      </Routes>
    </div>
  );
}

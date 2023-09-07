import './reset.scss';
import './App.scss';
import { Route, Routes } from 'react-router-dom';
import Header from './components/layout/Header';
import LoginPage from './pages/LoginPage';

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

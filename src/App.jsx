import './reset.scss';
import './App.scss';
import { Routes } from 'react-router-dom';
import Header from './components/layout/Header';

export default function App() {
  return (
    <div>
      <Header />
      <Routes></Routes>
    </div>
  );
}

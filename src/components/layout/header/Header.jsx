import { Link } from 'react-router-dom';
import './header.scss';
import MobileNavigation from './MobileNavigation';
import Navigation from './Navigation';

export default function Header() {
  return (
    <header className='container header-container'>
      <Link className='header-logo'>
        <span className='header-logo-block'>SHOPPY</span>.COM
      </Link>
      <div>
        <MobileNavigation />
        <Navigation />
      </div>
    </header>
  );
}

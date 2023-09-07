import { Link, NavLink } from 'react-router-dom';
import './header.scss';

export default function Header() {
  return (
    <header className='header'>
      <div className='container'>
        <Link className='headerLogo'>LOGO</Link>
        <nav>
          <NavLink className={'navLink'} to={'/'}>
            Shops
          </NavLink>
          <NavLink className={'navLink'} to={'/add-shop'}>
            Add Shop
          </NavLink>

          <NavLink className={'navLink'} to={'/register'}>
            Register
          </NavLink>

          <NavLink className={'navLink'} to={'/login'}>
            Login
          </NavLink>

          <NavLink className={'navLink'} to={'/login'}>
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

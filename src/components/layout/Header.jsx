import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-hot-toast';

export default function Header() {
  function logout() {
    signOut(auth).then(() => {
      // Sign-out successful.
    });
    toast.success('You loggout successfully').catch((error) => {
      // An error happened.
      console.log('Header - error ===', error);
    });
  }

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

          <NavLink onClick={logout} className={'navLink'} to={'/login'}>
            Logout
          </NavLink>
        </nav>
      </div>
    </header>
  );
}

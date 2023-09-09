import { Link, NavLink } from 'react-router-dom';
import './header.scss';
import { signOut } from 'firebase/auth';
import { auth } from '../../firebase/firebase';
import { toast } from 'react-hot-toast';
import { useAuth } from '../../store/AuthProvider';
import { VscAccount } from 'react-icons/vsc';

export default function Header() {
  const ctx = useAuth();
  const { isUserLoggedIn } = ctx;
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
    <header className='container header-container'>
      <Link className='header-logo'>
        <span className='header-logo-block'>SHOPPY</span>.COM
      </Link>
      <nav>
        {isUserLoggedIn && (
          <NavLink className={'nav-link'} to={'/'}>
            Shops
          </NavLink>
        )}

        {isUserLoggedIn && (
          <NavLink className={'nav-link'} to={'/add-shop'}>
            Add Shop
          </NavLink>
        )}

        {!isUserLoggedIn && (
          <NavLink className={'nav-link'} to={'/register'}>
            Register
          </NavLink>
        )}

        {!isUserLoggedIn && (
          <NavLink className={'nav-link'} to={'/login'}>
            Login
          </NavLink>
        )}

        {isUserLoggedIn && (
          <NavLink onClick={logout} className={'navLink'} to={'/login'}>
            Logout
          </NavLink>
        )}
        <span>|</span>
        <NavLink className={'nav-link'} to={'/my-account-page'}>
          <VscAccount />
        </NavLink>
      </nav>
    </header>
  );
}

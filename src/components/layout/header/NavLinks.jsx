import { NavLink } from 'react-router-dom';
import { useAuth } from '../../../store/AuthProvider';
import { VscAccount } from 'react-icons/vsc';
import { toast } from 'react-hot-toast';
import { signOut } from 'firebase/auth';
import { auth } from '../../../firebase/firebase';

export default function NavLinks(props) {
  const ctx = useAuth();
  const { isUserLoggedIn } = ctx;

  function logout() {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
        toast.success('You loggout successfully');
      })
      .catch((error) => {
        // An error happened.
        console.log('Header - error ===', error);
      });
  }

  function handleLogoutClick() {
    if (props.isMobile) {
      props.closeMobileMenu();
    }
    logout();
  }

  return (
    <nav className='kazkas'>
      {isUserLoggedIn && (
        <NavLink
          onClick={() => props.isMobile && props.closeMobileMenu()}
          className={'nav-link'}
          to={'/'}
        >
          Shops
        </NavLink>
      )}

      {isUserLoggedIn && (
        <NavLink
          onClick={() => props.isMobile && props.closeMobileMenu()}
          className={'nav-link'}
          to={'/add-shop'}
        >
          Add Shop
        </NavLink>
      )}

      {!isUserLoggedIn && (
        <NavLink
          onClick={() => props.isMobile && props.closeMobileMenu()}
          className={'nav-link'}
          to={'/register'}
        >
          Register
        </NavLink>
      )}

      {!isUserLoggedIn && (
        <NavLink
          onClick={() => props.isMobile && props.closeMobileMenu()}
          className={'nav-link'}
          to={'/login'}
        >
          Login
        </NavLink>
      )}

      {isUserLoggedIn && (
        <NavLink
          onClick={handleLogoutClick}
          className={'nav-link'}
          to={'/login'}
        >
          Logout
        </NavLink>
      )}
      <span>|</span>
      <NavLink className={'nav-link'} to={'/my-account-page'}>
        <VscAccount />
      </NavLink>
    </nav>
  );
}

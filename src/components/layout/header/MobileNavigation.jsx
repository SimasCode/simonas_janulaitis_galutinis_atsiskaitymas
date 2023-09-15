import { useState } from 'react';
import NavLinks from './NavLinks';
import { BiMenu } from 'react-icons/bi';
import { AiOutlineClose } from 'react-icons/ai';

export default function MobileNavigation() {
  const [open, setOpen] = useState(false);

  const hamburgericon = (
    <BiMenu
      className='mobile-hamburger'
      size={30}
      onClick={() => setOpen(!open)}
    />
  );

  const closeIcon = (
    <AiOutlineClose
      className='mobile-hamburger'
      size={25}
      onClick={() => setOpen(!open)}
    />
  );

  function closeMobileMenu() {
    setOpen(false);
  }

  return (
    <div className='mobile-navigation'>
      {open ? closeIcon : hamburgericon}
      {open && <NavLinks isMobile={true} closeMobileMenu={closeMobileMenu} />}
    </div>
  );
}

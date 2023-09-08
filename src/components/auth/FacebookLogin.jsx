import { BiLogoFacebook } from 'react-icons/bi';

export default function FacebookLogin(props) {
  return (
    <button className={props.className}>
      {' '}
      <BiLogoFacebook /> Facebook
    </button>
  );
}

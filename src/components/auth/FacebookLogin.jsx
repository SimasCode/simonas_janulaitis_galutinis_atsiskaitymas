import { FacebookAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { BiLogoFacebook } from 'react-icons/bi';
import { facebookProvider } from '../../firebase/firebase';

export default function FacebookLogin(props) {
  function authWithFacebook() {
    const auth = getAuth();
    signInWithPopup(auth, facebookProvider)
      .then((result) => {
        // The signed-in user info.
        const user = result.user;
        console.log('user ===', user);
        console.log('FacebookAuth - pavyko');
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const credential = FacebookAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        console.log('accessToken ===', accessToken);

        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        console.log('error ===', error);
        console.log('FacebookAuth - NEpavyko');
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = FacebookAuthProvider.credentialFromError(error);
        console.log('credential ===', credential);
      });
  }

  return (
    <button onClick={authWithFacebook} className={props.className}>
      <BiLogoFacebook /> Facebook
    </button>
  );
}

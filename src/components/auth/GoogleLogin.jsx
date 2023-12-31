import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { googleProvider } from '../../firebase/firebase';
import { BiLogoGoogle } from 'react-icons/bi';

export default function GoogleLogin(props) {
  function authWithGoogle() {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;

        // The signed-in user info.
        const user = result.user;

        // IdP data available using getAdditionalUserInfo(result)
      })
      .catch((error) => {
        console.log('GoogleAuth - NEpavyko');
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }

  return (
    <button onClick={authWithGoogle} className={props.className}>
      <BiLogoGoogle />
      Google
    </button>
  );
}

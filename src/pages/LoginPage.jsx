import GoogleLogin from '../components/auth/GoogleLogin';
import LoginForm from '../components/auth/LoginForm';

export default function LoginPage() {
  return (
    <div className='container'>
      <h1>LoginPage</h1>
      <hr />
      <LoginForm />
      <hr />
      <GoogleLogin />
    </div>
  );
}

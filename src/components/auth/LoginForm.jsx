import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import GoogleLogin from './GoogleLogin';
import FacebookLogin from './FacebookLogin';
import './loginForm.scss';
import { NavLink } from 'react-router-dom';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: '', //james@bond.com
      password: '', // 123456
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('This is not a valid email format')
        .required('Required Field.'),
      password: Yup.string().min(4).max(255).required('Required Field.'),
    }),
    onSubmit: (values) => {
      console.log('Supildytos reiksmes ===', values);
      loginWithFire(values.email, values.password);
    },
  });

  function loginWithFire(email, password) {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        toast.success('Login successful, welcome');
        // Signed in
        const user = userCredential.user;
        // ...
        console.log('user login ok ===', user);
      })
      .catch((error) => {
        toast.error('Login failed, check email or password');
        const errorCode = error.code;
        const errorMessage = error.message;
        console.warn({ errorCode, errorMessage });
      });
  }

  return (
    <div className='container login-container'>
      <form onSubmit={formik.handleSubmit} className='login-form'>
        <h2 className='login-title'>Login Here</h2>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className='login-input'
          type='text'
          id='email'
          placeholder='Email'
        />
        {formik.errors.email && formik.touched.email && (
          <p className='login-error'>{formik.errors.email}</p>
        )}

        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className='login-input'
          type='password'
          id='password'
          placeholder='Password'
        />
        {formik.errors.password && formik.touched.password && (
          <p className='login-error'>{formik.errors.password}</p>
        )}

        <button className='login-button' type='submit'>
          Login
        </button>
      </form>
      <div className='login-other-logins'>
        <GoogleLogin className='login-other-buttons' />
        <FacebookLogin className='login-other-buttons' />
      </div>
      <NavLink className='login-text' to={'/register'}>
        Have you forgotten your password?
      </NavLink>
    </div>
  );
}

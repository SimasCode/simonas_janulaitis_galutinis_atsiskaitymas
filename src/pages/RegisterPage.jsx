import * as Yup from 'yup';
import { useFormik } from 'formik';
import './registerPage.scss';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';
import { useState } from 'react';
import { NavLink } from 'react-router-dom';

export default function RegisterPage() {
  const [errorMessage, setErrorMessage] = useState('');

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .trim()
        .email('This is not a valid email format')
        .required('Required Field.'),
      password: Yup.string()
        .trim()
        .min(4, 'At least 4 characters')
        .required('Required Field.'),
      repeatPassword: Yup.string()
        .trim()
        .min(4, 'At least 4 characters')
        .required('Required Field.'),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      handleLogin(values);
    },
  });

  function handleLogin(userCredential) {
    console.log('userCredential ===', userCredential);

    if (formik.values.password !== formik.values.repeatPassword) {
      console.log('Password dont match');
      return setErrorMessage('Your password dont match.');
    } else {
      createNewUsers(userCredential.email, userCredential.password);
      console.log('Password is good');
    }
  }

  function createNewUsers(email, password) {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        toast.success('Registion completed successfully');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div className='register-container'>
      <h3 className='register-title'>Register</h3>
      <form className='register-form' onSubmit={formik.handleSubmit}>
        <input
          className='register-input'
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          type='text'
          id='email'
          placeholder='Email'
        />

        {formik.errors.email && formik.touched.email && (
          <p className='register-error'>{formik.errors.email}</p>
        )}

        <input
          className='register-input'
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type='password'
          id='password'
          placeholder='Password'
        />

        {formik.errors.password && formik.touched.password && (
          <p className='register-error'>{formik.errors.password}</p>
        )}

        <input
          className='register-input'
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          onBlur={formik.handleBlur}
          type='password'
          id='repeatPassword'
          placeholder='Repeat password'
        />

        {formik.errors.repeatPassword && formik.touched.repeatPassword && (
          <p className='register-error'>{formik.errors.repeatPassword}</p>
        )}
        <p className='register-error'>{errorMessage}</p>
        <button className='register-button' type='submit'>
          Register
        </button>
        <p className='register-acc'>
          Already have account?{' '}
          <NavLink className='register-acc-now' to={'/login'}>
            Login now
          </NavLink>
        </p>
      </form>
    </div>
  );
}

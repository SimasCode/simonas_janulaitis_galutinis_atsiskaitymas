import { useFormik } from 'formik';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import * as Yup from 'yup';
import toast from 'react-hot-toast';

export default function LoginForm() {
  const formik = useFormik({
    initialValues: {
      email: 'james@bond.com',
      password: '123456',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('This field is required.'),
      password: Yup.string()
        .min(4)
        .max(255)
        .required('This field is required.'),
    }),
    onSubmit: (values) => {
      console.log('supildytos reiksmes ===', values);
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
    <div className=''>
      <form onSubmit={formik.handleSubmit} className=''>
        <div className=''>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            className=''
            type='text'
            id='email'
            placeholder='Email'
          />
          {formik.errors.email && formik.touched.email && (
            <p className=''>{formik.errors.email}</p>
          )}
        </div>
        <div className=''>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            className=''
            type='password'
            id='password'
            placeholder='Password'
          />
          {formik.errors.password && formik.touched.password && (
            <p className=''>{formik.errors.password}</p>
          )}
        </div>
        <button className='' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

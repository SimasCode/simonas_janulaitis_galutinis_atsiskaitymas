import * as Yup from 'yup';
import { useFormik } from 'formik';
import './registerPage.scss';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import { toast } from 'react-hot-toast';

export default function RegisterPage() {
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().trim().email().required('Privaloma'),
      password: Yup.string()
        .trim()
        .min(4, 'Minimum 4 simboliai')
        .required('Privaloma'),
      repeatPassword: Yup.string()
        .trim()
        .min(4, 'Minimum 4 simboliai')
        .required('Repeat privalomas'),
    }),
    onSubmit: (values) => {
      console.log('values ===', values);
      handleLogin(values);
    },
  });

  function handleLogin(userCredential) {
    console.log('userCredential ===', userCredential);

    if (formik.values.password !== formik.values.repeatPassword) {
      console.log('Slaptazodis NEsutampa');
      return;
    } else {
      createNewUsers(userCredential.email, userCredential.password);
      console.log('slaptazodis sutampa');
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
    <div className='container'>
      <form className='form' onSubmit={formik.handleSubmit}>
        <label htmlFor='email'> Enter Email:</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.email}
          onBlur={formik.handleBlur}
          type='text'
          id='email'
        />
        {formik.errors.email && formik.touched.email && (
          <p>{formik.errors.email}</p>
        )}

        <label htmlFor='password'> Enter Password:</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.password}
          onBlur={formik.handleBlur}
          type='password'
          id='password'
        />
        {formik.errors.password && formik.touched.password && (
          <p>{formik.errors.password}</p>
        )}

        <label htmlFor='repeatPassword'>Repeat Password:</label>
        <input
          onChange={formik.handleChange}
          value={formik.values.repeatPassword}
          onBlur={formik.handleBlur}
          type='password'
          id='repeatPassword'
        />
        {formik.errors.repeatPassword && formik.touched.repeatPassword && (
          <p>{formik.errors.repeatPassword}</p>
        )}
        <button type='submit'>Register</button>
      </form>
    </div>
  );
}

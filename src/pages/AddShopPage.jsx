import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';
import './addShopPage.scss';

export default function AddShopPage() {
  const ctx = useAuth();
  const { userUid } = ctx;

  const formik = useFormik({
    initialValues: {
      shopName: '',
      town: '',
      startYear: '',
      description: '',
      imageUrl: 'https://i.dummyjson.com/data/products/26/thumbnail.jpg',
    },
    validationSchema: Yup.object({
      shopName: Yup.string()
        .trim()
        .min(4)
        .max(255)
        .required('This field is required.'),
      town: Yup.string().min(4).max(255).required('This field is required.'),
      startYear: Yup.number()
        .min(1970)
        .max(2025)
        .required('This field is required.'),
      description: Yup.string()
        .trim()
        .min(6)
        .max(500)
        .required('This field is required.'),
      imageUrl: Yup.string().trim().min(5).required('This field is required.'),
    }),
    onSubmit: (values) => {
      const newAddWithUserUid = {
        ...values,
        userUid: userUid,
      };

      sendDataToFirebase(newAddWithUserUid);
    },
  });

  async function sendDataToFirebase(dataToSend) {
    try {
      const docRef = await addDoc(collection(db, 'adds'), dataToSend);
      toast.success('Successfully created add');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong');
    }
  }

  return (
    <div className='add-container'>
      <h1 className='add-title'>Add shop</h1>
      <form className='add-form' onSubmit={formik.handleSubmit}>
        {/* SHOP NAME */}
        <input
          className='add-input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.shopName}
          type='text'
          id='shopName'
          placeholder='Shop name'
        />
        {formik.errors.shopName && formik.touched.shopName && (
          <p className='add-error'>{formik.errors.shopName}</p>
        )}

        {/* TOWN */}
        <input
          className='add-input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.town}
          type='text'
          id='town'
          placeholder='Town'
        />
        {formik.errors.town && formik.touched.town && (
          <p className='add-error'>{formik.errors.town}</p>
        )}

        {/* START YEAR */}
        <input
          className='add-input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.startYear}
          type='number'
          id='startYear'
          placeholder='Start year'
        />
        {formik.errors.startYear && formik.touched.startYear && (
          <p className='add-error'>{formik.errors.startYear}</p>
        )}

        {/* ImageURL */}
        <input
          className='add-input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageUrl}
          type='text'
          id='imageUrl'
          placeholder='Image URL'
        />
        {formik.errors.imageUrl && formik.touched.imageUrl && (
          <p className='add-error'>{formik.errors.imageUrl}</p>
        )}

        {/* DESCRIPTION */}
        <textarea
          className='add-input add-text-area'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
          id='description'
          placeholder='Place shop description...'
          rows='4'
          cols='50'
        />
        {formik.errors.description && formik.touched.description && (
          <p className='add-error'>{formik.errors.description}</p>
        )}

        <button className='add-button' type='submit'>
          Place shop
        </button>
      </form>
    </div>
  );
}

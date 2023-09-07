import { useFormik } from 'formik';
import * as Yup from 'yup';
import toast from 'react-hot-toast';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useAuth } from '../store/AuthProvider';

export default function AddShopPage() {
  const ctx = useAuth();
  const { userUid } = ctx;

  const formik = useFormik({
    initialValues: {
      shopName: '',
      town: '',
      startYear: '',
      description: '',
      imageUrl: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg',
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
      console.log('supildytos reiksmes ===', values);
      const newAddWithUserUid = {
        ...values,
        userUid: userUid,
      };
      console.log('newAddWithUserUid ===', newAddWithUserUid);
      sendDataToFirebase(newAddWithUserUid);
    },
  });

  async function sendDataToFirebase(dataToSend) {
    console.log('creating');
    try {
      const docRef = await addDoc(collection(db, 'adds'), dataToSend);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Successfully created add');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('something went wrong');
    }
  }

  return (
    <div className='container'>
      <form onSubmit={formik.handleSubmit} className=''>
        {/* SHOP NAME */}
        <div className=''>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.shopName}
            className=''
            type='text'
            id='shopName'
            placeholder='Shop name'
          />
          {formik.errors.shopName && formik.touched.shopName && (
            <p className=''>{formik.errors.shopName}</p>
          )}
        </div>
        {/* TOWN */}
        <div className=''>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.town}
            className=''
            type='text'
            id='town'
            placeholder='Town'
          />
          {formik.errors.town && formik.touched.town && (
            <p className=''>{formik.errors.town}</p>
          )}
        </div>
        {/* START YEAR */}
        <div className=''>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.startYear}
            className=''
            type='number'
            id='startYear'
            placeholder='Start year'
          />
          {formik.errors.startYear && formik.touched.startYear && (
            <p className=''>{formik.errors.startYear}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div>
          <textarea
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.description}
            className=''
            id='description'
            placeholder='Description'
          />
          {formik.errors.description && formik.touched.description && (
            <p className=''>{formik.errors.description}</p>
          )}
        </div>

        {/* ImageURL */}
        <div>
          <input
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.imageUrl}
            className=''
            type='text'
            id='imageUrl'
            placeholder='Image URL'
          />
          {formik.errors.imageUrl && formik.touched.imageUrl && (
            <p className=''>{formik.errors.imageUrl}</p>
          )}
        </div>

        <button className='' type='submit'>
          Login
        </button>
      </form>
    </div>
  );
}

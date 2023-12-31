import { useFormik } from 'formik';
import { useAuth } from '../store/AuthProvider';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import './newComment.scss';

export default function NewComment() {
  const ctx = useAuth();
  const { userUid } = ctx;

  const params = useParams();

  const formik = useFormik({
    initialValues: {
      newComment: '',
      name: '',
    },
    validationSchema: Yup.object({
      newComment: Yup.string().min(2).required('This field is required.'),
      name: Yup.string().min(2).required('This field is required.'),
    }),
    onSubmit: (values) => {
      const event = new Date();
      const options = {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      };
      const diena = event.toLocaleDateString('en-US', options);
      const newCommentObj = {
        title: values.newComment,
        userUid: userUid,
        name: values.name,
        date: diena,
      };

      sendDataToFirebase(newCommentObj);
      formik.resetForm();
    },
  });

  async function sendDataToFirebase(dataToSend) {
    try {
      const docRef = await addDoc(
        collection(db, 'adds', params.addId, 'comments'),
        dataToSend
      );

      toast.success('Successfully created review');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong');
    }
  }

  return (
    <div className='new-comment-container'>
      <h2 className='new-comment-title'>Add a Review</h2>
      <form onSubmit={formik.handleSubmit}>
        {/* NAME */}
        <input
          className='new-comment-input'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          type='text'
          id='name'
          placeholder='Enter your name'
        />
        {formik.errors.name && formik.touched.name && (
          <p className='new-comment-error'>{formik.errors.name}</p>
        )}

        {/* NEW COMMENT */}
        <textarea
          className='new-comment-input new-comment-text-area'
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newComment}
          type='text'
          id='newComment'
          placeholder='Enter your review'
          rows='4'
          cols='50'
        />
        {formik.errors.newComment && formik.touched.newComment && (
          <p className='new-comment-error'>{formik.errors.newComment}</p>
        )}

        <button className='new-comment-button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

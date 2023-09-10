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
  console.log('params ===', params);

  const formik = useFormik({
    initialValues: {
      newComment: '',
      name: '',
    },
    validationSchema: Yup.object({
      newComment: Yup.string().min(2),
      name: Yup.string().min(2),
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
      console.log('supildytos reiksmes ===', values);
      console.log('NAUJAS COMMENT ===', newCommentObj);
      sendDataToFirebase(newCommentObj);
    },
  });

  async function sendDataToFirebase(dataToSend) {
    console.log('creating');
    try {
      const docRef = await addDoc(
        collection(db, 'adds', params.addId, 'comments'),
        dataToSend
      );
      console.log('Document written with ID: ', docRef.id);
      toast.success('Successfully created review');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Something went wrong');
    }
  }
  //TODO: įdėti data į naują komentarą, kad su nauju komentaru ateina ir data

  const event = new Date();
  const options = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  };
  const diena = event.toLocaleDateString('en-US', options);

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
        {formik.errors.newComment && formik.touched.newComment && (
          <p className=''>{formik.errors.newComment}</p>
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
          <p className=''>{formik.errors.newComment}</p>
        )}

        <button className='new-comment-button' type='submit'>
          Submit
        </button>
      </form>
    </div>
  );
}

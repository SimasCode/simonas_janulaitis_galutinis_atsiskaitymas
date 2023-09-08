import { useFormik } from 'formik';
import { useAuth } from '../store/AuthProvider';
import * as Yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function NewComment() {
  const ctx = useAuth();
  const { userUid } = ctx;

  const params = useParams();
  console.log('params ===', params);

  const formik = useFormik({
    initialValues: {
      newComment: '',
    },
    validationSchema: Yup.object({
      newComment: Yup.string().min(2),
    }),
    onSubmit: (values) => {
      const newCommentObj = {
        title: values.newComment,
        userUid: userUid,
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
      toast.success('Successfully created add');
    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('something went wrong');
    }
  }

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.newComment}
          className=''
          type='text'
          id='newComment'
          placeholder='Enter comment'
        />
        {formik.errors.newComment && formik.touched.newComment && (
          <p className=''>{formik.errors.newComment}</p>
        )}
        <button type='submit'>enter</button>
      </form>
    </div>
  );
}

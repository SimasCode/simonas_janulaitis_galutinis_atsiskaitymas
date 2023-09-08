import { useEffect, useState } from 'react';
import '../style/commentList.scss';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import SingleComment from './SingleComment';

export default function CommentsList() {
  const [commentObj, setCommentObj] = useState([]);

  const params = useParams();
  console.log('params ===', params);

  async function getComments() {
    try {
      // Query a reference to a subcollection
      const commentsData = [];
      const querySnapshot = await getDocs(
        collection(db, 'adds', params.addId, 'comments')
      );
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, ' => ', doc.data());
        commentsData.push({ id: doc.id, ...doc.data() });
        setCommentObj(commentsData);
      });
    } catch (error) {
      console.log('error ===', error);
    }
  }

  useEffect(() => {
    getComments();

    const commentWatch = onSnapshot(
      collection(db, 'adds', params.addId, 'comments'),
      (snapshot) => {
        const commentsData = [];
        snapshot.forEach((doc) => {
          commentsData.push({ id: doc.id, ...doc.data() });
        });
        setCommentObj(commentsData);
      }
    );

    return () => {
      commentWatch();
    };
  }, [params.addId]);

  return (
    <div className='border'>
      <NewComment />
      <ul className='unlisted'>
        {commentObj.map((cObj) => (
          <SingleComment key={cObj.id} item={cObj} />
        ))}
      </ul>
    </div>
  );
}

import { useEffect, useState } from 'react';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useParams } from 'react-router-dom';
import NewComment from './NewComment';
import SingleComment from './SingleComment';
import './commentsList.scss';

export default function CommentsList() {
  const [commentObj, setCommentObj] = useState([]);
  const [selectValue, setSelectValue] = useState('title');
  const sortOptions = ['name', 'date'];

  const params = useParams();

  async function getComments() {
    try {
      // Query a reference to a subcollection
      const commentsData = [];
      const querySnapshot = await getDocs(
        collection(db, 'adds', params.addId, 'comments')
      );
      querySnapshot.forEach((doc) => {
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

  function selectedValue(event) {
    setSelectValue(event.target.value);
  }

  function handleSort() {
    const ArrCopy = [...commentObj];
    ArrCopy.sort((aObj, bObj) =>
      aObj[selectValue].toString().localeCompare(bObj[selectValue].toString())
    );
    setCommentObj(ArrCopy);
  }

  return (
    <div className='comments-container'>
      <div>
        <h2 className='comment-title'>All Reviews</h2>
        <h2 className='comment-sort-title'>Sort by:</h2>
        <select
          className='comment-select'
          onChange={selectedValue}
          value={selectValue}
        >
          <option value=''>--Select sort option--</option>
          {sortOptions.map((optValue) => (
            <option key={optValue} value={optValue}>
              {optValue}
            </option>
          ))}
        </select>
        <button className='comment-button' onClick={handleSort}>
          Sort
        </button>

        <ul className='comment-ul'>
          {commentObj.map((cObj) => (
            <SingleComment key={cObj.id} item={cObj} />
          ))}
        </ul>
      </div>
      <NewComment />
    </div>
  );
}

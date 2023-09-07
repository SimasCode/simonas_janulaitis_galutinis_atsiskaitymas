import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import Comments from './Comments';

export default function SingleAddPage() {
  const [newObj, setNewObj] = useState({});
  const [commentObj, setCommentObj] = useState([]);
  console.log('commentObj ===', commentObj);

  const params = useParams();
  console.log('params ===', params);

  async function getDocFromFire() {
    try {
      const docRef = doc(db, 'adds', params.addId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data());
        setNewObj(docSnap.data());
        console.log('newObj ===', newObj);
      } else {
        // docSnap.data() will be undefined in this case
        console.log('No such document!');
      }
    } catch (error) {
      console.log('error ===', error);
    }
  }

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
    getDocFromFire();
    getComments();
  }, []);

  return (
    <div className='container mt-5'>
      <img src={newObj.mainImgUrl} alt={`${newObj.title} image`} />
      <h2 className='font-bold'>{newObj.title}</h2>
      <p>{newObj.brand}</p>
      <p>{newObj.category}</p>
      <p>{newObj.description}</p>
      <p className='font-bold'>{newObj.price}.00$</p>
      <div>
        <h2>Komentarai:</h2>
        {commentObj.map((comObj) => (
          <Comments key={comObj.id} item={comObj} />
        ))}
      </div>
    </div>
  );
}

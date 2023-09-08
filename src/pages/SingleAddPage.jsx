import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import CommentsList from './CommentsList';

export default function SingleAddPage() {
  const [newObj, setNewObj] = useState({});

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

  useEffect(() => {
    getDocFromFire();
  }, []);

  return (
    <div className='container'>
      <hr />
      <img src={newObj.imageUrl} alt={`${newObj.title} image`} />
      <h2 className=''>ShopName: {newObj.shopName}</h2>
      <p>Description: {newObj.description}</p>
      <p>Year: {newObj.startYear}</p>
      <p>Town: {newObj.town}</p>
      <div>
        <h2>Komentarai:</h2>
        <CommentsList />
      </div>
    </div>
  );
}

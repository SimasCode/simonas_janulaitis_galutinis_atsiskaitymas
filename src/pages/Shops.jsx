import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import AddCardList from './AddCardList';

export default function Shops() {
  const [localArr, setLocalArr] = useState([]);
  console.log('localArr ===', localArr);

  async function getDataFromFirestore() {
    try {
      const querySnapshot = await getDocs(collection(db, 'adds'));

      const getProductsData = [];
      querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data()}`);
        getProductsData.push({
          id: doc.id,
          ...doc.data(),
        });
      });
      setLocalArr(getProductsData);
    } catch (error) {
      console.log('getDataFromFirestore error ===', error);
    }
  }

  useEffect(() => {
    getDataFromFirestore();
  }, []);

  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    try {
      await deleteDoc(doc(db, 'add', idToDelete));
      console.log('idToDelete ===', idToDelete);
      const filtered = localArr.filter((pObj) => pObj.id !== idToDelete);
      setLocalArr(filtered);
    } catch (error) {
      console.log('error ===', error);
    }
  }

  return (
    <div className='container'>
      <h1 className=''>HomePage</h1>
      <p>Welcome to our adds</p>
      <AddCardList item={localArr} onDelete={handleDelete} />
    </div>
  );
}

import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import AddCardList from './AddCardList';
import Feature from '../components/layout/Feature';
import Hero from '../components/layout/Hero';

export default function Shops() {
  const [localArr, setLocalArr] = useState([]);
  const [searchValue, setSearchValue] = useState('');
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

  function searchInput(event) {
    setSearchValue(event.target.value);
    console.log('searchValue ===', searchValue);
  }

  /**
   *
   * @param {SubmitEvent} event
   */

  function handleSearch(event) {
    event.preventDefault();
  }

  const filteredArr = localArr.filter((item) =>
    item.shopName.toLowerCase().includes(searchValue)
  );

  return (
    <div className='container'>
      <Hero />
      <p>Welcome to our adds</p>
      <form onSubmit={handleSearch}>
        <input
          onChange={searchInput}
          value={searchValue}
          type='text'
          placeholder='Search...'
        />
        <button type='submit'>Search</button>
      </form>
      <AddCardList item={filteredArr} onDelete={handleDelete} />
      <Feature />
    </div>
  );
}

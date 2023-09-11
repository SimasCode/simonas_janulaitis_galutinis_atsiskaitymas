import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import AddCardList from './AddCardList';
import Feature from '../components/layout/feature/Feature';
import Hero from '../components/layout/hero/Hero';
import './shops.scss';
import { toast } from 'react-hot-toast';
import { ClipLoader } from 'react-spinners';
import Stats from '../components/layout/stats/Stats';

export default function Shops() {
  const [localArr, setLocalArr] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [loading, setLoading] = useState(false);
  console.log('localArr ===', localArr);

  const isEmpty = !!localArr.length;

  async function getDataFromFirestore() {
    setLoading(true);
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
      // setLoading(false);
      setTimeout(() => {
        setLoading(false);
      }, 2000);
    } catch (error) {
      console.log('getDataFromFirestore error ===', error);
    }
  }

  useEffect(() => {
    // setTimeout(() => {
    //   setLoading(false);
    // }, 3000);
    getDataFromFirestore();
  }, []);

  async function handleDelete(idToDelete) {
    deleteDoc(doc(db, 'adds', idToDelete))
      .then(() => {
        toast.success('Shop deleted successfully');
        getDataFromFirestore();
      })
      .catch((error) => {
        console.warn('ivyko klaida:', error);
        toast.error('Something went wrong');
      });
  }

  function searchInput(event) {
    setSearchValue(event.target.value);
    console.log('searchValue ===', searchValue);
  }

  const filteredArr = localArr.filter((item) =>
    item.shopName.toLowerCase().includes(searchValue)
  );

  const override = {
    display: 'flex',
    margin: '50px auto',
  };

  return (
    <div className='shop-container'>
      <Hero />
      <Stats />
      <h2 className='shop-title'>OUR SHOPS</h2>
      <div className='shop-input-container'>
        <p className='shop-search-text'>Search for your favourite shop</p>
        <input
          className='shop-search-input'
          onChange={searchInput}
          value={searchValue}
          type='text'
          placeholder='Search...'
        />
      </div>
      {loading ? (
        <ClipLoader
          color={'#A18A68'}
          loading={loading}
          cssOverride={override}
          size={40}
          aria-label='Loading Spinner'
          data-testid='loader'
        />
      ) : (
        <AddCardList item={filteredArr} onDelete={handleDelete} />
      )}

      {!isEmpty && (
        <p className='shop-warning'>
          There are no stores listed. We'll probably go bankrupt and we'll all
          be fired. Help us!!!
        </p>
      )}

      <Feature />
    </div>
  );
}

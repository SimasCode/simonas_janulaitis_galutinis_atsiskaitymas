import { doc, getDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
import { db } from '../firebase/firebase';
import { useEffect, useState } from 'react';
import CommentsList from './CommentsList';
import './singleAddPage.scss';
import { AiFillHeart } from 'react-icons/ai';
import { RxEnvelopeClosed } from 'react-icons/rx';
import { BiLogoFacebook } from 'react-icons/bi';
import { AiOutlineInstagram, AiFillStar } from 'react-icons/ai';
import { AiOutlineTwitter } from 'react-icons/ai';
import { ClipLoader } from 'react-spinners';

export default function SingleAddPage() {
  const [newObj, setNewObj] = useState({});
  const [isRed, setIsRed] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  async function getDocFromFire() {
    try {
      const docRef = doc(db, 'adds', params.addId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        // console.log('Document data:', docSnap.data());
        setNewObj(docSnap.data());

        setTimeout(() => {
          setLoading(false);
        }, 1000);
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

  function handleHeart() {
    setIsRed(!isRed);
  }

  return (
    <div className='single-container'>
      <div className='single-top-container'>
        {loading ? (
          <ClipLoader
            color={'#A18A68'}
            loading={loading}
            // cssOverride={override}
            size={40}
            aria-label='Loading Spinner'
            data-testid='loader'
          />
        ) : (
          <>
            <img
              className='single-image'
              src={newObj.imageUrl}
              alt={`${newObj.title} image`}
            />

            <div className='single-text-container'>
              <h2 className='single-shop-name'>{newObj.shopName}</h2>
              <div className='single-shop-icons-container'>
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
                <AiFillStar />
              </div>
              <p className='single-shop-town'>{newObj.town}</p>
              <p className='single-shop-town'>Since {newObj.startYear}</p>
              <p className='single-description'> {newObj.description}</p>
              <a className='single-visit-button' href='/'>
                Visit site
              </a>
              <div className='icons-container'>
                <AiFillHeart
                  className={`${isRed ? 'single-heart' : 'icon-link'}`}
                  onClick={handleHeart}
                  size={23}
                />
                <span>|</span>

                <RxEnvelopeClosed className='icon-link' size={23} />
                <BiLogoFacebook className='icon-link' size={23} />
                <AiOutlineInstagram className='icon-link' size={23} />
                <AiOutlineTwitter className='icon-link' size={23} />
              </div>
            </div>
          </>
        )}
      </div>

      <div className='single-comments-container'>
        <h2>Rating & Reviews</h2>
        <hr />
        <CommentsList />
      </div>
    </div>
  );
}

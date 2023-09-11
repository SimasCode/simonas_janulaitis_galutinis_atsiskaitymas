import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';
import './singleComment.scss';
import { AiFillStar } from 'react-icons/ai';
import { useParams } from 'react-router-dom';
import { toast } from 'react-hot-toast';

export default function SingleComment(props) {
  const { id, title, name, userUid, date } = props.item;
  console.log('id ===', id);
  console.log('userUid ===', userUid);

  const params = useParams();
  console.log('params ===', params);

  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    try {
      await deleteDoc(doc(db, 'adds', params.addId, 'comments', idToDelete));
      toast.success('Deleted successfully');
    } catch (error) {
      console.log('error ===', error);
    }
  }

  return (
    <li className='single-comment-container'>
      <div className='single-comment-text-container'>
        <p className='single-comment-name'>{name}</p>
        <p className='single-comment-date'>{date}</p>
      </div>

      <div className='single-comment-rating'>
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
        <AiFillStar />
      </div>

      <p className='single-comment-title'>{title}</p>
      <button
        className='single-comment-button'
        onClick={() => handleDelete(id)}
      >
        Delete
      </button>
      <hr className='single-comment-break-line' />
    </li>
  );
}

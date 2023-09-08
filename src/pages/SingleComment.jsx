import { deleteDoc, doc } from 'firebase/firestore';
import { db } from '../firebase/firebase';

export default function SingleComment(props) {
  const { id, title, name, userUid } = props.item;
  console.log('id ===', id);

  async function handleDelete(idToDelete) {
    console.log('idToDelete ===', idToDelete);
    try {
      await deleteDoc(doc(db, 'adds', idToDelete, 'comments'));
    } catch (error) {
      console.log('error ===', error);
    }
  }

  return (
    <li className='border'>
      <h2>{title}</h2>
      <p>{userUid}</p>
      <p>{name}</p>
      <button onClick={() => handleDelete(id)}>Delete</button>
    </li>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';

export default function SingleAddCard(props) {
  const { id, title, userUid, description, imageUrl } = props.item;
  const ctx = useAuth();
  return (
    <li className={ctx.userUid === userUid ? '' : ''}>
      <img className='' src={imageUrl} alt={title} />
      <div className=''>
        <h2 className=''>{title}</h2>
      </div>
      <p>{description}</p>

      <div>
        <Link className='' to={`/adds/${id}`}>
          Read more
        </Link>
        {userUid === ctx.userUid && (
          <button className='' onClick={props.onDelete}>
            Delete
          </button>
        )}
        <p className=''>{id}</p>
      </div>
    </li>
  );
}

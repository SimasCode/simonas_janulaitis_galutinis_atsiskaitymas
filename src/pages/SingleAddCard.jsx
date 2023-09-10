import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';

export default function SingleAddCard(props) {
  const { id, userUid, shopName, imageUrl } = props.item;
  const ctx = useAuth();

  return (
    <li
      className={
        userUid === ctx.userUid
          ? 'shop-card-container user-border'
          : 'shop-card-container'
      }
    >
      <img className='shop-image' src={imageUrl} alt={`${shopName}-image`} />

      <p className='shop-name'>{shopName}</p>

      <div className='shop-buttons-container'>
        <Link className='shop-button shop-read-button' to={`/adds/${id}`}>
          Read more
        </Link>
        {userUid === ctx.userUid && (
          <button className='shop-button' onClick={props.onDelete}>
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

import { Link } from 'react-router-dom';
import { useAuth } from '../store/AuthProvider';

export default function SingleAddCard(props) {
  const { id, userUid, shopName, imageUrl } = props.item;
  const ctx = useAuth();

  return (
    <li
      className={
        userUid === ctx.userUid
          ? 'shop-card-container user-border-golden'
          : 'shop-card-container user-border-black'
      }
    >
      <img className='shop-image' src={imageUrl} alt={`${shopName}-image`} />

      <p className='shop-name'>{shopName}</p>

      <div className='shop-buttons-container'>
        <Link className='shop-button shop-button-read' to={`/adds/${id}`}>
          Read more
        </Link>

        <button
          className={
            userUid === ctx.userUid
              ? 'shop-button-delete'
              : 'shop-button-disabled'
          }
          onClick={props.onDelete}
        >
          Delete
        </button>
      </div>
    </li>
  );
}

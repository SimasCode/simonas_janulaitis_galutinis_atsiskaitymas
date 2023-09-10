import SingleAddCard from './SingleAddCard';

export default function AddCardList(props) {
  return (
    <ul className='shop-card-list'>
      {props.item.map((pObj) => (
        <SingleAddCard
          key={pObj.id}
          item={pObj}
          onDelete={() => props.onDelete(pObj.id)}
        />
      ))}
    </ul>
  );
}

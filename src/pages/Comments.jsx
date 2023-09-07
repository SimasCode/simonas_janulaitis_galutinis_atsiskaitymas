export default function Comments(props) {
  const { title, name } = props.item;
  return (
    <div className=''>
      <div className=''>
        <div className=''>
          <img
            src='https://icons.iconarchive.com/icons/diversity-avatars/avatars/256/charlie-chaplin-icon.png'
            className=''
            alt=''
            loading='lazy'
          />
          <div className=''>
            <div className=''>
              <p className=''>{name}</p>
              <a className='' href='#'>
                <i className=''></i>
              </a>
            </div>
            <p className=''>20 April 2022, at 14:88 PM</p>
          </div>
        </div>
        <p className=''>{title}</p>
      </div>
    </div>
  );
}

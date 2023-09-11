import './stats.scss';

export default function Stats() {
  return (
    <div className='stat-container'>
      <h2 className='stat-title'>Because you&apos;re worth it</h2>
      <p className='stat-subtitle'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Amet, ullam?
      </p>
      <div className='stat-text-container'>
        <div className='stat-single-container'>
          <h3>200+</h3>
          <p className='stat-text'>Internetional Brands</p>
        </div>
        <div className='stat-div-line'></div>
        <div className='stat-single-container'>
          <h3>2.000+</h3>
          <p className='stat-text'>High Quality Products</p>
        </div>
        <div className='stat-div-line'></div>
        <div className='stat-single-container'>
          <h3>30.000+</h3>
          <p className='stat-text'>Happy Customers</p>
        </div>
        <div className='stat-div-line'></div>
        <div className='stat-single-container'>
          <h3>5.000+</h3>
          <p className='stat-text'>Discounts</p>
        </div>
      </div>
    </div>
  );
}

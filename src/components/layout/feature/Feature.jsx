import './feature.scss';
export default function Feature() {
  return (
    <div className='feature-container'>
      <div className='feature-block'>
        <img src='../images/feature-images/trophy.svg' alt='trophy-image' />
        <div className='feature-text-container'>
          <h2 className='feature-title'>High Quality</h2>
          <p className='feature-text'>crafted from top materials</p>
        </div>
      </div>

      <div className='feature-block'>
        <img
          src='../images/feature-images/guarantee.svg'
          alt='guarantee-image'
        />
        <div>
          <h2 className='feature-title'>Warranty Protection</h2>
          <p className='feature-text'>Over 2 years</p>
        </div>
      </div>

      <div className='feature-block'>
        <img src='../images/feature-images/shipping.svg' alt='shipping-image' />
        <div>
          <h2 className='feature-title'>Free shipping</h2>
          <p className='feature-text'>Order over 150$</p>
        </div>
      </div>

      <div className='feature-block'>
        <img
          src='../images/feature-images/customer-support.svg'
          alt='customer-support-image'
        />
        <div>
          <h2 className='feature-title'>24/7 Support</h2>
          <p className='feature-text'>Dedicated support</p>
        </div>
      </div>
    </div>
  );
}

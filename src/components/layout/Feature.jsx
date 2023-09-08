import './feature.scss';
export default function Feature() {
  return (
    <div className='container featureContainer'>
      <div className='featureBlock'>
        <img src='../images/feature-images/trophy.svg' alt='' />
        <div className='featureTextContainer'>
          <h2 className='featureTitle'>High Quality</h2>
          <p className='featureText'>crafted from top materials</p>
        </div>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/guarantee.svg' alt='' />
        <div>
          <h2 className='featureTitle'>Warranty Protection</h2>
          <p className='featureText'>Over 2 years</p>
        </div>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/shipping.svg' alt='' />
        <div>
          <h2 className='featureTitle'>Free shipping</h2>
          <p className='featureText'>Order over 150$</p>
        </div>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/customer-support.svg' alt='' />
        <div>
          <h2 className='featureTitle'>24/7 Support</h2>
          <p className='featureText'>Dedicated support</p>
        </div>
      </div>
    </div>
  );
}

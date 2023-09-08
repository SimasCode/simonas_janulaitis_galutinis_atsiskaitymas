import './feature.scss';
export default function Feature() {
  return (
    <div className='container featureContainer'>
      <div className='featureBlock'>
        <img src='../images/feature-images/trophy.svg' alt='' />
        <div>
          <h2>High Quality</h2>
          <p>crafted from top materials</p>
        </div>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/guarantee.svg' alt='' />
        <h2>Warranty Protection</h2>
        <p>Over 2 years</p>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/shipping.svg' alt='' />
        <h2>Free shipping</h2>
        <p>Order over 150$</p>
      </div>

      <div className='featureBlock'>
        <img src='../images/feature-images/customer-support.svg' alt='' />
        <h2>24/7</h2>
        <p>Dedicated support</p>
      </div>
    </div>
  );
}

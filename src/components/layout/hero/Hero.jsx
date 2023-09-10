import './hero.scss';
export default function Hero() {
  return (
    <div className='hero-container'>
      <img
        className='hero-image'
        src='../images/hero-images/hero-image1.jpg'
        alt=''
      />
      <div className='hero-text-container'>
        <h1 className='hero-title'>Find Your Perfect Shop</h1>
        <p className='hero-subtitle'>
          Browse through our diverse range of meticulously selected sellers.
          {/* Designed to bring out your individuality and cater to your sense of
          style. */}
        </p>
      </div>
    </div>
  );
}

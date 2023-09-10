import './footer.scss';
import { BsFacebook, BsTwitter, BsInstagram, BsTiktok } from 'react-icons/bs';

export default function Footer() {
  return (
    <div className='footer-container'>
      {/* Footer top container */}
      <div className='footer-top'>
        <div className='footer-top-first-container'>
          <h2>
            <span className='logo-block'>SHOPPY</span>.COM
          </h2>
          <p className='footer-intro'>Worldwide shop since 2020. </p>
          <div className='footer-icons-container'>
            <BsFacebook />
            <BsTwitter />
            <BsInstagram />
            <BsTiktok />
          </div>
        </div>
        <div className='footer-top-second-container'>
          <div className='footer-top-text-container'>
            <h2 className='footer-top-title-text'>About</h2>
            <a className='footer-top-text' href='/'>
              About Us
            </a>
            <a className='footer-top-text' href='/'>
              Terms
            </a>
            <a className='footer-top-text' href='/'>
              Legal
            </a>
          </div>
          <div className='footer-top-text-container'>
            <h2 className='footer-top-title-text'>Help</h2>
            <a className='footer-top-text' href='/'>
              Account
            </a>
            <a className='footer-top-text' href='/'>
              Privacy Policy
            </a>
            <a className='footer-top-text' href='/'>
              Learn
            </a>
          </div>
          <div className='footer-top-text-container'>
            <h2 className='footer-top-title-text'>Contact</h2>
            <a className='footer-top-text' href='/'>
              Press
            </a>
            <a className='footer-top-text' href='/'>
              Support
            </a>
          </div>
          <div className='footer-top-text-container'>
            <h2 className='footer-top-title-text'>Social</h2>
            <a className='footer-top-text' href='https://twitter.com/'>
              Twitter
            </a>
            <a className='footer-top-text' href='https://www.instagram.com/'>
              Instagram
            </a>
            <a className='footer-top-text' href='https://www.facebook.com/'>
              Facebook
            </a>
          </div>
        </div>
      </div>
      {/* Footer top container */}
      {/* Footer bottom container */}
      <div className='footer-bottom'>
        <p className='footer-bottom-text'>
          Shoppy.com &copy; 2000-2023, All Rights Reserved
        </p>
        <div>
          <img
            src='../images/payment-images/visa.svg'
            alt='visa-payment-image'
          />
          <img
            src='../images/payment-images/mastercard.svg'
            alt='mastercard-payment-image'
          />
          <img
            src='../images/payment-images/paypal.svg'
            alt='paypal-payment-image'
          />
          <img
            src='../images/payment-images/applepay.svg'
            alt='applepay-payment-image'
          />
          <img
            src='../images/payment-images/googlepay.svg'
            alt='googlepay-payment-image'
          />
        </div>
      </div>
      {/* Footer bottom container */}
    </div>
  );
}

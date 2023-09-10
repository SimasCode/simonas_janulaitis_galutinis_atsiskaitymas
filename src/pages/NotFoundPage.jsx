import { Link } from 'react-router-dom';
import './notFoundPage.scss';

export default function NotFoundPage() {
  return (
    <div className='not-container'>
      <h1 className='not-title'>404 error</h1>
      <p className='not-text'>The page was not found</p>
      <p className='not-text'>back to home and start again</p>
      <Link className='not-link' to={'/'}>
        homepage
      </Link>
    </div>
  );
}

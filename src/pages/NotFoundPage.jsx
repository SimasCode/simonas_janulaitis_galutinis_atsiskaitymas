import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div className='container'>
      <h1 className=''>OPPPS, 404, page not found</h1>
      <p className=''>The page was not found</p>
      <Link className='' to={'/'}>
        Try home page
      </Link>
    </div>
  );
}

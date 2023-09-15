import { useAuth } from '../store/AuthProvider';
import './myAccountPage.scss';
import { AiFillCheckCircle, AiFillCloseCircle } from 'react-icons/ai';

export default function MyAccountPage() {
  const ctx = useAuth();
  const { email, userUid, isUserLoggedIn, accDate } = ctx;

  return (
    <div className='account-container'>
      <p className='account-title'>Account details</p>
      <p className='account-text'>User id: {userUid}</p>
      <p className='account-text'>Your email: {email}</p>
      <p className='account-text'>
        Your account created: {accDate.creationTime}
      </p>
      <div className='account-icon-container'>
        Online status:{' '}
        {isUserLoggedIn ? (
          <div>
            <AiFillCheckCircle className='account-icon-green' /> Online
          </div>
        ) : (
          <div>
            <AiFillCloseCircle className='account-icon-red' /> Offline
          </div>
        )}
      </div>
    </div>
  );
}

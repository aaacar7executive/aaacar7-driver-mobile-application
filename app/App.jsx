import { useDispatch, useSelector } from 'react-redux';
import RootNavigation from './Navigation/RootNavigation';
import { useEffect } from 'react';
import { checkAuth } from '@/store/auth-slice/auth-slice';
import { OneSignal } from 'react-native-onesignal';

export default function App() {
  const dispatch = useDispatch();
  const { isAuthLoading } = useSelector((state) => state.auth);
  const { driverId } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(checkAuth());
    initializeOneSignal();
  }, []);

  //   console.log(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID);

  const initializeOneSignal = () => {
    OneSignal.initialize(process.env.EXPO_PUBLIC_ONE_SIGNAL_APP_ID);
    OneSignal.Notifications.requestPermission(false);

    // console.log(driverId);

    if (driverId) {
      OneSignal.login(`DRI${driverId.toString()}`);
      console.log('set internal');
    }
  };

  if (isAuthLoading) {
    return null;
  }

  return <RootNavigation />;
}

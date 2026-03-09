import '../global.css';
import { Provider, useDispatch } from 'react-redux';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useColorScheme } from 'nativewind';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import store from '@/store/store';
import { StatusBar } from 'react-native';
import { Toaster } from 'sonner-native';
import { StripeProvider } from '@stripe/stripe-react-native';
import App from './App';

export default function Layout() {
  const { colorScheme } = useColorScheme();

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StripeProvider
          publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY}
          //   merchantIdentifier="merchant.identifier" // required for Apple Pay
          //   urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
        >
          <SafeAreaProvider>
            <StatusBar barStyle={colorScheme === 'dark' ? 'light-content' : 'dark-content'} />
            <App />
            <Toaster />
          </SafeAreaProvider>
        </StripeProvider>
      </Provider>
    </GestureHandlerRootView>
  );
}

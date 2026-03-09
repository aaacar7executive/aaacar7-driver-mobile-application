import { createStackNavigator } from '@react-navigation/stack';
import Login from '../Screens/auth/Login';
import SignUp from '../Screens/auth/SignUp';

const Stack = createStackNavigator();

const AuthNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
};

export default AuthNavigation;

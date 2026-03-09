import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../Screens/App/Home';
import Profile from '../Screens/App/Profile';
import { useColorScheme } from 'nativewind';
import { Home as HomeIcon, User } from 'lucide-react-native';

const Tab = createBottomTabNavigator();

const AppNavigation = () => {
  const { colorScheme } = useColorScheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
        },
        headerTitleStyle: {
          color: colorScheme === 'dark' ? '#ffffff' : '#000000',
        },
        tabBarStyle: {
          backgroundColor: colorScheme === 'dark' ? '#1c1c1e' : '#ffffff',
        },
        tabBarInactiveTintColor: colorScheme === 'dark' ? '#888' : '#666',

        tabBarIcon: ({ focused, color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={22} color={color} strokeWidth={focused ? 2.5 : 2} />;
          }

          if (route.name === 'Profile') {
            return <User size={22} color={color} strokeWidth={focused ? 2.5 : 2} />;
          }
        },
      })}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default AppNavigation;

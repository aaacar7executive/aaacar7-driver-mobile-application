import { createStackNavigator } from "@react-navigation/stack"
import { useSelector } from "react-redux";
import AuthNavigation from "./AuthNavigation";
import AppNavigation from "./AppNavigation";

const Stack = createStackNavigator();

const RootNavigation = () => {

    const {isAuthenticated} = useSelector((state) => state.auth)

  return (
    <Stack.Navigator screenOptions={{
        headerShown: false,
    }}>
        {!isAuthenticated ? (
            <Stack.Screen name="Auth" component={AuthNavigation} />
        ) : (
            <Stack.Screen name="App" component={AppNavigation} />
        )}
        
    </Stack.Navigator>
  )
}

export default RootNavigation;
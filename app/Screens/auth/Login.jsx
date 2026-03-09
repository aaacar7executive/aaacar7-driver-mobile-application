import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { Text } from '../../../components/ui/text';
import { Card, CardContent, CardFooter, CardHeader } from '../../../components/ui/card';
import { Label } from '../../../components/ui/label';
import { Input } from '../../../components/ui/input';
import { Button } from '../../../components/ui/button';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { toast } from 'sonner-native';
import { checkAuth, driverLogin } from '@/store/auth-slice/auth-slice';
import AsyncStorage from '@react-native-async-storage/async-storage';

const initialState = {
  email: '',
  password: '',
};

const Login = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);

  // login handler button
  const handleLogin = () => {
    // Implement login logic here
    if (!formData.email || !formData.password) {
      toast.error('Please enter email and password');
      return;
    }
    dispatch(driverLogin(formData))
      .unwrap()
      .then(async (data) => {
        await AsyncStorage.setItem('token', data.token);
        toast.success('Login successful');
        dispatch(checkAuth());
        return;
      })
      .catch((error) => {
        toast.error(error.message || 'Login failed');
        return;
      });
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      className="flex-1 bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View className="flex-1 items-center justify-center bg-background">
          <Card className="w-full max-w-sm">
            <CardHeader>
              <Text className="text-center text-2xl font-bold">Login</Text>
            </CardHeader>

            <CardContent className="">
              <View className="mb-4 flex-col gap-2">
                <Label>Username</Label>
                <Input
                  textContentType="emailAddress"
                  autoComplete="email"
                  keyboardType="email-address"
                  value={formData.email}
                  onChangeText={(text) => {
                    setFormData({ ...formData, email: text });
                  }}
                  placeholder="Enter username"
                />
              </View>

              <View className="flex-col gap-2">
                <Label>Password</Label>
                <Input
                  value={formData.password}
                  onChangeText={(text) => setFormData({ ...formData, password: text })}
                  placeholder="Enter password"
                  secureTextEntry={true}
                />
              </View>
            </CardContent>

            <CardFooter className="mt-4 flex w-full flex-col gap-4">
              {/* Login Button */}
              <Button onPress={handleLogin} className="h-12 w-full rounded-xl">
                <Text className="text-base font-semibold">Login</Text>
              </Button>

              <Text
                className="w-full text-right text-sm text-blue-600 underline"
                onPress={() => navigation.navigate('ForgotPassword')}>
                Forgot password?
              </Text>

              {/* Divider */}
              <View className="my-2 flex-row items-center">
                <View className="h-[1px] flex-1 bg-gray-300" />
                <Text className="mx-3 text-sm text-gray-500">OR </Text>
                <View className="h-[1px] flex-1 bg-gray-300" />
              </View>

              {/* Sign Up Row */}
              <View className="w-full text-center text-sm text-gray-600">
                <Text className="text-center text-sm text-gray-600">
                  Don’t have an account?{' '}
                  <Text
                    className="font-semibold text-blue-600 underline"
                    onPress={() => navigation.navigate('SignUp')}>
                    Sign up
                  </Text>
                </Text>
              </View>
            </CardFooter>
          </Card>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Login;

import React, {useState, useEffect} from 'react';
import SplashScreen from './src/screens/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import TermsAndConditions from './src/screens/TermsAndConditions';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {allImages} from './src/assets';
import ForgotPassword from './src/screens/ForgotPassword';
import {Provider} from 'react-redux';
import store from './src/redux/Store';
import OtpVerification from './src/components/OtpVerification';
const Stack = createNativeStackNavigator();

interface AppState {
  isSplashScreen: boolean;
}

const initialState: AppState = {
  isSplashScreen: true,
};

const App = () => {
  const [state, setState] = useState<AppState>(initialState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setState(prevState => ({
        ...prevState,
        isSplashScreen: false,
      }));
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {state.isSplashScreen ? (
          <SplashScreen />
        ) : (
          <Stack.Navigator initialRouteName="LOGIN">
            <Stack.Screen
              name="LOGIN"
              component={LoginScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="REGISTER"
              component={RegisterScreen}
              options={{headerShown: false}}
            />
            <Stack.Screen
              name="TERMSANDCONDITIONS"
              component={TermsAndConditions}
              options={({navigation}) => ({
                headerShown: true,
                title: 'Terms & Conditions',
                headerTitleAlign: 'center',
                headerShadowVisible: false,
                headerStyle: {
                  backgroundColor: '#eaeef3',
                },
                headerTitleStyle: {
                  fontSize: 18,
                  fontWeight: '500',
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image
                      source={allImages.backArrowIcon}
                      style={styles.backIcon}
                    />
                  </TouchableOpacity>
                ),
              })}
            />
            <Stack.Screen name="FORGOTPASSWORD" options={{headerShown: false}}>
              {props => <ForgotPassword {...props} />}
            </Stack.Screen>
            <Stack.Screen name="verify-otp">
              {props => <OtpVerification {...props} />}
            </Stack.Screen>
          </Stack.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({
  backIcon: {
    width: 24,
    height: 24,
  },
});

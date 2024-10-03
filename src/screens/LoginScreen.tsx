import React, {Component} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Image,
  Dimensions,
  Keyboard,
} from 'react-native';
import {Formik, FormikHelpers} from 'formik';
import * as Yup from 'yup';
import {allImages} from '../assets';

interface LoginProps {
  navigation: any;
}

interface LoginFormValues {
  username: string;
  password: string;
}

const {width, height} = Dimensions.get('window');


const LoginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .min(3, '*Username must be at least 3 characters')
    .required('*Username is required'),
  password: Yup.string()
    .min(6, '*Password must be at least 6 characters')
    .max(20, '*Password cannot exceed 20 characters')
    .matches(
      /^(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*(),.?":{}|<>])/,
      '*Password must contain at least one number, one uppercase letter, one lowercase letter, and one special character',
    )
    .required('*Password is required'),
});

export default class LoginScreen extends Component<LoginProps> {
  handleSignIn = (values: LoginFormValues) => {
    console.log('Username:', values.username);
    console.log('Password:', values.password);
  };

  handleSignInNav = () => {
    this.props.navigation.navigate('LOGIN');
  };

  handleSignUpNav = () => {
    this.props.navigation.navigate('REGISTER');
  };

  handleForgotPassword = () => {
    this.props.navigation.navigate('FORGOTPASSWORD');
  }

  render() {
    return (
      <SafeAreaView style={styles.safeArea}>
        <ImageBackground
          source={allImages.darkGreen}
          style={styles.darkGreenBanner}>
          <ImageBackground
            source={allImages.sunnyMeadowLandscapeImg}
            resizeMode="cover"
            style={styles.banner}>
            <View style={styles.topButtonsContainer}>
              <TouchableOpacity
                style={[styles.topButton, styles.activeButton]}
                onPress={this.handleSignInNav}>
                <Text style={[styles.commonText, styles.activeButtonText]}>
                  Sign In
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.topButton, styles.inactiveButton]}
                onPress={this.handleSignUpNav}>
                <Text style={[styles.commonText, styles.inactiveButtonText]}>
                  Sign Up
                </Text>
              </TouchableOpacity>
            </View>

            <Image
              source={allImages.tejaOrganicsLogoImg}
              style={styles.imgLogo}
            />
            <Text style={styles.signInText}>Sign In Account</Text>

            <Formik
              initialValues={{username: '', password: ''}}
              validationSchema={LoginValidationSchema}
              onSubmit={(
                values: LoginFormValues,
                {resetForm}: FormikHelpers<LoginFormValues>,
              ) => {
                this.handleSignIn(values);
                resetForm();
              }}>
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors,
                touched,
              }) => (
                <>
                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.commonText,
                        errors.username && touched.username
                          ? {borderColor: 'red'}
                          : {},
                      ]}
                      placeholder="Username"
                      placeholderTextColor="#32373C"
                      onChangeText={handleChange('username')}
                      onBlur={handleBlur('username')}
                      value={values.username}
                      autoFocus
                    />
                    <Image
                      source={allImages.userProfileIcon}
                      style={styles.inputIcon}
                    />
                  </View>
                  {errors.username && touched.username && (
                    <Text style={styles.errorText}>{errors.username}</Text>
                  )}

                  <View style={styles.inputContainer}>
                    <TextInput
                      style={[
                        styles.input,
                        styles.commonText,
                        errors.password && touched.password
                          ? {borderColor: 'red'}
                          : {},
                      ]}
                      placeholder="Password"
                      placeholderTextColor="#32373C"
                      secureTextEntry={true}
                      onChangeText={handleChange('password')}
                      onBlur={handleBlur('password')}
                      value={values.password}
                    />
                    <Image
                      source={allImages.passwordIcon}
                      style={styles.inputIcon}
                    />
                  </View>
                  {errors.password && touched.password && (
                    <Text style={styles.errorText}>{errors.password}</Text>
                  )}

                  <TouchableOpacity
                    style={styles.signInButton}
                    onPress={handleSubmit as any}>
                    <Text style={styles.signInButtonText}>Sign In</Text>
                  </TouchableOpacity>

                  <TouchableOpacity onPress={this.handleForgotPassword}>
                    <Text style={styles.forgotPasswordText}>
                      Forgot password?
                    </Text>
                  </TouchableOpacity>
                </>
              )}
            </Formik>

            <View style={styles.productImageContainer}>
              <Image
                source={allImages.tejaOrganicsCarrierOilsImg}
                style={styles.productImage}
              />
            </View>
          </ImageBackground>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  darkGreenBanner: {
    width: width,
    height: height,
  },
  commonText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  banner: {
    width: width,
    height: height,
  },
  imgLogo: {
    width: 218,
    height: 128,
    alignSelf: 'center',
    marginTop: 20,
  },
  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
    width: 352,
    height: 37,
    borderRadius: 21,
    backgroundColor: '#32373C',
    alignItems: 'center',
    alignSelf: 'center',
  },
  topButton: {
    width: 173,
    height: 31,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 18,
    borderWidth: 0,
  },
  activeButton: {
    backgroundColor: '#fff',
  },
  inactiveButton: {
    backgroundColor: '#32373C',
  },
  activeButtonText: {
    color: '#000',
  },
  inactiveButtonText: {
    color: '#fff',
  },
  signInText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 30,
    marginBottom: 10,
    fontFamily: 'Montserrat',
    lineHeight: 32,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: 350,
    height: 55,
    marginBottom: 18,
    paddingHorizontal: 20,
    alignSelf: 'center',
    borderColor: '#CFCFCF',
    borderWidth: 1,
  },
  input: {
    flex: 1,
    height: 40,
    color: '#343A40',
  },
  inputIcon: {
    width: 24,
    height: 24,
    color: '#343A40',
    marginLeft: 15,
  },
  signInButton: {
    backgroundColor: '#006400',
    width: 351,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginBottom: 15,
    alignSelf: 'center',
    marginTop: 8,
  },
  signInButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
  forgotPasswordText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
  },
  errorText: {
    fontSize: 11,
    color: 'red',
    width: 350,
    alignSelf: 'center',
    marginBottom: 7,
    marginTop: -11,
    fontFamily: 'Montserrat',
  },
  productImageContainer: {
    alignSelf: 'center',
    borderColor: '#CFCFCF',
    position: 'absolute',
    bottom: -10,
  },
  productImage: {
    width: 300,
    height: 261,
    resizeMode: 'contain',
  },
});

import React, {Component} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image} from 'react-native';
import FeatherIcon from 'react-native-vector-icons/Feather';
import InputField from '../components/InputField';
import PhoneInputField from '../components/PhoneInputField';
import {allImages} from '../assets';
import withForm from '../components/WithForm';
import {UseFormReturn, FieldValues} from 'react-hook-form';
import {AppDispatch, RootState} from '../redux/Store';
import {connect} from 'react-redux';
import {signingUpUser, SingUpUser} from '../redux/slices/AuthSlice';

interface RegisterProps {
  methods: UseFormReturn<FieldValues>;
  navigation: any;
  registerUserDetails: (userDetails: SingUpUser) => void;
}

interface RegisterState {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAccepted: boolean;
  isSignUp: boolean;
  termsError: string;
  isPasswordVisible: boolean;
  isConfirmPasswordVisible: boolean;
}

class RegisterScreen extends Component<RegisterProps, RegisterState> {
  constructor(props: RegisterProps) {
    super(props);
    this.state = {
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
      termsAccepted: false,
      isSignUp: false,
      termsError: '',
      isPasswordVisible: false,
      isConfirmPasswordVisible: false,
    };
  }

  toggleScreen = () => {
    this.setState({isSignUp: true});
  };

  handleSignUp = () => {
    const {methods, registerUserDetails} = this.props;
    const {termsAccepted} = this.state;
    if (!termsAccepted) {
      this.setState({termsError: '*You must accept the terms and conditions'});
      return;
    }
    this.setState({termsError: ''});
    methods.handleSubmit(data => {
      console.log("kajfafalf", data);
      const registeredData = {
        email: data.email,
        username: data.name,
        password: data.password,
        phone: data.phone,
        password_confirmation: data.confirmPassword,
        role: 'admin',
        referral_code: '',
      };
      registerUserDetails(registeredData);
    })();
  };

  toggleTermsAccepted = () => {
    this.setState({termsAccepted: !this.state.termsAccepted});
  };

  togglePasswordVisibility = () => {
    console.log(this.state.isPasswordVisible);
    this.setState(prevState => ({
      isPasswordVisible: !prevState.isPasswordVisible,
    }));
  };

  toggleConfirmPasswordVisibility = () => {
    console.log(this.state.isConfirmPasswordVisible);
    this.setState(prevState => ({
      isConfirmPasswordVisible: !prevState.isConfirmPasswordVisible,
    }));
  };

  handleSignInNav = () => {
    this.props.navigation.navigate('LOGIN');
    // this.setState({isSignUp: false});
  };

  handleSignUpNav = () => {
    this.props.navigation.navigate('REGISTER');
    // this.setState({isSignUp: true});
  };

  render() {
    const {
      isSignUp,
      termsAccepted,
      termsError,
      isPasswordVisible,
      isConfirmPasswordVisible,
    } = this.state;
    const {methods} = this.props;
    const {
      control,
      formState: {errors},
      watch,
    } = methods;
    const password = watch('password');

    return (
      <View style={styles.container}>
        <View style={styles.topButtonsContainer}>
          <TouchableOpacity
            style={[
              styles.topButton,
              isSignUp ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={this.handleSignInNav}>
            <Text
              style={[
                styles.commonText,
                isSignUp ? styles.activeButtonText : styles.inactiveButtonText,
              ]}>
              Sign In
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[
              styles.topButton,
              !isSignUp ? styles.activeButton : styles.inactiveButton,
            ]}
            onPress={this.handleSignUpNav}>
            <Text
              style={[
                styles.commonText,
                !isSignUp ? styles.activeButtonText : styles.inactiveButtonText,
              ]}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
        <InputField
          label="Name"
          value={this.state.name}
          onChangeText={text => this.setState({name: text})}
          icon={allImages.userProfileIcon}
          control={control}
          name="name"
          rules={{required: '*Name is required'}}
          errors={errors}
          userName={true}
        />
        <PhoneInputField
          control={control}
          onChangePhone={text => this.setState({phone: text})}
          name="phone"
          rules={{
            required: '*Phone number is required',
            pattern: {
              value: /^\d{10,15}$/,
              message:
                '*Phone number must contain only digits and be between 10 to 15 digits',
            },
          }}
          errors={errors}
        />
        <InputField
          label="Email"
          value={this.state.email}
          onChangeText={text => this.setState({email: text})}
          icon={allImages.emailIcon}
          control={control}
          name="email"
          rules={{
            required: '*Email is required',
            pattern: {
              value: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
              message: '*Enter a valid email address',
            },
          }}
          errors={errors}
        />
        <InputField
          label="Password"
          value={this.state.password}
          onChangeText={text => this.setState({password: text})}
          icon={allImages.passwordIcon}
          secureTextEntry={isPasswordVisible}
          isPasswordVisible={isPasswordVisible}
          isPasswordField={true}
          control={control}
          togglePasswordVisibility={this.togglePasswordVisibility}
          name="password"
          rules={{
            required: '*Password is required',
            minLength: {
              value: 8,
              message: '*Password must be at least 8 characters long',
            },
            pattern: {
              value:
                /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              message:
                '*Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character',
            },
          }}
          errors={errors}
        />
        <InputField
          label="Password Confirm"
          value={this.state.confirmPassword}
          onChangeText={text => this.setState({confirmPassword: text})}
          icon={allImages.passwordIcon}
          secureTextEntry={isConfirmPasswordVisible}
          control={control}
          name="confirmPassword"
          isConfirmPasswordField={true}
          rules={{
            required: '*Confirm Password is required',
            validate: value => value === password || '*Passwords do not match',
          }}
          errors={errors}
          isConfirmPasswordVisible={isConfirmPasswordVisible}
          toggleConfirmPasswordVisibility={this.toggleConfirmPasswordVisibility}
        />
        <View style={styles.termsContainer}>
          {termsAccepted ? (
            <TouchableOpacity
              style={[styles.checkbox, styles.activeCheckbox]}
              onPress={this.toggleTermsAccepted}>
              <FeatherIcon name={'check'} color="#fff" size={15} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.checkbox}
              onPress={this.toggleTermsAccepted}></TouchableOpacity>
          )}
          <Text
            style={styles.termsText}
            onPress={() =>
              this.props.navigation.navigate('TERMSANDCONDITIONS')
            }>
            Terms and conditions
          </Text>
        </View>
        {termsError && !termsAccepted ? (
          <Text style={styles.errorText}>{termsError}</Text>
        ) : null}
        <TouchableOpacity
          style={styles.signUpButton}
          onPress={this.handleSignUp}>
          <Text style={styles.signUpButtonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },

  topButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 70,
    width: 370,
    height: 37,
    borderRadius: 21,
    backgroundColor: '#32373C',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: 27,
  },

  topButton: {
    width: 182,
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

  topButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },

  activeButtonText: {
    color: '#000',
  },

  inactiveButtonText: {
    color: '#fff',
  },
  inputContainer: {
    marginBottom: 12,
  },
  inputField: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
  },
  textInput: {
    flex: 1,
    paddingVertical: 8,
  },
  commonText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
  },

  termsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    width: 370,
    alignSelf: 'center',
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderColor: '#D9D9D9',
    borderWidth: 2,
    marginRight: 5,
    backgroundColor: '#fff',
  },

  activeCheckbox: {
    backgroundColor: '#006400',
  },

  termsText: {
    fontSize: 14,
    marginLeft: 8,
    color: '#343A40',
    fontWeight: '500',
    fontFamily: 'Poppins',
    lineHeight: 26,
  },

  errorText: {
    color: 'red',
    fontSize: 11,
    marginLeft: 30,
    marginTop: -13,
  },

  signUpButton: {
    backgroundColor: '#006400',
    width: 370,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 80,
    marginBottom: 15,
    alignSelf: 'center',
    marginTop: 15,
  },
  signUpButtonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: '500',
    fontFamily: 'Montserrat',
  },
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  registerUserDetails: (userDetails: SingUpUser) => {
    console.log('registerUserDetails', userDetails);
    dispatch(signingUpUser(userDetails));
  },
});

const mapStateToProps = (state: RootState) => ({
  userDetails: state.AuthSlice.signUpData,
  apiStatus: state.AuthSlice.apiStatuses,
  registerErrMsg: state.AuthSlice.signUpErrMsg,
});

export default withForm(connect(mapStateToProps, mapDispatchToProps)(RegisterScreen));

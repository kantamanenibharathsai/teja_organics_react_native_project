import {Formik} from 'formik';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import Entypo from 'react-native-vector-icons/Entypo';
import * as Yup from 'yup';
import { commonStyles } from '../utils/CommonStyles';


const sanitize = (text: string) =>
  text.replace(/^\s+/, '').replace(/\s+/g, ' ');


interface IProps {}

interface IState {
  newPassword: string;
  confirmPassword: string;
  newPasswordVisibility: boolean;
  confirmPasswordVisibility: boolean;
}

const sentOtpSchema = Yup.object().shape({
  newPassword: Yup.string()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/,
      'Password must be combination of capital, small alphabets,and digits and special characters',
    )
    .required('Password is required'),
  confirmPassword: Yup.string()
    .required('Confirm password is required')
    .oneOf([Yup.ref('newPassword')], 'Passwords must match'),
});

export class NewPassword extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      newPassword: '',
      confirmPassword: '',
      newPasswordVisibility: false,
      confirmPasswordVisibility: false,
    };
  }
  render() {
    const {
      newPassword,
      confirmPassword,
      newPasswordVisibility,
      confirmPasswordVisibility,
    } = this.state;
    return (
      <View
        style={{
          flex: 1,
          height: responsiveHeight(80),
          padding: 10,
        }}>
        <Text
          style={{
            color: '#343A40',
            fontSize: responsiveFontSize(3),
            fontWeight: '400',
          }}>
          Forgot Password
        </Text>
        <View style={{marginVertical: 20, flex: 1}}>
          <Formik
            validationSchema={sentOtpSchema}
            initialValues={{
              newPassword: '',
              confirmPassword: '',
            }}
            validateOnBlur
            validateOnChange={false}
            onSubmit={values => console.log(values)}>
            {({
              handleBlur,
              handleChange,
              values,
              errors,
              touched,
              handleSubmit,
            }) => (
              <>
                <View>
                  <Text style={commonStyles.textFieldLabel}>New Password</Text>
                  <TextInput
                    value={values.newPassword}
                    onChangeText={text => {
                      handleChange('newPassword')(sanitize(text));
                    }}
                    onBlur={handleBlur('newPassword')}
                    outlineColor="transparent"
                    error={Boolean(errors.newPassword && touched.newPassword)}
                    mode="outlined"
                    secureTextEntry={!newPasswordVisibility}
                    right={
                      <TextInput.Icon
                        onPress={() =>
                          this.setState(prev => ({
                            ...prev,
                            newPasswordVisibility: !prev.newPasswordVisibility,
                          }))
                        }
                        icon={() => (
                          <Entypo
                            name={
                              newPasswordVisibility ? 'eye' : 'eye-with-line'
                            }
                            size={25}
                            color={'#babbbc'}
                          />
                        )}
                      />
                    }
                    theme={{roundness: 10}}
                    style={[
                      commonStyles.textFieldInput,
                      {
                        borderColor: '#CFCFCF',
                        borderWidth: 1,
                        borderRadius: 12,
                      },
                    ]}
                    placeholder="Please Enter Your New Password"
                  />
                  <HelperText type="error">
                    {errors.newPassword && touched.newPassword
                      ? errors.newPassword
                      : ''}
                  </HelperText>
                </View>
                <View>
                  <Text style={commonStyles.textFieldLabel}>
                    Confirm Password
                  </Text>
                  <TextInput
                    value={values.confirmPassword}
                    onChangeText={text => {
                      handleChange('confirmPassword')(sanitize(text));
                    }}
                    secureTextEntry={!confirmPasswordVisibility}
                    onBlur={handleBlur('confirmPassword')}
                    outlineColor="transparent"
                    error={Boolean(
                      errors.confirmPassword && touched.confirmPassword,
                    )}
                    mode="outlined"
                    right={
                      <TextInput.Icon
                        onPress={() =>
                          this.setState(prev => ({
                            ...prev,
                            confirmPasswordVisibility:
                              !prev.confirmPasswordVisibility,
                          }))
                        }
                        icon={() => (
                          <Entypo
                            name={
                              confirmPasswordVisibility
                                ? 'eye'
                                : 'eye-with-line'
                            }
                            color={'#babbbc'}
                            size={25}
                          />
                        )}
                      />
                    }
                    theme={{roundness: 10}}
                    style={[
                      commonStyles.textFieldInput,
                      {
                        borderColor: '#CFCFCF',
                        borderWidth: 1,
                        borderRadius: 12,
                      },
                    ]}
                    placeholder="Confirm Your Password"
                  />
                  <HelperText type="error">
                    {errors.confirmPassword && touched.confirmPassword
                      ? errors.confirmPassword
                      : ''}
                  </HelperText>
                </View>
                <View
                  style={{
                    flex: 1,
                  }}>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={[commonStyles.signUpButton, {marginTop: 'auto'}]}>
                    <Text style={commonStyles.btnText}>Reset Password</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    );
  }
}

export default NewPassword;

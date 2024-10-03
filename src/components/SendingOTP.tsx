import {Formik} from 'formik';
import React, {Component} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import {HelperText, TextInput} from 'react-native-paper';
import {
  responsiveFontSize,
  responsiveHeight,
} from 'react-native-responsive-dimensions';
import * as Yup from 'yup';
import {commonStyles} from '../utils/CommonStyles';

const sanitize = (text: string) =>
  text.replace(/^\s+/, '').replace(/\s+/g, ' ');

interface SendingOTPProps {}

interface SendingOTPState {
  emailOrPhone: string;
}

const sentOtpSchema = Yup.object().shape({
  emailOrMobile: Yup.string().required('*Email Or Phone Number Required'),
});

export class SendingOTP extends Component<SendingOTPProps, SendingOTPState> {
  constructor(props: SendingOTPProps) {
    super(props);
    this.state = {
      emailOrPhone: '',
    };
  }
  render() {
    return (
      <View style={styles.viewCont}>
        <Text style={styles.createNewPasswordText}>Create New Password</Text>
        <View style={styles.formikViewCont}>
          <Formik
            validationSchema={sentOtpSchema}
            initialValues={{
              emailOrMobile: '',
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
                  <Text style={commonStyles.textFieldLabel}>
                    Phone No or email address
                  </Text>
                  <TextInput
                    value={values.emailOrMobile}
                    onChangeText={text => {
                      handleChange('emailOrMobile')(sanitize(text));
                    }}
                    onBlur={handleBlur('emailOrMobile')}
                    outlineColor="transparent"
                    error={Boolean(
                      errors.emailOrMobile && touched.emailOrMobile,
                    )}
                    mode="outlined"
                    theme={{roundness: 10}}
                    style={[commonStyles.textFieldInput, styles.textField]}
                    placeholder="Enter Your Phone Number or Email Address"
                  />
                  <HelperText type="error">
                    {errors.emailOrMobile && touched.emailOrMobile
                      ? errors.emailOrMobile
                      : ''}
                  </HelperText>
                </View>
                <View style={styles.btnCont}>
                  <TouchableOpacity
                    onPress={() => handleSubmit()}
                    style={[commonStyles.signUpButton, {marginTop: 'auto'}]}>
                    <Text style={commonStyles.btnText}>Get OTP</Text>
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

export default SendingOTP;

const styles = {
  viewCont: {
    flex: 1,
    height: responsiveHeight(80),
    padding: 10,
  },

  createNewPasswordText: {
    color: '#343A40',
    fontSize: responsiveFontSize(3),
    fontWeight: '400' as '400',
  },

  formikViewCont: {marginVertical: 20, flex: 1},

  textField: {
    borderColor: '#CFCFCF',
    borderWidth: 1,
    borderRadius: 12,
  },

  btnCont: {
    flex: 1,
  },
};

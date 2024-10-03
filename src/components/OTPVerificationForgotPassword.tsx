import React, {Component} from 'react';
import {
  Alert,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {responsiveFontSize} from 'react-native-responsive-dimensions';
import {connect} from 'react-redux';
import {AppDispatch, RootState} from '../redux/store';
import {commonStyles} from '../utils/CommonStyles';
import {allImages} from '../assets';
import {verifyOtp} from '../redux/slices/AuthSlice';
import KeyboardWrapper from './KeyboardWrapper';

interface IProps {}

interface PropsFromRedux {
  verifyOtpHandler: (otp: string) => void;
}

type CombinedProps = IProps & PropsFromRedux;
interface IState {
  timer: number;
  otp: string;
}

export class OTPVerificationForgotPassword extends Component<
  CombinedProps,
  IState
> {
  private timerId: NodeJS.Timeout | null = null;
  constructor(props: CombinedProps) {
    super(props);
    this.state = {timer: 30, otp: ''};
    this.startTimer = this.startTimer.bind(this);
    this.resendHandler = this.resendHandler.bind(this);
    this.verifyHandler = this.verifyHandler.bind(this);
    this.otpTextHandler = this.otpTextHandler.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentWillUnmount(): void {
    if (this.timerId) clearInterval(this.timerId);
  }

  startTimer() {
    this.timerId = setInterval(() => {
      if (this.state.timer > 0)
        this.setState(({timer}) => ({timer: timer - 1}));
      else if (this.timerId) clearInterval(this.timerId);
    }, 1000);
  }

  resendHandler() {
    if (this.state.timer > 0) {
      Alert.alert('Wait Until Timer Finished');
    } else {
      this.setState({timer: 30});
      this.startTimer();
    }
  }

  verifyHandler() {
    if (this.state.otp.length < 4) Alert.alert('OTP Must be 4 Digits');
    else {
      this.props.verifyOtpHandler(this.state.otp);
    }
  }

  otpTextHandler = (otp: string) => this.setState(prev => ({...prev, otp}));

  render() {
    const {timer} = this.state;
    return (
      <KeyboardWrapper>
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.headerText}>OTP Verification</Text>
            <Text
              style={[commonStyles.otpDescriptionText, styles.otpDescription]}>
              Please enter the verification code sent to +91 9876543210
            </Text>
          </View>
          <OtpInput
            focusColor={'#A0E045'}
            theme={{
              containerStyle: styles.otpInputContainer,
              pinCodeContainerStyle: commonStyles.otpContainer,
            }}
            numberOfDigits={4}
            onTextChange={this.otpTextHandler}
          />
          <View style={styles.timerContainer}>
            <ImageBackground
              source={allImages.gradientOTPCircleImg}
              style={commonStyles.otpCircleBg}
              resizeMode="cover">
              <Text style={commonStyles.otpDurationText}>
                {this.state.timer}
              </Text>
              <Text style={commonStyles.otpSecondsText}>Sec</Text>
            </ImageBackground>
            <View>
              <Text style={commonStyles.notReceivedText}>
                Didn't Receive an OTP?
              </Text>
              <Text
                onPress={this.resendHandler}
                style={[
                  commonStyles.resendText,
                  {color: timer == 0 ? '#A0E045' : '#909090'},
                ]}>
                Resend
              </Text>
            </View>
          </View>

          <TouchableOpacity
            onPress={this.verifyHandler}
            style={commonStyles.signUpButton}>
            <Text style={commonStyles.btnText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </KeyboardWrapper>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-around',
  },
  headerContainer: {
    gap: 10,
  },
  headerText: {
    color: '#343A40',
    fontSize: responsiveFontSize(3),
    fontWeight: '400',
  },
  otpDescription: {
    textAlign: 'left',
  },
  otpInputContainer: {
    width: 'auto',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 23,
  },
  timerContainer: {
    alignItems: 'center',
    gap: 20,
  },
});

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  verifyOtpHandler: (otp: string) => dispatch(verifyOtp(otp)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OTPVerificationForgotPassword);

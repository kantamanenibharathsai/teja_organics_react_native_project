import React, {Component} from 'react';
import {
  Alert,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {OtpInput} from 'react-native-otp-entry';
import {connect} from 'react-redux';
import {IAuthSlice, verifyOtp} from '../redux/slices/AuthSlice';
import {AppDispatch, RootState} from '../redux/store';
import {
  responsiveFontSize,
  responsiveScreenWidth,
} from '../utils/ResponsiveFunctions';
import {commonStyles} from '../utils/CommonStyles';
import HeaderComponent from './Header';
import {allImages} from '../assets';

interface IState {
  timer: number;
  otp: string;
}
interface IProps {
  navigation: any;
}
interface PropsFromRedux {
  verifyOtp: (otp: string) => void;
  apiStatus: IAuthSlice['apiStuses'];
}

type CombinedProps = IProps & PropsFromRedux;
export class OtpVerification extends Component<CombinedProps, IState> {
  private timerId: NodeJS.Timeout | null = null;
  constructor(props: CombinedProps) {
    super(props);
    this.state = {timer: 10, otp: ''};
    this.startTimer = this.startTimer.bind(this);
    this.resendHandler = this.resendHandler.bind(this);
    this.verifyHandler = this.verifyHandler.bind(this);
    this.otpTextHandler = this.otpTextHandler.bind(this);
  }

  componentDidMount() {
    this.startTimer();
  }

  componentDidUpdate(
    prevProps: Readonly<CombinedProps>,
    prevState: Readonly<IState>,
    snapshot?: any,
  ): void {
    if (this.props.apiStatus.verifyOtp === 'SUCCESS') {
      this.props.navigation.navigate('auth');
    }
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
      this.setState({timer: 10});
      this.startTimer();
    }
  }

  verifyHandler() {
    if (this.state.otp.length < 4) Alert.alert('OTP Must be 4 Digits');
    else this.props.verifyOtp(this.state.otp);
  }

  otpTextHandler = (otp: string) => this.setState(prev => ({...prev, otp}));

  render() {
    const {timer} = this.state;
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.container}>
          <HeaderComponent
            navigation={this.props.navigation}
            text={'OTP Verification'}
          />
          <Text style={commonStyles.otpDescriptionText}>
            Please enter the verification code sent to +91 9876543210
          </Text>
          <OtpInput
            focusColor={'#A0E045'}
            theme={{
              containerStyle: {

              },
              pinCodeContainerStyle: {
                ...commonStyles.otpContainer,
                ...styles.otpContainerSmallGap,
              },
            }}
            numberOfDigits={4}
            onTextChange={this.otpTextHandler}
          />
          <View style={styles.centeredContainer}>
            <ImageBackground
              source={allImages.gradientOTPCircleImg}
              style={commonStyles.otpCircleBg}
              resizeMode="cover">
              <Text style={commonStyles.otpDurationText}>{timer}</Text>
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
                  timer == 0
                    ? styles.resendTextActive
                    : styles.resendTextInactive,
                ]}>
                Resend
              </Text>
            </View>
          </View>
          <TouchableOpacity
            onPress={this.verifyHandler}
            style={commonStyles.signUpButton}>
            <Text style={styles.verifyText}>Verify</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingHorizontal: responsiveScreenWidth(5),
    // paddingVertical: responsiveScreenWidth(2),
    gap: 30,
    margin:50
  },
  centeredContainer: {
    alignItems: 'center',
    gap: 20,
  },
  resendTextActive: {
    color: '#A0E045',
  },
  resendTextInactive: {
    color: '#909090',
  },
  verifyText: {
    color: 'white',
    fontSize: responsiveFontSize(2),
    fontWeight: '300',
  },
  otpContainerSmallGap: {
    // justifyContent: 'space-between',
    // marginHorizontal: 1,
  },
});

const mapStateToProps = (state: RootState) => ({
  apiStatus: state.AuthSlice.apiStuses,
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  verifyOtp: (otp: string) => dispatch(verifyOtp(otp)),
});

export default connect(mapStateToProps, mapDispatchToProps)(OtpVerification);

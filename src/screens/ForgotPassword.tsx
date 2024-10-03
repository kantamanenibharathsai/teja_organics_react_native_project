import React, {Component} from 'react';
import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import {Text} from 'react-native-paper';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import StepIndicator from 'react-native-step-indicator';
import Entypo from 'react-native-vector-icons/Entypo';
import {allImages} from '../assets';
import SendingOTP from '../components/SendingOTP';
import NewPassword from '../components/NewPassword';
import OTPVerificationForgotPassword from '../components/OTPVerificationForgotPassword';
import HeaderComponent from '../components/Header';

interface IProps {
  navigation: any;
}

interface IState {
  currentStep: number;
}

const labels = ['Password', 'OTP', 'Set New'];

const stepIndicatorStyles = {
  separatorStrokeWidth: 4,
  currentStepStrokeWidth: 3,
  currentStepIndicatorSize: 31,
  stepIndicatorSize: 31,
  stepStrokeCurrentColor: '#A0E045',
  stepStrokeWidth: 3,
  stepStrokeUnFinishedColor: '#909090',
  separatorFinishedColor: '#A0E045',
  stepStrokeFinishedColor: '#A0E045',
  separatorUnFinishedColor: '#D1D5DB',
  stepIndicatorFinishedColor: '#ffffff',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorLabelCurrentColor: 'red',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  currentStepLabelColor: '#3F4343',
};

export class ForgotPassword extends Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {currentStep: 1};
  }

  render() {
    const renderInnerComponent = () => {
      switch (this.state.currentStep) {
        case 1:
          return <OTPVerificationForgotPassword />;
        case 2:
          return <NewPassword />;
        default:
          return <SendingOTP />;
      }
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.innerContainer}>
          <HeaderComponent
            text="Forgot Password"
            navigation={this.props.navigation}
          />
          <View style={styles.headerContainer}>
            <StepIndicator
              stepCount={3}
              currentPosition={this.state.currentStep}
              labels={labels}
              customStyles={stepIndicatorStyles}
              renderLabel={({stepStatus, label}) => {
                switch (stepStatus) {
                  case 'finished':
                  case 'current':
                    return <Text style={styles.currentLabel}>{label}</Text>;
                  default:
                    return <Text style={styles.unfinishedLabel}>{label}</Text>;
                }
              }}
              renderStepIndicator={({stepStatus}) => {
                switch (stepStatus) {
                  case 'finished':
                    return (
                      <Image
                        source={allImages.completedStepImg}
                        style={styles.completedStepImg}
                      />
                    );
                  case 'current':
                    return (
                      <Entypo
                        name="controller-record"
                        size={15}
                        color="#A0E045"
                      />
                    );
                  default:
                    return (
                      <Entypo
                        name="controller-record"
                        size={15}
                        color="#D1D5DB"
                      />
                    );
                }
              }}
            />
          </View>
          {renderInnerComponent()}
        </View>
      </SafeAreaView>
    );
  }
}

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: responsiveScreenWidth(5),
    paddingVertical: responsiveScreenWidth(2),
  },
  headerContainer: {
    paddingVertical: 20,
  },
  currentLabel: {
    color: '#3F4343',
    fontWeight: '500',
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  unfinishedLabel: {
    color: '#909090',
    fontWeight: '500',
    fontFamily: 'Montserrat',
    fontSize: 13,
  },
  completedStepImg: {
    width: 28,
    height: 28,
  },
});

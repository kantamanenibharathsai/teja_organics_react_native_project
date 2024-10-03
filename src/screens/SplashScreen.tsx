import React from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  View,
} from 'react-native';
import {allImages} from '../assets/index';
import {StackNavigationProp} from '@react-navigation/stack';


interface Props {
  
}

interface State {}

const {width, height} = Dimensions.get('window');


class SplashScreen extends React.Component<Props, State> {

  render() {
    return (
      <View>
        <ImageBackground
          source={allImages.darkGreen}
          style={styles.darkGreenBanner}>
          <ImageBackground
            source={allImages.sunnyMeadowLandscapeImg}
            resizeMode="cover"
            style={styles.banner}>
            <View style={styles.overlay}>
              <Image
                source={allImages.tejaOrganicsLogoImg}
                style={styles.imgLogo}
              />
              <Image
                source={allImages.tejaOrganicsCarrierOilsImg}
                style={styles.carrierOilsImg}
              />
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  darkGreenBanner: {
    width: '100%',
    height: '100%',
  },

  banner: {
    width: width,
    height: height,
  },

  overlay: {
    justifyContent: 'space-around',
    alignItems: 'center',
    flex: 1,
  },

  imgLogo: {
    width: 284,
    height: 166,
  },

  carrierOilsImg: {
    width: 283,
    height: 250,
  },
});

export default SplashScreen;

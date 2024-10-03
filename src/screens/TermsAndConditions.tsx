import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from 'react-native';
import {responsiveScreenWidth} from 'react-native-responsive-dimensions';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
// import {fonts} from '../constants/fonts';
import {termsData} from '../utils/TermsData';
import {colors} from '../utils/Colors';
import {SafeAreaView} from 'react-native-safe-area-context';



class TermsAndConditions extends Component {
  render() {
    return (
      <SafeAreaView style={styles.safeAreaView}>
        <StatusBar
          backgroundColor={'rgba(0,0,0,0)'}
          translucent={true}
          barStyle={'light-content'}
        />
        <View style={styles.container}>
          <View style={styles.termsContainer}>
            {termsData.map(item => (
              <View key={item.id} style={styles.termItem}>
                <View style={styles.iconContainer}>
                  <MaterialIcons name={item.icon} size={25} />
                </View>
                <View style={styles.textConatiner}>
                  <Text style={styles.termText}>{item.text}</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default TermsAndConditions;

const styles = StyleSheet.create({
  safeAreaView: {height: '100%', backgroundColor: colors.sinupBgColor},

  container: {
    flex: 1,
    backgroundColor: colors.sinupBgColor,
    alignItems: 'center',
  },

  iconContainer: {
    width: responsiveScreenWidth(6),
  },

  textConatiner: {
    width: responsiveScreenWidth(75),
  },

  termsContainer: {
    backgroundColor: colors.white,
    padding: 20,
    borderRadius: 20,
    margin: 40,
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  termItem: {
    flexDirection: 'row',
    gap: 5,
  },

  termText: {
    fontSize: 16,
    lineHeight: 25,
    // fontFamily: fonts.medium,
    fontFamily: 'Inter',
  },
});

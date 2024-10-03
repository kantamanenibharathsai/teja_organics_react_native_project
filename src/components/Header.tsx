import React, {Component} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import IonIcons from 'react-native-vector-icons/Ionicons';
import {
  responsiveFontSize,
} from 'react-native-responsive-dimensions';

interface IProps {
  navigation: any;
  text: string;
}

export class HeaderComponent extends Component<IProps, {}> {
  render() {
    return (
      <View style={styles.titleContainer}>
        <IonIcons
          name="chevron-back-outline"
          size={28}
          color={'gray'}
          onPress={() => this.props.navigation.goBack()}
        />
        <Text style={styles.titleTex}>{this.props.text}</Text>
      </View>
    );
  }
}

export default HeaderComponent;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderWidth: 3,
    borderColor: "#000000"
  },
  titleTex: {
    fontWeight: '600',
    fontSize: responsiveFontSize(2.5),
    justifyContent: 'center',
    marginLeft: 'auto',
    marginRight: 'auto',
    color: '#343A40',
  },
});

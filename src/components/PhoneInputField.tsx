import React, {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  TouchableOpacity,
} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';
import {allImages} from '../assets';

interface PhoneInputFieldProps<T extends FieldValues> {
  control: Control<T>;
  name: keyof T;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
  >;
  errors: FieldErrors<T>;
  onChangePhone: (phone: string) => void;
}

interface PhoneInputFieldState {
  showPicker: boolean;
  selectedCountryCode: string;
  selectedFlag: string;
  selectedCountryAbbreviation: string;
  noCountriesFound: boolean;
  searchQuery: string;
  phoneValue: string;
}

class PhoneInputField<T extends FieldValues> extends Component<
  PhoneInputFieldProps<T>,
  PhoneInputFieldState
> {
  constructor(props: PhoneInputFieldProps<T>) {
    super(props);
    this.state = {
      showPicker: false,
      selectedCountryCode: '+91',
      selectedFlag: '🇮🇳',
      selectedCountryAbbreviation: 'IND',
      noCountriesFound: false,
      searchQuery: '',
      phoneValue: '',
    };
  }

  handlePickerSelect = (country: {
    dial_code: string;
    flag: string;
    code: string;
  }) => {
    this.setState({
      selectedCountryCode: country.dial_code,
      selectedFlag: country.flag,
      selectedCountryAbbreviation: country.code.toUpperCase(),
      showPicker: false,
      phoneValue: country.dial_code + ' ',
    });
  };

  handlePhoneChange = (text: string) => {
    this.setState({phoneValue: text}, () => {
      this.props.onChangePhone(text);
    });
  };

  handleSearch = (query: string) => {
    this.setState({searchQuery: query});

    const countries: {
      name: string;
      dial_code: string;
      code: string;
      flag: string;
    }[] = [];

    const matches = countries.filter(country =>
      country.name.toLowerCase().includes(query.toLowerCase()),
    );
    this.setState({noCountriesFound: matches.length === 0});
  };

  render() {
    const {
      showPicker,
      selectedCountryCode,
      selectedFlag,
      selectedCountryAbbreviation,
      noCountriesFound,
      searchQuery,
      phoneValue,
    } = this.state;

    const {control, name, rules, errors} = this.props;

    return (
      <View style={styles.inputLabelContainer}>
        <Text style={styles.label}>Phone</Text>
        <View style={styles.inputContainer}>
          <TouchableOpacity
            onPress={() => this.setState({showPicker: true})}
            style={styles.flagContainer}>
            <Text style={styles.flagText}>{selectedFlag}</Text>
            <Text style={styles.abbreviationText}>
              {selectedCountryAbbreviation}
            </Text>
            <Image source={allImages.arrowDownIcon} style={styles.arrowIcon} />
          </TouchableOpacity>
          <Controller
            control={control}
            name={name as Path<T>}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, styles.commonText]}
                placeholder="Phone"
                placeholderTextColor="#32373C"
                value={phoneValue}
                onBlur={onBlur}
                onChangeText={text => {
                  this.handlePhoneChange(text);
                  onChange(text);
                }}
                keyboardType="phone-pad"
              />
            )}
          />
          <Image source={allImages.phoneIcon} style={styles.inputIcon} />
        </View>
        {errors[name] && (
          <Text style={styles.errorText}>
            {typeof errors[name]?.message === 'string'
              ? errors[name]?.message
              : ''}
          </Text>
        )}
        <CountryPicker
          show={showPicker}
          onBackdropPress={() => this.setState({showPicker: false})}
          pickerButtonOnPress={this.handlePickerSelect}
          style={{
            modal: {
              height: 450,
              backgroundColor: 'white',
              borderRadius: 10,
            },
            itemsList: {
              maxHeight: 500,
            },
            textInput: {
              height: 50,
              borderBottomWidth: 1,
              borderColor: '#ddd',
              paddingHorizontal: 10,
            },
            countryButtonStyles: {
              height: 50,
              paddingHorizontal: 20,
              alignItems: 'center',
              flexDirection: 'row',
            },
            flag: {
              fontSize: 20,
              marginRight: 10,
            },
            dialCode: {
              fontSize: 16,
              color: '#333',
            },
            countryName: {
              fontSize: 16,
              color: '#333',
            },
          }}
          lang="en"
          searchMessage={!noCountriesFound ? 'No countries found' : ''}
          initialState={selectedCountryCode}
          enableModalAvoiding={true}
          androidWindowSoftInputMode="pan"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputLabelContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: 370,
    alignSelf: 'center',
    marginBottom: 15,
    position: 'relative',
  },
  label: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 15,
    lineHeight: 18,
    fontFamily: 'Montserrat',
    color: '#343A40',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 14,
    width: 370,
    height: 55,
    marginBottom: 10,
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
  commonText: {
    fontSize: 14,
    fontFamily: 'Montserrat',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
  flagText: {
    fontSize: 24,
    marginRight: 5,
  },
  abbreviationText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#343A40',
  },
  arrowIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  errorText: {
    color: 'red',
    fontSize: 11,
    marginTop: -3,
  },

  
});

export default PhoneInputField;

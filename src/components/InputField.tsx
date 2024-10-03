import {Component} from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ImageSourcePropType,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Controller,
  Control,
  FieldErrors,
  RegisterOptions,
  FieldValues,
  Path,
} from 'react-hook-form';

interface InputFieldProps<T extends FieldValues> {
  label: string;
  value: string;
  onChangeText: (text: string) => void;
  icon: ImageSourcePropType;
  secureTextEntry?: boolean;
  control: Control<T>;
  name: keyof T;
  rules?: Omit<
    RegisterOptions<T, Path<T>>,
    'setValueAs' | 'disabled' | 'valueAsNumber' | 'valueAsDate'
  >;
  errors: FieldErrors<T>;
  onToggleSecureEntry?: () => void;
  isPasswordVisible?: boolean;
  isConfirmPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
  isPasswordField?: boolean;
  isConfirmPasswordField?: boolean;
  toggleConfirmPasswordVisibility?: () => void;
  userName?: boolean;
}

class InputField<T extends FieldValues> extends Component<InputFieldProps<T>> {
  render() {
    const {
      label,
      value,
      onChangeText,
      icon,
      secureTextEntry,
      control,
      name,
      rules,
      errors,
      onToggleSecureEntry,
      isPasswordVisible,
      togglePasswordVisibility,
      isConfirmPasswordField,
      isPasswordField,
      toggleConfirmPasswordVisibility,
      isConfirmPasswordVisible,
      userName
    } = this.props;

    return (
      <View style={styles.inputLabelContainer}>
        <Text style={styles.label}>{label}</Text>
        <View style={styles.inputContainer}>
          <Controller
            control={control}
            name={name as Path<T>}
            rules={rules}
            render={({field: {onChange, onBlur, value}}) => (
              <TextInput
                style={[styles.input, styles.commonText]}
                placeholder={label}
                placeholderTextColor="#32373C"
                value={value}
                onBlur={onBlur}
                onChangeText={text => {
                  onChange(text);
                  onChangeText(text);
                }}
                secureTextEntry={
                  (!isPasswordVisible && isPasswordField) ||
                  (!isConfirmPasswordVisible && isConfirmPasswordField)
                    ? true
                    : false
                }
                keyboardType={'default'}
                autoFocus={userName ? true : false}
                returnKeyType="default"
                enablesReturnKeyAutomatically={true}
              />
            )}
          />
          <TouchableOpacity onPress={togglePasswordVisibility}>
            {isPasswordVisible && isPasswordField && (
              <Ionicons name="lock-open" size={24} color="#343A40" />
            )}
            {!isPasswordVisible && isPasswordField && (
              <Image source={icon} style={styles.inputIcon} />
            )}
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleConfirmPasswordVisibility}>
            {isConfirmPasswordVisible && isConfirmPasswordField && (
              <Ionicons name="lock-open" size={24} color="#343A40" />
            )}
            {isConfirmPasswordField && !isConfirmPasswordVisible && (
              <Image source={icon} style={styles.inputIcon} />
            )}
          </TouchableOpacity>
          {!isPasswordField && !isConfirmPasswordField && (
            <Image source={icon} style={styles.inputIcon} />
          )}
        </View>
        {errors[name] && (
          <Text style={styles.errorText}>
            {errors[name]?.message?.toString()}
          </Text>
        )}
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
  },

  label: {
    fontSize: 15,
    fontWeight: '400',
    marginBottom: 10,
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

  errorText: {
    color: 'red',
    marginTop: -3,
    fontSize: 11,
  },
});

export default InputField;

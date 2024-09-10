import {StyleSheet, Text, View, TextInput} from 'react-native';
import React from 'react';
import {useField} from 'formik';
import {colors} from '../../constant';
import {TextInputProps} from 'react-native';

interface CustomInputProps extends TextInputProps {
  label?: string;
  name: string;
}

const CustomInput: React.FC<CustomInputProps> = ({label, name, ...props}) => {
  const [field, meta] = useField(name);
  return (
    <View style={styles.container}>
      {label && <Text style={styles.label}>{label}</Text>}
      <TextInput
        style={[
          styles.input,
          meta.error && meta.touched ? styles.errorBorder : null,
        ]}
        onChangeText={field.onChange(name)}
        onBlur={field.onBlur(name)}
        value={field.value}
        {...props}
      />
      {meta.error && meta.touched ? (
        <Text style={styles.errorText}>{meta.error}</Text>
      ) : null}
    </View>
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    fontWeight: 'bold',
    color: colors.black,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  errorText: {
    color: 'red',
    marginTop: 5,
    fontSize: 12,
  },
  errorBorder: {
    borderColor: 'red',
  },
});

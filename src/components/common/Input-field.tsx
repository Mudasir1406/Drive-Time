import { StyleSheet, Text, View, TextInput } from 'react-native';
import React from 'react';
import { useField } from 'formik';
import { colors } from '../../constant';

interface CustomInputProps {
  label?: string;
  name: string;
  secureTextEntry?: boolean;
  [x: string]: any;
}

const CustomInput = ({
  label,
  name,
  secureTextEntry,
  ...props
}: CustomInputProps) => {
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
        secureTextEntry={secureTextEntry}
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

import { StyleSheet, View } from 'react-native';
import React, { Dispatch, SetStateAction, useEffect } from 'react';
import {
    Box,
    ScrollView,
    Text,
} from '@gluestack-ui/themed';
import { HStack } from '@gluestack-ui/themed';
import { Formik } from 'formik';
import * as Yup from 'yup';
import CustomInput from '../../components/common-cpmponents/Input-field';
import {
    Select,
    SelectTrigger,
    SelectInput,
    SelectIcon,
    SelectPortal,
    SelectContent,
    SelectItem,
    SelectBackdrop,
    SelectDragIndicator,
    SelectDragIndicatorWrapper,
} from '@gluestack-ui/themed';
import CustomButton from '../../components/login-types/custom-button';
import { colors } from '../../constant';

type PersonalData = {
    username: string;
    firstname: string;
    lastname: string;
    phone: string;
    dob: string;
    gender: string;
    email: string;
    make: string;
    company: string;
    VehicleNo: string;
    VehicleType: string;
    registrationNo: string;
    password: string;
};

type Iprops = {
    setpersonalInfo: Dispatch<SetStateAction<boolean>>;
    setPersonalData: Dispatch<SetStateAction<PersonalData>>;
    PersonalData: PersonalData;
}


const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    firstname: Yup.string().required('First name is required'),
    lastname: Yup.string().required('Last name is required'),
    phone: Yup.string().required('Phone number is required'),
    dob: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    email: Yup.string()
        .email('Invalid email address')
        .required('Email is required'),
    make: Yup.string().required('Vehicle modal is required'),
    company: Yup.string().required('Vehicle Company is required'),
    VehicleNo: Yup.string().required('Vehicle Number is required'),
    VehicleType: Yup.string().required('Vehicle Type is required'),
    registrationNo: Yup.string().required('Registration No is required'),
    password: Yup.string()
        .min(6, 'Password must be at least 6 characters')
        .required('Password is required'),
});

const DriverSignUpForm: React.FC<Iprops> = ({ setpersonalInfo, setPersonalData, PersonalData }) => {
    return (
        <Formik
            initialValues={{
                username: PersonalData.username || '',
                firstname: PersonalData.firstname || '',
                lastname: PersonalData.lastname || '',
                phone: PersonalData.phone || '',
                dob: PersonalData.dob || '',
                gender: PersonalData.gender || '',
                email: PersonalData.email || '',
                make: PersonalData.make || '',
                company: PersonalData.company || '',
                VehicleNo: PersonalData.VehicleNo || '',
                VehicleType: PersonalData.VehicleType || '',
                registrationNo: PersonalData.registrationNo || '',
                password: PersonalData.password || '',

            }}
            validationSchema={validationSchema}
            onSubmit={values => {
                console.log('Form Submitted:', values);
                setPersonalData(values)
                setpersonalInfo(true);
            }}>
            {({ handleChange, handleBlur, handleSubmit, values, setFieldValue }) => {
                useEffect(() => {
                    console.log('Form Values:', values);
                }, [values]);

                return (
                    <ScrollView>
                        <Box sx={styles.main}>
                            <Text sx={styles.heading}>Driver Sign Up</Text>

                            <CustomInput
                                label="Username"
                                name="username"
                                placeholder="Enter Username"
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                            <CustomInput
                                label="Email"
                                name="email"
                                placeholder="Enter Email"
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                            <HStack space="sm" reversed={false}>
                                <Box sx={styles.inputBox}>
                                    <CustomInput
                                        label="First Name"
                                        name="firstname"
                                        placeholder="Enter First Name"
                                        onChangeText={handleChange('firstname')}
                                        onBlur={handleBlur('firstname')}
                                        value={values.firstname}
                                    />
                                </Box>
                                <Box sx={styles.inputBox}>
                                    <CustomInput
                                        label="Last Name"
                                        name="lastname"
                                        placeholder="Enter Last Name"
                                        onChangeText={handleChange('lastname')}
                                        onBlur={handleBlur('lastname')}
                                        value={values.lastname}
                                    />
                                </Box>
                            </HStack>
                            <CustomInput
                                label="Password"
                                name="password"
                                placeholder="Enter Password"
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                            <CustomInput
                                label="Phone"
                                name="phone"
                                placeholder="Enter Phone Number"
                                onChangeText={handleChange('phone')}
                                onBlur={handleBlur('phone')}
                                value={values.phone}
                            />
                            <CustomInput
                                label="Date of Birth"
                                name="dob"
                                placeholder="YYYY-MM-DD"
                                onChangeText={handleChange('dob')}
                                onBlur={handleBlur('dob')}
                                value={values.dob}
                            />

                            <Box sx={styles.genderContainer}>
                                <Text sx={styles.label}>Gender</Text>
                                <Select
                                    selectedValue={values.gender}
                                    onValueChange={itemValue =>
                                        setFieldValue('gender', itemValue)
                                    }>
                                    <SelectTrigger variant="outline" size="md">
                                        <SelectInput placeholder="Select Gender" />
                                        <SelectIcon mr="$3" >
                                        </SelectIcon>
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <SelectItem label="Male" value="male" />
                                            <SelectItem label="Female" value="female" />
                                            <SelectItem label="Other" value="other" />
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                            </Box>

                            <Box sx={styles.inputBox}>
                                <CustomInput
                                    label="Vehicle Number"
                                    name="VehicleNo"
                                    placeholder="Enter Vehicle Number"
                                    onChangeText={handleChange('VehicleNo')}
                                    onBlur={handleBlur('VehicleNo')}
                                    value={values.VehicleNo}
                                />
                            </Box>
                            <Box sx={styles.inputBox}>
                                <CustomInput
                                    label="Vehicle Company"
                                    name="company"
                                    placeholder="Enter Vehicle Company"
                                    onChangeText={handleChange('company')}
                                    onBlur={handleBlur('company')}
                                    value={values.company}
                                />
                            </Box>
                            <Box sx={styles.inputBox}>
                                <CustomInput
                                    label="Built Year"
                                    name="make"
                                    placeholder="Enter Built Year"
                                    onChangeText={handleChange('make')}
                                    onBlur={handleBlur('make')}
                                    value={values.make}
                                />
                            </Box>
                            <Box sx={styles.inputBox}>
                                <CustomInput
                                    label="Registartion Number"
                                    name="registrationNo"
                                    placeholder="Enter Registartion Number"
                                    onChangeText={handleChange('registrationNo')}
                                    onBlur={handleBlur('registrationNo')}
                                    value={values.registrationNo}
                                />
                            </Box>
                            <Box sx={styles.genderContainer}>
                                <Text sx={styles.label}>Vehicle Type</Text>
                                <Select
                                    selectedValue={values.VehicleType}
                                    onValueChange={itemValue =>
                                        setFieldValue('VehicleType', itemValue)
                                    }>
                                    <SelectTrigger variant="outline" size="md">
                                        <SelectInput placeholder="Select Vehicle Type" />
                                        <SelectIcon mr="$3" >
                                        </SelectIcon>
                                    </SelectTrigger>
                                    <SelectPortal>
                                        <SelectBackdrop />
                                        <SelectContent>
                                            <SelectDragIndicatorWrapper>
                                                <SelectDragIndicator />
                                            </SelectDragIndicatorWrapper>
                                            <SelectItem label="Car" value="car" />
                                            <SelectItem label="Motor Cycle" value="bike" />
                                        </SelectContent>
                                    </SelectPortal>
                                </Select>
                            </Box>
                            <Box sx={styles.submitButtonContainer}>
                                <CustomButton text="NEXT" handlePress={handleSubmit} />
                            </Box>
                        </Box>
                    </ScrollView>
                );
            }}
        </Formik>
    )
}

export default DriverSignUpForm

const styles = StyleSheet.create({
    main: {
        marginTop: 20,
        padding: 20,
        flex: 1,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: colors.black,
    },
    inputBox: {
        flex: 1,
    },
    genderContainer: {
        marginBottom: 20,
    },
    label: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: 'bold',
    },
    submitButtonContainer: {
        marginTop: 20,

        width: '100%',
    },
});
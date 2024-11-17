import FontAwesome from '@expo/vector-icons/FontAwesome5';
import React, { useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';
import { object, string } from 'yup';

import { Formik } from 'formik';
import axios from 'axios';
import { BASE_URL } from '../../constants';
import ErrorBottom from '../../components/ErrorBottom';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

let signUpSchema = object({
    name: string().required('Name is Required!'),
    email: string()
        .email('Please enter a valid email')
        .required('Email is Required!'),
    schoolId: string().required('School Id is Required!'),
    password: string().required('Password is Required!'),
    confirmPassword: string().required('Confirm Password is Required!'),
});

const SignUp = () => {
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const signUpHandler = async (values: any) => {
        try {
            const { name, email, schoolId, password, confirmPassword } = values;

            if (password !== confirmPassword) {
                setErrorMessage('Passwords must match!');
                return;
            }

            const reqBody = {
                name,
                email,
                schoolId,
                password,
            };

            console.log("body", reqBody);

            const response = await axios.post(
                BASE_URL + 'auth/student/signup',
                reqBody
            );
            console.log('Response: ', response);
            if (response.status === 201)
                setErrorMessage('Registered Successfully! You can login now.');
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            console.log('Response Error:', error.response.data);
        }
    };

    const closeErrorMessage = () => {
        setErrorMessage(null);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Background Image with Gradient */}

                {errorMessage && (
                    <ErrorBottom
                        message={errorMessage}
                        onClose={closeErrorMessage}
                    />
                )}

                {/* Keyboard Avoiding View for handling keyboard */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Login Form */}
                    <Formik
                        initialValues={{
                            name: '',
                            email: '',
                            password: '',
                            confirmPassword: '',
                            schoolId: '',
                        }}
                        onSubmit={signUpHandler}
                        validationSchema={signUpSchema}
                    >
                        {({
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            values,
                            errors,
                            dirty,
                            touched,
                            isValid,
                        }) => (
                            <SafeAreaView style={styles.formContainer}>
                                {/* Heading and Subheading */}
                                <View style={styles.headingContainer}>
                                    <Text style={styles.heading}>Sign Up</Text>
                                    <Text style={styles.subHeading}>
                                        Please Signup to continue.
                                    </Text>
                                </View>

                                {/* Name  */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name='user'
                                        size={20}
                                        color='#9e9e9e'
                                        style={styles.icon}
                                    />
                                    <TextInput
                                        placeholder='Name'
                                        placeholderTextColor='#9e9e9e'
                                        style={[
                                            styles.input,
                                            { marginLeft: 6 },
                                        ]}
                                        value={values.name}
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                    />
                                </View>
                                {errors.name && touched.name && (
                                    <Text style={styles.errorText}>
                                        {errors.name}
                                    </Text>
                                )}

                                {/* Email Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name='envelope'
                                        size={20}
                                        color='#9e9e9e'
                                        style={styles.icon}
                                    />
                                    <TextInput
                                        placeholder='Email'
                                        placeholderTextColor='#9e9e9e'
                                        style={[
                                            styles.input,
                                            styles.inputPadding,
                                        ]}
                                        keyboardType='email-address'
                                        value={values.email}
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                    />
                                </View>
                                {errors.email && touched.email && (
                                    <Text style={styles.errorText}>
                                        {errors.email}
                                    </Text>
                                )}

                                {/* Password Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name='lock'
                                        size={20}
                                        color='#9e9e9e'
                                        style={styles.icon}
                                    />
                                    <TextInput
                                        placeholder='Password'
                                        placeholderTextColor='#9e9e9e'
                                        style={[
                                            styles.input,
                                            styles.inputPadding,
                                        ]}
                                        secureTextEntry
                                        value={values.password}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                </View>
                                {errors.password && touched.password && (
                                    <Text style={styles.errorText}>
                                        {errors.password}
                                    </Text>
                                )}

                                {/* Confirm Password Input */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name='lock'
                                        size={20}
                                        color='#9e9e9e'
                                        style={styles.icon}
                                    />
                                    <TextInput
                                        placeholder='Confirm Password'
                                        placeholderTextColor='#9e9e9e'
                                        style={[
                                            styles.input,
                                            styles.inputPadding,
                                        ]}
                                        secureTextEntry
                                        value={values.confirmPassword}
                                        onChangeText={handleChange(
                                            'confirmPassword'
                                        )}
                                        onBlur={handleBlur('confirmPassword')}
                                    />
                                </View>
                                {errors.confirmPassword &&
                                    touched.confirmPassword && (
                                        <Text style={styles.errorText}>
                                            {errors.confirmPassword}
                                        </Text>
                                    )}

                                {/* School Id  */}
                                <View style={styles.inputContainer}>
                                    <FontAwesome
                                        name='school'
                                        size={20}
                                        color='#9e9e9e'
                                        style={styles.icon}
                                    />
                                    <TextInput
                                        placeholder='School Id'
                                        placeholderTextColor='#9e9e9e'
                                        style={styles.input}
                                        value={values.schoolId}
                                        onChangeText={handleChange('schoolId')}
                                        onBlur={handleBlur('schoolId')}
                                    />
                                </View>
                                {errors.schoolId && touched.schoolId && (
                                    <Text style={styles.errorText}>
                                        {errors.schoolId}
                                    </Text>
                                )}

                                {/* Login Button */}
                                <TouchableOpacity
                                    style={[
                                        styles.loginButton,
                                        {
                                            opacity: isValid && dirty ? 1 : 0.6,
                                        }, // Make button less prominent if invalid
                                    ]}
                                    disabled={!isValid || !dirty}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={styles.loginButtonText}>
                                        SIGN UP
                                    </Text>
                                    <FontAwesome
                                        name='arrow-right'
                                        size={20}
                                        color='#fff'
                                    />
                                </TouchableOpacity>
                            </SafeAreaView>
                        )}
                    </Formik>
                </KeyboardAvoidingView>
            </View>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'flex-end',
    },
    gradient: {
        ...StyleSheet.absoluteFillObject,
        height: '100%',
        width: '100%',
    },
    keyboardView: {
        flex: 1,
        justifyContent: 'flex-start',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.93)',
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    headingContainer: {
        alignItems: 'flex-start',
        marginBottom: 30,
        marginLeft: 30,
        marginTop: 25,
    },
    heading: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    subHeading: {
        fontSize: 16,
        color: '#9e9e9e',
        marginTop: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        paddingHorizontal: 15,
        paddingVertical: 10,
        marginBottom: 20,
        width: '90%',
        marginLeft: 20,
    },
    icon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#333',
    },
    forgotText: {
        color: '#EFC544',
        fontWeight: 'bold',
    },
    loginButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#EFC544',
        borderRadius: 10,
        paddingVertical: 15,
        width: '90%',
        marginBottom: 30,
        marginLeft: 20,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginRight: 10,
    },
    footer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 2,
        marginBottom: 20,
    },
    signUpText: {
        color: '#EFC544',
        fontWeight: 'bold',
    },
    inputPadding: {
        paddingLeft: 7,
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginBottom: 10,
        marginTop: -10,
        marginLeft: 20,
    },
});

export default SignUp;

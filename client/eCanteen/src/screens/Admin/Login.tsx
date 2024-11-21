import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack/lib/typescript/commonjs/src/types';
import { LinearGradient } from 'expo-linear-gradient';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import {
    Dimensions,
    ImageBackground,
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

import axios from 'axios';
import { BASE_URL } from '../../constants';
import Error from './../../components/Error';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
    ALogin: undefined;
    ASignUp: undefined;
    AdminHome: undefined;
};

let loginSchema = object({
    schoolId: string().required('School Id is Required!'),
    password: string().required('Password is Required!'),
});

const Login = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const loginHandler = async (values: any) => {
        const schoolId = values.schoolId;
        const password = values.password;

        const reqBody = {
            schoolId,
            password,
        };

        try {
            const response = await axios.post(
                BASE_URL + 'auth/admin/login',
                reqBody
            );
            console.log('Response: ', response);
            if (response.status === 200) {
                navigation.reset({
                    index: 0,
                    routes: [{ name: 'AdminHome' }],
                });
                AsyncStorage.setItem('adminToken', response.data.token);
                navigation.navigate('AdminHome');
            }
        } catch (error: any) {
            setErrorMessage(error.response.data.message);
            console.log('Response Error:', error.response.data);
        }
    };

    const closeErrorMessage = () => {
        setErrorMessage(null);
    };

    const signUpHandler = () => {
        navigation.navigate('ASignUp');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Background Image with Gradient */}
                <ImageBackground
                    source={require('../../assets/CoverPage3.jpg')}
                    style={styles.backgroundImage}
                    resizeMode='cover'
                >
                    {/* Gradient Overlay */}
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.1)']}
                        style={styles.gradient}
                    />

                    {/* Display error message if any */}
                    {errorMessage && (
                        <Error
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
                            initialValues={{ schoolId: '', password: '' }}
                            onSubmit={loginHandler}
                            validationSchema={loginSchema}
                        >
                            {({
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                values,
                                errors,
                                touched,
                                isValid,
                                dirty,
                            }) => (
                                <SafeAreaView style={styles.formContainer}>
                                    {/* Heading and Subheading */}
                                    <View style={styles.headingContainer}>
                                        <Text style={styles.heading}>
                                            Login
                                        </Text>
                                        <Text style={styles.subHeading}>
                                            Please sign in to continue.
                                        </Text>
                                    </View>

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
                                            onChangeText={handleChange(
                                                'schoolId'
                                            )}
                                            onBlur={handleBlur('schoolId')}
                                        />
                                    </View>
                                    {errors.schoolId && touched.schoolId && (
                                        <Text style={styles.errorText}>
                                            {errors.schoolId}
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
                                            onChangeText={handleChange(
                                                'password'
                                            )}
                                            onBlur={handleBlur('password')}
                                        />
                                        <TouchableOpacity>
                                            <Text style={styles.forgotText}>
                                                FORGOT
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                    {errors.password && touched.password && (
                                        <Text style={styles.errorText}>
                                            {errors.password}
                                        </Text>
                                    )}

                                    {/* Login Button */}
                                    <TouchableOpacity
                                        style={[
                                            styles.loginButton,
                                            {
                                                opacity:
                                                    isValid && dirty ? 1 : 0.6,
                                            }, // Make button less prominent if invalid
                                        ]}
                                        disabled={!isValid || !dirty}
                                        onPress={() => handleSubmit()}
                                    >
                                        <Text style={styles.loginButtonText}>
                                            LOGIN
                                        </Text>
                                        <FontAwesome
                                            name='arrow-right'
                                            size={20}
                                            color='#fff'
                                        />
                                    </TouchableOpacity>

                                    {/* Footer */}
                                    <View style={styles.footer}>
                                        <Text>Don’t have an account? </Text>
                                        <TouchableOpacity
                                            onPress={signUpHandler}
                                        >
                                            <Text style={styles.signUpText}>
                                                Sign up
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </SafeAreaView>
                            )}
                        </Formik>
                    </KeyboardAvoidingView>
                </ImageBackground>
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
        justifyContent: 'flex-end',
    },
    formContainer: {
        paddingHorizontal: 20,
        paddingBottom: 40,
        backgroundColor: 'rgba(255, 255, 255, 0.93)',
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
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

export default Login;

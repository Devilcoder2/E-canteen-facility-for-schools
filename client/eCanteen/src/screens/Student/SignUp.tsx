import FontAwesome from '@expo/vector-icons/FontAwesome5';
import React, { useState } from 'react';
import {
    Dimensions,
    Keyboard,
    KeyboardAvoidingView,
    NativeSyntheticEvent,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TextInputChangeEventData,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const SignUp = () => {
    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');
    const [schoolId, setSchoolId] = useState<string>('');

    const signUpHandler = () => {
        console.log(name, email, password, confirmPassword, schoolId);
    };

    const nameChangeHandler = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setName(e.nativeEvent.text);
    };

    const emailChangeHandler = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setEmail(e.nativeEvent.text);
    };

    const passwordChangeHandler = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setPassword(e.nativeEvent.text);
    };

    const confirmPasswordChangeHandler = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setConfirmPassword(e.nativeEvent.text);
    };

    const schoolIdChangeHandler = (
        e: NativeSyntheticEvent<TextInputChangeEventData>
    ) => {
        setSchoolId(e.nativeEvent.text);
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Background Image with Gradient */}

                {/* Keyboard Avoiding View for handling keyboard */}
                <KeyboardAvoidingView
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                    style={styles.keyboardView}
                >
                    {/* Login Form */}
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
                                style={[styles.input, { marginLeft: 6 }]}
                                value={name}
                                onChange={nameChangeHandler}
                            />
                        </View>

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
                                style={[styles.input, styles.inputPadding]}
                                keyboardType='email-address'
                                value={email}
                                onChange={emailChangeHandler}
                            />
                        </View>

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
                                style={[styles.input, styles.inputPadding]}
                                secureTextEntry
                                value={password}
                                onChange={passwordChangeHandler}
                            />
                        </View>

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
                                style={[styles.input, styles.inputPadding]}
                                secureTextEntry
                                value={confirmPassword}
                                onChange={confirmPasswordChangeHandler}
                            />
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
                                value={schoolId}
                                onChange={schoolIdChangeHandler}
                            />
                        </View>

                        {/* Login Button */}
                        <TouchableOpacity
                            style={styles.loginButton}
                            onPress={signUpHandler}
                        >
                            <Text style={styles.loginButtonText}>SIGN UP</Text>
                            <FontAwesome
                                name='arrow-right'
                                size={20}
                                color='#fff'
                            />
                        </TouchableOpacity>
                    </SafeAreaView>
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
});

export default SignUp;

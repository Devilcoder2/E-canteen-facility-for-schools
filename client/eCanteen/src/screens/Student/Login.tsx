import React from 'react';
import {
    View,
    KeyboardAvoidingView,
    SafeAreaView,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    TouchableWithoutFeedback,
    Keyboard,
    Dimensions,
    ImageBackground,
    Platform,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

type RootStackParamList = {
    SLogin: undefined;
    SSignUp: undefined;
};

const Login = () => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const signUpHandler = () => {
        navigation.navigate('SSignUp');
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                {/* Background Image with Gradient */}
                <ImageBackground
                    source={require('../../assets/CoverPage1.jpg')}
                    style={styles.backgroundImage}
                    resizeMode='cover'
                >
                    {/* Gradient Overlay */}
                    <LinearGradient
                        colors={['rgba(0, 0, 0, 0.7)', 'rgba(0, 0, 0, 0.1)']}
                        style={styles.gradient}
                    />

                    {/* Keyboard Avoiding View for handling keyboard */}
                    <KeyboardAvoidingView
                        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                        style={styles.keyboardView}
                    >
                        {/* Login Form */}
                        <SafeAreaView style={styles.formContainer}>
                            {/* Heading and Subheading */}
                            <View style={styles.headingContainer}>
                                <Text style={styles.heading}>Login</Text>
                                <Text style={styles.subHeading}>
                                    Please sign in to continue.
                                </Text>
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
                                    style={[styles.input, styles.inputPadding2]}
                                    keyboardType='email-address'
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
                                />
                                <TouchableOpacity>
                                    <Text style={styles.forgotText}>
                                        FORGOT
                                    </Text>
                                </TouchableOpacity>
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
                                />
                            </View>

                            {/* Login Button */}
                            <TouchableOpacity style={styles.loginButton}>
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
                                <TouchableOpacity onPress={signUpHandler}>
                                    <Text style={styles.signUpText}>
                                        Sign up
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </SafeAreaView>
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
    inputPadding2: {
        paddingLeft: 6,
    },
});

export default Login;

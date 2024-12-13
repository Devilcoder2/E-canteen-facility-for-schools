import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Animated, {
    useAnimatedStyle,
    useSharedValue,
    withDelay,
    withSpring,
    withTiming,
} from 'react-native-reanimated';

type RootStackParamList = {
    Main: undefined;
    OnBoarding: undefined;
};

const NextButton = ({ isActive }: any) => {
    const navigation =
        useNavigation<NativeStackNavigationProp<RootStackParamList>>();

    const buttonTranslageX = useSharedValue(-50);
    useEffect(() => {
        if (isActive) {
            buttonTranslageX.value = withTiming(0, { duration: 500 });
        }
    }, [isActive]);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: buttonTranslageX.value }],
    }));

    const pressHandler = () => {
        navigation.navigate('Main');
    };

    return (
        <Animated.View style={[styles.container, animatedImageStyle]}>
            <TouchableOpacity onPress={pressHandler}>
                <Text style={styles.text}>Let's Go</Text>
            </TouchableOpacity>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white', // Orange color for the button
        paddingVertical: 12, // Vertical padding to make the button bigger
        paddingHorizontal: 25, // Horizontal padding to give it a rounded look
        borderRadius: 30, // Rounded corners for the button
        position: 'absolute',
        bottom: 120, // Adjust the position from the bottom
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000', // Shadow color
        shadowOffset: { width: 0, height: 4 }, // Shadow offset
        shadowOpacity: 0.1, // Shadow opacity
        shadowRadius: 10, // Shadow blur radius
        elevation: 5, // For Android shadow effect
        opacity: 0.5,
    },
    text: {
        color: 'black', // White color for the text
        fontSize: 18, // Font size for the button text
        fontWeight: 'bold', // Bold text for emphasis
    },
});

export default NextButton;

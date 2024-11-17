import React, { useEffect, useState } from 'react';
import { Animated, SafeAreaView, StyleSheet, Text } from 'react-native';

interface FloatingErrorProps {
    message: string;
    onClose: () => void;
}

const FloatingError: React.FC<FloatingErrorProps> = ({ message, onClose }) => {
    const [fadeAnim] = useState(new Animated.Value(0)); // Start with opacity 0
    const [position] = useState(new Animated.Value(80)); // Start below the screen (at bottom)

    // Show the error with animation from the bottom
    useEffect(() => {
        // Fade in and slide from the bottom
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 1,
                duration: 500,
                useNativeDriver: true,
            }),
            Animated.timing(position, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true,
            }),
        ]).start();

        // Automatically close after 2 seconds with a slide-up and fade-out animation
        const timer = setTimeout(() => {
            handleClose();
        }, 2000);

        return () => clearTimeout(timer); // Clear the timer when the component is unmounted
    }, [fadeAnim]);

    // Handle the closing of the error message
    const handleClose = () => {
        Animated.parallel([
            Animated.timing(fadeAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }),
            Animated.timing(position, {
                toValue: 80, // Move downwards off the screen
                duration: 300,
                useNativeDriver: true,
            }),
        ]).start(() => onClose());
    };

    return (
        <Animated.View
            style={[
                styles.container,
                { opacity: fadeAnim, transform: [{ translateY: position }] },
            ]}
        >
            <SafeAreaView style={styles.errorMessage}>
                <Text style={styles.errorText}>{message}</Text>
            </SafeAreaView>
        </Animated.View>
    );
};

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        bottom: 0, // Make sure it's aligned at the bottom
        left: 0,
        right: 0,
        zIndex: 1000,
        height: 80, // Height of the floating error message
    },
    errorMessage: {
        flexDirection: 'row',
        alignItems: 'center', // Center the text vertically
        justifyContent: 'center', // Center the text horizontally
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Slightly opaque background
        backdropFilter: 'blur(10px)', // Frosted glass effect
        paddingHorizontal: 20,
        borderRadius: 0, // No rounded corners
        height: '100%', // Full height of the container
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.15,
        shadowRadius: 5,
    },
    errorText: {
        color: 'black', // Text color
        fontSize: 16, // Font size for better visibility
        textAlign: 'center', // Center text horizontally
        flex: 1, // Ensure it takes available space and centers properly
        marginBottom: 2,
    },
});

export default FloatingError;

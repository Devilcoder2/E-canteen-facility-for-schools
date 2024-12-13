import React, { useEffect } from 'react';
import { View, StyleSheet, useWindowDimensions, Image } from 'react-native';
import Animated, {
    useSharedValue,
    useAnimatedStyle,
    withTiming,
    withDelay,
    withSequence,
} from 'react-native-reanimated';

interface OnBoardingItemProps {
    item: {
        id: number;
        title: string;
        description: string;
        image: any;
    };
    isActive: boolean;
}

const OnBoardingItem: React.FC<OnBoardingItemProps> = ({ item, isActive }) => {
    const { width } = useWindowDimensions();

    const imageScale = useSharedValue(1);
    const descriptionOpacity = useSharedValue(0);
    const imageTranslateY = useSharedValue(0);
    const titleScale = useSharedValue(0);
    const backgroundScale = useSharedValue(1);

    useEffect(() => {
        if (isActive) {
            imageScale.value = withSequence(
                withTiming(1, { duration: 1000 }),
                withTiming(0.9, { duration: 500 })
            );

            imageTranslateY.value = withDelay(
                1500,
                withTiming(-50, { duration: 500 })
            );

            titleScale.value = withDelay(
                2000,
                withTiming(1, { duration: 500 })
            );

            descriptionOpacity.value = withDelay(
                2500,
                withTiming(1, { duration: 500 })
            );

            backgroundScale.value = withSequence(
                withTiming(0.8, { duration: 1000 }),
                withTiming(1, { duration: 500 })
            );
        }
    }, [isActive]);

    const animatedImageStyle = useAnimatedStyle(() => ({
        transform: [
            { scale: imageScale.value },
            { translateY: imageTranslateY.value },
        ],
    }));

    const animatedTitleStyle = useAnimatedStyle(() => ({
        transform: [{ scale: titleScale.value }],
        opacity: titleScale.value,
    }));

    const animatedDescriptionStyle = useAnimatedStyle(() => ({
        opacity: descriptionOpacity.value,
    }));

    const animatedBackgroundViewStyle = useAnimatedStyle(() => ({
        transform: [{ scale: backgroundScale.value }],
    }));

    return (
        <View style={[styles.container, { width }]}>
            <Animated.View
                style={[styles.imageBackground, animatedBackgroundViewStyle]}
            />
            <Animated.Image
                source={item.image}
                style={[styles.image, animatedImageStyle]}
            />
            <View style={styles.textContainer}>
                <Animated.Text style={[styles.title, animatedTitleStyle]}>
                    {item.title}
                </Animated.Text>
                <Animated.Text
                    style={[styles.description, animatedDescriptionStyle]}
                >
                    {item.description}
                </Animated.Text>
            </View>
        </View>
    );
};

export default OnBoardingItem;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
        resizeMode: 'contain',
        marginBottom: 30,
    },
    imageBackground: {
        width: 250,
        height: 250,
        backgroundColor: 'white',
        borderRadius: '100%',
        position: 'absolute',
        top: 100,
        opacity: 0.5,
    },
    textContainer: {
        alignItems: 'center',
    },
    title: {
        fontWeight: '800',
        fontSize: 28,
        color: '#333333', // Darker contrast color
        textAlign: 'center',
        marginBottom: 10, // Slight gap between title and description
    },
    description: {
        fontWeight: '400',
        fontSize: 18,
        color: '#4F4F4F', // Muted dark color for readability
        textAlign: 'center',
        marginTop: 8,
        paddingHorizontal: 32,
    },
});

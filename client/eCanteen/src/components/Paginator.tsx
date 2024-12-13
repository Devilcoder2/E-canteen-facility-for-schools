import {
    View,
    Text,
    StyleSheet,
    Animated,
    useWindowDimensions,
} from 'react-native';
import React from 'react';

interface item {
    id: number;
    title: string;
    description: string;
    image: any;
}

interface PaginatorProps {
    data: item[];
    scrollX: any;
}

const Paginator: React.FC<PaginatorProps> = ({ data, scrollX }) => {
    const { width } = useWindowDimensions();
    return (
        <View style={{ flexDirection: 'row', height: 64 }}>
            {data.map((_, index) => {
                const inputRange = [
                    (index - 1) * width,
                    index * width,
                    (index + 1) * width,
                ];

                const dotWidth = scrollX.interpolate({
                    inputRange,
                    outputRange: [10, 20, 10],
                    extrapolate: 'clamp',
                });

                const opacity = scrollX.interpolate({
                    inputRange,
                    outputRange: [0.2, 0.5, 0.2],
                    extrapolate: 'clamp',
                });

                return (
                    <Animated.View
                        key={index.toString()}
                        style={[styles.dot, { width: dotWidth, opacity }]}
                    />
                );
            })}
        </View>
    );
};

export default Paginator;

const styles = StyleSheet.create({
    dot: {
        height: 10,
        borderRadius: 5,
        backgroundColor: '#fff',
        marginHorizontal: 8,
    },
});

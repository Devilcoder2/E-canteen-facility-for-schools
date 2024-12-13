import { View, StyleSheet, FlatList, Animated } from 'react-native';
import React, { useRef, useState } from 'react';

import onBoardingScreenData from '../assets/data/onBoardingScreenData';
import OnBoardingItem from '../components/OnBoardingItem';
import Paginator from '../components/Paginator';
import NextButton from '../components/NextButton';

const OnBoardingScreen = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const slidesRef = useRef(null);

    const viewableItemsChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0]?.index || 0);
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

    const isLastPage = currentIndex === onBoardingScreenData.length - 1; // Check if we are on the last page

    return (
        <View style={styles.container}>
            <View style={{ flex: 3 }}>
                <FlatList
                    data={onBoardingScreenData}
                    renderItem={({ item, index }) => (
                        <OnBoardingItem
                            item={item}
                            isActive={index === currentIndex}
                        />
                    )}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    keyExtractor={(item) => item.id.toString()}
                    onScroll={Animated.event(
                        [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                        { useNativeDriver: false }
                    )}
                    onViewableItemsChanged={viewableItemsChanged}
                    viewabilityConfig={viewConfig}
                    scrollEventThrottle={32}
                    ref={slidesRef}
                />
            </View>
            {isLastPage && <NextButton isActive={isLastPage} />}
            <Paginator data={onBoardingScreenData} scrollX={scrollX} />
        </View>
    );
};

export default OnBoardingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F8CB46',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

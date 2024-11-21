import React from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    StatusBar,
    Pressable,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';

// Define the type for the navigation prop
type HomeScreenNavigationProp = DrawerNavigationProp<
    ParamListBase,
    'AdminMainHome'
>;

interface HomeProps {
    navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar barStyle='dark-content' />

            {/* Linear Gradient as Background */}
            <LinearGradient
                colors={['#F8CB46', 'white']}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                locations={[0, 0.3]}
                style={styles.gradient}
            />

            {/* Content Layer */}
            <SafeAreaView style={[styles.content]}>
                {/* Name of the app  */}
                <View>
                    <Text>E-Canteen</Text>
                </View>

                {/* Profile of the user  */}
                <View>
                    <Pressable />
                </View>
            </SafeAreaView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        zIndex: 10,
    },
    gradient: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: '100%',
    },
    content: {
        flex: 1,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'flex-start',
        padding: 20,
        marginHorizontal: 10,
        zIndex: 1,
    },
});

export default Home;

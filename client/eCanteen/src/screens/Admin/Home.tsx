import React, { useEffect, useState } from 'react';
import {
    SafeAreaView,
    Text,
    TouchableOpacity,
    StyleSheet,
    View,
    StatusBar,
    Pressable,
    TextInput,
    TouchableWithoutFeedback,
    Keyboard,
} from 'react-native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import FontAwesome from '@expo/vector-icons/FontAwesome';

// Define the type for the navigation prop
type HomeScreenNavigationProp = DrawerNavigationProp<
    ParamListBase,
    'AdminMainHome'
>;

interface HomeProps {
    navigation: HomeScreenNavigationProp;
}

const Home: React.FC<HomeProps> = ({ navigation }) => {
    const [placeholder, setPlaceholder] = useState<string>(
        'Search for anything'
    );

    // Array of dynamic placeholder texts
    const placeholderTexts = [
        'Search for "pizza"',
        'Search for "milk"',
        'Search for "fruits"',
        'Search for "books"',
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setPlaceholder((prev) => {
                const currentIndex = placeholderTexts.indexOf(prev);
                const nextIndex = (currentIndex + 1) % placeholderTexts.length;
                return placeholderTexts[nextIndex];
            });
        }, 2000); // Change every 1 second

        return () => clearInterval(interval); // Clean up on component unmount
    }, []);

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
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

                {/* Header and Profile Row */}
                <SafeAreaView style={styles.content}>
                    {/* First Row - Heading and Profile */}
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.subHeading}>ZapCart in</Text>
                            <Text style={styles.mainHeading}>10 minutes</Text>
                        </View>
                        <Pressable
                            style={styles.adminProfile}
                            onPress={() => navigation.navigate('AdminProfile')}
                        >
                            <FontAwesome
                                name='user-circle-o'
                                size={32}
                                color='black'
                            />
                        </Pressable>
                    </View>

                    {/* Second Row - Search Bar */}
                    <View style={styles.searchContainer}>
                        <FontAwesome
                            name='search'
                            size={18}
                            color='black'
                            style={styles.searchIcon}
                        />
                        <TextInput
                            style={styles.searchInput}
                            placeholder={placeholder}
                        />
                    </View>
                </SafeAreaView>
            </SafeAreaView>
        </TouchableWithoutFeedback>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
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
        padding: 20,
        marginHorizontal: 10,
    },
    headerRow: {
        flexDirection: 'row', // Align children in a row
        justifyContent: 'space-between', // Distribute items between left and right
        alignItems: 'flex-start', // Align items vertically to the top
        marginBottom: 20, // Space between header and search input
    },
    subHeading: {
        fontWeight: 'bold',
    },
    mainHeading: {
        fontWeight: '900',
        fontSize: 28,
    },
    adminProfile: {
        marginLeft: 10, // Space between heading and profile icon
        marginTop: 7,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center', // Align the icon and input field
        borderColor: '#EEEEEE',
        borderWidth: 1,
        borderRadius: 10,
        backgroundColor: 'white',
        paddingHorizontal: 10,
        width: '100%', // Make the search bar full width
    },
    searchIcon: {
        marginRight: 10,
        backgroundColor: 'white', // Space between the icon and input
    },
    searchInput: {
        flex: 1, // Take the remaining space in the container
        paddingVertical: 10,
        color: 'black',
        fontSize: 16,
        height: 50,
        backgroundColor: 'white',
    },
});

export default Home;

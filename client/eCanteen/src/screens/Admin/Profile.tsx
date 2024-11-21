import { SafeAreaView, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { ParamListBase } from '@react-navigation/native';

type ProfileScreenNavigationProp = DrawerNavigationProp<
    ParamListBase,
    'AdminProfile'
>;

interface ProfileProps {
    navigation: ProfileScreenNavigationProp;
}

const Profile: React.FC<ProfileProps> = ({ navigation }) => {
    return (
        <SafeAreaView style={{ marginTop: 80 }}>
            <Text>Profile</Text>
            <TouchableOpacity
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Text>Go to home</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

export default Profile;

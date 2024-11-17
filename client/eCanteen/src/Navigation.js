import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';

import StudentLogin from './screens/Student/Login';
import StudentSignUp from './screens/Student/SignUp';
import AdminLogin from './screens/Admin/Login';
import AdminSignUp from './screens/Admin/SignUp';

//Stack Navigator
const StudentLoginStack = createNativeStackNavigator();
const StackGroupStudentLogin = () => {
    return (
        <StudentLoginStack.Navigator screenOptions={{ headerShown: false }}>
            <StudentLoginStack.Screen name='SLogin' component={StudentLogin} />
            <StudentLoginStack.Screen
                name='SSignUp'
                component={StudentSignUp}
                options={{
                    presentation: 'modal',
                }}
            />
        </StudentLoginStack.Navigator>
    );
};

const AdminLoginStack = createNativeStackNavigator();
const StackGroupAdminLogin = () => {
    return (
        <AdminLoginStack.Navigator screenOptions={{ headerShown: false }}>
            <AdminLoginStack.Screen name='ALogin' component={AdminLogin} />
            <AdminLoginStack.Screen
                name='ASignUp'
                component={AdminSignUp}
                options={{ presentation: 'modal' }}
            />
        </AdminLoginStack.Navigator>
    );
};

//Tab Bottom
const Tab = createBottomTabNavigator();
const TabGroup = () => {
    return (
        <Tab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;

                    if (route.name === 'StudentLogin') {
                        iconName = 'user-graduate';
                    } else if (route.name === 'AdminLogin') {
                        iconName = 'user-cog';
                    }

                    return (
                        <FontAwesome
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
                tabBarLabelStyle: {
                    fontSize: 11,
                    marginTop: 6,
                    fontWeight: 'bold',
                    color: '#333',
                },
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            fontSize: focused ? 12 : 11,
                            marginTop: 5,
                            fontWeight: focused ? 'bold' : 'normal',
                            color: focused ? 'black' : 'gray',
                        }}
                    >
                        {route.name === 'StudentLogin' ? 'Student' : 'Admin'}
                    </Text>
                ),
                tabBarActiveTintColor: '#EFC544',
                tabBarInactiveTintColor: '#A2A2A2',
                headerShown: false,
            })}
            screenListeners={{
                tabPress: () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                },
            }}
        >
            <Tab.Screen
                name='StudentLogin'
                component={StackGroupStudentLogin}
            />
            <Tab.Screen name='AdminLogin' component={StackGroupAdminLogin} />
        </Tab.Navigator>
    );
};

export default function Navigation() {
    return (
        <NavigationContainer>
            <TabGroup />
        </NavigationContainer>
    );
}

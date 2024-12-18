import { Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome from '@expo/vector-icons/FontAwesome5';
import * as Haptics from 'expo-haptics';

//STUDENT IMPORTS
import StudentLogin from './screens/Student/Login';
import StudentSignUp from './screens/Student/SignUp';
import StudentHome from './screens/Student/Home';

//ADMIN IMPORTS
import AdminLogin from './screens/Admin/Login';
import AdminSignUp from './screens/Admin/SignUp';
import AdminHome from './screens/Admin/Home';
import AdminOrders from './screens/Admin/Orders';
import AdminProfile from './screens/Admin/Profile';
import AdminNewItem from './screens/Admin/NewItem';
import { createDrawerNavigator } from '@react-navigation/drawer';

//OTHER IMPORTS
import OnBoardingScreen from './screens/OnBoardingScreen';

//Stack Navigator
const StudentLoginStack = createNativeStackNavigator();
const AdminLoginStack = createNativeStackNavigator();
const OnBoardingStack = createNativeStackNavigator();
const MainStack = createNativeStackNavigator();

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
const AdminTab = createBottomTabNavigator();

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

//Drawer
const Drawer = createDrawerNavigator();
const AdminProfileDrawer = () => {
    return (
        <Drawer.Navigator
            initialRouteName='AdminMainHome'
            drawerContent={(props) => <AdminProfile {...props} />}
            screenOptions={{
                headerShown: false,
                drawerStyle: { width: '100%' },
                drawerPosition: 'right',
                swipeEnabled: false,
            }}
        >
            <Drawer.Screen name='AdminMainHome' component={AdminHome} />
            <Drawer.Screen name='AdminProfile' component={AdminProfile} />
        </Drawer.Navigator>
    );
};

const AdminTabGroup = () => {
    return (
        <AdminTab.Navigator
            screenOptions={({ route, navigation }) => ({
                tabBarLabel: ({ focused }) => (
                    <Text
                        style={{
                            fontSize: focused ? 12 : 11,
                            marginTop: 5,
                            fontWeight: focused ? 'bold' : 'normal',
                            color: focused ? 'black' : 'gray',
                        }}
                    >
                        {route.name === 'AHome'
                            ? 'Home'
                            : route.name === 'AOrders'
                            ? 'Orders'
                            : 'Add New Item'}
                    </Text>
                ),
                tabBarActiveTintColor: '#EFC544',
                tabBarInactiveTintColor: '#A2A2A2',
                headerShown: false,
                tabBarIcon: ({ color, focused, size }) => {
                    let iconName;

                    if (route.name === 'AHome') {
                        iconName = 'home';
                    } else if (route.name === 'AOrders') {
                        iconName = 'shopping-cart';
                    } else if (route.name === 'ANewItem') {
                        iconName = 'plus-square';
                    }
                    return (
                        <FontAwesome
                            name={iconName}
                            size={size}
                            color={color}
                        />
                    );
                },
            })}
            screenListeners={{
                tabPress: () => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                },
            }}
        >
            <AdminTab.Screen name='AHome' component={AdminProfileDrawer} />
            <AdminTab.Screen name='AOrders' component={AdminOrders} />
            <AdminTab.Screen name='ANewItem' component={AdminNewItem} />
        </AdminTab.Navigator>
    );
};

const StackGroupMain = () => {
    return (
        <MainStack.Navigator screenOptions={{ headerShown: false }}>
            <MainStack.Screen name='LoginTabs' component={TabGroup} />
            <MainStack.Screen name='AdminHome' component={AdminTabGroup} />
            <MainStack.Screen name='StudentHome' component={StudentHome} />
        </MainStack.Navigator>
    );
};

const OnBoardingStackGroup = () => {
    return (
        <OnBoardingStack.Navigator screenOptions={{ headerShown: false }}>
            <OnBoardingStack.Screen
                name='OnBoarding'
                component={OnBoardingScreen}
            />
            <OnBoardingStack.Screen
                name='Main'
                component={StackGroupMain}
                options={{ gestureEnabled: false }}
            />
        </OnBoardingStack.Navigator>
    );
};

export default function Navigation() {
    return (
        <NavigationContainer>
            <OnBoardingStackGroup />
        </NavigationContainer>
    );
}

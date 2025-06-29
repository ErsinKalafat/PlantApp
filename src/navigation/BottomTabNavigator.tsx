import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import HomeScreen from '../screens/HomeScreen';
import DiagnoseScreen from '../screens/DiagnoseScreen';
import MyGardenScreen from '../screens/MyGardenScreen';
import ProfileScreen from '../screens/ProfileScreen';
import HomeIcon from '../assets/icons/HomeIcon';
import ScanIcon from '../assets/icons/ScanIcon';
import ProfileIcon from '../assets/icons/ProfileIcon';
import { moderateScale } from '../helpers/sizeNormalize';
import MyGardenIcon from '../assets/icons/MyGardenIcon';
import DiagnoseIcon from '../assets/icons/DiagnoseIcon';

const Tab = createBottomTabNavigator();

function CenterButton({ onPress }: { onPress: () => void }) {
    return (
        <TouchableOpacity style={styles.centerButtonInner} onPress={onPress}>
            <Text style={styles.centerButtonIcon}><ScanIcon /></Text>
        </TouchableOpacity>
    );
}

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: styles.tabBar,
                tabBarActiveTintColor: 'rgba(40, 175, 110, 1)',
                tabBarInactiveTintColor: 'rgba(189, 189, 189, 1)',
                tabBarLabelStyle: styles.tabBarLabel,
                headerShown: false,
                tabBarShowLabel: true,
            }}
        >
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarLabel: 'Home',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.tabIcon}>
                            <HomeIcon color={focused ? 'rgba(40, 175, 110, 1)' : 'rgba(189, 189, 189, 1)'} />
                        </View>
                    ),
                }}
            />
            <Tab.Screen
                name="Diagnose"
                component={DiagnoseScreen}
                options={{
                    tabBarLabel: 'Diagnose',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.tabIcon}>
                            <DiagnoseIcon color={focused ? 'rgba(40, 175, 110, 1)' : 'rgba(189, 189, 189, 1)'} />
                        </View>
                    ),

                }}
            />
            <Tab.Screen
                name="Scan"
                component={HomeScreen}
                options={{
                    tabBarLabel: '',
                    tabBarIcon: ({ color, size }) => (
                        <CenterButton onPress={() => console.log('Scan button pressed')} />
                    )
                }}
            />
            <Tab.Screen
                name="My Garden"
                component={MyGardenScreen}
                options={{
                    tabBarLabel: 'My Garden',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.tabIcon}>
                            <MyGardenIcon color={focused ? 'rgba(40, 175, 110, 1)' : 'rgba(189, 189, 189, 1)'} />
                        </View>
                    )
                }}
            />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarLabel: 'Profile',
                    tabBarIcon: ({ color, size, focused }) => (
                        <View style={styles.tabIcon}>
                            <ProfileIcon color={focused ? 'rgba(40, 175, 110, 1)' : 'rgba(189, 189, 189, 1)'} />
                        </View>
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({
    tabBar: {
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#E5E5EA',
        paddingTop: 5,
    },
    tabBarLabel: {
        fontSize: 12,
        fontWeight: '500',
    },
    tabIcon: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    tabIconText: {
        fontSize: 24,
    },
    centerButtonInner: {
        width: 64,
        height: 64,
        borderRadius: 30,
        borderWidth: 4,
        marginBottom: moderateScale(16),
        borderColor: 'rgba(44, 204, 128, 1)',
        backgroundColor: 'rgba(40, 175, 110, 1)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    centerButtonIcon: {
        fontSize: 28,
        color: '#fff',
    },
}); 
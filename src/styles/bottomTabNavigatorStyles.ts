import { StyleSheet } from 'react-native';
import { moderateScale } from '../helpers/sizeNormalize';

export const bottomTabNavigatorStyles = StyleSheet.create({
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
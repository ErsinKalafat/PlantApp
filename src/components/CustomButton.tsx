import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import colors from '../constants/colors';

interface CustomButtonProps {
    title: string;
    onPress: () => void;
    style?: any;
    textStyle?: any;
    disabled?: boolean;
}

export default function CustomButton({ title, onPress, style, textStyle, disabled = false }: CustomButtonProps) {
    return (
        <TouchableOpacity
            style={[
                styles.button,
                disabled && styles.buttonDisabled,
                style
            ]}
            onPress={onPress}
            disabled={disabled}
        >
            <Text style={[styles.buttonText, textStyle]}>
                {title}
            </Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    button: {
        backgroundColor: colors.primary.green,
        paddingVertical: moderateScale(18),
        borderRadius: moderateScale(12),
        alignItems: 'center',
        width: '100%',
        marginBottom: moderateScale(5),
    },
    buttonDisabled: {
        backgroundColor: colors.text.gray,
        opacity: 0.6,
    },
    buttonText: {
        color: colors.text.white,
        fontSize: scaleFont(15),
        fontWeight: '500',
        fontFamily: 'Rubik-Regular',
    },
}); 
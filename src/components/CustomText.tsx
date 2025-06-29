import React from 'react';
import { Text, StyleSheet, TextStyle, TextProps } from 'react-native';

type CustomTextStyleProps = {
    color?: string;
    fontSize?: number;
    fontWeight?: TextStyle['fontWeight'];
    fontFamily?: string;
};

const withTextStyle = (WrappedComponent: React.ComponentType<TextProps>) => {
    return ({
        color = '#000',
        fontSize = 16,
        fontWeight = 'normal',
        fontFamily,
        style,
        ...rest
    }: TextProps & CustomTextStyleProps) => {
        const customStyle: TextStyle = {
            color,
            fontSize,
            fontWeight,
            fontFamily,
        };

        return (
            <WrappedComponent
                {...rest}
                style={[customStyle, style]}
            />
        );
    };
};

export default withTextStyle;

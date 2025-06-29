import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Image } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { setOnboardingCompleted, saveOnboardingStatus } from '../store/slices/onboardingSlice';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import PremiumScreen from './PremiumScreen';
import CustomButton from '../components/CustomButton';
import { onboardingData } from '../data';
import {
    baseContainer,
    baseFlexCenter,
    baseFlexEnd,
    baseFullWidth,
    baseTextCenter,
    baseImageWidth,
    baseSpaceBetween,
    basePaddingHorizontal,
    basePaddingBottom,
    baseMarginTop,
    baseMarginBottom,
    baseMarginHorizontal,
    baseBorderRadius,
    baseFontRegular,
    baseFlexRowCenter
} from '../styles/baseStyles';

export default function OnboardingScreen() {
    const dispatch = useAppDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);

    const completeOnboarding = async () => {
        // await dispatch(saveOnboardingStatus(true)); // en son açılacak
        dispatch(setOnboardingCompleted(true));
    };

    const nextScreen = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            completeOnboarding();
        }
    };

    const currentData = onboardingData[currentIndex];

    return (
        <View style={styles.onboardingContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {currentIndex === 3 ? (
                <PremiumScreen onComplete={nextScreen} />
            ) : (
                <View style={[baseContainer, baseSpaceBetween, basePaddingHorizontal, basePaddingBottom]}>
                    <View style={[baseFlexCenter, styles.topSection]}>
                        <Image source={currentData.title} style={[baseImageWidth, styles.onboardingTitleImage]} resizeMode='contain' />
                        <Image source={currentData.image} style={[baseImageWidth, styles.onboardingContentImage]} resizeMode='contain' />
                    </View>

                    <View style={[baseFlexEnd, styles.bottomSection]}>
                        <View style={[baseFullWidth, baseFlexEnd]}>
                            <CustomButton
                                title={currentIndex === 0 ? 'Get Started' : 'Continue'}
                                onPress={nextScreen}
                            />

                            {currentIndex === 0 && (
                                <Text style={[baseTextCenter, baseFontRegular, styles.getStartedSubtext]}>
                                    By tapping next, you are agreeing to PlantID{'\n'}
                                    <Text style={styles.underlinedText}>Terms of Use</Text> & <Text style={styles.underlinedText}>Privacy Policy</Text>.
                                </Text>
                            )}
                        </View>

                        {currentData.showIndicator && (
                            <View style={[baseFlexRowCenter, baseMarginTop, baseMarginBottom]}>
                                {onboardingData.map((_, index) => {
                                    if (index === 0) return null;
                                    return (
                                        <View
                                            key={index}
                                            style={[
                                                baseBorderRadius,
                                                baseMarginHorizontal,
                                                styles.pageDot,
                                                index === currentIndex && styles.pageDotActive
                                            ]}
                                        />
                                    )
                                })}
                            </View>
                        )}
                    </View>
                </View>
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    onboardingContainer: {
        flex: 1,
        backgroundColor: 'rgba(250, 250, 250, 1)'
    },
    topSection: {
        flex: 1,
        paddingTop: moderateScale(50),
    },
    bottomSection: {
        paddingBottom: moderateScale(20),
    },
    onboardingTitleImage: {
        height: moderateScale(85),
    },
    onboardingContentImage: {
        height: moderateScale(499),
        alignSelf: 'center',
        resizeMode: 'contain',
    },
    pageDot: {
        width: 6,
        height: 6,
        backgroundColor: 'rgba(19, 35, 27, 0.25)',
    },
    pageDotActive: {
        backgroundColor: 'rgba(19, 35, 27, 1)',
        width: 10,
        height: 10,
    },
    getStartedSubtext: {
        color: 'rgba(89, 113, 101, 0.7)',
        fontSize: scaleFont(11),
        fontWeight: '400',
        lineHeight: moderateScale(15),
        marginTop: moderateScale(10),
        letterSpacing: moderateScale(0.07)
    },
    underlinedText: {
        textDecorationLine: 'underline',
    },
}); 
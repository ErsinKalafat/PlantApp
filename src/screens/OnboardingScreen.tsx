import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Image } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { setOnboardingCompleted } from '../store/slices/onboardingSlice';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import PremiumScreen from './PremiumScreen';

const onboardingData = [
    {
        id: 1,
        title: require('../assets/images/Onboarding1Title.png'),
        image: require('../assets/images/Onboarding1.png'),
        showIndicator: false
    },
    {
        id: 2,
        title: require('../assets/images/Onboarding2Title.png'),
        image: require('../assets/images/Onboarding2.png'),
        showIndicator: true
    },
    {
        id: 3,
        title: require('../assets/images/Onboarding3Title.png'),
        image: require('../assets/images/Onboarding3.png'),
        showIndicator: true
    },
    {
        id: 4,
        title: 'Başlayın',
        image: require('../assets/images/Onboarding2.png'),
        showIndicator: false
    }
];

export default function OnboardingScreen() {
    const dispatch = useAppDispatch();
    const [currentIndex, setCurrentIndex] = useState(0);

    const completeOnboarding = () => {
        dispatch(setOnboardingCompleted(true));
    };

    const nextScreen = () => {
        if (currentIndex < onboardingData.length - 1) {
            setCurrentIndex(currentIndex + 1);
        } else {
            completeOnboarding();
        }
    };

    const skipOnboarding = () => {
        completeOnboarding();
    };

    const currentData = onboardingData[currentIndex];

    return (
        <View style={styles.onboardingContainer}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />

            {currentIndex === 3 ? (
                <PremiumScreen onComplete={nextScreen} />
            ) : (
                <>
                    <Image source={currentData.title} style={styles.onboardingTitleImage} resizeMode='contain' />

                    <Image source={currentData.image} style={styles.onboardingContentImage} resizeMode='contain' />

                    <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
                        <Text style={styles.nextButtonText}>
                            {currentIndex === 0 ? 'Get Started' : 'Continue'}
                        </Text>
                    </TouchableOpacity>

                    {currentData.showIndicator && (
                        <View style={styles.pageIndicator}>
                            {onboardingData.map((_, index) => {
                                if (index === 0) return null;
                                return (
                                    <View
                                        key={index}
                                        style={[
                                            styles.pageDot,
                                            index === currentIndex && styles.pageDotActive
                                        ]}
                                    />
                                )
                            })}
                        </View>
                    )}
                </>
            )}
        </View >
    );
}

const styles = StyleSheet.create({
    onboardingContainer: {
        flex: 1,
        backgroundColor: 'rgba(250, 250, 250, 1)'
    },
    onboardingBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    onboardingBackgroundStyle: {
        borderRadius: 0,
    },
    onboardingOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
    },
    skipButton: {
        position: 'absolute',
        top: 60,
        right: 20,
        zIndex: 1,
        padding: 10,
    },
    skipText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
    onboardingContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30,
        paddingTop: 168,
    },
    onboardingTitleImage: {
        width: moderateScale(300),
        height: moderateScale(85),
        textAlign: 'center',
        alignContent: 'center',
        alignSelf: 'center',
        marginTop: moderateScale(59)

    },
    onboardingContentImage: {
        width: moderateScale(375),
        height: moderateScale(499),
        alignSelf: 'center',
    },
    onboardingSubtitle: {
        fontSize: 24,
        color: '#fff',
        textAlign: 'center',
        marginBottom: 20,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    onboardingDescription: {
        fontSize: 18,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 26,
        textShadowColor: 'rgba(0, 0, 0, 0.5)',
        textShadowOffset: { width: 0, height: 1 },
        textShadowRadius: 2,
    },
    onboardingBottom: {
        paddingHorizontal: 24,
        paddingBottom: 50,
    },
    pageIndicator: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: moderateScale(30),
        marginBottom: moderateScale(50),
    },
    pageDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'rgba(19, 35, 27, 0.25)',
        marginHorizontal: 5,
    },
    pageDotActive: {
        backgroundColor: 'rgba(19, 35, 27, 1)',
    },
    nextButton: {
        backgroundColor: 'rgba(40, 175, 110, 1)',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        marginHorizontal: 24,
    },
    nextButtonText: {
        color: 'rgba(255, 255, 255, 1)',
        fontSize: scaleFont(15),
        fontWeight: '500',
        fontFamily: 'Rubik-Regular'
    },
    fourthScreenBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    fourthScreenContent: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: moderateScale(30),
    },
    fourthScreenTitle: {
        fontSize: scaleFont(32),
        color: 'rgba(19, 35, 27, 1)',
        textAlign: 'center',
        marginBottom: moderateScale(16),
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
    },
    fourthScreenSubtitle: {
        fontSize: scaleFont(18),
        color: 'rgba(19, 35, 27, 0.8)',
        textAlign: 'center',
        lineHeight: scaleFont(26),
        marginBottom: moderateScale(40),
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
    },
}); 
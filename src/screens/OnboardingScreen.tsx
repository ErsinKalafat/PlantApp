import React, { useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, ImageBackground, StatusBar, Image } from 'react-native';
import { useAppDispatch } from '../store/hooks';
import { setOnboardingCompleted, saveOnboardingStatus } from '../store/slices/onboardingSlice';
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

    const completeOnboarding = async () => {
        await dispatch(saveOnboardingStatus(true));
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
                <View style={styles.onboardingContent}>
                    <View style={styles.topSection}>
                        <Image source={currentData.title} style={styles.onboardingTitleImage} resizeMode='contain' />
                        <Image source={currentData.image} style={styles.onboardingContentImage} resizeMode='contain' />
                    </View>

                    <View style={styles.bottomSection}>
                        <TouchableOpacity style={styles.nextButton} onPress={nextScreen}>
                            <Text style={styles.nextButtonText}>
                                {currentIndex === 0 ? 'Get Started' : 'Continue'}
                            </Text>
                        </TouchableOpacity>

                        {currentIndex === 0 && (
                            <Text style={styles.getStartedSubtext}>
                                By tapping next, you are agreeing to PlantID{'\n'}
                                <Text style={styles.underlinedText}>Terms of Use</Text> & <Text style={styles.underlinedText}>Privacy Policy</Text>.
                            </Text>
                        )}

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
        // justifyContent: 'space-between',
        paddingHorizontal: 24,
        paddingBottom: moderateScale(20),
    },
    onboardingTitleImage: {
        width: '100%',
        height: moderateScale(85),
    },
    onboardingContentImage: {
        width: '100%',
        height: moderateScale(499),
        alignSelf: 'center',
        resizeMode: 'contain',
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
        alignItems: 'center',
        marginTop: moderateScale(30),
        marginBottom: moderateScale(50),
    },
    pageDot: {
        width: 6,
        height: 6,
        borderRadius: 5,
        backgroundColor: 'rgba(19, 35, 27, 0.25)',
        marginHorizontal: 5,
    },
    pageDotActive: {
        backgroundColor: 'rgba(19, 35, 27, 1)',
        width: 10,
        height: 10,
    },
    nextButton: {
        backgroundColor: 'rgba(40, 175, 110, 1)',
        paddingVertical: 18,
        borderRadius: 12,
        alignItems: 'center',
        width: '100%',
        marginBottom: moderateScale(5),
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
    getStartedSubtext: {
        color: 'rgba(89, 113, 101, 0.7)',
        fontSize: scaleFont(11),
        fontWeight: '400',
        lineHeight: moderateScale(15),
        fontFamily: 'Rubik-Regular',
        marginTop: 10,
        textAlign: 'center',
        letterSpacing: moderateScale(0.07)
    },
    underlinedText: {
        textDecorationLine: 'underline',
    },
    topSection: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: moderateScale(50),
    },
    bottomSection: {
        justifyContent: 'center',
        alignItems: 'center',
    },
}); 
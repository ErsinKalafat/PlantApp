import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';

interface PremiumScreenProps {
    onComplete: () => void;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const premiumFeatures = [
    {
        id: 1,
        icon: '-',
        title: 'Unlimited',
        subtitle: 'Plant Identify'
    },
    {
        id: 2,
        icon: '-',
        title: 'Faster',
        subtitle: 'Find plants easily'
    },
    {
        id: 3,
        icon: '-',
        title: 'Detailed',
        subtitle: 'Plant care'
    }
];

export default function PremiumScreen({ onComplete }: PremiumScreenProps) {
    const [selectedIndex, setSelectedIndex] = useState(0); // İlk checkbox seçili

    const selectCheckbox = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.onboardingContainer}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <TouchableOpacity style={styles.closeButton} onPress={onComplete}>
                <Text style={styles.closeButtonText}>✕</Text>
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/PremiumScreen.png')}
                    style={styles.premiumImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.fourthScreenContent}>
                <View style={styles.headerSection}>
                    <Text style={styles.imageTitle}>PlantApp Premium</Text>
                    <Text style={styles.imageSubtitle}>Access All Features</Text>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuresScroll}
                    >
                        {premiumFeatures.map((feature) => (
                            <View key={feature.id} style={styles.featureCard}>
                                <Text style={styles.featureIcon}>{feature.icon}</Text>
                                <Text style={styles.featureTitle}>{feature.title}</Text>
                                <Text style={styles.featureSubtitle}>{feature.subtitle}</Text>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={[styles.radiusView, { marginBottom: moderateScale(16) }]} onPress={() => selectCheckbox(0)}>
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, selectedIndex === 0 && styles.checkboxChecked]}>
                            {selectedIndex === 0 && <View style={styles.checkboxDot} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.checkboxTitle}>Free Trial</Text>
                            <Text style={styles.checkboxDescription}>7 days free access</Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity style={[styles.radiusView, { marginBottom: moderateScale(24) }]} onPress={() => selectCheckbox(1)}>
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, selectedIndex === 1 && styles.checkboxChecked]}>
                            {selectedIndex === 1 && <View style={styles.checkboxDot} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={styles.checkboxTitle}>Cancel Anytime</Text>
                            <Text style={styles.checkboxDescription}>No commitment required</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>
                        Try free for 3 days
                    </Text>
                </TouchableOpacity>

                <View style={styles.bottomSection}>
                    <Text style={styles.bottomText}>
                        After the 3-day free trial period you'll be charged ₺274.99 per year unless you cancel before the trial expires. Yearly Subscription is Auto-Renewable
                    </Text>

                    <View style={styles.bottomButtons}>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>Terms</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomButtonSeparator}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>Privacy</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomButtonSeparator}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>Restore</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    onboardingContainer: {
        flex: 1,
        backgroundColor: 'rgba(16, 30, 23, 1)'
    },
    imageContainer: {
        flex: 1,
    },
    premiumImage: {
        width: '100%',
        height: SCREEN_HEIGHT * 0.65,
    },
    headerSection: {
        alignItems: 'flex-start',
    },
    imageTitle: {
        fontSize: scaleFont(32),
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
        marginBottom: moderateScale(16),
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
    },
    imageSubtitle: {
        fontSize: scaleFont(17),
        color: 'rgba(255, 255, 255, 0.7)',
        textAlign: 'center',
        lineHeight: scaleFont(24),
        fontFamily: 'Rubik-Light',
        fontWeight: '300',
        letterSpacing: moderateScale(0.38)
    },
    featuresScroll: {
        flex: 1,
    },
    scrollContainer: {
        paddingVertical: moderateScale(16),
        justifyContent: 'center',
    },
    featureCard: {
        width: moderateScale(156),
        paddingVertical: 50,
        marginRight: moderateScale(5),
        borderRadius: moderateScale(12),
        backgroundColor: 'rgba(255, 255, 255, 0.08)',
    },
    featureIcon: {
        fontSize: scaleFont(24),
        color: 'rgba(255, 255, 255, 1)',
        position: 'absolute',
        top: moderateScale(12),
        left: moderateScale(12),
    },
    featureTitle: {
        fontSize: scaleFont(14),
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'left',
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
        position: 'absolute',
        bottom: moderateScale(32),
        left: moderateScale(8),
        right: moderateScale(8),
    },
    featureSubtitle: {
        fontSize: scaleFont(12),
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'left',
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
        position: 'absolute',
        bottom: moderateScale(12),
        left: moderateScale(8),
        right: moderateScale(8),
    },
    fourthScreenContent: {
        flex: 1,
        paddingHorizontal: moderateScale(24),
    },
    fourthScreenTitle: {
        fontSize: scaleFont(32),
        color: 'rgba(255, 255, 255, 1)',
        textAlign: 'center',
        marginBottom: moderateScale(16),
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
    },
    fourthScreenSubtitle: {
        fontSize: scaleFont(18),
        color: 'rgba(255, 255, 255, 0.8)',
        textAlign: 'center',
        lineHeight: scaleFont(26),
        marginBottom: moderateScale(40),
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
    },
    // Ortak radiuslu view stili
    radiusView: {
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.05)',
        borderRadius: moderateScale(12),
        padding: moderateScale(15),
        justifyContent: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkbox: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: 'rgba(255, 255, 255, 1)',
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    textContainer: {
        flexDirection: 'column',
    },
    checkboxTitle: {
        fontSize: scaleFont(14),
        color: 'rgba(255, 255, 255, 1)',
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
    },
    checkboxDescription: {
        fontSize: scaleFont(12),
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
    },
    checkboxChecked: {
        backgroundColor: 'rgba(40, 175, 110, 1)',
        borderColor: 'rgba(40, 175, 110, 1)',
    },
    checkboxDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: 'rgba(255, 255, 255, 1)',
    },
    nextButton: {
        backgroundColor: 'rgba(40, 175, 110, 1)',
        borderRadius: moderateScale(12),
        alignItems: 'center',
        width: '100%',
        paddingVertical: moderateScale(16)
    },
    nextButtonText: {
        color: 'rgba(255, 255, 255, 1)',
        lineHeight: moderateScale(24),
        fontSize: scaleFont(16),
        fontWeight: '500',
        fontFamily: 'Rubik-Regular'
    },
    bottomSection: {
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    bottomText: {
        fontSize: scaleFont(9),
        color: 'rgba(255, 255, 255, 0.52)',
        fontFamily: 'Rubik-Regular',
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: moderateScale(10),
    },
    bottomButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(24)
    },
    bottomButtonText: {
        fontSize: scaleFont(11),
        color: 'rgba(255, 255, 255, 0.5)',
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
        marginHorizontal: moderateScale(4),
    },
    bottomButtonSeparator: {
        fontSize: scaleFont(12),
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
        marginHorizontal: moderateScale(4),
    },
    closeButton: {
        position: 'absolute',
        top: moderateScale(60),
        right: moderateScale(16),
        zIndex: 1000,
        padding: moderateScale(8),
    },
    closeButtonText: {
        fontSize: scaleFont(20),
        color: 'rgba(255, 255, 255, 0.8)',
        fontFamily: 'Rubik-Regular',
        fontWeight: '400',
    },
}); 
import React, { useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import colors from '../constants/colors';
import ScanIcon from '../assets/icons/ScanIcon';
import SpeedMeter from '../assets/icons/SpeedMeter';
import DiagnoseIcon from '../assets/icons/DiagnoseIcon';
import ScanIcon2 from '../assets/icons/ScanIcon2';
import CloseIcon from '../assets/icons/CloseIcon';

interface PremiumScreenProps {
    onComplete: () => void;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const premiumFeatures = [
    {
        id: 1,
        icon: <ScanIcon2 />,
        key: 'unlimited'
    },
    {
        id: 2,
        icon: <SpeedMeter />,
        key: 'faster'
    },
    {
        id: 3,
        icon: <DiagnoseIcon />,
        key: 'detailed'
    }
];

const baseText = {
    fontFamily: 'Rubik-Regular',
    color: colors.text.white,
};

const baseCard = {
    borderRadius: moderateScale(12),
    backgroundColor: colors.background.white08,
};

export default function PremiumScreen({ onComplete }: PremiumScreenProps) {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const { t } = useTranslation();

    const selectCheckbox = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <View style={styles.container}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <TouchableOpacity style={styles.closeButton} onPress={onComplete}>
                <CloseIcon />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/PremiumScreen.png')}
                    style={styles.premiumImage}
                    resizeMode="cover"
                />
            </View>

            <View style={styles.contentContainer}>
                <View style={styles.headerSection}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={styles.imageTitle}>{t('premium.titleFirst')} <Text style={[styles.imageTitle, styles.thinPageTitle]}>{t('premium.titleLast')}</Text></Text>
                    </View>
                    <Text style={styles.imageSubtitle}>{t('premium.subtitle')}</Text>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuresScroll}
                    >
                        {premiumFeatures.map((feature) => (
                            <View key={feature.id} style={styles.featureCard}>
                                <View style={styles.featureIconWrapper}>
                                    <Text style={styles.featureIcon}>{feature.icon}</Text>
                                </View>
                                <View>
                                    <Text style={[styles.featureText, styles.featureTitle]}>{t(`premium.features.${feature.key}.title`)}</Text>
                                    <Text style={[styles.featureText, styles.featureSubtitle]}>{t(`premium.features.${feature.key}.subtitle`)}</Text>
                                </View>
                            </View>
                        ))}
                    </ScrollView>
                </View>

                <TouchableOpacity style={[styles.radiusView, selectedIndex === 0 && styles.radiusViewSelected, { marginBottom: moderateScale(16) }]} onPress={() => selectCheckbox(0)}>
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, selectedIndex === 0 && styles.checkboxChecked]}>
                            {selectedIndex === 0 && <View style={styles.checkboxDot} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.featureText, styles.checkboxTitle]}>{t('premium.options.freeTrial.title')}</Text>
                            <Text style={[styles.featureText, styles.checkboxDescription]}>{t('premium.options.freeTrial.description')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={[styles.radiusView, selectedIndex === 1 && styles.radiusViewSelected, { marginBottom: moderateScale(24) }]} onPress={() => selectCheckbox(1)}>
                    {selectedIndex === 1 && (
                        <View style={styles.saveBadge}>
                            <Text style={styles.saveBadgeText}>Save 50%</Text>
                        </View>
                    )}
                    <View style={styles.checkboxContainer}>
                        <View style={[styles.checkbox, selectedIndex === 1 && styles.checkboxChecked]}>
                            {selectedIndex === 1 && <View style={styles.checkboxDot} />}
                        </View>
                        <View style={styles.textContainer}>
                            <Text style={[styles.featureText, styles.checkboxTitle]}>{t('premium.options.cancelAnytime.title')}</Text>
                            <Text style={[styles.featureText, styles.checkboxDescription]}>{t('premium.options.cancelAnytime.description')}</Text>
                        </View>
                    </View>
                </TouchableOpacity>

                <TouchableOpacity style={styles.nextButton}>
                    <Text style={styles.nextButtonText}>
                        {t('premium.button')}
                    </Text>
                </TouchableOpacity>

                <View style={styles.bottomSection}>
                    <Text style={styles.bottomText}>
                        {t('premium.bottomText')}
                    </Text>

                    <View style={styles.bottomButtons}>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>{t('premium.links.terms')}</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomButtonSeparator}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>{t('premium.links.privacy')}</Text>
                        </TouchableOpacity>
                        <Text style={styles.bottomButtonSeparator}>•</Text>
                        <TouchableOpacity>
                            <Text style={styles.bottomButtonText}>{t('premium.links.restore')}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background.darkGreen
    },
    imageContainer: {
        height: SCREEN_HEIGHT * 0.6,
    },
    premiumImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        paddingHorizontal: moderateScale(24),
    },
    headerSection: {
        alignItems: 'flex-start',
    },
    imageTitle: {
        ...baseText,
        fontSize: scaleFont(30),
        fontFamily: 'Rubik-Bold',
        fontWeight: '800',
        marginBottom: moderateScale(5),
    },
    thinPageTitle: {
        fontSize: scaleFont(24),
        fontFamily: 'Rubik-Light',
        fontWeight: '300',
    },
    imageSubtitle: {
        ...baseText,
        fontFamily: 'Rubik-Light',
        fontSize: scaleFont(17),
        color: colors.text.white07,
        letterSpacing: moderateScale(0.38),
        lineHeight: scaleFont(24),
    },
    scrollContainer: {
        paddingVertical: moderateScale(16),
        justifyContent: 'center',
        marginRight: moderateScale(-24)
    },
    featuresScroll: {
        flex: 1,
    },
    featureCard: {
        ...baseCard,
        width: moderateScale(156),
        paddingVertical: moderateScale(15),
        marginRight: moderateScale(8),
        paddingLeft: moderateScale(16),
        gap: 20
    },
    featureText: {
        ...baseText,
        textAlign: 'left',
    },
    featureIconWrapper: {
        top: 0,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: moderateScale(8),
        backgroundColor: 'rgba(0, 0, 0, 0.24)',
        width: moderateScale(36),
        height: moderateScale(35.68),
    },
    featureIcon: {
        color: colors.text.white,
    },
    featureTitle: {
        fontSize: scaleFont(20),
        fontFamily: 'Rubik-Bold',
        fontWeight: '500',
        lineHeight: moderateScale(24)
    },
    featureSubtitle: {
        fontSize: scaleFont(13),
        color: colors.text.white08,
        lineHeight: moderateScale(18)
    },
    radiusView: {
        width: '100%',
        height: moderateScale(60),
        backgroundColor: colors.background.white05,
        borderRadius: moderateScale(12),
        padding: moderateScale(15),
        justifyContent: 'center',
        borderColor: colors.border.white03,
        borderWidth: 0.5,
        position: 'relative',
    },
    radiusViewSelected: {
        borderColor: colors.primary.green,
        borderWidth: 1.5,
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
        borderColor: colors.border.white,
        marginRight: 10,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    textContainer: {
        flexDirection: 'column',
    },
    checkboxTitle: {
        ...baseText,
        fontSize: scaleFont(14),
        fontFamily: 'Rubik-Bold',
        fontWeight: '700',
    },
    checkboxDescription: {
        ...baseText,
        fontFamily: 'Rubik-Light',
        fontSize: scaleFont(12),
        color: colors.text.white08,
        fontWeight: '400',
    },
    checkboxChecked: {
        backgroundColor: colors.primary.green,
        borderColor: colors.primary.green,
    },
    checkboxDot: {
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: colors.text.white,
    },
    nextButton: {
        backgroundColor: colors.primary.green,
        borderRadius: moderateScale(12),
        alignItems: 'center',
        width: '100%',
        paddingVertical: moderateScale(16),
        marginBottom: moderateScale(16),
    },
    nextButtonText: {
        ...baseText,
        color: colors.text.white,
        lineHeight: moderateScale(24),
        fontSize: scaleFont(16),
        fontWeight: '500',
    },
    bottomSection: {
        alignItems: 'center',
        marginTop: moderateScale(10),
    },
    bottomText: {
        ...baseText,
        fontSize: scaleFont(9),
        color: colors.text.white052,
        fontWeight: '300',
        textAlign: 'center',
        marginBottom: moderateScale(10),
    },
    bottomButtons: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: moderateScale(24),
    },
    bottomButtonText: {
        ...baseText,
        fontSize: scaleFont(11),
        color: colors.text.white05,
        fontWeight: '400',
        marginHorizontal: moderateScale(4),
    },
    bottomButtonSeparator: {
        ...baseText,
        fontSize: scaleFont(12),
        color: colors.text.white08,
        fontWeight: '400',
        marginHorizontal: moderateScale(4),
    },
    closeButton: {
        position: 'absolute',
        top: moderateScale(60),
        right: moderateScale(16),
        zIndex: 1000,
        padding: moderateScale(10),
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        borderRadius: 100
    },
    saveBadge: {
        position: 'absolute',
        top: moderateScale(-1),
        right: moderateScale(-1),
        paddingHorizontal: moderateScale(8),
        paddingVertical: moderateScale(7),
        backgroundColor: colors.primary.green,
        borderTopLeftRadius: moderateScale(0),
        borderTopRightRadius: moderateScale(14),
        borderBottomLeftRadius: moderateScale(20),
        borderBottomRightRadius: moderateScale(0),
    },
    saveBadgeText: {
        ...baseText,
        fontSize: scaleFont(10),
        fontWeight: '500',
        color: colors.text.white,
    },
}); 
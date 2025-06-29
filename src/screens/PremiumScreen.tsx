import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Image, StatusBar, Dimensions, ScrollView } from 'react-native';
import { useTranslation } from 'react-i18next';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import ScanIcon from '../assets/icons/ScanIcon';
import SpeedMeter from '../assets/icons/SpeedMeter';
import DiagnoseIcon from '../assets/icons/DiagnoseIcon';
import ScanIcon2 from '../assets/icons/ScanIcon2';
import CloseIcon from '../assets/icons/CloseIcon';
import CustomButton from '../components/CustomButton';
import {
    baseContainer,
    baseFullWidth,
    baseImageWidth,
    baseAbsoluteBottom,
    basePaddingHorizontal,
    baseFlexRowStart,
    baseFlexRowSpaceBetween
} from '../styles/baseStyles';
import { premiumFeatures } from '../data';
import { premiumScreenStyles as styles } from '../styles/premiumScreenStyles';

interface PremiumScreenProps {
    onComplete: () => void;
}

const { height: SCREEN_HEIGHT, width: SCREEN_WIDTH } = Dimensions.get('window');

const getIconComponent = (iconKey: string) => {
    switch (iconKey) {
        case 'scan':
            return <ScanIcon2 />;
        case 'speed':
            return <SpeedMeter />;
        case 'diagnose':
            return <DiagnoseIcon />;
        default:
            return null;
    }
};

export default function PremiumScreen({ onComplete }: PremiumScreenProps) {
    const [selectedIndex, setSelectedIndex] = useState(1);
    const { t } = useTranslation();

    const selectCheckbox = (index: number) => {
        setSelectedIndex(index);
    };

    return (
        <View style={[baseContainer, styles.container]}>
            <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />

            <TouchableOpacity style={styles.closeButton} onPress={onComplete}>
                <CloseIcon />
            </TouchableOpacity>

            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/PremiumScreen.png')}
                    style={[baseImageWidth, styles.premiumImage]}
                    resizeMode="cover"
                />
            </View>

            <View style={[baseAbsoluteBottom, basePaddingHorizontal, styles.contentContainer]}>
                <View style={styles.headerSection}>
                    <View style={baseFlexRowStart}>
                        <Text style={styles.imageTitle}>{t('premium.titleFirst')} <Text style={[styles.imageTitle, styles.thinPageTitle]}>{t('premium.titleLast')}</Text></Text>
                    </View>
                    <Text style={styles.imageSubtitle}>{t('premium.subtitle')}</Text>
                </View>

                <View style={styles.scrollContainer}>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.featuresScroll}
                        scrollEnabled={true}
                    >
                        {premiumFeatures.map((feature) => (
                            <View key={feature.id} style={styles.featureCard}>
                                <View style={styles.featureIconWrapper}>
                                    <Text style={styles.featureIcon}>{getIconComponent(feature.iconKey)}</Text>
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

                <CustomButton
                    title={t('premium.button')}
                    onPress={() => { }}
                />

                <View style={styles.bottomSection}>
                    <Text style={styles.bottomText}>
                        {t('premium.bottomText')}
                    </Text>

                    <View style={[baseFlexRowSpaceBetween, styles.bottomButtons]}>
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
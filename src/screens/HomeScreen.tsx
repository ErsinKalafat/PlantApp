import { useEffect } from 'react';
import { Text, View, StatusBar, ScrollView, Image, Dimensions, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView, TextInput, ImageBackground, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useTranslation } from 'react-i18next';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchQuestions, QuestionData } from '../store/slices/questionsSlice';
import { fetchCategories, CategoryData } from '../store/slices/categoriesSlice';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import SearchIcon from '../assets/icons/SearchIcon';
import CustomText from '../components/CustomText';
import { RootState } from '../store';
import { homeScreenStyles as styles } from '../styles/homeScreenStyles';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const { t } = useTranslation();
    const { questions, loading: questionsLoading, error: questionsError } = useAppSelector((state: RootState) => state.questions as any);
    const { categories, loading: categoriesLoading, error: categoriesError } = useAppSelector((state: RootState) => state.categories as any);

    useEffect(() => {
        dispatch(fetchQuestions());
        dispatch(fetchCategories());
    }, [dispatch]);

    const tryAgain = () => {
        dispatch(fetchQuestions());
        dispatch(fetchCategories());
    };

    const isLoading = questionsLoading || categoriesLoading;
    const hasError = questionsError || categoriesError;

    if (isLoading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>{t('home.loading.text')}</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (hasError) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{questionsError || categoriesError}</Text>
                    <TouchableOpacity onPress={tryAgain}>
                        <Text style={styles.retryText}>{t('home.error.retry')}</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            <View style={styles.backgroundContainer}>
                <ImageBackground source={require('../assets/images/Background.png')} style={styles.backgroundLeaf} resizeMode='stretch'>
                    <View style={styles.overlayContent}>
                        <CustomText style={styles.greetingTopText}>{t('home.greeting.top')}</CustomText>
                        <CustomText style={styles.greetingText}>{t('home.greeting.main')}</CustomText>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchIconStyle}>
                                <SearchIcon />
                            </View>
                            <TextInput
                                style={styles.searchInput}
                                placeholder={t('home.search.placeholder')}
                                placeholderTextColor="rgba(175, 175, 175, 1)"
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView style={styles.container}>
                <View style={styles.section}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/PremiumBox.png')} style={styles.premiumImage} resizeMode='contain' />
                    </TouchableOpacity>
                    <CustomText style={styles.sectionTitle}>{t('home.section.getStarted')}</CustomText>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={styles.scrollContainer}
                        style={styles.scrollView}
                    >
                        {questions.map((question: QuestionData) => (
                            <TouchableOpacity
                                key={question.id}
                                style={styles.questionContainer}
                            >
                                <Image source={{ uri: question.image_uri }} style={styles.questionImage} resizeMode='stretch' />
                                <View style={styles.questionOverlay}>
                                    <Text style={styles.questionTitle}>{question.title}</Text>
                                    <Text style={styles.questionSubtitle}>{question.subtitle}</Text>
                                </View>
                            </TouchableOpacity>
                        ))}
                    </ScrollView>

                    {categories.map((category: CategoryData) => (
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0)', 'rgba(41, 187, 136, 0.04)']}
                            key={category.id}
                            style={styles.categoryContainer}
                        >
                            <Image source={{ uri: category.image.url }} style={styles.categoryImage} resizeMode='stretch' />
                            <View style={styles.categoryOverlay}>
                                <CustomText style={styles.categoryTitle}>{category.title}</CustomText>
                            </View>
                        </LinearGradient>
                    ))}
                </View>
            </ScrollView>
        </View>
    );
}
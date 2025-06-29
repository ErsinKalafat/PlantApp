import { useEffect } from 'react';
import { Text, View, StyleSheet, StatusBar, ScrollView, Image, Dimensions, ActivityIndicator, TouchableOpacity, Alert, SafeAreaView, TextInput, ImageBackground } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { fetchQuestions, QuestionData } from '../store/slices/questionsSlice';
import { fetchCategories, CategoryData } from '../store/slices/categoriesSlice';
import { moderateScale, scaleFont } from '../helpers/sizeNormalize';
import SearchIcon from '../assets/icons/SearchIcon';

export default function HomeScreen() {
    const dispatch = useAppDispatch();
    const { questions, loading: questionsLoading, error: questionsError } = useAppSelector((state) => state.questions);
    const { categories, loading: categoriesLoading, error: categoriesError } = useAppSelector((state) => state.categories);

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
                    <Text style={styles.loadingText}>Veriler yükleniyor...</Text>
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
                        <Text style={styles.retryText}>Bir sorun oluştu</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        // <SafeAreaView style={styles.safeArea}>
        //     <StatusBar barStyle="dark-content" backgroundColor="#fff" />
        <View style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
            {/* Background Image with Overlay Content */}
            <View style={styles.backgroundContainer}>
                <ImageBackground source={require('../assets/images/Background.png')} style={styles.backgroundLeaf} resizeMode='stretch'>
                    {/* Absolute positioned content over background */}
                    <View style={styles.overlayContent}>
                        <Text style={styles.greetingTopText}>Hi, plant lover!</Text>
                        <Text style={styles.greetingText}>Good Afternoon! ⛅</Text>
                        <View style={styles.searchContainer}>
                            <View style={styles.searchIconStyle}>
                                <SearchIcon />
                            </View>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search for plants"
                                placeholderTextColor="rgba(175, 175, 175, 1)"
                            />
                        </View>
                    </View>
                </ImageBackground>
            </View>
            <ScrollView style={styles.container}>


                {/* Sorular Bölümü */}
                <View style={styles.section}>
                    <TouchableOpacity>
                        <Image source={require('../assets/images/PremiumBox.png')} style={styles.premiumImage} resizeMode='contain' />
                    </TouchableOpacity>
                    <Text style={styles.sectionTitle}>Get Started</Text>
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

                    {/* Kategoriler Bölümü */}
                    {categories.map((category: CategoryData) => (
                        <LinearGradient
                            colors={['rgba(255, 255, 255, 0)', 'rgba(41, 187, 136, 0.04)']}
                            key={category.id}
                            style={styles.categoryContainer}
                        >
                            <Image source={{ uri: category.image.url }} style={styles.categoryImage} resizeMode='stretch' />
                            <View style={styles.categoryOverlay}>
                                <Text style={styles.categoryTitle}>{category.title}</Text>
                            </View>
                        </LinearGradient>
                    ))}
                </View>

            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: 'rgba(251, 250, 250, 1)',
    },
    container: {
        flex: 1,
        gap: moderateScale(24)
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: scaleFont(16),
        color: '#666',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: moderateScale(20),
    },
    errorText: {
        fontSize: scaleFont(16),
        color: '#FF3B30',
        textAlign: 'center',
        marginBottom: 20,
    },
    retryText: {
        fontSize: scaleFont(16),
        color: '#007AFF',
        textDecorationLine: 'underline',
    },
    backgroundContainer: {
        position: 'relative',
        width: '100%',
        height: moderateScale(175),
    },
    overlayContent: {
        paddingHorizontal: 24,
        paddingTop: moderateScale(50),
        justifyContent: 'flex-start',
        gap: moderateScale(6)
    },
    greetingText: {
        fontSize: scaleFont(24),
        fontWeight: '500',
        color: 'rgba(19, 35, 27, 1)',
        marginBottom: 4,
        fontFamily: 'Rubik-Medium',
    },
    greetingTopText: {
        fontSize: scaleFont(16),
        color: 'rgba(19, 35, 27, 1)',
        fontFamily: 'Rubik-Regular',
        opacity: 0.8,
    },
    searchContainer: {
        height: moderateScale(44),
        flexDirection: 'row',
        alignItems: 'flex-start',
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: moderateScale(12),
        paddingHorizontal: moderateScale(16),
        paddingVertical: moderateScale(12),
        borderWidth: 0.2,
        borderColor: 'rgba(60, 60, 67, 0.25)'
    },
    searchInput: {
        flex: 1,
        fontSize: scaleFont(15.5),
        color: 'rgba(19, 35, 27, 1)',
        fontFamily: 'Rubik-Regular',
        backgroundColor: 'transparent',
        fontWeight: '400',
        letterSpacing: 0.07
    },
    searchIconStyle: {
        marginRight: moderateScale(12),
    },
    section: {
        marginBottom: 20,
        borderRadius: 12,
        marginLeft: 24,
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: moderateScale(24)
    },
    sectionTitle: {
        fontSize: scaleFont(15),
        fontFamily: 'Rubik-Regular',
        fontWeight: '500',
        color: 'rgba(19, 35, 27, 1)',
        letterSpacing: -0.24
    },
    scrollView: {
        flexGrow: 0,
    },
    scrollContainer: {
        paddingRight: 15,
    },
    questionContainer: {
        width: moderateScale(240),
        height: moderateScale(164),
        borderRadius: 12,
        overflow: 'hidden',
        position: 'relative',
        marginRight: moderateScale(16)
    },
    questionImage: {
        width: '100%',
        height: '100%',
    },
    questionOverlay: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        padding: 10,
    },
    questionTitle: {
        color: '#fff',
        fontSize: scaleFont(14),
        fontWeight: '500',
        marginBottom: 2,
    },
    questionSubtitle: {
        color: '#fff',
        fontSize: scaleFont(12),
        opacity: 0.8,
    },
    categoryContainer: {
        width: moderateScale(158),
        height: moderateScale(152),
        borderRadius: moderateScale(12),
        overflow: 'hidden',
        position: 'relative',
        borderWidth: 0.5,
        borderColor: 'rgba(41, 187, 137, 0.18)',
        // backgroundColor: 'rgba(244, 246, 246, 1)',
    },
    categoryImage: {
        width: '100%',
        height: '100%',
    },
    categoryOverlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        padding: 16,
    },
    categoryTitle: {
        color: '#13231B',
        fontSize: scaleFont(16),
        fontWeight: '500',
        fontFamily: 'Rubik-Regular',
        lineHeight: 21,
    },
    premiumImage: {
        width: moderateScale(327),
        height: moderateScale(64),
        marginTop: moderateScale(24),
    },
    backgroundLeaf: {
        width: '100%',
        height: moderateScale(175),
    },
});
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { useAppDispatch, useAppSelector } from '../store/hooks';

export default function ProfileScreen() {
    const dispatch = useAppDispatch();
    const { user, loading, error, isAuthenticated } = useAppSelector((state) => state.user);

    useEffect(() => {
        if (isAuthenticated) {
            // reduxta kullanıcı var
            console.log('Oturumdaki kullanıcı:', user);

        }
    }, [dispatch, isAuthenticated]);

    if (loading) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={styles.loadingText}>Profil yükleniyor...</Text>
                </View>
            </SafeAreaView>
        );
    }

    if (!isAuthenticated || !user) {
        return (
            <SafeAreaView style={styles.safeArea}>
                <StatusBar barStyle="dark-content" backgroundColor="#fff" />
                <View style={styles.container}>
                    <Text style={styles.title}>Profil</Text>
                    <Text style={styles.subtitle}>Giriş yapmanız gerekiyor</Text>
                    <TouchableOpacity style={styles.button}>
                        <Text style={styles.buttonText}>Giriş Yap</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <ScrollView style={styles.container}>
                <View style={styles.profileSection}>
                    <View style={styles.avatarContainer}>
                        <View style={styles.avatar}>
                            <Text style={styles.avatarText}>
                                {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                            </Text>
                        </View>
                    </View>

                    <Text style={styles.userName}>{user.name}</Text>
                    <Text style={styles.userEmail}>{user.email}</Text>

                    {user.desc && (
                        <Text style={styles.userBio}>{user.desc}</Text>
                    )}

                    {user.location && (
                        <Text style={styles.userLocation}>{user.location}</Text>
                    )}
                </View>

                {error && (
                    <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{error}</Text>
                    </View>
                )}
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#f5f5f5',
    },
    container: {
        flex: 1,
        padding: 20,
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    loadingText: {
        marginTop: 10,
        fontSize: 16,
        color: '#666',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        marginBottom: 30,
    },
    button: {
        backgroundColor: '#007AFF',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },
    profileSection: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    avatarContainer: {
        marginBottom: 15,
    },
    avatar: {
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: '#007AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarText: {
        color: '#fff',
        fontSize: 32,
        fontWeight: 'bold',
    },
    userName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 5,
    },
    userEmail: {
        fontSize: 16,
        color: '#666',
        marginBottom: 10,
    },
    userBio: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
        lineHeight: 20,
    },
    userLocation: {
        fontSize: 14,
        color: '#007AFF',
    },
    errorContainer: {
        backgroundColor: '#FFE5E5',
        padding: 15,
        borderRadius: 10,
        marginBottom: 20,
    },
    errorText: {
        color: '#FF3B30',
        fontSize: 14,
        textAlign: 'center',
    },
    actionsSection: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    actionButton: {
        backgroundColor: '#f8f9fa',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderColor: '#e9ecef',
    },
    actionButtonText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    logoutButton: {
        backgroundColor: '#FF3B30',
        padding: 15,
        borderRadius: 10,
        marginTop: 10,
    },
    logoutButtonText: {
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        fontWeight: '600',
    },
    statusSection: {
        backgroundColor: '#fff',
        borderRadius: 15,
        padding: 20,
        marginBottom: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
    },
    statusTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#333',
        marginBottom: 15,
    },
    statusText: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
}); 
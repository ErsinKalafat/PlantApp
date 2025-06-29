import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function NotificationsScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <Text style={styles.title}>My Garden Screen</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam voluptatem, impedit illum tempora earum repellat quas sint minima eligendi provident, perspiciatis suscipit numquam laborum. Ab aspernatur distinctio temporibus ad dicta.</Text>
            </View>
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
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
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
        textAlign: 'center',
    },
}); 
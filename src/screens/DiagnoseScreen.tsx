import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';

export default function SearchScreen() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar barStyle="dark-content" backgroundColor="#fff" />
            <View style={styles.container}>
                <Text style={styles.title}>Diagnose Screen</Text>
                <Text style={styles.subtitle}>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit ab laudantium explicabo quasi ex aspernatur quia distinctio ducimus ipsum omnis illum assumenda quos iusto eum harum corrupti enim, ea quas.</Text>
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
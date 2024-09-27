import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';

export default function SportCategoryCard({ name, image, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        overflow: 'hidden',
        backgroundColor: '#fff',
        elevation: 3,
        margin: 8,
    },
    image: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
    },
    name: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#2C2C2C',
        padding: 8,
    },
});
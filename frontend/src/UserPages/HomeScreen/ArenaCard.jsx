import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/Ionicons';
import Icon from 'react-native-vector-icons/Entypo';

export default function ArenaCard({ name, location, distance, price, rating, image, onPress }) {
    return (
        <TouchableOpacity style={styles.card} onPress={onPress}>
            <Image source={{ uri: image }} style={styles.image} />
            <View style={styles.infoContainer}>
                <Text style={styles.arenaName}>{name}</Text>
                <View style={styles.locationRow}>
                    <Icon name="location-pin" size={18} color="red" />
                    <Text style={styles.locationText}>{location}</Text>
                </View>
                <View style={styles.DistanceRow}>
                    <Icon name="direction" size={14} color="black" />
                    <Text style={styles.distanceText}>{distance} away</Text>
                </View>
                <View style={styles.priceRow}>
                    <Text style={styles.priceText}>{price} NRS/hr</Text>
                    <View style={styles.ratingContainer}>
                        <Text style={styles.ratingText}>{rating}</Text>
                        <Icon name="star" size={18} color="gold" />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 8,
        overflow: 'hidden',
        marginBottom: 16,
        elevation: 3,
        marginTop: 4,
    },
    image: {
        width: '100%',
        height: 190,
    },
    infoContainer: {
        padding: 8,
    },
    arenaName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#2C2C2C',
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    locationText: {
        fontSize: 14,
        color: '#6F6F6F',
        fontWeight: 'bold',
        marginLeft: 4,
    },
    distanceText: {
        fontSize: 12,
        color: '#6F6F6F',
        marginLeft: 7,
    },
    DistanceRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 4,
    },
    priceRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 8,
    },
    priceText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    ratingText: {
        fontSize: 16,
        color: '#000',
        marginRight: 4,
        fontWeight: 'bold',
    },
});

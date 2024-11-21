import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const LoadingOverlay = ({ visible, onClose }) => {
    return (
        <Modal
            // animationType="slide"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <View style={styles.overlay}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
    }
});

export default LoadingOverlay;

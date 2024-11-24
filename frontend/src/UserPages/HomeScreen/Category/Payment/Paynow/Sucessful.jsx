import React from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as FileSystem from "expo-file-system";
import * as Animatable from "react-native-animatable"; // Import for animations

const PaymentSuccess = ({ route, navigation }) => {
  const {
    transactionId = "N/A",
    amount = "0",
    date = "N/A",
    paymentMethod = "N/A",
  } = route.params || {};

  const handleDownloadReceipt = async () => {
    try {
      const receiptContent = ` 
        Transaction ID: ${transactionId}
        Amount: Rs. ${amount}
        Date: ${date}
        Payment Method: ${paymentMethod}
      `;
      const fileUri = FileSystem.documentDirectory + "receipt.txt";

      await FileSystem.writeAsStringAsync(fileUri, receiptContent);
      Alert.alert("Download Successful", "Receipt has been saved!");
    } catch (error) {
      Alert.alert("Download Failed", "There was an issue saving the receipt.");
    }
  };

  return (
    <View style={styles.container}>
      {/* Animating the header text */}
      <Animatable.Text
        animation="fadeIn"
        duration={1500}
        style={styles.successText}
      >
        Payment Successful!
      </Animatable.Text>

      {/* Animating the receipt container */}
      <Animatable.View
        animation="fadeInUp"
        duration={1000}
        style={styles.receiptContainer}
      >
        <Text style={styles.receiptText}>Transaction ID: {transactionId}</Text>
        <Text style={styles.receiptText}>Amount: Rs. {amount}</Text>
        <Text style={styles.receiptText}>Date: {date}</Text>
        <Text style={styles.receiptText}>Payment Method: {paymentMethod}</Text>
      </Animatable.View>

      {/* Animating the button to download receipt */}
      <Animatable.View
        animation="zoomIn"
        duration={1200}
        style={styles.buttonContainer}
      >
        <TouchableOpacity style={styles.button} onPress={handleDownloadReceipt}>
          <Text style={styles.buttonText}>Download Receipt</Text>
        </TouchableOpacity>

        {/* Animating the "Go to Home" button */}
        <TouchableOpacity
          style={[styles.button, styles.homeButton]}
          onPress={() => navigation.navigate("MainScreen")}
        >
          <Text style={styles.buttonText}>Go to Home</Text>
        </TouchableOpacity>
      </Animatable.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F9FC",
  },
  successText: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
  },
  receiptContainer: {
    backgroundColor: "#fff",
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  receiptText: {
    fontSize: 16,
    marginBottom: 12,
    color: "#333",
  },
  buttonContainer: {
    width: "100%",
    alignItems: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
    opacity: 0.9,
  },
  homeButton: {
    backgroundColor: "#2196F3", // Blue for the Home button
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentSuccess;

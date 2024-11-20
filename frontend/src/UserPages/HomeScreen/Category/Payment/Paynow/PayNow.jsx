import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from "react-native";

// Function to generate a dynamic transaction ID
const generateTransactionId = () => {
  return `TXN${Math.floor(Math.random() * 1000000)}`; // Random transaction ID, e.g., TXN123456
};

const PayNow = ({ route, navigation }) => {
  const { bookingData } = route.params;

  const [mobileNumber, setMobileNumber] = useState("");
  const [khaltiPin, setKhaltiPin] = useState("");

  // Simulate the Khalti payment process
  const handlePayment = () => {
    if (!mobileNumber || !khaltiPin) {
      Alert.alert("Error", "Please enter all the payment details.");
      return;
    }

    // Simulate a payment success (80% chance)
    const isPaymentSuccessful = Math.random() > 0.2;

    if (isPaymentSuccessful) {
      const transactionId = generateTransactionId(); // Generate dynamic transaction ID
      const amount = 1000; // Simulated amount
      const date = new Date().toLocaleDateString(); // Simulated date
      const paymentMethod = "Khalti"; // Simulated payment method

      // Pass the dynamic data to the success screen
      navigation.navigate("Sucessful", {
        transactionId,
        amount,
        date,
        paymentMethod,
      });
    } else {
      Alert.alert("Payment Failed", "There was an issue with your payment.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Payment Details</Text>

      {/* Booking Info */}
      <Text style={styles.bookingDetails}>Name: {bookingData.user_name}</Text>
      <Text style={styles.bookingDetails}>Email: {bookingData.user_email}</Text>
      <Text style={styles.bookingDetails}>Amount: Rs. 1000</Text>

      {/* Mobile Number Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Mobile Number"
        keyboardType="numeric"
        value={mobileNumber}
        onChangeText={setMobileNumber}
      />

      {/* Khalti PIN Input */}
      <TextInput
        style={styles.input}
        placeholder="Enter Khalti PIN"
        secureTextEntry
        value={khaltiPin}
        onChangeText={setKhaltiPin}
      />

      {/* Pay Now Button */}
      <TouchableOpacity style={styles.button} onPress={handlePayment}>
        <Text style={styles.buttonText}>Pay Now</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  bookingDetails: {
    fontSize: 16,
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 50,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PayNow;

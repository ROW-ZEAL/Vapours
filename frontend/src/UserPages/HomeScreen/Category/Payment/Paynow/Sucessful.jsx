import React from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import * as FileSystem from "expo-file-system";

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
      <Text style={styles.successText}>Payment Successful!</Text>

      <View style={styles.receiptContainer}>
        <Text style={styles.receiptText}>Transaction ID: {transactionId}</Text>
        <Text style={styles.receiptText}>Amount: Rs. {amount}</Text>
        <Text style={styles.receiptText}>Date: {date}</Text>
        <Text style={styles.receiptText}>Payment Method: {paymentMethod}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleDownloadReceipt}>
        <Text style={styles.buttonText}>Download Receipt</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("MainScreen")}
      >
        <Text style={styles.buttonText}>Go to Home</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  successText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  receiptContainer: {
    backgroundColor: "#f0f0f0",
    padding: 20,
    borderRadius: 8,
    marginBottom: 20,
    width: "100%",
  },
  receiptText: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 5,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
  },
});

export default PaymentSuccess;

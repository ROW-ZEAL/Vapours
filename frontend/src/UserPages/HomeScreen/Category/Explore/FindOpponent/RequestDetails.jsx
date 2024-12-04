import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";

const RequestDetails = ({ route, navigation }) => {
  const { details, requestToken } = route.params;
  const user = useSelector((state) => state.user);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Request Details</Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Futsal Name:</Text> {details.futsal_name}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Date:</Text> {details.booking_date}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Slot:</Text> {details.selected_slot}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>Address:</Text> {details.address}
      </Text>
      <Text style={styles.detail}>
        <Text style={styles.bold}>User Name:</Text> {user.name}
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  detail: {
    fontSize: 18,
    marginVertical: 5,
  },
  bold: {
    fontWeight: "bold",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 8,
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 18,
  },
});

export default RequestDetails;

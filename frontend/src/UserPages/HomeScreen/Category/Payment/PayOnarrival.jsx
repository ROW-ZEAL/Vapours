import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Alert, ScrollView } from "react-native";
import { useRoute } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import styles from "./PayOnArrivalStyles";

const PayOnArrival = () => {
  const route = useRoute();
  const { bookingData } = route.params || {};
  const [bookingToken, setBookingToken] = useState("");
  const user = useSelector((state) => state.user);
  const navigation = useNavigation();

  useEffect(() => {
    const generateToken = () => {
      const token = Math.random().toString(36).substring(2, 10).toUpperCase();
      setBookingToken(token);
    };

    generateToken();
  }, []);

  const sendBookingData = async () => {
    if (!user.phone_number) {
      Alert.alert("Error", "User phone number is required.");
      return;
    }

    try {
      const data = {
        futsal_name: bookingData.futsal_name,
        booking_date: bookingData.booking_date,
        selected_slot: bookingData.selected_slot,
        contact_person: bookingData.contact_person,
        contact_number: bookingData.contact_number,
        address: bookingData.address,
        booking_token: bookingToken,
        user_name: user.name,
        user_phone: user.phone_number,
        user_email: user.email,
      };

      const response = await fetch("http://10.0.2.2:8000/api/booking", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Booking data has been successfully sent.");

        // Reset the navigation stack and navigate to BookingHistory
        navigation.reset({
          index: 0,
          routes: [{ name: "BookingHistory" }],
        });
      } else {
        Alert.alert("Error", result.message || "Something went wrong.");
      }
    } catch (error) {
      Alert.alert("Error", "Failed to send data. Please try again.");
    }
  };

  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.scrollContainer}
    >
      <View style={styles.container}>
        <View style={styles.card}>
          <Ionicons name="checkmark-circle" size={80} color="#4CAF50" />
          <Text style={styles.heading}>Booking Confirmed!</Text>

          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Futsal Name</Text>
              <Text style={styles.tableData}>{bookingData.futsal_name}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Booking Date</Text>
              <Text style={styles.tableData}>{bookingData.booking_date}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Slot</Text>
              <Text style={styles.tableData}>{bookingData.selected_slot}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Contact</Text>
              <Text style={styles.tableData}>{bookingData.contact_person}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Ph No</Text>
              <Text style={styles.tableData}>{bookingData.contact_number}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Address</Text>
              <Text style={styles.tableData}>{bookingData.address}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Booking Token</Text>
              <Text style={styles.tableData}>{bookingToken}</Text>
            </View>
          </View>

          <Text style={styles.heading}>User Information</Text>
          <View style={styles.table}>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Name</Text>
              <Text style={styles.tableData}>{user.name}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Phone</Text>
              <Text style={styles.tableData}>{user.phone_number}</Text>
            </View>
            <View style={styles.tableRow}>
              <Text style={styles.tableHeader}>Email</Text>
              <Text style={styles.tableData}>{user.email}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.button} onPress={sendBookingData}>
            <Text style={styles.buttonText}>Confirm Booking</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default PayOnArrival;

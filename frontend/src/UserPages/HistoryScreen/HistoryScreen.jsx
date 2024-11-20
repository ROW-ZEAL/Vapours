import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./HistoryScreenStyles";

export default function HistoryScreen() {
  const user = useSelector((state) => state.user);
  const [bookingHistory, setBookingHistory] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingHistory = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/api/history/${user.name}/`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setBookingHistory(data); // Assuming data is the booking history
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (user.name) {
      fetchBookingHistory();
    }
  }, [user.name]);

  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome, {user.name}!</Text>

      {loading && <ActivityIndicator size="large" color="#FF6347" />}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {bookingHistory && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {bookingHistory.map((booking) => (
            <View key={booking.id} style={styles.bookingContainer}>
              <Text style={styles.futsalName}>{booking.futsal_name}</Text>
              <Text style={styles.bookingText}>
                Slot: {booking.selected_slot}
              </Text>
              <Text style={styles.bookingText}>
                Date: {booking.booking_date}
              </Text>
              <Text style={styles.bookingText}>
                Contact Person: {booking.contact_person}
              </Text>
              <Text style={styles.bookingText}>
                Contact Number: {booking.contact_number}
              </Text>
              <Text style={styles.bookingText}>Address: {booking.address}</Text>
              <Text style={styles.bookingText}>Token: {booking.token}</Text>
              <Text style={styles.bookingText}>
                User Email: {booking.user_email}
              </Text>
              <Text style={styles.bookingText}>
                User Number: {booking.user_number}
              </Text>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

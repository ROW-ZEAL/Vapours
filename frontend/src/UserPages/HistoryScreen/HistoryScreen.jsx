import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useSelector } from "react-redux";
import styles from "./HistoryScreenStyles";
import * as Animatable from "react-native-animatable";

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
        setBookingHistory(data);
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
      {loading && (
        <Animatable.View
          animation="fadeIn"
          duration={1500}
          style={styles.loadingContainer}
        >
          <ActivityIndicator size="large" color="#4CAF50" />
          <Text style={styles.loadingText}>
            Loading your booking history...
          </Text>
        </Animatable.View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}

      {bookingHistory && (
        <ScrollView contentContainerStyle={styles.scrollView}>
          {bookingHistory.map((booking) => (
            <Animatable.View
              key={booking.id}
              style={styles.bookingContainer}
              animation="fadeInUp"
              duration={1000}
              delay={500} // Add delay for smooth sequencing
            >
              <Text style={styles.futsalName}>{booking.futsal_name}</Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Slot:</Text>{" "}
                {booking.selected_slot}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Date:</Text>{" "}
                {booking.booking_date}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Contact Person:</Text>{" "}
                {booking.contact_person}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Contact Number:</Text>{" "}
                {booking.contact_number}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Address:</Text> {booking.address}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>Token:</Text> {booking.token}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>User Email:</Text>{" "}
                {booking.user_email}
              </Text>
              <Text style={styles.bookingText}>
                <Text style={styles.boldText}>User Number:</Text>{" "}
                {booking.user_number}
              </Text>

              <TouchableOpacity style={styles.detailsButton}>
                <Text style={styles.detailsButtonText}>View Details</Text>
              </TouchableOpacity>
            </Animatable.View>
          ))}
        </ScrollView>
      )}
    </View>
  );
}

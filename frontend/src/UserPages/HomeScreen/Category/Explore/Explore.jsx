import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native"; // Import useNavigation for navigation
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Linking } from "react-native";
import { useSelector } from "react-redux"; // Import useSelector
import styles from "./ExploreStyles"; // Importing styles from ExploreStyles.js

const Explore = () => {
  const route = useRoute();
  const navigation = useNavigation(); // Hook for navigation
  const { futsal } = route.params || {}; // Ensure futsal object is available

  if (!futsal) {
    return <Text>Loading...</Text>; // or show an error message
  }

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);

  const user = useSelector((state) => state.user); // Access user info from Redux store

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      setDate(selectedDate || date);
    }
    setShow(false);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const [slots, setSlots] = useState([
    { time: "08:00AM - 09:00AM", available: true },
    { time: "09:00AM - 10:00AM", available: false },
    { time: "10:00AM - 11:00AM", available: true },
    { time: "11:00AM - 12:00PM", available: true },
    { time: "12:00PM - 01:00PM", available: false },
    { time: "01:00PM - 02:00PM", available: true },
  ]);

  const handleSlotSelection = (slot, index) => {
    if (!slot.available) {
      Alert.alert("Slot Already Booked", "Please choose another time.");
      return;
    }
    setSelectedSlotIndex(index);
  };

  const openMap = () => {
    const mapUrl = "https://www.google.com/maps"; // Static Google Maps URL
    Linking.openURL(mapUrl).catch((err) => {
      Alert.alert("Error", "Unable to open Google Maps.");
    });
  };

  const handleSubmit = async () => {
    if (selectedSlotIndex === null) {
      Alert.alert("Error", "Please select a slot before submitting.");
      return;
    }

    const selectedSlot = slots[selectedSlotIndex];

    const bookingData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlot.time,
      booking_date: date.toISOString().split("T")[0], // Format to YYYY-MM-DD
      contact_person: futsal.contactPerson,
      contact_number: futsal.contact,
      address: futsal.address,
      user_name: user.name,
      user_email: user.email,
      user_phone_number: user.phone_number,
    };

    // Booking details message
    const bookingMessage = `
      Futsal Name: ${futsal.name}
      Slot: ${selectedSlot.time}
      Date: ${date.toLocaleDateString()}
      Contact: ${futsal.contactPerson} (${futsal.contact})
      Address: ${futsal.address}
    `;

    // Show confirmation alert with booking details
    Alert.alert(
      "Confirm Your Booking",
      `These are your booking details:\n\n${bookingMessage}\n\nDo you want to proceed to payment?`,
      [
        {
          text: "Yes",
          onPress: () => {
            // Navigate to payment page
            navigation.navigate("Payment", { bookingData });
          },
        },
        {
          text: "No",
          onPress: () => {
            // Stay on the current page (do nothing)
          },
        },
      ]
    );
  };

  return (
    <ScrollView>
      <View style={styles.container}>
        <Image source={{ uri: futsal.image }} style={styles.image} />

        <View style={styles.contentContainer}>
          <Text style={styles.title}>{futsal.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>5.0</Text>
            <Text style={styles.reviewCount}>(120 Reviews)</Text>
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.row}>
              <Ionicons name="location-outline" size={20} color="red" />
              <Text style={styles.infoText}>{futsal.address}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="cash-outline" size={20} color="green" />
              <Text style={styles.infoText}>{futsal.price}</Text>
            </View>
            <TouchableOpacity onPress={openMap}>
              <View style={styles.mapsLinkContainer}>
                <Ionicons name="map-outline" size={20} color="#f44336" />
                <Text style={styles.mapsLinkText}>View On Maps</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Contact Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Contact:</Text>
            <View style={styles.row}>
              <Ionicons name="call-outline" size={20} color="black" />
              <Text style={styles.infoText}>{futsal.contact}</Text>
            </View>
            <View style={styles.row}>
              <Ionicons name="person-outline" size={20} color="black" />
              <Text style={styles.infoText}>{futsal.contactPerson}</Text>
            </View>
          </View>

          {/* Pick a Date Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Pick a Date For Booking:</Text>
            <TouchableOpacity onPress={showDatepicker}>
              <View style={styles.dateInputContainer}>
                <Text style={styles.dateInput}>
                  {date.toLocaleDateString()}
                </Text>
                <Ionicons
                  name="calendar-outline"
                  size={24}
                  color="black"
                  style={styles.calendarIcon}
                />
              </View>
            </TouchableOpacity>
            {show && (
              <DateTimePicker
                value={date}
                mode="date"
                display="default"
                onChange={onChange}
              />
            )}
          </View>

          {/* Available Slots Section */}
          <View style={styles.sectionContainer}>
            <Text style={styles.sectionTitle}>Available slots</Text>
            <View style={styles.slotsContainer}>
              {slots.map((slot, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.slot,
                    {
                      backgroundColor:
                        selectedSlotIndex === index
                          ? "blue"
                          : slot.available
                          ? "green"
                          : "red",
                    },
                  ]}
                  onPress={() => handleSlotSelection(slot, index)}
                >
                  <Text style={styles.slotText}>{slot.time}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Explore;

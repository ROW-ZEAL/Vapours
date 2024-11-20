import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  Alert,
  Modal,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Linking } from "react-native";
import { useSelector } from "react-redux";
import styles from "./ExploreStyles";

const Explore = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { futsal } = route.params || {};

  if (!futsal) {
    return <Text>Loading...</Text>;
  }

  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);
  const [selectedSlotIndex, setSelectedSlotIndex] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const user = useSelector((state) => state.user);

  const onChange = (event, selectedDate) => {
    if (event.type === "set") {
      if (selectedDate < new Date()) {
        Alert.alert("Invalid Date", "You cannot select a past date.");
        return;
      }
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
    const mapUrl = "https://www.google.com/maps";
    Linking.openURL(mapUrl).catch((err) => {
      Alert.alert("Error", "Unable to open Google Maps.");
    });
  };

  const handleSubmit = () => {
    if (selectedSlotIndex === null) {
      Alert.alert("Error", "Please select a slot before submitting.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayNow = () => {
    setShowPaymentModal(false);
    const selectedSlot = slots[selectedSlotIndex];

    const bookingData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlot.time,
      booking_date: date.toISOString().split("T")[0],
      contact_person: futsal.contactPerson,
      contact_number: futsal.contact,
      address: futsal.address,
      user_name: user.name,
      user_email: user.email,
      user_phone_number: user.phone_number,
    };

    console.log("Booking Data:", bookingData);

    navigation.navigate("Paynow", { bookingData });
  };

  const handlePayOnArrival = () => {
    setShowPaymentModal(false);
    const selectedSlot = slots[selectedSlotIndex];

    const bookingData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlot.time,
      booking_date: date.toISOString().split("T")[0],
      contact_person: futsal.contactPerson,
      contact_number: futsal.contact,
      address: futsal.address,
      user_name: user.name,
      user_email: user.email,
      user_phone_number: user.phone_number,
    };
    navigation.navigate("Payonarrival", { bookingData });
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
                minimumDate={new Date()}
              />
            )}
          </View>

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

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        visible={showPaymentModal}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            <Text style={styles.modalTitle}>{futsal.name}</Text>
            <View style={styles.modalDetails}>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Date: </Text>
                {date.toLocaleDateString()}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Slot: </Text>
                {slots[selectedSlotIndex]?.time}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>Address: </Text>
                {futsal.address}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>User Name: </Text>
                {user.name}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>User Email: </Text>
                {user.email}
              </Text>
              <Text style={styles.modalDetail}>
                <Text style={styles.boldText}>User Phone: </Text>
                {user.phone_number}
              </Text>
            </View>

            <View style={styles.modalButtonContainer}>
              <TouchableOpacity
                style={[styles.modalButton, styles.payNowButton]}
                onPress={handlePayNow}
              >
                <Text style={styles.modalButtonText}>Pay Now</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.modalButton, styles.payArrivalButton]}
                onPress={handlePayOnArrival}
              >
                <Text style={styles.modalButtonText}>Pay on Arrival</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Explore;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking,
  Alert,
  Modal,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRoute, useNavigation } from "@react-navigation/native";
import DateTimePicker from "@react-native-community/datetimepicker";
import styles from "./ExplorePageStyles";
import Icon from "react-native-vector-icons/FontAwesome";

const Explore = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { futsal } = route.params;

  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showFindOpponentModal, setShowFindOpponentModal] = useState(false);
  const [user, setUser] = useState(null);

  const getUserInfo = async () => {
    try {
      const userName = await AsyncStorage.getItem("userName");
      const userEmail = await AsyncStorage.getItem("userEmail");
      const userPhoneNumber = await AsyncStorage.getItem("userPhoneNumber");

      setUser({
        name: userName,
        email: userEmail,
        phone_number: userPhoneNumber,
      });
    } catch (error) {
      console.error("Error retrieving user info from AsyncStorage", error);
    }
  };

  useEffect(() => {
    getUserInfo();
  }, []);

  const toggleDatePicker = () => {
    setShowDatePicker(!showDatePicker);
  };

  const handleDateChange = async (event, selectedDate) => {
    setShowDatePicker(false);

    if (selectedDate) {
      const today = new Date();
      const tomorrow = new Date();
      tomorrow.setDate(today.getDate() + 1);

      if (
        selectedDate.toDateString() === today.toDateString() ||
        selectedDate.toDateString() === tomorrow.toDateString()
      ) {
        setDate(selectedDate);
        await sendDateToApi(selectedDate);
      } else {
        Alert.alert(
          "Invalid Date",
          "Please select today's or tomorrow's date."
        );
      }
    }
  };

  const sendDateToApi = async (selectedDate) => {
    const formattedDate = selectedDate.toISOString().split("T")[0];
    const url = `http://10.0.2.2:8000/api/slots/${futsal.name}/${formattedDate}`;

    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.Select_slots_results) {
        setAvailableSlots(data.Select_slots_results);
      } else {
        Alert.alert(
          "No slots available",
          "There are no available slots for the selected date."
        );
      }
    } catch (error) {
      console.error("API fetch error:", error);
      Alert.alert("Error", "Failed to fetch data from API");
    }
  };

  const handleSlotClick = (slot) => {
    if (slot.status === "available") {
      setSelectedSlot(slot.slot_id === selectedSlot ? null : slot.slot_id);
    } else {
      Alert.alert("Slot Unavailable", "This slot is already reserved.");
    }
  };

  const handleSubmit = () => {
    if (selectedSlot === null) {
      Alert.alert("Error", "Please select a slot before submitting.");
      return;
    }
    setShowPaymentModal(true);
  };

  const handlePayNow = () => {
    setShowPaymentModal(false);
    const selectedSlotObj = availableSlots.find(
      (slot) => slot.slot_id === selectedSlot
    );
    const bookingData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlotObj.booking_time_am_pm,
      booking_date: date.toISOString().split("T")[0],
      contact_person: futsal.contactPerson,
      contact_number: futsal.contact,
      address: futsal.address,
      user_name: user.name,
      user_email: user.email,
      user_phone_number: user.phone_number,
    };

    console.log(bookingData);

    navigation.navigate("Paynow", { bookingData });
  };

  const handlePayOnArrival = () => {
    setShowPaymentModal(false);
    const selectedSlotObj = availableSlots.find(
      (slot) => slot.slot_id === selectedSlot
    );
    const bookingData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlotObj.booking_time_am_pm,
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

  const handleFindOpponent = () => {
    if (selectedSlot === null) {
      Alert.alert("Error", "Please select a slot before finding an opponent.");
      return;
    }
    setShowFindOpponentModal(true);
  };

  const handleFindNow = () => {
    setShowFindOpponentModal(false);
    const selectedSlotObj = availableSlots.find(
      (slot) => slot.slot_id === selectedSlot
    );
    const findOpponentData = {
      futsal_name: futsal.name,
      selected_slot: selectedSlotObj.booking_time_am_pm,
      booking_date: date.toISOString().split("T")[0],
      address: futsal.address,
      user_name: user.name,
      user_email: user.email,
      user_phone_number: user.phone_number,
    };
    navigation.navigate("RequestDetails", { details: findOpponentData });
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View style={styles.container}>
        <Image
          source={futsal.image ? { uri: futsal.image } : null}
          style={styles.image}
          resizeMode="cover"
        />
        <View style={styles.detailsContainer}>
          <Text style={styles.name}>{futsal.name}</Text>
          <Text style={styles.info}>Address: {futsal.address}</Text>
          <Text style={styles.info}>Price: ₹{futsal.price}/hour</Text>
          <Text style={styles.info}>Contact: {futsal.contact}</Text>
          <Text style={styles.info}>
            Contact Person: {futsal.contactPerson}
          </Text>
          <Text style={styles.info}>Availability: {futsal.availability}</Text>
          <Text style={styles.info}>Working Hours: {futsal.hours}</Text>
          <TouchableOpacity
            style={styles.mapButton}
            onPress={() => Linking.openURL(futsal.maps)}
          >
            <Icon name="map" style={styles.mapIcon} />
            <Text style={styles.mapButtonText}>View on Maps</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={toggleDatePicker}>
            <Text style={styles.buttonText}>
              {date.toDateString() === new Date().toDateString()
                ? "Select Date "
                : "Select Date "}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={date}
              mode="date"
              display="default"
              onChange={handleDateChange}
              minimumDate={new Date()}
              maximumDate={
                new Date(new Date().setDate(new Date().getDate() + 1))
              }
            />
          )}

          <View style={styles.slotTableContainer}>
            {availableSlots.length > 0 && (
              <View style={styles.slotTable}>
                <View style={styles.slotTableHeader}>
                  <Text style={styles.slotTableHeaderText}>Slot Time</Text>
                </View>
                {availableSlots.map((slot) => (
                  <View
                    key={slot.slot_id}
                    style={[
                      styles.slotTableRow,
                      {
                        backgroundColor:
                          slot.status === "available"
                            ? selectedSlot === slot.slot_id
                              ? "rgba(0, 0, 0, 0.1)"
                              : "lightgreen"
                            : "lightcoral",
                      },
                    ]}
                  >
                    <TouchableOpacity
                      onPress={() => handleSlotClick(slot)}
                      style={styles.slotRowContent}
                    >
                      <Text style={styles.slotTableText}>
                        {slot.booking_time_am_pm}
                      </Text>
                      <Text style={styles.slotTableText}>
                        {slot.status === "available" ? "Available" : "Reserved"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                ))}
              </View>
            )}
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Book Now</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.submitButton, styles.findOpponentButton]}
            onPress={handleFindOpponent}
          >
            <Text style={styles.submitButtonText}>Find Opponent</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        transparent={true}
        visible={showPaymentModal}
        animationType="slide"
        onRequestClose={() => setShowPaymentModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Payment Options</Text>
            <TouchableOpacity onPress={handlePayNow} style={styles.modalButton}>
              <Text style={styles.modalButtonText}>Pay Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={handlePayOnArrival}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Pay on Arrival</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowPaymentModal(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      <Modal
        transparent={true}
        visible={showFindOpponentModal}
        animationType="slide"
        onRequestClose={() => setShowFindOpponentModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Find an Opponent</Text>
            <TouchableOpacity
              onPress={handleFindNow}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Find Now</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setShowFindOpponentModal(false)}
              style={styles.modalButton}
            >
              <Text style={styles.modalButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default Explore;

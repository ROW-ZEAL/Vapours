import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Picker } from "@react-native-picker/picker";

const Slots = () => {
  const userData = useSelector((state) => state.user);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [slotTime, setSlotTime] = useState("");
  const [venueName, setVenueName] = useState("");
  const [status, setStatus] = useState("available");
  const [venues, setVenues] = useState([]);

  useEffect(() => {
    const fetchVenues = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/api/vdetails/${userData.name}`
        );
        const result = await response.json();

        if (result && result.length > 0) {
          setVenues(result);
        } else {
          Alert.alert("No Venues", "No venues found for the current user.");
        }
      } catch (error) {
        Alert.alert("Error", "Failed to fetch venues.");
        console.error("Error fetching venues:", error);
      }
    };

    fetchVenues();
  }, [userData.id]);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    if (
      date.toDateString() === today.toDateString() ||
      date.toDateString() === tomorrow.toDateString()
    ) {
      setSelectedDate(date);
    } else {
      Alert.alert(
        "Invalid Date",
        "You can only book the current date or tomorrow."
      );
    }
    hideDatePicker();
  };

  const handleSubmit = async () => {
    if (!selectedDate || !slotTime || !venueName) {
      Alert.alert(
        "Missing Fields",
        "Please fill out all fields before submitting."
      );
      return;
    }

    const formData = {
      ownerName: userData.name,
      venueName,
      bookingDate: selectedDate.toDateString(),
      slotTime,
      status,
    };

    try {
      const response = await fetch("http://10.0.2.2:8000/api/slots", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const result = await response.json();
        Alert.alert("Success", "Slot booked successfully!");
        console.log("API Response:", result);
      } else {
        const error = await response.json();
        Alert.alert("Error", error.message || "Failed to book the slot.");
      }
    } catch (error) {
      Alert.alert("Error", "An unexpected error occurred.");
      console.error("API Error:", error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Create Reservation Slot</Text>
      <Text style={styles.label}>Select Venue</Text>
      <View style={styles.venueContainer}>
        {venues.length > 0 ? (
          venues.map((venue, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.venueBox,
                venueName === venue ? styles.selectedVenue : {},
                index % 2 === 0 ? styles.venueLeft : styles.venueRight,
              ]}
              onPress={() => setVenueName(venue)}
            >
              <Text style={styles.venueText}>{venue}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text style={styles.venueText}>No venue available</Text>
        )}
      </View>
      <Text style={styles.label}>Owner Name</Text>
      <TextInput style={styles.input} value={userData.name} editable={false} />

      <Text style={styles.label}>Booking Date</Text>
      <TouchableOpacity style={styles.dateTimeButton} onPress={showDatePicker}>
        <Ionicons name="calendar" size={24} color="black" />
        <Text style={styles.dateTimeText}>
          {selectedDate ? selectedDate.toDateString() : "Set Date"}
        </Text>
      </TouchableOpacity>
      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />

      <Text style={styles.label}>Slot Time</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter Slot Time (e.g., 10:00 AM - 11:00 AM)"
        value={slotTime}
        onChangeText={setSlotTime}
      />

      <Text style={styles.label}>Status</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={status}
          onValueChange={(itemValue) => setStatus(itemValue)}
        >
          <Picker.Item label="Available" value="available" />
          <Picker.Item label="Reserved" value="reserved" />
        </Picker>
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
    fontWeight: "600",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  dateTimeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 20,
    backgroundColor: "#fff",
  },
  submitButton: {
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  venueContainer: {
    marginBottom: 20,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  venueBox: {
    width: "45%",
    padding: 15,
    marginBottom: 15,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: "green",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e8f9e8",
  },
  selectedVenue: {
    borderColor: "darkgreen",
    backgroundColor: "#c8f7c8",
  },
  venueLeft: {
    marginRight: "5%",
  },
  venueRight: {
    marginLeft: "5%",
  },
  venueText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "green",
  },
});

export default Slots;

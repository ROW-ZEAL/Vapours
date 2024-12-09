import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { RadioButton } from "react-native-paper";
import DateTimePicker from "react-native-modal-datetime-picker";
import * as ImagePicker from "expo-image-picker";
import { styles } from "./Venuecss";
import { useSelector } from "react-redux";

const AddVenue = () => {
  const [venueName, setVenueName] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [price, setPrice] = useState("");
  const [selectedFacilities, setSelectedFacilities] = useState([]);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [photos, setPhotos] = useState([]);
  const userData = useSelector((state) => state.user);

  const facilities = [
    { label: "Washroom", value: "washroom" },
    { label: "First Aid", value: "firstAid" },
    { label: "Changing Room", value: "changingRoom" },
  ];

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
      alert("You can only book the current date or tomorrow.");
    }

    hideDatePicker();
  };

  const pickImage = async () => {
    const permissionResult =
      await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permissionResult.granted) {
      alert("Permission to access camera roll is required!");
      return;
    }

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setPhotos([...photos, result.assets[0].uri]);
    }
  };

  const handleFacilityToggle = (facility) => {
    setSelectedFacilities((prevFacilities) =>
      prevFacilities.includes(facility)
        ? prevFacilities.filter((item) => item !== facility)
        : [...prevFacilities, facility]
    );
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("user_name", userData.name);
    formData.append("venueName", venueName);
    formData.append("category", category);
    formData.append("location", location);
    formData.append("price", price);
    formData.append("selectedFacilities", JSON.stringify(selectedFacilities));
    formData.append("selectedDate", selectedDate?.toISOString());

    try {
      const response = await fetch("http://10.0.2.2:8000/api/venue", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const result = await response.json();
      alert("Form submitted successfully: " + JSON.stringify(result));

      // Clear form fields
      setVenueName("");
      setCategory("");
      setLocation("");
      setPrice("");
      setSelectedFacilities([]);
      setSelectedDate(null);
      setPhotos([]);
    } catch (error) {
      alert("Error submitting form: " + error.message);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={80}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Add Photos Section */}
        {photos.length > 0 ? (
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {photos.map((photo, index) => (
              <View key={index} style={styles.photoContainer}>
                <Image source={{ uri: photo }} style={styles.photo} />
                <Text style={styles.photoPath}>{photo}</Text>
              </View>
            ))}
          </ScrollView>
        ) : (
          <TouchableOpacity style={styles.addPhoto} onPress={pickImage}>
            <Ionicons name="add" size={48} color="black" />
          </TouchableOpacity>
        )}
        <Text style={styles.addPhotoText}>
          {photos.length > 0 ? "Selected Photos" : "Add Photos"}
        </Text>

        {/* Basic Information Section */}
        <View style={styles.inputContainer}>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.label}>Basic Information</Text>
          <TextInput
            style={styles.input}
            placeholder="Venue Name"
            value={venueName}
            onChangeText={setVenueName}
          />
          <TextInput
            style={styles.input}
            placeholder="Category"
            value={category}
            onChangeText={setCategory}
          />
          <TextInput
            style={styles.input}
            placeholder="Location"
            value={location}
            onChangeText={setLocation}
          />
          <TextInput
            style={styles.input}
            placeholder="Price/hour"
            value={price}
            onChangeText={setPrice}
          />
        </View>

        {/* Availability Section */}
        <View style={styles.availabilityContainer}>
          <Text style={styles.label}>Started From</Text>
          <View style={styles.dateTimeContainer}>
            <TouchableOpacity
              style={styles.dateTimeButton}
              onPress={showDatePicker}
            >
              <Ionicons name="calendar" size={24} color="black" />
              <Text style={styles.dateTimeText}>
                {selectedDate ? selectedDate.toDateString() : "Set Date"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Facilities Section */}
        <View style={styles.facilitiesContainer}>
          <Text style={styles.label}>Facilities:</Text>
          <ScrollView
            style={styles.facilitiesScroll}
            showsVerticalScrollIndicator={false}
          >
            {facilities.map((facility) => (
              <View key={facility.value} style={styles.facilityItem}>
                <TouchableOpacity
                  style={styles.checkboxContainer}
                  onPress={() => handleFacilityToggle(facility.value)}
                >
                  <RadioButton
                    status={
                      selectedFacilities.includes(facility.value)
                        ? "checked"
                        : "unchecked"
                    }
                    onPress={() => handleFacilityToggle(facility.value)}
                  />
                  <Text style={styles.checkboxLabel}>{facility.label}</Text>
                </TouchableOpacity>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Submit</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Date Picker */}
      <DateTimePicker
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        minimumDate={new Date()}
        maximumDate={new Date(new Date().setDate(new Date().getDate() + 1))}
      />
    </KeyboardAvoidingView>
  );
};

export default AddVenue;

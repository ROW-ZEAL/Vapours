import React, { useState } from "react";
import { View, TextInput, TouchableOpacity, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import styles from "./SearchBarStyles";

const SearchBar = ({ categoryName, setSearchLocation, onFetchData }) => {
  const [location, setLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const getCurrentLocation = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        Alert.alert("Permission Denied", "Location permission is required.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);

      const { latitude, longitude } = currentLocation.coords;
      setSearchLocation(`Lat: ${latitude}, Long: ${longitude}`);
    } catch (error) {
      console.error("Error getting location:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const address = encodeURIComponent(searchQuery.trim());
      const url = `http://10.0.2.2:8000/api/category/${categoryName}/address/${address}/`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data from the server");
      }

      const data = await response.json();
      onFetchData(data.Select_category_results_with_address);
    } catch (error) {
      console.error("Error fetching data:", error);
      Alert.alert("Error", "Failed to fetch data.");
    }
  };

  return (
    <View style={styles.searchBarContainer}>
      <TouchableOpacity
        style={styles.iconContainer}
        onPress={getCurrentLocation}
      >
        <Ionicons name="location-outline" size={24} color="gray" />
      </TouchableOpacity>

      <TextInput
        style={styles.searchInput}
        placeholder="Search for futsals near you..."
        value={searchQuery}
        onChangeText={(text) => setSearchQuery(text)}
      />

      <TouchableOpacity style={styles.iconContainer} onPress={handleSearch}>
        <Ionicons name="search-outline" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

export default SearchBar;

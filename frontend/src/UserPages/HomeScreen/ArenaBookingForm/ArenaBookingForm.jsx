import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Animated,
  Alert,
  ScrollView,
} from "react-native";

const ArenaBookingForm = () => {
  const [formData, setFormData] = useState({ location: "", category: "" });
  const [recommendations, setRecommendations] = useState([]);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.9)).current;
  const translateYAnim = useRef(new Animated.Value(50)).current;

  const handleChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async () => {
    const { location, category } = formData;

    if (!location || !category) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }

    const apiUrl = `http://10.0.2.2:8000/api/recommendations/${location}/${category}`;
    try {
      const response = await fetch(apiUrl, { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        setRecommendations(data["Recommended Venues"]);
        startAnimations();
      } else {
        Alert.alert("Error", "Failed to fetch recommendations.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong.");
    }
  };

  const startAnimations = () => {
    fadeAnim.setValue(0);
    scaleAnim.setValue(0.9);
    translateYAnim.setValue(50);

    Animated.stagger(150, [
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const renderVenue = ({ item }) => (
    <Animated.View
      style={[
        styles.venueCard,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }, { translateY: translateYAnim }],
        },
      ]}
    >
      <Text style={styles.venueName}>{item.venue_name}</Text>
      <Text style={styles.venueDetails}>📍 {item.location}</Text>
      <Text style={styles.venueDetails}>
        📏 {item.latitude}, {item.longitude}
      </Text>
      <Text style={styles.venueDetails}>🏟️ {item.category}</Text>
    </Animated.View>
  );

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.gradientBackground}>
        <Text style={styles.heading}>Arena Booking</Text>
        <View style={styles.formCard}>
          <TextInput
            style={styles.input}
            placeholder="Enter Location"
            placeholderTextColor="#aaa"
            value={formData.location}
            onChangeText={(value) => handleChange("location", value)}
          />
          <TextInput
            style={styles.input}
            placeholder="Enter Category (e.g., Futsal)"
            placeholderTextColor="#aaa"
            value={formData.category}
            onChangeText={(value) => handleChange("category", value)}
          />
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Get Recommendations</Text>
          </TouchableOpacity>
        </View>

        {recommendations.length > 0 && (
          <View style={styles.recommendationsContainer}>
            <Text style={styles.subheading}>Recommended Venues</Text>
            <FlatList
              data={recommendations}
              renderItem={renderVenue}
              keyExtractor={(item, index) => index.toString()}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 20,
    backgroundImage: "linear-gradient(135deg, #4FACFE 0%, #00F2FE 100%)",
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 20,
    textShadowColor: "rgba(0, 0, 0, 0.3)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  formCard: {
    width: "100%",
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    padding: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    backdropFilter: "blur(10px)",
    marginBottom: 30,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
    color: "#333",
    borderWidth: 1,
    borderColor: "#ccc",
  },
  button: {
    backgroundColor: "#4FACFE",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "600",
  },
  recommendationsContainer: {
    marginTop: 20,
    width: "100%",
  },
  subheading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
    textAlign: "center",
  },
  venueCard: {
    backgroundColor: "rgba(255, 255, 255, 0.8)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  venueName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#222",
    marginBottom: 5,
  },
  venueDetails: { fontSize: 14, color: "#444" },
});

export default ArenaBookingForm;

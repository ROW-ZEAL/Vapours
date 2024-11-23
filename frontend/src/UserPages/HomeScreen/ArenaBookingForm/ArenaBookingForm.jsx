import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  Dimensions,
  ScrollView,
} from "react-native";
import { Button, Card } from "react-native-paper";
import * as Animatable from "react-native-animatable";

const ArenaBookingForm = () => {
  const [userId, setUserId] = useState("");
  const [recommendations, setRecommendations] = useState(null);

  const handleSubmit = () => {
    if (userId.trim()) {
      fetch(`http://10.0.2.2:8000/api/recommendations/${userId}/`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch recommendations");
          }
          return response.json();
        })
        .then((data) => {
          console.log("API Response:", data);
          setRecommendations(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          Alert.alert(
            "Error",
            "Failed to fetch recommendations. Please try again."
          );
        });
    } else {
      Alert.alert("Validation Error", "Please enter a valid User ID");
    }
  };

  const renderVenueCard = ({ item }) => (
    <Animatable.View animation="fadeInUp" duration={1000} style={styles.card}>
      <Card mode="elevated" style={styles.venueCard}>
        <Card.Title title={item.venue_name} subtitle={item.location} />
        <Card.Content>
          <Text style={styles.venueDetails}>Category: {item.category}</Text>
          <Text style={styles.venueDetails}>
            Latitude: {item.latitude}, Longitude: {item.longitude}
          </Text>
        </Card.Content>
      </Card>
    </Animatable.View>
  );

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <View style={styles.container}>
        <Animatable.Text
          animation="fadeInDown"
          duration={1500}
          style={styles.title}
        >
          Search for the Nearest Venue
        </Animatable.Text>
        <TextInput
          style={styles.input}
          placeholder="Enter User ID"
          value={userId}
          onChangeText={setUserId}
          keyboardType="numeric"
        />
        <Button
          mode="contained"
          onPress={handleSubmit}
          style={styles.submitBtn}
        >
          Submit
        </Button>

        {recommendations && (
          <Animatable.View
            animation="fadeIn"
            duration={1500}
            style={styles.recommendationsContainer}
          >
            <Text style={styles.header}>
              Recommended Venues for {recommendations.interested_category}
            </Text>

            <View style={styles.userLocation}>
              <Text style={styles.locationHeader}>Your Location:</Text>
              <Text style={styles.locationDetails}>
                {recommendations.user_location.location}
              </Text>
              <Text style={styles.locationDetails}>
                Latitude: {recommendations.user_location.latitude}, Longitude:{" "}
                {recommendations.user_location.longitude}
              </Text>
            </View>

            <FlatList
              data={recommendations.recommended_venues}
              renderItem={renderVenueCard}
              keyExtractor={(item, index) => `${item.venue_name}-${index}`}
              contentContainerStyle={styles.listContainer}
            />
          </Animatable.View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    backgroundColor: "#f0f4f8",
    padding: 16,
  },
  container: {
    flex: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#34495e",
  },
  input: {
    width: "100%",
    padding: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: "#ffffff",
  },
  submitBtn: {
    marginBottom: 20,
    backgroundColor: "#2d98da",
  },
  recommendationsContainer: {
    marginTop: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  userLocation: {
    backgroundColor: "#dfe6e9",
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  locationHeader: {
    fontSize: 16,
    fontWeight: "600",
    color: "#34495e",
  },
  locationDetails: {
    fontSize: 14,
    color: "#636e72",
    marginTop: 4,
  },
  listContainer: {
    paddingBottom: 16,
  },
  card: {
    marginBottom: 16,
  },
  venueCard: {
    borderRadius: 12,
    elevation: 3,
    overflow: "hidden",
  },
  venueDetails: {
    fontSize: 14,
    color: "#7f8c8d",
    marginTop: 4,
  },
});

export default ArenaBookingForm;

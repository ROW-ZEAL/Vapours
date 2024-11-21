import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Linking,
  Alert,
} from "react-native";
import {
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
} from "@expo/vector-icons";

const GameDetailsScreen = ({ route }) => {
  const { game } = route.params;

  const openMap = () => {
    // Use only the location field for the search query
    const searchQuery = game.location;

    // Construct Google Maps URL
    const url = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
      searchQuery
    )}`;

    // Open the URL
    Linking.openURL(url).catch(() => {
      Alert.alert("Error", "Unable to open maps. Please try again later.");
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.category}>Category: {game.category}</Text>
      <Text style={styles.requestedBy}>Requested by: {game.name}</Text>

      {/* Image with overlay for "CONFIRMED" */}
      <View style={styles.imageContainer}>
        <Image source={{ uri: game.imageUrl }} style={styles.image} />
        <View style={styles.confirmationOverlay}>
          <Text style={styles.confirmationText}>CONFIRMED</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="home-city-outline"
            size={18}
            color="#333"
          />
          <Text style={styles.location}>{game.location}</Text>
          <TouchableOpacity style={styles.directionIcon} onPress={openMap}>
            <MaterialCommunityIcons
              name="directions"
              size={35}
              color="#007bff"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="map-marker-outline"
            size={18}
            color="red"
          />
          <Text style={styles.address}>({game.detailedLocation})</Text>
        </View>

        <View style={styles.detailsRow}>
          <FontAwesome name="star" size={14} color="#FFD700" />
          <Text style={styles.rating}> 5.0 (120 Reviews)</Text>
        </View>

        <View style={styles.detailsRow}>
          <MaterialIcons name="date-range" size={18} color="#333" />
          <Text style={styles.detailText}>{game.date}</Text>
        </View>
        <View style={styles.detailsRow}>
          <MaterialCommunityIcons
            name="clock-time-four-outline"
            size={18}
            color="#333"
          />
          <Text style={styles.detailText}>{game.time}</Text>
        </View>

        <Text style={styles.referenceText}>
          Reference Number:{" "}
          <Text style={styles.referenceNumber}>[AB12345XYZ]</Text>
        </Text>
      </View>

      <View style={styles.contactContainer}>
        <Text style={styles.contactText}>Contact Game Host:</Text>
        <Text style={styles.contactNumber}>📞 984-8867781</Text>
        <Text style={styles.contactText}>Contact Venue:</Text>
        <Text style={styles.contactNumber}>📞 984-8867781</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  category: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 4,
  },
  requestedBy: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 16,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 8,
  },
  confirmationOverlay: {
    position: "absolute",
    bottom: 8,
    alignSelf: "center",
    backgroundColor: "#5cb85c",
    paddingVertical: 4,
    paddingHorizontal: 16,
    borderRadius: 6,
  },
  confirmationText: {
    color: "#fff",
    fontWeight: "bold",
  },
  detailsContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  detailsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  location: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 4,
    flex: 1,
  },
  directionIcon: {
    marginLeft: 8,
  },
  address: {
    color: "#777",
    fontSize: 14,
    marginLeft: 4,
  },
  rating: {
    color: "#777",
    fontSize: 14,
    marginLeft: 4,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#444",
  },
  referenceText: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  referenceNumber: {
    color: "#d9534f",
  },
  contactContainer: {
    marginTop: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
  },
  contactText: {
    fontWeight: "600",
    color: "#333",
    marginBottom: 4,
  },
  contactNumber: {
    color: "#007bff",
    marginBottom: 8,
  },
});

export default GameDetailsScreen;

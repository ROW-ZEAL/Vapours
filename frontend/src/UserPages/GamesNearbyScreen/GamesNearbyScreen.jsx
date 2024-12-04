import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  Image,
} from "react-native";
import { MaterialIcons, MaterialCommunityIcons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import LoadingOverlay from "../OverlayScreen/LoadingOverlay";

// Updated gamesData with imageUrl for each game
const gamesData = [
  {
    id: "1",
    category: "Futsal",
    name: "Arjuna",
    date: "22 May 2024",
    time: "04:00 PM",
    location: "Chaitya Futsal",
    detailedLocation: "M7WR+QGV, Redcross Rd, Kathmandu 44614",
    imageUrl:
      "https://t3.ftcdn.net/jpg/03/08/26/80/360_F_308268080_8G5pOLMZqzfBw9xSqXGlZn8T08eYd6rb.jpg",
  },
  {
    id: "2",
    category: "Badminton",
    name: "Bhima",
    date: "22 May 2024",
    time: "05:00 PM",
    location: "Dhaukhel Badminton",
    detailedLocation: "Kalimati Rd 13, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/08/28/03/00/360_F_828030016_YaNSqThUZDgXeYbyPne1SMeV1tenQg0s.jpg",
  },
  {
    id: "3",
    category: "Futsal",
    name: "Krishna",
    date: "22 May 2024",
    time: "02:00 PM",
    location: "Flash Sports Academy",
    detailedLocation: "Shiva Bhakta Marg 44600, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/03/08/26/80/360_F_308268080_8G5pOLMZqzfBw9xSqXGlZn8T08eYd6rb.jpg",
  },
  {
    id: "4",
    category: "Cricket",
    name: "Rama",
    date: "23 May 2024",
    time: "09:00 AM",
    location: "Baluwatar Cricket Ground",
    detailedLocation: "P89R+93G, Baluwatar, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/05/33/87/81/360_F_533878190_2VfWcUNthgj5XOnObYPs6C14d4xHGLxm.jpg",
  },
  {
    id: "5",
    category: "Basketball",
    name: "Lakshmana",
    date: "23 May 2024",
    time: "11:00 AM",
    location: "Gyanodaya Basketball Court",
    detailedLocation: "Ganesh Marg 77, Kathmandu 44600",
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/11/20/14/360_F_311201487_fmRb1M27XNEkEpIQV6xzyYISaZrtgH7D.jpg",
  },
  {
    id: "6",
    category: "Basketball",
    name: "Hanuman",
    date: "23 May 2024",
    time: "03:00 PM",
    location: "Annapurna Volleyball Court",
    detailedLocation: "Pashupati Rd 22, Kathmandu 44600",
    imageUrl:
      "https://t4.ftcdn.net/jpg/03/11/20/14/360_F_311201487_fmRb1M27XNEkEpIQV6xzyYISaZrtgH7D.jpg",
  },
  {
    id: "7",
    category: "Cricket",
    name: "Ganesh",
    date: "23 May 2024",
    time: "01:00 PM",
    location: "Kirtipur Table Tennis Hall",
    detailedLocation: "F7H3+9M9, Kirtipur, Kathmandu 44618",
    imageUrl:
      "https://t3.ftcdn.net/jpg/05/33/87/81/360_F_533878190_2VfWcUNthgj5XOnObYPs6C14d4xHGLxm.jpg",
  },
  {
    id: "8",
    category: "Futsal",
    name: "Shiva",
    date: "24 May 2024",
    time: "10:00 AM",
    location: "Naxal Hockey Stadium",
    detailedLocation: "E8R5+XP3, Naxal, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/03/08/26/80/360_F_308268080_8G5pOLMZqzfBw9xSqXGlZn8T08eYd6rb.jpg",
  },
  {
    id: "9",
    category: "Basketball",
    name: "Durga",
    date: "24 May 2024",
    time: "12:00 PM",
    location: "Lagankhel Sports Complex",
    detailedLocation: "F6R9+8M8, Lagankhel, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/03/08/26/80/360_F_308268080_8G5pOLMZqzfBw9xSqXGlZn8T08eYd6rb.jpg",
  },
  {
    id: "10",
    category: "Cricket",
    name: "Parvati",
    date: "24 May 2024",
    time: "02:00 PM",
    location: "Satdobato Swimming Pool",
    detailedLocation: "F7P8+9C3, Satdobato, Kathmandu 44600",
    imageUrl:
      "https://t3.ftcdn.net/jpg/05/33/87/81/360_F_533878190_2VfWcUNthgj5XOnObYPs6C14d4xHGLxm.jpg",
  },
];

const GamesNearbyScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingOverlayVisible, setIsLoadingOverlayVisible] = useState(false); // Added state for loading overlay
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timer);
    }, [])
  );

  const handleJoinPress = (item) => {
    Alert.alert("Do you want to join the game?", "", [
      {
        text: "No",
        style: "cancel",
      },
      {
        text: "Yes",
        onPress: () => {
          setIsLoadingOverlayVisible(true); // Show the loading overlay
          setTimeout(() => {
            setIsLoadingOverlayVisible(false); // Hide the loading overlay
            navigation.navigate("Details", { game: item });
          }); // Simulate delay
        },
      },
    ]);
  };

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.category}>Category: {item.category}</Text>
      <Image source={{ uri: item.imageUrl }} style={styles.gameImage} />
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.requestText}>is Requesting for the game</Text>
      <View style={styles.separator} />
      <View style={styles.detailsRow}>
        <View style={styles.detailColumn}>
          <View style={styles.detail}>
            <MaterialIcons name="date-range" size={16} color="#444" />
            <Text style={styles.detailText}>{item.date}</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="clock-time-four-outline"
              size={16}
              color="#444"
            />
            <Text style={styles.detailText}>{item.time}</Text>
          </View>
          <View style={styles.detail}>
            <MaterialCommunityIcons
              name="home-city-outline"
              size={18}
              color="#333"
            />
            <Text style={styles.detailText}>{item.location}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={styles.joinButton}
          onPress={() => handleJoinPress(item)}
        >
          <Text style={styles.joinButtonText}>Join</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#d9534f" />
        <Text style={styles.loadingText}>
          Finding nearby players requesting a match...
        </Text>
      </View>
    );
  }

  return (
    <>
      {isLoadingOverlayVisible && (
        <LoadingOverlay
          visible={isLoadingOverlayVisible}
          onClose={() => setIsLoadingOverlayVisible(false)}
        />
      )}
      <FlatList
        data={gamesData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.container}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: "#555",
    textAlign: "center",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  category: {
    fontSize: 14,
    color: "#333",
    fontWeight: "600",
    marginBottom: 8,
    textAlign: "left",
  },
  gameImage: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  requestText: {
    fontSize: 14,
    color: "#d9534f",
    textAlign: "center",
    marginVertical: 8,
  },
  separator: {
    borderBottomColor: "#ddd",
    borderBottomWidth: 1,
    marginVertical: 8,
  },
  detailsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  detailColumn: {
    flex: 1,
  },
  detail: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },
  detailText: {
    marginLeft: 4,
    fontSize: 14,
    color: "#444",
  },
  joinButton: {
    backgroundColor: "#d9534f",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 20,
    alignSelf: "center",
  },
  joinButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default GamesNearbyScreen;

import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  Button,
  TouchableOpacity,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import SearchBar from "./Searchbar/SearchBar";
import styles from "./CategoryPageStyles";

const CategoryPage = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { categoryName } = route.params || {};
  const [venueList, setVenueList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchLocation, setSearchLocation] = useState("");

  useEffect(() => {
    const fetchVenueList = async () => {
      try {
        const response = await fetch(
          `http://10.0.2.2:8000/api/category/${categoryName}`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setVenueList(data.Select_category_results);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    if (categoryName) {
      fetchVenueList();
    }
  }, [categoryName]);

  const renderStars = () => (
    <View style={styles.starsContainer}>
      {[...Array(5)].map((_, index) => (
        <Text key={index} style={styles.star}>
          ★
        </Text>
      ))}
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.venueItem}>
      <Image
        source={item.photo_url ? { uri: item.photo_url } : null}
        style={styles.photo}
        resizeMode="cover"
      />
      <View style={styles.venueDetails}>
        <Text style={styles.venueName}>{item.venue_name}</Text>
        <Text style={styles.location}>Location: {item.address}</Text>
        <Text style={styles.price}>Price: ₹{item.price}/hour</Text>
        {renderStars()}
        <View style={styles.exploreButton}>
          <Button
            title="Explore"
            onPress={() => navigation.navigate("Explore")}
          />
        </View>
      </View>
    </View>
  );

  if (loading) {
    return <Text style={styles.loading}>Loading...</Text>;
  }

  if (error) {
    return <Text style={styles.error}>{error}</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Find a Futsal Near You</Text>
      </View>

      <SearchBar
        categoryName={categoryName}
        setSearchLocation={setSearchLocation}
        onFetchData={setVenueList}
      />

      <FlatList
        data={venueList}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

export default CategoryPage;

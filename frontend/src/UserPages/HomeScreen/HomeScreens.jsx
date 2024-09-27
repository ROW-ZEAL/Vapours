import React, { useState, useEffect } from "react";
import { View, Text, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import ArenaCard from "./ArenaCard";
import { styles } from "./HomeScreenStyles";
import { useNavigation } from "@react-navigation/native";
import SportCategoryCard from "./SportCategoryCard";

const HomeScreen = () => {
  const [individualSummaries, setIndividualSummaries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    if (selectedCategory) {
      fetch(`http://10.0.2.2:8000/api/category/${selectedCategory}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch data");
          }
          return response.json();
        })
        .then((data) => {
          setIndividualSummaries(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error(error);
          setError("Failed to fetch data");
          setLoading(false);
        });
    }
  }, [selectedCategory]);

  const handleCardPress = (category) => {
    const lowerCaseCategory = category.toLowerCase(); // Convert category to lowercase
    setSelectedCategory(lowerCaseCategory);
    navigation.navigate("CategoryPage", { categoryName: lowerCaseCategory });
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      <Text style={styles.title}>GamePlanR</Text>

      <View style={styles.card}>
        <Text style={styles.locationLabel}>Current Location:</Text>
        <View style={styles.locationRow}>
          <Icon name="location-sharp" size={18} color="#E63946" />
          <Text style={styles.locationText}>New Road, Kathmandu</Text>
        </View>
      </View>

      <Text style={styles.recommendationTitle}>Recommendation Arenas</Text>

      <ArenaCard
        name="Maitidevi Futsal"
        location="Maitidevi"
        distance="2.1 km away"
        price="600 NRS /hr"
        rating="4.8"
        image="https://5.imimg.com/data5/SELLER/Default/2021/5/EY/RW/SB/3103550/futsal-court-construction-500x500.jpg"
        onPress={() => console.log("Maitidevi Futsal Clicked!")}
      />

      <Text style={styles.sportCategoryTitle}>Sport Category</Text>

      <View style={styles.sportCategoryContainer}>
        <SportCategoryCard
          name="Futsal"
          image="https://www.instituteforgovernment.org.uk/sites/default/files/styles/16_9_desktop/public/2023-03/premier-league-football-1504x846px.jpg?h=dd1b06b1&itok=3dihrnpr"
          onPress={() => handleCardPress("Futsal")}
        />
        <SportCategoryCard
          name="Basketball"
          image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFf-jrr9SFEk44pFHUr1abIRfieJnFuvRvKlLWQ0zQtio78lHxZbJViXPdQ6I5KRXgQJM&usqp=CAU"
          onPress={() => handleCardPress("Basketball")}
        />
      </View>

      <View style={styles.sportCategoryContainer}>
        <SportCategoryCard
          name="Cricket"
          image="https://img.jagranjosh.com/imported/images/E/Articles/images%20(1).webp"
          onPress={() => handleCardPress("Cricket")}
        />
        <SportCategoryCard
          name="Badminton"
          image="https://english.makalukhabar.com/wp-content/uploads/2024/01/BADMINTON-MK.jpg"
          onPress={() => handleCardPress("Badminton")}
        />
      </View>
    </ScrollView>
  );
};

export default HomeScreen;

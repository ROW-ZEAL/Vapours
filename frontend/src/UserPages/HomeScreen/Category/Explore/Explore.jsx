import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Explore = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome to Explore</Text>
      {/* You can add more content here as needed */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align to the top
    alignItems: "center",
    padding: 20,
    backgroundColor: "#F7F9FC", // Light background color for contrast
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333", // Dark color for better readability
  },
});

export default Explore;

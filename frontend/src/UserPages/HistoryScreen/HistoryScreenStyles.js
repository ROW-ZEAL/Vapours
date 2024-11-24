import { StyleSheet } from "react-native";
import * as Animatable from "react-native-animatable"; // Import Animatable for animations

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8F9FA",
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  loadingText: {
    fontSize: 18,
    color: "#888",
    marginTop: 10,
    fontStyle: "italic",
  },
  errorText: {
    fontSize: 16,
    color: "#D32F2F",
    textAlign: "center",
    marginVertical: 20,
  },
  scrollView: {
    paddingBottom: 20,
  },
  bookingContainer: {
    backgroundColor: "#FFFFFF",
    padding: 20,
    marginBottom: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 5,
    transform: [{ scale: 1 }],
    // Add animation for scaling when booking appears
    animation: "fadeInUp",
    duration: 1000,
    delay: 500, // Delay for smooth sequencing
  },
  futsalName: {
    fontSize: 22,
    fontWeight: "600",
    color: "#4CAF50",
    marginBottom: 10,
  },
  bookingText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "bold",
    color: "#333",
  },
  detailsButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginTop: 20,
    alignItems: "center",
    opacity: 0.85,
    transform: [{ scale: 1 }],
    // Add hover effect animation for buttons
    animation: "pulse", // This makes the button pulse when clicked
    iterationCount: "infinite", // Button will pulse infinitely
    duration: 1000, // Duration of each pulse
  },
  detailsButtonText: {
    fontSize: 16,
    color: "#fff",
    fontWeight: "bold",
  },
});

export default styles;

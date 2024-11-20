import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  image: {
    width: "100%",
    height: 200,
  },
  contentContainer: {
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  ratingText: {
    marginLeft: 4,
    fontSize: 16,
    color: "#333",
  },
  reviewCount: {
    marginLeft: 8,
    fontSize: 14,
    color: "#666",
  },
  infoContainer: {
    marginBottom: 16,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  infoText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#333",
  },
  mapsLinkContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  mapsLinkText: {
    marginLeft: 8,
    fontSize: 16,
    color: "#f44336",
    textDecorationLine: "underline",
  },
  sectionContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  dateInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  dateInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  calendarIcon: {
    marginLeft: 8,
  },
  slotsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
  },
  slot: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginRight: 8,
    marginBottom: 8,
  },
  slotText: {
    fontSize: 16,
    color: "#fff",
    textAlign: "center",
  },
  submitButton: {
    marginTop: 20,
    paddingVertical: 12,
    backgroundColor: "#1F41BB",
    borderRadius: 8,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
    justifyContent: "center",
    alignItems: "center",
  },

  // Modal Box: Centered box with rounded corners
  modalBox: {
    width: "90%", // Adjust width as needed
    backgroundColor: "#fff", // Solid white background
    borderRadius: 15,
    padding: 20,
    elevation: 5, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },

  // Modal Title: Futsal Name
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },

  // Booking Details Section
  modalDetails: {
    marginBottom: 20,
  },
  modalDetail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 10,
    textAlign: "center",
  },
  boldText: {
    fontWeight: "bold",
    color: "#000",
  },

  // Button Container: Flex row for buttons
  modalButtonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  // Buttons: Common styling for buttons
  modalButton: {
    flex: 1,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center",
    marginHorizontal: 5,
  },
  payNowButton: {
    backgroundColor: "#4CAF50", // Green for Pay Now
  },
  payArrivalButton: {
    backgroundColor: "#FF9800", // Orange for Pay on Arrival
  },
  modalButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;

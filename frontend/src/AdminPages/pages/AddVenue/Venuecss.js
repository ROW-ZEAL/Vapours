import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  scrollContainer: {
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#333",
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    fontSize: 14,
    marginBottom: 10,
    elevation: 1,
  },
  addPhoto: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#e6e6e6",
    borderRadius: 8,
    padding: 20,
    borderWidth: 1,
    borderColor: "#ccc",
    marginBottom: 10,
  },
  addPhotoText: {
    fontSize: 14,
    color: "#777",
    marginTop: 10,
    textAlign: "center",
  },
  photoContainer: {
    marginRight: 10,
  },
  photo: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginBottom: 5,
  },
  photoPath: {
    fontSize: 12,
    color: "#888",
    textAlign: "center",
  },
  availabilityContainer: {
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#e8f0fe",
    padding: 12,
    borderRadius: 8,
    borderColor: "#3b82f6",
    borderWidth: 1,
    flex: 1,
  },
  dateTimeText: {
    fontSize: 14,
    color: "#333",
    marginLeft: 10,
  },
  facilitiesContainer: {
    marginBottom: 20,
  },
  facilitiesContainer: {
    marginBottom: 20,
  },
  facilitiesWrapper: {
    maxHeight: 150, // Set a fixed height for the scrollable area
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 10,
    elevation: 2,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  facilitiesScroll: {
    flexGrow: 1, // Allows content to grow within the fixed height
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxLabel: {
    marginLeft: 10,
    fontSize: 14,
    color: "#444",
  },

  submitButton: {
    backgroundColor: "#3b82f6",
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 4,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

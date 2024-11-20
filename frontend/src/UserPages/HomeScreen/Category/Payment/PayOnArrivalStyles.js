// PayOnArrivalStyles.js
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align items at the start to avoid pushing everything to the center
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },
  scrollView: {
    flex: 1, // Ensure the scroll view takes full height
  },
  scrollContainer: {
    paddingBottom: 20, // Add some bottom padding so that the content isn't cut off
  },
  card: {
    width: "90%",
    backgroundColor: "#ffffff",
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    alignItems: "center",
  },
  heading: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 10,
  },
  table: {
    width: "100%",
    marginVertical: 10,
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  tableHeader: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  tableData: {
    fontSize: 16,
    color: "#555",
  },
  button: {
    marginTop: 20,
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default styles;

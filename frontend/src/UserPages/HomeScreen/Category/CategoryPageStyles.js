import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
  },
  header: {
    backgroundColor: "#2196F3",
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  backButton: {
    paddingRight: 10,
  },
  headerTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  venueItem: {
    flexDirection: "row",
    padding: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginRight: 15,
  },
  venueDetails: {
    flex: 1,
    justifyContent: "space-between",
  },
  venueName: {
    fontSize: 18,
    fontWeight: "bold",
  },
  location: {
    fontSize: 14,
    color: "#666",
  },
  price: {
    fontSize: 14,
    color: "#333",
    marginTop: 5,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  star: {
    fontSize: 18,
    color: "#FFD700",
    marginRight: 2,
  },
  exploreButton: {
    marginTop: 10,
    width: "60%",
    alignSelf: "flex-start",
  },
  loading: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
  },
  error: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 18,
    color: "red",
  },
});

export default styles;

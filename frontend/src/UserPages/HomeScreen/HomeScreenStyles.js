import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
  },
  contentContainer: {
    paddingHorizontal: 15,
    paddingVertical: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 20,
  },
  card: {
    backgroundColor: "#F1FAEE",
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  locationLabel: {
    fontSize: 14,
    color: "#6F6F6F",
    fontWeight: "600",
    marginBottom: 5,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#000",
    marginLeft: 5,
  },
  recommendationTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D3557",
    marginBottom: 10,
  },
  sportCategoryTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#1D3557",
    marginVertical: 15,
  },
  sportCategoryContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
});

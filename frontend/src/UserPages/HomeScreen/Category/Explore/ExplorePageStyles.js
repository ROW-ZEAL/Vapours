import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: 20,
    paddingHorizontal: 16,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 16,
    borderColor: "#ddd",
    borderWidth: 1,
  },
  detailsContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    elevation: 5, // adds shadow for elevation effect
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  name: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#2c3e50",
    marginBottom: 8,
    letterSpacing: 1,
  },
  info: {
    fontSize: 16,
    color: "#34495e",
    marginBottom: 8,
    fontFamily: "Roboto", // Use a clean, modern font
  },
  mapButton: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    backgroundColor: "#3498db",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginBottom: 16,
    shadowColor: "#3498db",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
  },
  mapIcon: {
    fontSize: 18,
    color: "#fff",
    marginRight: 8,
  },
  mapButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  button: {
    backgroundColor: "#27ae60",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 16,
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3, // Adds shadow for a floating effect
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
  slotTableContainer: {
    marginBottom: 24,
  },
  slotTable: {
    backgroundColor: "#fff",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 12,
    elevation: 3,
    shadowColor: "#ddd",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
  },
  slotTableHeader: {
    flexDirection: "row",
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  slotTableHeaderText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  slotTableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    justifyContent: "space-between",
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  slotTableText: {
    fontSize: 16,
    color: "#2c3e50",
  },
  submitButton: {
    backgroundColor: "#e74c3c",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginBottom: 16,
    shadowColor: "#e74c3c",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textTransform: "uppercase",
  },
  findOpponentButton: {
    backgroundColor: "#3498db",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 24,
    borderRadius: 12,
    width: "80%",
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#2c3e50",
  },
  modalButton: {
    backgroundColor: "#27ae60",
    paddingVertical: 12,
    width: "100%",
    borderRadius: 10,
    marginBottom: 16,
    alignItems: "center",
    elevation: 3,
    shadowColor: "#27ae60",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  modalButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default styles;

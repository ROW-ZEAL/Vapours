import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  contentContainer: {
    flex: 1,
    padding: 20,
    paddingBottom: 80,
  },
  scrollContainer: {
    flexGrow: 1,
  },
  addPhoto: {
    alignItems: "center",
    marginVertical: 20,
  },
  addPhotoText: {
    fontSize: 18,
    textAlign: "center",
  },
  photo: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
    borderRadius: 5,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  availabilityContainer: {
    marginBottom: 20,
  },
  dateTimeContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  dateTimeButton: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
  dateTimeText: {
    marginLeft: 10,
    fontSize: 16,
  },
  facilitiesContainer: {
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  facilitiesScroll: {
    marginTop: 10,
  },
  facilityItem: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#000",
  },
  radioButtonContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  radioLabel: {
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: "#000",
    padding: 15,
    alignItems: "center",
    borderRadius: 5,
  },
  submitButtonText: {
    color: "#fff",
    fontSize: 18,
  },
  fixedTaskBar: {
    height: 60, // Fixed height for taskbar space
  },
});

import { StyleSheet, View, Text } from "react-native";

// Combined styles
const styles = StyleSheet.create({
  // Existing styles
  labelText: {
    marginBottom: 5,
    marginLeft: 10,
    fontSize: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginBottom: 40,
  },
  inputField: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
    marginBottom: 5,
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    color: "#495057",
  },
  loginButton: {
    backgroundColor: "#1F41BB",
    paddingVertical: 15,
    borderRadius: 30,
    marginTop: 30,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  inputGroup: {
    marginBottom: 20,
  },
  labelText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    paddingHorizontal: 10,
    height: 40,
    fontSize: 16,
    backgroundColor: "#f9f9f9",
  },
  inputBox: {
    marginBottom: 10,
  },
  dropdownButton: {
    justifyContent: "center",
    backgroundColor: "#f9f9f9",
  },
  dropdown: {
    position: "absolute",
    top: 45,
    left: 0,
    right: 0,
    backgroundColor: "white",
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    zIndex: 10,
    maxHeight: 150,
    overflow: "hidden",
  },
  dropdownItem: {
    padding: 10,
    fontSize: 16,
    color: "#333",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    marginVertical: 20,
  },

  input: {
    height: 40,
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 15,
    fontSize: 15,
  },
  inputWithLabel: {
    marginBottom: 10,
    marginTop: 5,
  },
  // New styles from localStyles
  iconContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 20,
  },
  iconButton: {
    padding: 10,
  },
  userInfo: {
    marginBottom: 20,
    alignItems: "center",
  },
  userName: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 16,
    color: "gray",
  },
  accountsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F0EDED",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text: {
    fontSize: 34,
    fontWeight: "bold",
    marginTop: 10,
    textAlign: "center",
    color: "#333",
  },
  icon: {
    marginBottom: 10,
    // Additional styles for icons can be added here if needed
  },
});

// Toast configuration styles
const toastConfig = {
  warning: ({ text1, props }) => (
    <View
      style={{
        height: 30,
        width: "100%",
        backgroundColor: "orange",
        padding: 4,
      }}
    >
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
  done: ({ text1, props }) => (
    <View
      style={{
        height: 30,
        width: "100%",
        backgroundColor: "#1affc6",
        padding: 4,
      }}
    >
      <Text>{text1}</Text>
      <Text>{props.uuid}</Text>
    </View>
  ),
};

export { styles, toastConfig };

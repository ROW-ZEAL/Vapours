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

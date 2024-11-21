import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";

const EditProfile = ({ navigation }) => {
  const userData = useSelector((state) => state.user);
  const [names, setNames] = useState(userData.name || "");
  const [email, setEmail] = useState(userData.email || "");
  const [phone, setPhone] = useState(userData.phone_number || "");

  const handleSave = async () => {
    const apiUrl = `http://10.0.2.2:8000/api/edit/${userData.name}/${names}/${email}/${phone}/`;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      navigation.goBack();
    } catch (error) {
      console.error("Error updating profile:", error);
      navigation.goBack();
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <View style={styles.inputGroup}>
        <Icon
          name="person-outline"
          size={20}
          color="#555"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          value={names}
          onChangeText={(text) => setNames(text)}
          placeholder="Enter your name"
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="mail-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={(text) => setEmail(text)}
          placeholder="Enter your email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.inputGroup}>
        <Icon name="call-outline" size={20} color="#555" style={styles.icon} />
        <TextInput
          style={styles.input}
          value={phone}
          onChangeText={(text) => setPhone(text)}
          placeholder="Enter your phone number"
          keyboardType="phone-pad"
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  inputGroup: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 10,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#007BFF",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  saveButtonText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
  },
});

export default EditProfile;

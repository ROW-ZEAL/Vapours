import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  TextInput,
  TouchableWithoutFeedback,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import Toast from "react-native-toast-message";
import Checkbox from "expo-checkbox";
import { styles, toastConfig } from "../../../style";
import { useRegisterUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/AsyncStorageService";

const RegistrationScreen = () => {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [tc, setTc] = useState(false);
  const [phone_number, setPhone_number] = useState("");
  const [gender, setGender] = useState("");
  const [showGenderDropdown, setShowGenderDropdown] = useState(false);
  const [interested_categories, setInterested_categories] = useState("");
  const [showCategoryDropDown, setShowCategoryDropDown] = useState(false);

  const clearTextInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setTc(false);
    setPhone_number("");
    setGender("");
    setInterested_categories("");
  };

  const [registerUser] = useRegisterUserMutation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/; // Adjust the regex as needed for your phone number format
    return phoneRegex.test(phone);
  };

  const validatePassword = (password) => {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);
    return hasUpperCase && hasNumber && hasSpecialChar;
  };

  const handleFormSubmit = async () => {
    if (!validateEmail(email)) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "Invalid email address.",
      });
      return;
    }

    if (!validatePhone(phone_number)) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "Phone number must be 10 digits.",
      });
      return;
    }

    if (!validatePassword(password)) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1:
          "Password must contain at least one uppercase letter, one number, and one special character.",
      });
      return;
    }

    if (password !== password2) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "Passwords do not match.",
      });
      return;
    }

    const formData = {
      name,
      email,
      password,
      password2,
      tc,
      phone_number,
      gender,
      interested_categories,
    };

    const res = await registerUser(formData);
    if (res.data) {
      await storeToken(res.data.token);
      clearTextInput();
      navigation.navigate("UserLogin");
    }
    if (res.error) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1:
          Object.values(res.error.data.errors).flat()[0] ||
          "Registration failed", // First error message or default message
      });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#1F41BB",
              marginTop: 10,
            }}
          >
            Register Here
          </Text>
          <Text style={{ fontSize: 16, color: "#6c757d", marginTop: 5 }}>
            Access your dashboard to plan your games!
          </Text>
        </View>

        <View>
          <Text style={styles.labelText}>Name</Text>
          <TextInput
            style={styles.input}
            value={name}
            onChangeText={setName}
            placeholder="Write Your Name"
          />
        </View>

        <View>
          <Text style={styles.labelText}>Email</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Write Your Email"
            keyboardType="email-address"
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Password</Text>
          <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Write Your Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Confirm Password</Text>
          <TextInput
            style={styles.input}
            value={password2}
            onChangeText={setPassword2}
            placeholder="Write Your Confirm Password"
            secureTextEntry={true}
          />
        </View>

        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Phone Number</Text>
          <TextInput
            style={styles.input}
            value={phone_number}
            onChangeText={
              (text) => setPhone_number(text.replace(/[^0-9]/g, "")) // Allow only numbers
            }
            placeholder="Phone Number"
            keyboardType="numeric"
          />
        </View>

        {/* Gender Input */}
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Gender</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setShowGenderDropdown(!showGenderDropdown)}
          >
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={gender}
              placeholder="Select Gender"
              editable={false}
            />
          </TouchableOpacity>

          {showGenderDropdown && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                maxHeight: 150,
                overflow: "hidden",
                position: "absolute",
                backgroundColor: "white",
                zIndex: 1,
              }}
            >
              {["male", "female", "other"].map((option) => (
                <TouchableOpacity
                  key={option}
                  onPress={() => {
                    setGender(option);
                    setShowGenderDropdown(false);
                  }}
                >
                  <Text style={{ padding: 10 }}>
                    {option.charAt(0).toUpperCase() + option.slice(1)}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </View>

        {/* Interested Categories */}
        <View style={styles.inputWithLabel}>
          <Text style={styles.labelText}>Interested Categories</Text>
          <TouchableOpacity
            style={{ flexDirection: "row", alignItems: "center" }}
            onPress={() => setShowCategoryDropDown(!showCategoryDropDown)}
          >
            <TextInput
              style={[styles.input, { flex: 1 }]}
              value={interested_categories} // Fix: changed from gender to interested_categories
              placeholder="Select Categories"
              editable={false}
            />
          </TouchableOpacity>

          {showCategoryDropDown && (
            <View
              style={{
                borderWidth: 1,
                borderColor: "gray",
                borderRadius: 5,
                maxHeight: 150,
                overflow: "hidden",
                position: "absolute",
                backgroundColor: "white",
                zIndex: 1,
              }}
            >
              {["Futsal", "Basketball", "Cricket", "Badminton"].map(
                (category) => (
                  <TouchableOpacity
                    key={category}
                    onPress={() => {
                      setInterested_categories(category);
                      setShowCategoryDropDown(false);
                    }}
                  >
                    <Text style={{ padding: 10 }}>{category}</Text>
                  </TouchableOpacity>
                )
              )}
            </View>
          )}
        </View>

        {/* Terms and Conditions Checkbox */}
        <View
          style={{
            flex: 1,
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Checkbox
            value={tc}
            onValueChange={setTc}
            color={tc ? "#4630EB" : undefined}
          />
          <Text style={styles.labelText}>
            I agree to the terms and conditions.
          </Text>
        </View>

        {/* Register Button */}
        <View style={styles.buttonContainer}>
          <Button title="Register" onPress={handleFormSubmit} color="#1F41BB" />
        </View>
        <View style={{ alignItems: "flex-end" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("UserLogin");
            }}
          >
            <Text style={{ fontWeight: "bold" }}>
              Already Registered ? Login
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

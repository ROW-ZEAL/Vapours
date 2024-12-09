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
import { styles, toastConfig } from "../../style";
import { useRegisterUserMutation } from "../services/userAuthApi";
import { storeToken } from "../services/AsyncStorageService";

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

  const clearTextInput = () => {
    setName("");
    setEmail("");
    setPassword("");
    setPassword2("");
    setTc(false);
    setPhone_number("");
    setGender("");
  };

  const [registerUser] = useRegisterUserMutation();

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{10}$/;
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
    };

    const res = await registerUser(formData);
    if (res.data) {
      await storeToken(res.data.token);
      clearTextInput();
      navigation.navigate("AdminLogin");
    }
    if (res.error) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1:
          Object.values(res.error.data.errors).flat()[0] ||
          "Registration failed",
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#f4f4f9", padding: 20 }}>
      <Toast config={toastConfig} />
      <ScrollView contentContainerStyle={{ paddingBottom: 30 }}>
        {/* Header Section */}
        <View style={{ alignItems: "center", marginBottom: 20 }}>
          <Text style={{ fontSize: 32, fontWeight: "bold", color: "#1F41BB" }}>
            Venue Admin Register
          </Text>
          <Text style={{ fontSize: 16, color: "#6c757d", marginTop: 5 }}>
            Access your dashboard to plan your games!
          </Text>
        </View>

        {/* Form Section */}
        <View
          style={{
            backgroundColor: "#fff",
            borderRadius: 15,
            padding: 20,
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.1,
            shadowRadius: 4,
            elevation: 3,
          }}
        >
          {/* Name Input */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Name</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
              }}
              value={name}
              onChangeText={setName}
              placeholder="Write Your Name"
            />
          </View>

          {/* Email Input */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Email</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
              }}
              value={email}
              onChangeText={setEmail}
              placeholder="Write Your Email"
              keyboardType="email-address"
            />
          </View>

          {/* Password Input */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Password</Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
              }}
              value={password}
              onChangeText={setPassword}
              placeholder="Write Your Password"
              secureTextEntry={true}
            />
          </View>

          {/* Confirm Password */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>
              Confirm Password
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
              }}
              value={password2}
              onChangeText={setPassword2}
              placeholder="Write Your Confirm Password"
              secureTextEntry={true}
            />
          </View>

          {/* Phone Number */}
          <View style={{ marginBottom: 15 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>
              Phone Number
            </Text>
            <TextInput
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
              }}
              value={phone_number}
              onChangeText={(text) =>
                setPhone_number(text.replace(/[^0-9]/g, ""))
              }
              placeholder="Phone Number"
              keyboardType="numeric"
            />
          </View>

          {/* Gender Dropdown */}
          <View style={{ marginBottom: 20 }}>
            <Text style={{ fontWeight: "600", marginBottom: 5 }}>Gender</Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: "#ddd",
                borderRadius: 10,
                paddingHorizontal: 15,
                paddingVertical: 10,
                backgroundColor: "#f9f9f9",
                flexDirection: "row",
                alignItems: "center",
              }}
              onPress={() => setShowGenderDropdown(!showGenderDropdown)}
            >
              <Text style={{ flex: 1, color: gender ? "#000" : "#6c757d" }}>
                {gender || "Select Gender"}
              </Text>
            </TouchableOpacity>
            {showGenderDropdown && (
              <View
                style={{
                  borderWidth: 1,
                  borderColor: "#ddd",
                  borderRadius: 10,
                  backgroundColor: "#fff",
                  marginTop: 5,
                }}
              >
                {["male", "female", "other"].map((option) => (
                  <TouchableOpacity
                    key={option}
                    onPress={() => {
                      setGender(option);
                      setShowGenderDropdown(false);
                    }}
                    style={{ padding: 10 }}
                  >
                    <Text>
                      {option.charAt(0).toUpperCase() + option.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

          {/* Checkbox */}
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 20,
            }}
          >
            <Checkbox
              value={tc}
              onValueChange={setTc}
              color={tc ? "#1F41BB" : undefined}
            />
            <Text style={{ marginLeft: 10, color: "#6c757d" }}>
              I agree to the terms and conditions.
            </Text>
          </View>

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleFormSubmit}
            style={{
              backgroundColor: "#1F41BB",
              paddingVertical: 15,
              borderRadius: 10,
              alignItems: "center",
            }}
          >
            <Text style={{ color: "#fff", fontWeight: "600", fontSize: 16 }}>
              Register
            </Text>
          </TouchableOpacity>
        </View>

        {/* Already Registered */}
        <View style={{ marginTop: 20, alignItems: "center" }}>
          <TouchableWithoutFeedback
            onPress={() => {
              navigation.navigate("AdminLogin");
            }}
          >
            <Text style={{ fontWeight: "bold", color: "#1F41BB" }}>
              Already Registered? Login
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegistrationScreen;

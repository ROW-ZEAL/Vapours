import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles, toastConfig } from "../../style";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../services/userAuthApi";
import { storeToken } from "../services/AsyncStorageService";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

const AdminLoginScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const clearTextInput = () => {
    setEmail("");
    setPassword("");
  };

  const [loginUser] = useLoginUserMutation();

  const handleFormSubmit = async () => {
    const formData = { email, password };
    const res = await loginUser(formData);

    if (res.data) {
      console.log("Response Data", res.data);

      const { token, isAdmin } = res.data;

      await storeToken(token);

      if (isAdmin) {
        navigation.navigate("AdminTaskbar");
      } else {
        Toast.show({
          type: "error",
          position: "top",
          topOffset: 0,
          text1: "Access Denied",
          text2: "You are not an admin.",
        });
      }

      clearTextInput();
    } else if (res.error) {
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        ...(res.error.data.errors.email
          ? { text1: res.error.data.errors.email[0] }
          : ""),
        ...(res.error.data.errors.password
          ? { text1: res.error.data.errors.password[0] }
          : ""),
        ...(res.error.data.errors.non_field_errors
          ? { text1: res.error.data.errors.non_field_errors[0] }
          : ""),
      });
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <Toast config={toastConfig} />
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
          paddingHorizontal: 20,
          paddingVertical: 30,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Logo Section */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <Image
            source={require("../../assets/logo-design.png")}
            style={{ width: 100, height: 100, resizeMode: "contain" }}
          />
          <Text
            style={{
              fontSize: 24,
              fontWeight: "bold",
              color: "#1F41BB",
              marginTop: 20,
            }}
          >
            Admin Login
          </Text>
          <Text
            style={{
              fontSize: 16,
              color: "#6c757d",
              textAlign: "center",
              marginTop: 10,
            }}
          >
            Manage venues, bookings, and analytics efficiently.
          </Text>
        </View>

        {/* Email Input */}
        <View style={{ marginBottom: 20 }}>
          <Text style={{ color: "#495057", marginBottom: 5 }}>Email</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 12,
            }}
          >
            <MaterialIcon
              name="email"
              size={20}
              color="#6c757d"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1, color: "#495057" }}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter Your Email"
              keyboardType="email-address"
              placeholderTextColor="#adb5bd"
            />
          </View>
        </View>

        {/* Password Input */}
        <View style={{ marginBottom: 30 }}>
          <Text style={{ color: "#495057", marginBottom: 5 }}>Password</Text>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#f8f9fa",
              borderRadius: 8,
              paddingHorizontal: 10,
              paddingVertical: 12,
            }}
          >
            <MaterialIcon
              name="lock"
              size={20}
              color="#6c757d"
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={{ flex: 1, color: "#495057" }}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter Your Password"
              secureTextEntry={true}
              placeholderTextColor="#adb5bd"
            />
          </View>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#1F41BB",
            paddingVertical: 15,
            borderRadius: 8,
            alignItems: "center",
            marginBottom: 20,
          }}
          onPress={handleFormSubmit}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
            Login
          </Text>
        </TouchableOpacity>

        {/* Signup Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AdminRegister")}
          style={{ alignItems: "center", marginBottom: 10 }}
        >
          <Text style={{ color: "#1F41BB", fontWeight: "600" }}>
            Don’t have an account? Sign up here!
          </Text>
        </TouchableOpacity>

        {/* User Login Link */}
        <TouchableOpacity
          onPress={() => navigation.navigate("UserLogin")}
          style={{ alignItems: "center" }}
        >
          <Text style={{ color: "#6c757d", fontWeight: "600" }}>
            Are you a user? Login here.
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AdminLoginScreen;

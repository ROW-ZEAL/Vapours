import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../../services/userAuthApi";
import { storeToken } from "../../services/AsyncStorageService";

const UserLoginScreen = () => {
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
      await storeToken(res.data.token); // Store Token in Storage
      clearTextInput();
      navigation.navigate("Taskbar");
    }
    if (res.error) {
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
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Toast config={toastConfig} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1 }}
      >
        <View style={{ alignItems: "center", marginTop: 50 }}>
          <Image
            source={require("../../../assets/logo-design.png")}
            style={{ width: 100, height: 100, marginBottom: 20 }}
          />
          <Text style={{ fontSize: 24, fontWeight: "bold", color: "#1F41BB" }}>
            Welcome Back!
          </Text>
          <Text style={{ fontSize: 14, color: "#6c757d", marginTop: 5 }}>
            Access your account to plan your games
          </Text>
        </View>

        <View style={{ marginHorizontal: 20, marginTop: 30 }}>
          {/* Email Input */}
          <Text
            style={{ marginBottom: 10, color: "#495057", fontWeight: "500" }}
          >
            Email
          </Text>
          <View style={styles.inputField}>
            <MaterialIcon name="email" size={20} color="#6c757d" />
            <TextInput
              style={styles.textInput}
              value={email}
              onChangeText={setEmail}
              placeholder="Enter your email"
              keyboardType="email-address"
              placeholderTextColor="#adb5bd"
            />
          </View>

          {/* Password Input */}
          <Text
            style={{
              marginBottom: 10,
              marginTop: 20,
              color: "#495057",
              fontWeight: "500",
            }}
          >
            Password
          </Text>
          <View style={styles.inputField}>
            <MaterialIcon name="lock" size={20} color="#6c757d" />
            <TextInput
              style={styles.textInput}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              secureTextEntry={true}
              placeholderTextColor="#adb5bd"
            />
          </View>

          {/* Forgot Password */}
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SendPasswordResetEmail")}
          >
            <Text
              style={{
                textAlign: "right",
                marginTop: 10,
                color: "#1F41BB",
                fontWeight: "500",
              }}
            >
              Forgot Password?
            </Text>
          </TouchableWithoutFeedback>

          {/* Login Button */}
          <TouchableOpacity
            style={styles.loginButton}
            onPress={handleFormSubmit}
          >
            <Text style={{ color: "#fff", fontSize: 18, fontWeight: "bold" }}>
              Login
            </Text>
          </TouchableOpacity>

          {/* Register and Admin Login Links */}
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
            }}
          >
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("Registration")}
            >
              <Text style={{ color: "#495057", fontWeight: "500" }}>
                New User? Register
              </Text>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback
              onPress={() => navigation.navigate("AdminLogin")}
            >
              <Text style={{ color: "#495057", fontWeight: "500" }}>
                Are you an Admin? Login here
              </Text>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

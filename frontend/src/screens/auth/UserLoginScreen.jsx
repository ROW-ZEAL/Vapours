import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
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
    <SafeAreaView
      style={{
        flex: 1,
        justifyContent: "center",
        padding: 20,
        backgroundColor: "#f4f4f9",
      }}
    >
      <Toast config={toastConfig} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Title with Icon */}
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <MaterialIcon name="login" size={80} color="#1F41BB" />
          <Text
            style={{
              fontSize: 32,
              fontWeight: "bold",
              color: "#1F41BB",
              marginTop: 10,
            }}
          >
            GamePlanR
          </Text>
          <Text style={{ fontSize: 16, color: "#6c757d", marginTop: 5 }}>
            Access your dashboard to plan your games!
          </Text>
        </View>

        {/* Email Input */}
        <View style={styles.inputWithLabel}>
          <Text style={[styles.labelText, { color: "#495057" }]}>Email</Text>
          <View
            style={[
              styles.input,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
              },
            ]}
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
        <View style={[styles.inputWithLabel, { marginTop: 20 }]}>
          <Text style={[styles.labelText, { color: "#495057" }]}>Password</Text>
          <View
            style={[
              styles.input,
              {
                flexDirection: "row",
                alignItems: "center",
                backgroundColor: "#f8f9fa",
              },
            ]}
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

        {/* Forgot Password and Register Links */}
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 15,
          }}
        >
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("SendPasswordResetEmail")}
          >
            <Text style={{ color: "#6c757d", fontWeight: "500" }}>
              Forgot Password?
            </Text>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("Registration")}
          >
            <Text style={{ color: "#6c757d", fontWeight: "500" }}>
              New User? Register
            </Text>
          </TouchableWithoutFeedback>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          style={{
            backgroundColor: "#1F41BB",
            paddingVertical: 15,
            borderRadius: 30,
            marginTop: 30,
            alignItems: "center",
          }}
          onPress={handleFormSubmit}
        >
          <Text style={{ color: "#fff", fontSize: 18, fontWeight: "600" }}>
            Login
          </Text>
        </TouchableOpacity>

        {/* Admin Registration Link */}
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("AdminRegister")}
          >
            <Text style={{ color: "#495057", fontWeight: "bold" }}>
              Are you an Admin? Register here
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

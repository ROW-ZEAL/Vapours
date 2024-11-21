import {
  View,
  Text,
  TextInput,
  Button,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
} from "react-native";
import React, { useState } from "react";
import { styles, toastConfig } from "../../style";
import Toast from "react-native-toast-message";
import { useNavigation } from "@react-navigation/native";
import { useLoginUserMutation } from "../services/userAuthApi";
import { storeToken } from "../services/AsyncStorageService";
import MaterialIcon from "react-native-vector-icons/MaterialIcons";

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

        // Optionally, navigate to a different screen for non-admin users
        // navigation.navigate("UserHome");
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
        <View style={{ alignItems: "center", marginBottom: 30 }}>
          <View style={{ alignItems: "center", marginBottom: 30 }}>
            <Image
              source={require("../../assets/logo-design.png")}
              style={styles.logo}
            />
            <Text style={{ fontSize: 16, color: "#6c757d", marginTop: 5 }}>
              Access your dashboard to plan your games!
            </Text>
          </View>
        </View>

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
        <View style={{ marginTop: 30, alignItems: "center" }}>
          <TouchableWithoutFeedback
            onPress={() => navigation.navigate("UserLogin")}
          >
            <Text style={{ color: "#495057", fontWeight: "bold" }}>
              Are you an User? Login here
            </Text>
          </TouchableWithoutFeedback>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default UserLoginScreen;

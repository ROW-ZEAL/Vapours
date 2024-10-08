import { View, Text, Button, TextInput, ScrollView } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { styles, toastConfig } from "../../../style";
import Toast from "react-native-toast-message";

const ChangePasswordScreen = () => {
  const [password, setPassword] = useState("");
  const [password_confirmation, setPassword_confirmation] = useState("");

  const clearTextInput = () => {
    setPassword("");
    setPassword_confirmation("");
  };

  const handleFormSubmit = () => {
    if (password && password_confirmation) {
      if (password === password_confirmation) {
        console.log("Password Changed Successfully");
        const formdata = { password, password_confirmation };
        console.log(formdata);
        clearTextInput();
        Toast.show({
          type: "done",
          position: "top",
          topOffset: 0,
          text1: "Password Changed Successfully",
        });
      } else {
        console.log("New Password and Confirm New Password doesn't match");
        Toast.show({
          type: "warning",
          position: "top",
          topOffset: 0,
          text1: "New Password and Confirm New Password doesn't match",
        });
      }
    } else {
      console.log("All Fields are Required");
      Toast.show({
        type: "warning",
        position: "top",
        topOffset: 0,
        text1: "All Fields are Required",
      });
    }
  };
  return (
    <SafeAreaView>
      <Toast config={toastConfig} />
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={{ marginHorizontal: 30 }}>
          <View style={[styles.inputWithLabel, { marginBottom: 15 }]}>
            <Text style={styles.labelText}>New Password</Text>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Write Your New Password"
              secureTextEntry={true}
              onPress={console.log(password)}
            />
          </View>
          <View style={styles.inputWithLabel}>
            <Text style={styles.labelText}>Confirm New Password</Text>
            <TextInput
              style={styles.input}
              value={password_confirmation}
              onChangeText={setPassword_confirmation}
              placeholder="Write Your New Confirm Password"
              secureTextEntry={true}
              onPress={console.log(password_confirmation)}
            />
          </View>
          <View style={{ width: 200, alignSelf: "center", margin: 20 }}>
            <Button title="Save" onPress={handleFormSubmit} color="#1F41BB" />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ChangePasswordScreen;

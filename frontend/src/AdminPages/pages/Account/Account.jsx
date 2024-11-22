import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { getToken, removeToken } from "../../../services/AsyncStorageService";
import { setUserAccessToken } from "../../../features/authSlice";
import { setUserInfo } from "../../../features/userSlice";
import { useGetLoggedUserQuery } from "../../../services/userAuthApi";

const Accounts = () => {
  const [token, setToken] = useState({});
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const storedToken = await getToken();
      if (storedToken) {
        const { access, refresh } = JSON.parse(storedToken);
        setToken({ access, refresh });
        dispatch(setUserAccessToken({ access_token: access }));
      }
    })();
  }, []);

  const { data, isSuccess } = useGetLoggedUserQuery(token.access);
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        setUserInfo({
          email: data.email,
          name: data.name,
          phone_number: data.phone_number,
        })
      );
    }
  }, [isSuccess]);

  const handleLogout = async () => {
    await removeToken();
    navigation.navigate("UserLogin");
  };

  const handleChangePassword = () => {
    navigation.navigate("ChangePasswordScreen");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.profileCard}>
        <Image
          source={{
            uri: "http://m.gettywallpapers.com/wp-content/uploads/2022/06/Cool-Kakashi-Wallpaper-HD-1-scaled.jpg",
          }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userData.name || "John Doe"}</Text>
        <Text style={styles.profileEmail}>
          {userData.email || "johndoe@example.com"}
        </Text>
        <Text style={styles.profilePhone}>
          {userData.phone_number || "+123 456 7890"}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account Actions</Text>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={() => navigation.navigate("Editprofile")}
        >
          <Icon name="create-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.actionItem}
          onPress={handleChangePassword}
        >
          <Icon name="key-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>Change Password</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem} onPress={handleLogout}>
          <Icon name="log-out-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="settings-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>App Settings</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="help-circle-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>FAQs</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.actionItem}>
          <Icon name="chatbox-outline" size={24} color="#007BFF" />
          <Text style={styles.actionText}>Contact Support</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: "#F9FAFB",
  },
  profileCard: {
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
    marginBottom: 30,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  profileName: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
    marginBottom: 5,
  },
  profilePhone: {
    fontSize: 16,
    color: "#555",
  },
  section: {
    marginBottom: 20,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  actionItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },
  actionText: {
    fontSize: 16,
    color: "#007BFF",
    marginLeft: 15,
  },
});

export default Accounts;

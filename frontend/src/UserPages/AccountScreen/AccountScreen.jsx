import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { styles } from "../../../style";
import { removeToken } from "../../services/AsyncStorageService";
import { getToken } from "../../services/AsyncStorageService";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";
import { setUserInfo } from "../../features/userSlice";
import { setUserAccessToken } from "../../features/authSlice";

const Accounts = (props) => {
  const [token, setToken] = useState({});
  const myData = useSelector((state) => state.user);
  // const myAccessToken = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const { navigation } = props;

  useEffect(() => {
    (async () => {
      const token = await getToken();
      // console.log(token);
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setToken({
          access: access,
          refresh: refresh,
        });
        // console.log("user access token:", access);
        dispatch(setUserAccessToken({ access_token: access }));
      }
    })();
  }, []);

  const handleChangePasswordPress = () => {
    console.log("Change Password icon clicked");
    // You can navigate to a change password screen if you have one
    navigation.navigate("ChangePassword");
  };

  const handleLogout = async () => {
    await removeToken();
    // Navigate to the UserLogin screen
    navigation.navigate("UserLogin");
    console.log("Logout");
  };

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
  });

  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <TouchableOpacity
          onPress={handleChangePasswordPress}
          style={styles.iconButton}
        >
          <Icon
            name="key-outline"
            size={30}
            color="#85C1E9"
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.iconButton}>
          <Icon
            name="log-out-outline"
            size={30}
            color="#85C1E9"
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        <Text style={styles.userName}>{myData.name}</Text>
        <Text style={styles.userEmail}>{myData.email}</Text>
        <Text style={styles.userEmail}>{myData.phone_number}</Text>
        {/* <Text style={{ fontSize: 16, marginBottom: 5 }}>
          {myAccessToken.access_token}
        </Text> */}
      </View>
      <Text style={styles.accountsText}>Accounts</Text>
    </View>
  );
};

export default Accounts;

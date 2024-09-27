import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { removeToken, getToken } from "../../services/AsyncStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const Account = () => {
  const [token, setToken] = useState(null);
  const { data, error, isLoading } = useGetLoggedUserQuery(token, {
    skip: !token,
  });
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const tokenData = await getToken();
        if (tokenData) {
          const { access } = JSON.parse(tokenData);
          setToken(access);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchToken();
  }, []);

  const handleLogout = async () => {
    await removeToken();
    navigation.navigate("AdminLogin");
    console.log("Logout");
  };

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error fetching user data.</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Account</Text>
      {data && data.name ? (
        <Text style={styles.name}>Hello, {data.name}</Text>
      ) : null}
      {data && data.email ? (
        <Text style={styles.userEmail}>Email: {data.email}</Text>
      ) : null}
      <Button title="Logout" onPress={handleLogout} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    marginBottom: 20,
  },
  name: {
    fontSize: 18,
    marginBottom: 10,
  },
  userEmail: {
    fontSize: 18,
    marginBottom: 20,
  },
});

export default Account;

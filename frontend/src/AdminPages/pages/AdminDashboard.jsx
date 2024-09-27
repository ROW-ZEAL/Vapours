import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../features/userSlice";
import { setUserAccessToken } from "../../features/authSlice";
import { getToken } from "../../services/AsyncStorageService";
import { useGetLoggedUserQuery } from "../../services/userAuthApi";

const AdminDashboard = () => {
  const [token, setToken] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await getToken();
      if (token) {
        const { access, refresh } = JSON.parse(token);
        setToken({
          access: access,
          refresh: refresh,
        });
        dispatch(setUserAccessToken({ access_token: access }));
      }
    })();
  }, []);

  const { data, isSuccess } = useGetLoggedUserQuery(token.access);

  useEffect(() => {
    if (isSuccess) {
      dispatch(setUserInfo({ email: data.email, name: data.name }));
    }
  }, [isSuccess, data, dispatch]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dashboard</Text>
      <TextInput
        style={styles.searchBar}
        placeholder="Search"
        placeholderTextColor="#A9A9A9"
      />
      <View style={styles.row}>
        <View style={styles.card}>
          <Ionicons name="people" size={24} color="black" />
          <Text style={styles.cardText}>123</Text>
          <Text style={styles.label}>Total Views</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="book" size={24} color="black" />
          <Text style={styles.cardText}>123</Text>
          <Text style={styles.label}>Bookings</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text style={styles.cardText}>3.9</Text>
          <Text style={styles.label}>Reviews</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="check-circle" size={24} color="green" />
          <Text style={styles.cardText}>32</Text>
          <Text style={styles.label}>Total Matches</Text>
        </View>
      </View>
      <View style={styles.row}>
        <View style={styles.card}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text style={styles.cardText}>50</Text>
          <Text style={styles.label}>Total Reviews</Text>
        </View>
        <View style={styles.card}>
          <FontAwesome name="star" size={24} color="yellow" />
          <Text style={styles.cardText}>50</Text>
          <Text style={styles.label}>Payment</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  searchBar: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginTop: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#ADD8E6",
    flex: 1,
    height: 100,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5,
  },
  cardText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  label: {
    fontSize: 14,
    color: "#666",
    marginTop: 5,
  },
});

export default AdminDashboard;

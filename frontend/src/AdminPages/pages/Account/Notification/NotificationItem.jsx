import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const NotificationItem = ({ notification }) => {
  const { user, message, time, image, type } = notification;

  return (
    <View style={styles.card}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: image }} style={styles.avatar} />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.user}>{user}</Text>
        <Text style={styles.message}>{message}</Text>
        <Text style={styles.time}>{time}</Text>

        {type === "action" && (
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.buttonApprove}>
              <Text style={styles.buttonText}>Approve</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.buttonDecline}>
              <Text style={styles.buttonText}>Decline</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    flexDirection: "row",
    marginBottom: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textContainer: {
    flex: 1,
  },
  user: {
    fontWeight: "600",
    fontSize: 16,
    color: "#333",
  },
  message: {
    fontSize: 14,
    color: "#555",
    marginVertical: 5,
  },
  time: {
    fontSize: 12,
    color: "#999",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 10,
  },
  buttonApprove: {
    backgroundColor: "#4CAF50",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 10,
    minWidth: 80,
    alignItems: "center",
  },
  buttonDecline: {
    backgroundColor: "#F44336",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    minWidth: 80,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#F44336",
  },
  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },
});

export default NotificationItem;

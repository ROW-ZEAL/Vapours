import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import NotificationItem from "./NotificationItem";

const notifications = [
  {
    id: "1",
    user: "Cr. Ronaldo",
    message: "Accepted your game request.",
    time: "Today at 9:42 AM",
    image: "https://randomuser.me/api/portraits/men/32.jpg", // Placeholder image
    type: "info",
  },
  {
    id: "2",
    user: "Itachi",
    message: "Requested you to play a match with you.",
    time: "Today at 10:42 AM",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    type: "action",
  },
  {
    id: "3",
    user: "Arjuna",
    message: "Scored a hat-trick in today's game!",
    time: "Yesterday at 5:30 PM",
    image: "https://randomuser.me/api/portraits/men/1.jpg",
    type: "achievement",
  },
  {
    id: "4",
    user: "Krishna",
    message: "Invited you to join his team.",
    time: "Yesterday at 8:15 PM",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    type: "action",
  },
  {
    id: "5",
    user: "Rama",
    message: "Liked your performance in the last match.",
    time: "Today at 7:00 AM",
    image: "https://randomuser.me/api/portraits/men/23.jpg",
    type: "info",
  },
  {
    id: "6",
    user: "Hanuman",
    message: "Shared a strategy document with you.",
    time: "Today at 6:45 AM",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
    type: "info",
  },
  {
    id: "7",
    user: "Lakshmana",
    message: "Requested a friendly match.",
    time: "Yesterday at 11:30 PM",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    type: "action",
  },
  {
    id: "8",
    user: "Ganesh",
    message: "Congratulated you for a well-played match.",
    time: "2 days ago at 2:20 PM",
    image: "https://randomuser.me/api/portraits/men/50.jpg",
    type: "info",
  },
  {
    id: "9",
    user: "Shiva",
    message: "Scheduled a practice session with you.",
    time: "Today at 2:00 PM",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    type: "reminder",
  },
  {
    id: "10",
    user: "Durga",
    message: "Gave a shoutout for your impressive teamwork!",
    time: "Yesterday at 9:00 AM",
    image: "https://randomuser.me/api/portraits/women/25.jpg",
    type: "achievement",
  },
  {
    id: "11",
    user: "Parvati",
    message: "Commented on your recent game post.",
    time: "Today at 4:30 PM",
    image: "https://randomuser.me/api/portraits/women/40.jpg",
    type: "info",
  },
  {
    id: "12",
    user: "Vishnu",
    message: "Invited you to a doubles tournament.",
    time: "Today at 12:00 PM",
    image: "https://randomuser.me/api/portraits/men/5.jpg",
    type: "action",
  },
  {
    id: "13",
    user: "Karna",
    message: "Replied to your game request.",
    time: "Today at 11:45 AM",
    image: "https://randomuser.me/api/portraits/men/21.jpg",
    type: "info",
  },
  {
    id: "14",
    user: "Sita",
    message: "Sent you a message about an upcoming match.",
    time: "Yesterday at 3:15 PM",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    type: "info",
  },
];

const NotificationsScreen = () => {
  return (
    <View style={styles.container}>
      <FlatList
        data={notifications}
        renderItem={({ item }) => <NotificationItem notification={item} />}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.flatListContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    paddingTop: 20,
    paddingHorizontal: 20,
  },
  flatListContent: {
    paddingBottom: 15,
  },
});

export default NotificationsScreen;

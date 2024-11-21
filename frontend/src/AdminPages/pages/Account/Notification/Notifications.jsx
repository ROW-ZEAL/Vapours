import React from "react";
import { View, FlatList, Text, StyleSheet } from "react-native";
import NotificationItem from "./NotificationItem";

const notifications = [
  {
    id: "1",
    user: "System",
    message: "New venue request received: 'Elite Futsal Arena'.",
    time: "Today at 10:15 AM",
    image: "https://randomuser.me/api/portraits/lego/1.jpg", // Placeholder image
    type: "action",
  },
  {
    id: "2",
    user: "John Doe",
    message: "Reported an issue: 'Payment failure during booking'.",
    time: "Today at 9:45 AM",
    image: "https://randomuser.me/api/portraits/men/10.jpg",
    type: "info",
  },
  {
    id: "3",
    user: "Marketing Team",
    message: "New promotional campaign has been launched.",
    time: "Yesterday at 3:00 PM",
    image: "https://randomuser.me/api/portraits/lego/2.jpg",
    type: "announcement",
  },
  {
    id: "4",
    user: "Emily Smith",
    message: "Requested a refund for booking #10245.",
    time: "Today at 8:30 AM",
    image: "https://randomuser.me/api/portraits/women/30.jpg",
    type: "action",
  },
  {
    id: "5",
    user: "System",
    message: "Backup completed successfully for November data.",
    time: "Yesterday at 11:00 PM",
    image: "https://randomuser.me/api/portraits/lego/3.jpg",
    type: "reminder",
  },
  {
    id: "6",
    user: "Venue Owner",
    message: "Updated availability for 'Downtown Arena'.",
    time: "Yesterday at 2:45 PM",
    image: "https://randomuser.me/api/portraits/men/12.jpg",
    type: "info",
  },
  {
    id: "7",
    user: "Finance Department",
    message: "Monthly revenue report for November is ready.",
    time: "Today at 7:00 AM",
    image: "https://randomuser.me/api/portraits/lego/4.jpg",
    type: "achievement",
  },
  {
    id: "8",
    user: "Server",
    message: "Scheduled maintenance completed successfully.",
    time: "2 days ago at 5:15 PM",
    image: "https://randomuser.me/api/portraits/lego/5.jpg",
    type: "reminder",
  },
  {
    id: "9",
    user: "Customer Support",
    message: "Resolved ticket #1523: 'Login issue for user Alex'.",
    time: "Today at 3:30 PM",
    image: "https://randomuser.me/api/portraits/men/20.jpg",
    type: "info",
  },
  {
    id: "10",
    user: "Security",
    message: "Suspicious login attempt detected from an unknown IP.",
    time: "Yesterday at 9:30 PM",
    image: "https://randomuser.me/api/portraits/lego/6.jpg",
    type: "alert",
  },
  {
    id: "11",
    user: "Alice Johnson",
    message: "Added new photos for the venue 'Skyline Courts'.",
    time: "Today at 2:00 PM",
    image: "https://randomuser.me/api/portraits/women/45.jpg",
    type: "info",
  },
  {
    id: "12",
    user: "Analytics Team",
    message: "Weekly user engagement stats available for review.",
    time: "Today at 12:00 PM",
    image: "https://randomuser.me/api/portraits/lego/7.jpg",
    type: "achievement",
  },
  {
    id: "13",
    user: "System",
    message: "System update scheduled for midnight.",
    time: "Today at 11:00 AM",
    image: "https://randomuser.me/api/portraits/lego/8.jpg",
    type: "reminder",
  },
  {
    id: "14",
    user: "Admin Team",
    message: "Approved request for user access level upgrade.",
    time: "Yesterday at 10:15 AM",
    image: "https://randomuser.me/api/portraits/lego/9.jpg",
    type: "action",
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

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import AdminDashboard from "./pages/AdminDashboard";
import AddVenue from "./pages/AddVenue/AddVenue";
import Notifications from "./pages/Account/Notification/Notifications";
import Account from "./pages/Account/Account";
import EditProfile from "./pages/Account/EditProfile/EditProfile";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Stack Navigator for Home
function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="AdminHomeScreen"
        component={AdminDashboard}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="EditProfile" component={EditProfile} />
    </Stack.Navigator>
  );
}

export default function AdminTaskbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Add Venue") {
            // Change this to match the actual screen name
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Analytics") {
            iconName = focused ? "analytics" : "analytics-outline";
          } else if (route.name === "Notifications") {
            iconName = focused ? "notifications" : "notifications-outline";
          } else if (route.name === "Account") {
            iconName = focused ? "person" : "person-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "tomato",
        tabBarInactiveTintColor: "grey",
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Add Venue"
        component={AddVenue}
        options={{ headerShown: false }}
      />
      <Tab.Screen name="Notifications" component={Notifications} />
      <Tab.Screen name="Account" component={Account} />
    </Tab.Navigator>
  );
}

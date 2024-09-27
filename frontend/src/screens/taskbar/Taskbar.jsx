import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import { ScrollView } from "react-native";

// Importing screen components
import HomeScreens from "../../UserPages/HomeScreen/HomeScreens";
import HistoryScreen from "../../UserPages/HistoryScreen/HistoryScreen";
import NotificationsScreen from "../../UserPages/NotificationsScreen/NotificationsScreen";
import GamesNearbyScreen from "../../UserPages/GamesNearbyScreen/GamesNearbyScreen";
import AccountScreen from "../../UserPages/AccountScreen/AccountScreen";
import ChangePasswordScreen from "../../../src/screens/auth/ChangePasswordScreen ";
import CategoryPage from "../../UserPages/HomeScreen/Category/CategoryPage";
import Explore from "../../UserPages/HomeScreen/Category/Explore/Explore";

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

function HomeStackNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="MainScreen"
        component={HomeScreens}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
      />
      <Stack.Screen
        name="CategoryPage"
        component={CategoryPage}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Explore" component={Explore} />
    </Stack.Navigator>
  );
}

export default function Taskbar() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        // headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Booking History") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "Games Nearby") {
            iconName = focused ? "trophy" : "trophy-outline";
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
      <Tab.Screen name="Booking History" component={HistoryScreen} />
      <Tab.Screen name="Games Nearby" component={GamesNearbyScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

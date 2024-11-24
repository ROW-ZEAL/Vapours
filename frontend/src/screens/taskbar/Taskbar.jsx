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
import PayNow from "../../UserPages/HomeScreen/Category/Payment/Paynow/PayNow";
import PayOnarrival from "../../UserPages/HomeScreen/Category/Payment/PayOnarrival";
import Sucessful from "../../UserPages/HomeScreen/Category/Payment/Paynow/Sucessful";
import EditProfile from "../../UserPages/AccountScreen/EditProfile/EditProfile";
import RequestDetails from "../../UserPages/HomeScreen/Category/Explore/FindOpponent/RequestDetails";
import GameDetailsScreen from "../../UserPages/GamesNearbyScreen/GameDetailsScreen";
import ArenaBookingForm from "../../UserPages/HomeScreen/ArenaBookingForm/ArenaBookingForm";

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
      <Stack.Screen
        name="Explore"
        component={Explore}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Paynow"
        component={PayNow}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Payonarrival"
        component={PayOnarrival}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sucessful"
        component={Sucessful}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfile}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="RequestDetails"
        component={RequestDetails}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="GameDetails"
        component={GameDetailsScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Search For Nearest" component={ArenaBookingForm} />
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
          } else if (route.name === "BookingHistory") {
            iconName = focused ? "time" : "time-outline";
          } else if (route.name === "GamesNearby") {
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
      <Tab.Screen name="BookingHistory" component={HistoryScreen} />
      <Tab.Screen name="GamesNearby" component={GamesNearbyScreen} />
      <Tab.Screen name="Notifications" component={NotificationsScreen} />
      <Tab.Screen name="Account">
        {(props) => <AccountScreen {...props} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

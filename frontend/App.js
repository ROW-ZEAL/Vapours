import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import UserLoginScreen from "./src/screens/auth/UserLoginScreen";
import RegistrationScreen from "./src/screens/auth/RegistrationScreen";
import SendPasswordResetEmailScreen from "./src/screens/auth/SendPasswordResetEmailScreen ";
import Taskbar from "./src/screens/taskbar/Taskbar";
import AdminTaskbar from "./src/AdminPages/AdminTaskbar";
import AdminRegister from "./src/AdminPages/AdminRegister";
import AdminLogin from "./src/AdminPages/AdminLogin";
import { Provider } from "react-redux";
import Store from "./src/Store";

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* <Stack.Screen name="ShopTab" component={ShopTab} options={{ headerShown: false }} /> */}
        <Stack.Screen
          name="UserLogin"
          component={UserLoginScreen}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="Registration"
          component={RegistrationScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="SendPasswordResetEmail"
          component={SendPasswordResetEmailScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Taskbar"
          component={Taskbar}
          options={{ headerShown: false }}
        />

        {/* Admin Screen */}
        <Stack.Screen
          name="AdminRegister"
          component={AdminRegister}
          options={{ title: "Admin Registration", headerShown: false }}
        />
        <Stack.Screen
          name="AdminLogin"
          component={AdminLogin}
          options={{ title: "Admin Login", headerShown: false }}
        />
        <Stack.Screen
          name="AdminTaskbar"
          component={AdminTaskbar}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default () => {
  return (
    <Provider store={Store}>
      <App />
    </Provider>
  );
};

import "react-native-gesture-handler";
import { AppRegistry, StyleSheet } from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import SplashScreen from "./screens/splash/SplashScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import WelcomeScreen from "./screens/home/WelcomeScreen";
import AlertScreen from "./screens/home/AlertScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import * as BackgroundFetch from "expo-background-fetch";
// import backgroundFetchTask from "./backgroundTasks"; // Import background tasks definition
// import { useEffect } from "react";
// import * as Notifications from 'expo-notifications';
import Toast from "react-native-toast-message";

export default function App() {
  const Stack = createStackNavigator();

  // useEffect(() => {
  //   registerBackgroundFetchAsync();
  //   return () => {
  //     // unregisterBackgroundFetchAsync();
  //   };
  // }, []);

  // const registerBackgroundFetchAsync = async () => {
  //   try {
  //     await BackgroundFetch.registerTaskAsync(backgroundFetchTask, {
  //       minimumInterval: 1,
  //       stopOnTerminate: false,
  //       startOnBoot: true,
  //     });
  //     console.log("Background fetch registered successfully");
  //   } catch (error) {
  //     console.error("Error registering background fetch:", error);
  //   }
  // };

  // const unregisterBackgroundFetchAsync = async () => {
  //   try {
  //     await BackgroundFetch.unregisterTaskAsync(backgroundFetchTask);
  //     console.log("Background fetch unregistered successfully");
  //   } catch (error) {
  //     console.error("Error unregistering background fetch:", error);
  //   }
  // };

  return (
    <Provider store={store}>
      <NavigationContainer>
        <SafeAreaProvider>
          <Stack.Navigator initialRouteName="SplashScreen">
            <Stack.Screen
              name="SplashScreen"
              component={SplashScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="LoginScreen"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="WelcomeScreen"
              component={WelcomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="AlertScreen"
              component={AlertScreen}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
          <Toast />
        </SafeAreaProvider>
      </NavigationContainer>
    </Provider>
  );
}

// Notifications.setNotificationHandler({
//   handleNotification: async () => ({
//     shouldShowAlert: true,
//     shouldPlaySound: false,
//     shouldSetBadge: false,
//   }),
// });
const styles = StyleSheet.create({});
AppRegistry.registerComponent("MyApp", () => App);

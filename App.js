import "react-native-gesture-handler"
import { AppRegistry } from 'react-native';
import { StyleSheet,} from "react-native";
import { Provider } from "react-redux";
import store from "./store";
import SplashScreen from "./screens/splash/SplashScreen";
import LoginScreen from "./screens/auth/LoginScreen";
import WelcomeScreen from "./screens/home/WelcomeScreen";
import AlertScreen from "./screens/home/AlertScreen";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function App() {
  const Stack = createStackNavigator();
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
        </SafeAreaProvider>
      </NavigationContainer>

      {/* <SplashScreen /> */}
      {/* <LoginScreen/> */}
      {/* <WelcomeScreen/> */}
      {/* <AlertScreen
        buttonText={"Generate Result"}
        textResult={"Its has been raining this area since last morning"}
      /> */}
      {/*  */}
      {/* </View> */}
    </Provider>
  );
}

const styles = StyleSheet.create({});
AppRegistry.registerComponent('MyApp', () => App); // Register your app component

// If using Hermes, wrap the app registration in the following block:
// Hermes workaround for registering the app
// https://github.com/facebook/react-native/issues/25675#issuecomment-657274378
const appCreator = () => App;
AppRegistry.registerComponent('MyApp', () => appCreator);
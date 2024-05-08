import {
  DrawerLayoutAndroid,
  SafeAreaView,
  Image,
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  PermissionsAndroid,
} from "react-native";
import React, { useEffect, useState } from "react";
// import MapView from "react-native-maps";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import * as Location from 'expo-location'; // Import expo-location

export default function WelcomeScreen({ navigation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);

  const auth = useSelector((state) => state.auth);
  const username = auth?.user?.displayName;
  let drawerRef = null;

  // const openDrawer = () => {
  //   if (drawerRef) {
  //     drawerRef.openDrawer();
  //     setIsDrawerOpen(true);
  //   }
  // };

  // const closeDrawer = () => {
  //   if (drawerRef) {
  //     drawerRef.closeDrawer();
  //     setIsDrawerOpen(false);
  //   }
  // };

  useEffect(() => {
    getLocationAsync();
    }, []);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Location permission denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    } catch (error) {
      console.error('Error getting location: ', error);
    }
  };
  return (
    <Header>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Greeting Message with Underline */}
          <View style={styles.greetingContainer}>
            <Text style={styles.greeting}>Hello, {username}</Text>
            <View style={styles.underline} />
          </View>
        </View>

        {/* Google Map View (Replace with actual GoogleMapView component) */}
        {currentLocation ? (
          <MapView
            style={{ flex: 1, marginBottom: 10 }}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            <Marker
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              title="Your Location"
            />
          </MapView>
        ) : (
          <Text>Allow location permission to enable map view </Text>
        )}
        {/* Action Buttons Section */}
        <View style={styles.buttonContainer}>
          {/* Custom Button 1 - Generate Alert */}
          <TouchableOpacity
            style={[styles.button, styles.alertButton]}
            onPress={() => {
              navigation.navigate("AlertScreen", {
                buttonText: "Raining Alert",
                // buttonCB: () => {},
                textResult: "Its has been raining this area since last morning",
              });
            }}
          >
            <Text style={styles.buttonText}>Generate Alert</Text>
          </TouchableOpacity>

          {/* Custom Button 2 - Water Level */}
          <TouchableOpacity
            style={[styles.button, styles.waterLevelButton]}
            onPress={() => {
              navigation.navigate("AlertScreen", {
                buttonText: "Water Level",
                // buttonCB: () => {},
                textResult: "Its has been raining this area since last morning",
              });
            }}
          >
            <Text style={styles.buttonText}>Water Level</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </Header>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
  },
  menuButton: {
    padding: 10,
  },
  menuButtonText: {
    fontSize: 16,
    color: "#1B5B97",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  content: {
    marginBottom: 20,
    borderBottom: 4,
    borderBottomColor: "#1B5B97",
  },
  greetingContainer: {
    width: "100%",
    flexDirection: "column",
    // alignItems: 'center',
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1B5B97",
  },
  underline: {
    flex: 1,
    borderBottomWidth: 2,
    borderBottomColor: "#1B5B97",
    // marginLeft: 10,
  },
  mapView: {
    flex: 1,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#1B5B97",
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  button: {
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    height: 50,
    borderRadius: 15.27,
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  alertButton: {
    width: 200,
    backgroundColor: "#1B5B97", // Custom color for alert button
  },
  waterLevelButton: {
    backgroundColor: "#1B5B97", // Custom color for water level button
  },
});

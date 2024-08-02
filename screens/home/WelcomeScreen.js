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
  Platform,
} from "react-native";
import React, { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location"; // Import expo-location
import axios from "axios";
import Toast from "react-native-toast-message"; // Import Toast

import LoadingSpinner from "./LoadingSpinner";

export default function WelcomeScreen({ navigation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const auth = useSelector((state) => state.auth);
  const username = auth?.user?.displayName;
  const [MarkerData, setMarkerData] = useState([
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 67.049987,
      field2: 24.976652,
      field3: "Medium",
      field4: "60",
    },
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 66.98806,
      field2: 24.871941,
      field3: "Empty",
      field4: "0",
    },
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 67.037323,
      field2: 24.931301,
      field3: "Empty",
      field4: "0",
    },
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 67.087533,
      field2: 24.93659,
      field3: "Moderate",
      field4: "40",
    },
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 67.074221,
      field2: 24.959242,
      field3: "Heavy",
      field4: "95",
    },
    {
      created_at: "2024-07-31T04:00:11.627Z",
      entry_id: null,
      field1: 67.064479,
      field2: 25.006272,
      field3: "Moderate",
      field4: "45",
    },
  ]);
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const [lastId, setLastId] = useState(null);
  const provideText = (title) => {
    console.log(title);
    switch (title) {
      case "Medium":
        return "It's been medium rainfall in this area.";
      case "Moderate":
        return "It's been moderate rainfall in this area";
      case "Heavy":
        return "It's been heavily raining in this area.";
      case "Empty":
        return "No sign of rain in this area";
      default:
        return "No data to show";
    }
  };

  useEffect(() => {
    getLocationAsync();
  }, []);

  useEffect(() => {
    if (currentLocation) {
      const interval = setInterval(() => {
        axios
          .get(
            "https://api.thingspeak.com/channels/2611773/feeds.json?api_key=I1EXR9VIVYOI2WUW"
          )
          .then((res) => {
            let data = res.data.feeds;
            // console.log(res.data.feeds);
            finalData = data.map((d) => ({
              ...d,
              field1: parseFloat(d.field1 ? d.field1 : 67.04692),
              field2: parseFloat(d.field2 ? d.field2 : 24.97411),
            }));
            // console.log("finalData", MarkerData);
            const uniqueEntries = finalData.filter((entry) => {
              return !MarkerData.some(
                (existing) => existing.entry_id === entry.entry_id
              );
            });
            console.log("new Entry", uniqueEntries.length);
            if (uniqueEntries.length) {

              uniqueEntries.forEach((entry) => {
                if (entry.field3 !== "Empty") {
                  Toast.show({
                    type: "success",
                    text1: "New Alert",
                    text2: `${entry.field3} Water level detected with rain intensity of ${entry.field4}%. Be awarex`,
                  });
                }
              });

              setMarkerData((prevMarkerData) => [
                ...prevMarkerData,
                ...uniqueEntries,
              ]);
              
            }
          });
      }, 10000);

      return () => clearInterval(interval);
    }
  }, [currentLocation, MarkerData]);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setShimmerLoading(false);
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
      setShimmerLoading(false);
    } catch (error) {
      console.error("Error getting location: ", error);
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
           provider={PROVIDER_GOOGLE}
            legalLabelInsets={{ bottom: -100, right: -100 }}
            toolbarEnabled={false}
            style={{ flex: 1, marginBottom: 10 }}
            initialRegion={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          >
            {MarkerData.map((marker, index) => (
              <Marker
                onPress={(e) => {
                  const { coordinate: LatLng, position: Point } = e.nativeEvent;
                  const precision = 0.000001;
                  let marker = MarkerData.find((data) => {
                    console.log(data.field2, data.field1);
                    return (
                      Math.abs(
                        e.nativeEvent.coordinate.latitude - data.field2
                      ) < precision &&
                      Math.abs(
                        e.nativeEvent.coordinate.longitude - data.field1
                      ) < precision
                    );
                  });
                  console.log(marker);
                  if (marker) {
                    setMarker({
                      coordinate: LatLng,
                      title: marker.field3,
                      description: `Water Level:${marker.field3}, Rain percent: ${marker.field4}`,
                    });
                  }
                }}
                key={index}
                coordinate={{
                  latitude: marker.field2,
                  longitude: marker.field1,
                }}
                title={
                  marker.field3 === "Empty"
                    ? "No rain here"
                    : `Water Level:${marker.field3}`
                }
                description={`Rain percent: ${marker.field4}%`}
              />
            ))}
            <Marker
              onPress={() => {
                setMarker(null);
              }}
              coordinate={{
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
              }}
              pinColor="green"
              title="Your Location"
            />
          </MapView>
        ) : shimmerLoading ? (
          <LoadingSpinner />
        ) : (
          <Text>Allow location permission to enable map view </Text>
        )}
        {/* Action Buttons Section */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={[
              styles.button,
              styles.waterLevelButton,
              ...(!marker ? [styles.waterLevelButtonDisabled] : []),
            ]}
            disabled={marker === null}
            onPress={() => {
              navigation.navigate("AlertScreen", {
                buttonText: "Go Back",
                // onPress: () =>{
                //   navigation.navigate("WelcomeScreen");
                // },
                textResult: provideText(marker.title),
              });
            }}
          >
            <Text style={styles.buttonText}>View Details</Text>
          </TouchableOpacity>
        </View>

        {/* <Toast visibilityTime={5000} position="top" ref={(ref) => Toast.setRef(ref)} /> Add Toast component */}
      </SafeAreaView>
      {/* <Text> */}

      {/* </Text> */}
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
    flexDirection: "row",
    alignItems: "center",
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
    justifyContent: "center",
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
    backgroundColor: "#1B5B97",
  },
  waterLevelButton: {
    backgroundColor: "#1B5B97",
  },
  waterLevelButtonDisabled: {
    backgroundColor: "#86add1",
  },
});

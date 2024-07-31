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
// import MapView from "react-native-maps";
import Header from "../../components/Header/Header";
import { useSelector } from "react-redux";
import MapView, { Marker, PROVIDER_GOOGLE } from "react-native-maps";
import * as Location from "expo-location"; // Import expo-location
import axios from "axios";
import { createShimmerPlaceholder } from "react-native-shimmer-placeholder";
import LinearGradient from "expo-linear-gradient";

export default function WelcomeScreen({ navigation }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [marker, setMarker] = useState(null);
  const auth = useSelector((state) => state.auth);
  const username = auth?.user?.displayName;
  const [MarkerData, setMarkerData] = useState([]);
  const [shimmerLoading, setShimmerLoading] = useState(true);
  const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

  const provideText = (title) => {
    switch (title) {
      case "Light Rain or No Rain":
        return "It's been light rain or no rain in this area.";
      case "Moderate Rain":
        return "It's been moderate rain in this area";
      case "High":
        return "It's been heaving raining in this area";
      case "Empty":
        return "No sign of rain in this area";
      default:
        return "It's been raining in this area";
    }
  };
  // const MarkerData = [
  //   {
  //     position: {
  //       latitude: 24.871941,
  //       longitude: 66.98806,
  //     },
  //     intensity: "Light Rain or No Rain",
  //     intensityNumber: 949,
  //   },
  //   {
  //     position: {
  //       latitude: 24.931301,
  //       longitude: 67.037323,
  //     },
  //     intensity: "Light Rain or No Rain",
  //     intensityNumber: 951,
  //   },
  //   {
  //     position: {
  //       latitude: 24.93659,
  //       longitude: 67.087533,
  //     },
  //     intensity: "Moderate Rain",
  //     intensityNumber: 478,
  //   },
  //   {
  //     position: {
  //       latitude: 24.959242,
  //       longitude: 67.074221,
  //     },
  //     intensity: "Heavy Rain!",
  //     intensityNumber: 237,
  //   },
  //   {
  //     position: {
  //       latitude: 25.006272,
  //       longitude: 67.064479,
  //     },
  //     intensity: "Moderate Rain",
  //     intensityNumber: 264,
  //   },
  //   // Add more markers as needed
  // ];
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

  useEffect(() => {
    if (currentLocation) {
      axios
        .get(
          "https://api.thingspeak.com/channels/2611773/feeds.json?api_key=I1EXR9VIVYOI2WUW"
        )
        .then((res) => {
          // console.log(res);
          let data = res.data.feeds;
          finalData = data.map((d) => ({
            ...d,
            field1: parseFloat(d.field1),
            field2: parseFloat(d.field2),
          }));
          setMarkerData([
            ...finalData,
            ...[
              {
                created_at: "2024-07-31T04:00:11.627Z",
                entry_id: 1,
                field1: 66.98806,
                field2: 24.871941,
                field3: "Light Rain or No Rain",
                field4: "949",
              },
              {
                created_at: "2024-07-31T04:00:11.627Z",
                entry_id: 2,
                field1: 67.037323,
                field2: 24.931301,
                field3: "Light Rain or No Rain",
                field4: "951",
              },
              {
                created_at: "2024-07-31T04:00:11.627Z",
                entry_id: 3,
                field1: 67.087533,
                field2: 24.93659,
                field3: "Moderate Rain",
                field4: "478",
              },
              {
                created_at: "2024-07-31T04:00:11.627Z",
                entry_id: 4,
                field1: 67.074221,
                field2: 24.959242,
                field3: "Heavy Rain!",
                field4: "237",
              },
              {
                created_at: "2024-07-31T04:00:11.627Z",
                entry_id: 5,
                field1: 67.064479,
                field2: 25.006272,
                field3: "Moderate Rain",
                field4: "264",
              },
            ],
          ]);
        });
    }
  }, [currentLocation]);

  const getLocationAsync = async () => {
    try {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
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
            // provider={PROVIDER_GOOGLE}
            legalLabelInsets={{ bottom: -100, right: -100 }}
            // onError={(e) => {
            //   console.log(e);
            // }}
            // onMapReady={(e) => {
            //   console.log(e);
            // }}
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
                  console.log(LatLng, Point);
                  const precision = 0.000001;
                  // console.log(
                  //   e.currentTarget._internalFiberInstanceHandleDEV
                  //     .memoizedProps.title
                  // );
                  let marker = MarkerData.find((data) => {
                    console.log(data.field2, data.field1);
                    return (
                      Math.abs(
                        e.nativeEvent.coordinate.latitude - data.field2
                      ) < precision &&
                      Math.abs(
                        e.nativeEvent.coordinate.longitude - data.field1
                      ) < precision
                      // data.field2 === e.nativeEvent.coordinate.latitude &&
                      // data.field1 === e.nativeEvent.coordinate.longitude
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
                description={`Intensity: ${marker.field3}, Rain percent: ${marker.field4}`}
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
              title="Your Location"
            />
          </MapView>
        ) : shimmerLoading ? (
          <ShimmerPlaceholder />
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
            style={[
              styles.button,
              styles.waterLevelButton,
              ...(!marker ? [styles.waterLevelButtonDisabled] : []),
            ]}
            disabled={marker === null}
            onPress={() => {
              navigation.navigate("AlertScreen", {
                buttonText: "Water Level",
                // buttonCB: () => {},
                textResult: provideText(marker.title),
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
  waterLevelButtonDisabled: {
    backgroundColor: "#86add1 !important",
  },
});

import {
  DrawerLayoutAndroid,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";

export default function Header({ children }) {
  const navigation = useNavigation();

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  let drawerRef = null;

  const openDrawer = () => {
    if (drawerRef) {
      drawerRef.openDrawer();
      setIsDrawerOpen(true);
    }
  };

  const closeDrawer = () => {
    if (drawerRef) {
      drawerRef.closeDrawer();
      setIsDrawerOpen(false);
    }
  };
  return (
    <DrawerLayoutAndroid
      ref={(ref) => (drawerRef = ref)}
      drawerWidth={250}
      drawerPosition="left"
      renderNavigationView={() => (
        <SafeAreaView style={styles.drawerContainer}>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("WelcomeScreen");
            }}
          >
            <Image
              style={{
                width: 200,
                height: 100,
                resizeMode: "contain",
                marginBottom: 40,
              }}
              source={require("../../assets/logo-blue.png")}
            />
          </TouchableOpacity>

          {/* <Text style={styles.drawerItem}>Menu Item 1</Text> */}
          {/* <Text style={styles.drawerItem}>Menu Item 2</Text> */}
          <Text
            style={styles.drawerItem}
            onPress={() => {
              navigation.navigate("LoginScreen");
            }}
          >
            Logout
          </Text>
        </SafeAreaView>
      )}
    >
      <SafeAreaView style={styles.header}>
        {/* Menu Button */}
        <TouchableOpacity style={styles.menuButton} onPress={openDrawer}>
          <Image source={require("./../../assets/Category.png")} />
        </TouchableOpacity>

        {/* User Avatar */}
        <Image
          source={require("../../assets/undraw_male_avatar_323b 1.png")}
          style={styles.avatar}
        />
      </SafeAreaView>
      {children}
    </DrawerLayoutAndroid>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // marginBottom: 20,
    marginTop: 30,
    padding: 10,
  },
  menuButton: {
    padding: 10,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  drawerContainer: {
    flex: 1,
    backgroundColor: "#ffffff",
    padding: 20,
    marginTop: 50,
  },
  drawerItem: {
    fontSize: 16,
    color: "#1B5B97",
    marginBottom: 10,
  },
});

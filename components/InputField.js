import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function InputField({ icon, children }) {

  return (
    <View style={styles.inputContainer}>
      <Image style={styles.icon} source={icon}></Image>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1.6,
    borderColor: '#1B5B97',
    borderRadius: 8.369,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
    marginLeft: 10,
  },
  icon: {
    width:25,
    height:25,
    marginRight: 10,
  },
});

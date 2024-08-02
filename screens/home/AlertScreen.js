import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import Header from "../../components/Header/Header";
import { useRoute } from "@react-navigation/native";

export default function AlertScreen() {
  const route = useRoute();
  const { buttonText, textResult, onPress } = route.params;
  return (
    <Header>
      {/* <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
          <Text style={styles.buttonText}>{buttonText}</Text>
        </TouchableOpacity>
      </View> */}
      <Text style={styles.paragraph}>{textResult}</Text>
    </Header>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    height: 50,
    margin: 20,
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    height: 50,
    borderRadius: 15.27,
    backgroundColor: "#1B5B97",
  },
  buttonText: {
    fontSize: 16,
    color: "#ffffff",
    fontWeight: "bold",
  },
  paragraph: {
    margin: 20,
    flex:1,
    borderWidth: 2,
    borderRadius:15.27,
    borderColor: "#1B5B97",
    // textAlign: 'center',
    padding:10,
    fontSize: 16,
    lineHeight: 24,
  },
});

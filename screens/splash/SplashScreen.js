import { Image, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'

export default function SplashScreen({navigation}) {
  useEffect(() => {
    // Set a timer to navigate to the next screen after 3 seconds (3000 milliseconds)
    const timer = setTimeout(() => {
      navigation.replace('LoginScreen'); // Replace 'Home' with the name of your target screen
    }, 3000);

    // Clear the timer on component unmount to avoid memory leaks
    return () => clearTimeout(timer);
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('./../../assets/logo.png')} style={styles.image}></Image>
    </SafeAreaView>
  ) 
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#1B5B97",
        alignItems: "center",
        justifyContent: "center",
      },
      image: {
        resizeMode: 'cover', // Adjust the image's resizeMode as needed
      },
})
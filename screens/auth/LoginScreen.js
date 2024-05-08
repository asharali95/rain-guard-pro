import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, { Fragment, useState } from "react";
import InputField from "../../components/InputField";
import { FIREBASE_AUTH } from "../../firebaseconfig";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { useDispatch } from "react-redux";
import { login } from "../../reducers/authReducer";
export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [visiblePassword, setVisiblePassword] = useState(false);
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [screenSwitch, setScreenSwitch] = useState("signin");
  const dispatch = useDispatch();
  // firebase
  const auth = FIREBASE_AUTH;
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await signInWithEmailAndPassword(auth, email, password);
      const { uid, displayName, photoURL } = response.user;
      dispatch(
        login({ uid, email: response.user.email, displayName, photoURL })
      );

      navigation.replace("WelcomeScreen");
    } catch (error) {
      console.log(error.message);
      setError(error.message);
    } finally {
      setLoading(false);
    }
    // navigation.replace("WelcomeScreen");
  };
  const changeScreen = (screen) => {
    setName("");
    setEmail("");
    setPassword("");
    setLoading("");
    setError("");
    setScreenSwitch(screen);
  };
  const signup = async () => {
    setLoading(true);
    try {
      const response = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const { uid, displayName, photoURL } = response.user;
      await updateProfile(response.user, { displayName: name })
      dispatch(
        login({ uid, email: response.user.email, displayName:name, photoURL })
      );
      navigation.replace("WelcomeScreen");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView>
      <View style={{ padding: 20, fontFamily: "Roboto" }}>
        <Image
          source={require("../../assets/logo-blue.png")}
          style={styles.logo}
        />
        {screenSwitch === "signin" ? (
          <Fragment>
            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome Back</Text>
              <Text style={styles.subtitle}>Login to continue</Text>
            </View>

            {/* Email Address Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address</Text>
              <InputField icon={require("./../../assets/carbon_email.jpg")}>
                <TextInput
                  onChangeText={(text) => {
                    if (error) {
                      setError("");
                    }
                    setEmail(text);
                  }}
                  value={email}
                  style={styles.input}
                  placeholder="Enter your email"
                />
              </InputField>
            </View>

            {/* Password Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <InputField
                icon={require("./../../assets/ri_lock-password-line.jpg")}
              >
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    if (error) {
                      setError("");
                    }
                    setPassword(text);
                  }}
                  placeholder="Enter your password"
                  secureTextEntry={!visiblePassword}
                />
                <TouchableOpacity
                 activeOpacity={1}
                  onPress={() => setVisiblePassword(!visiblePassword)}
                >
                  <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={
                      visiblePassword
                        ? require("../../assets/eye.png")
                        : require("../../assets/eye-closed.png")
                    }
                  ></Image>
                </TouchableOpacity>
              </InputField>
            </View>
            <Text style={{ color: "red" }}>{error}</Text>
            {/* Forgot Password */}
            <TouchableOpacity style={styles.link}>
              <Text style={styles.linkText}>Forgot password?</Text>
            </TouchableOpacity>

            {/* Login Button */}
            {loading ? (
              <ActivityIndicator size={"large"} color={"#0000ff"} />
            ) : (
              <TouchableOpacity onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>LOGIN</Text>
              </TouchableOpacity>
            )}

            {/* Sign Up Link */}
            <Text style={styles.signupText}>
              Don’t have an account?{" "}
              <Text
                onPress={() => {
                  changeScreen("signup");
                }}
                style={styles.signupLink}
              >
                Sign up now
              </Text>
            </Text>
          </Fragment>
        ) : (
          <Fragment>
            {/* Content */}
            <View style={styles.content}>
              <Text style={styles.welcomeText}>Welcome</Text>
              <Text style={styles.subtitle}>Signup to create an account</Text>
            </View>

            {/* Email Address Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Full Name</Text>
              <InputField icon={require("./../../assets/carbon_email.jpg")}>
                <TextInput
                  onChangeText={(text) => {
                    if (error) {
                      setError("");
                    }
                    setName(text);
                  }}
                  value={name}
                  style={styles.input}
                  placeholder="Enter your name"
                />
              </InputField>
            </View>
            {/* Email Address Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Email Address</Text>
              <InputField icon={require("./../../assets/carbon_email.jpg")}>
                <TextInput
                  onChangeText={(text) => {
                    if (error) {
                      setError("");
                    }
                    setEmail(text);
                  }}
                  value={email}
                  style={styles.input}
                  placeholder="Enter your email"
                />
              </InputField>
            </View>

            {/* Password Input */}
            <View style={styles.fieldContainer}>
              <Text style={styles.label}>Password</Text>
              <InputField
                icon={require("./../../assets/ri_lock-password-line.jpg")}
              >
                <TextInput
                  style={styles.input}
                  value={password}
                  onChangeText={(text) => {
                    if (error) {
                      setError("");
                    }
                    setPassword(text);
                  }}
                  placeholder="Enter your password"
                  secureTextEntry={!visiblePassword}
                />
                <TouchableOpacity
                 activeOpacity={1}
                  onPress={() => setVisiblePassword(!visiblePassword)}
                >
                  <Image
                    style={{ height: 20, width: 20, resizeMode: "contain" }}
                    source={
                      visiblePassword
                        ? require("../../assets/eye.png")
                        : require("../../assets/eye-closed.png")
                    }
                  ></Image>
                </TouchableOpacity>
              </InputField>
            </View>
            <Text style={{ color: "red" }}>{error}</Text>

            {/* Login Button */}
            {loading ? (
              <ActivityIndicator size={"large"} color={"#0000ff"} />
            ) : (
              <TouchableOpacity
                disabled={name === "" || email === "" || password === ""}
                onPress={signup}
                style={styles.button}
              >
                <Text style={styles.buttonText}>Create</Text>
              </TouchableOpacity>
            )}

            {/* Sign Up Link */}
            <Text style={styles.signupText}>
              Already have an account?{" "}
              <Text
                onPress={() => {
                  changeScreen("signin");
                }}
                style={styles.signupLink}
              >
                Sign in now
              </Text>
            </Text>
          </Fragment>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  logo: {
    resizeMode: "cover",
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 20,
  },
  content: {
    // alignItems: "center",
    marginBottom: 20,
  },
  welcomeText: {
    fontSize: 24,
    color: "#1B5B97",
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#1B5B97",
  },
  fieldContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontSize: 16,
    color: "#1B5B97",
    fontWeight: "bold",
  },
  input: {
    // borderWidth: 1,
    flex: 1,
    borderColor: "#ccc",
    borderRadius: 8.369,
    paddingHorizontal: 10,
    height: 50.215,
  },
  link: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  linkText: {
    color: "#1B5B97",
    fontSize: 14,
  },
  button: {
    backgroundColor: "#1B5B97",
    width: "100%",
    borderRadius: 8.369,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    textAlign: "center",
    fontSize: 14,
    color: "#000",
  },
  signupLink: {
    color: "#1B5B97",
    textDecorationLine: "none",
  },
});

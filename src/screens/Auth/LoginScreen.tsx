import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ActivityIndicator,
  Platform,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faCheckSquare, faSquare } from "@fortawesome/free-solid-svg-icons";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import FloatingLabelInput from "./FloatingLabelInput";

type RootStackParamList = {
  LoginPassword: undefined;
  Otp: { mobile: string; otp: string };
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, "LoginPassword">;

const LoginScreen = ({ navigation }: Props) => {
  const [empCode, setEmpCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoginEnabled = empCode.length > 0 && phoneNumber.length > 0 && agreed;

  const handleLogin = async () => {
    if (!isLoginEnabled) {
      Alert.alert("Validation Error", "Please fill all fields correctly.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("empCode", empCode);
      formData.append("mobile", phoneNumber);

      const response = await fetch(
        "https://arogyamantra.com/app-api/login.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setLoading(false);

      if (data.result === "true") {
        Alert.alert("Success", "OTP sent successfully");
        navigation.navigate("Otp", {
          mobile: phoneNumber,
          otp: data.otp,
        });
      } else {
        Alert.alert("Login Failed", data.message || "Invalid credentials");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#024F7D" }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0} // prevents button hiding
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Image
          source={require("../../assets/white-logo.png")}
          style={styles.logoImage}
        />

        <FloatingLabelInput
          label="Employee Code"
          value={empCode}
          onChangeText={setEmpCode}
          keyboardType="default"
        />

        <FloatingLabelInput
          label="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />

        <TouchableOpacity
          style={styles.checkboxContainer}
          onPress={() => setAgreed(!agreed)}
        >
          <FontAwesomeIcon
            icon={agreed ? faCheckSquare : faSquare}
            size={20}
            color="#fff"
          />
          <Text style={styles.checkboxText}>
            I have read and agree to the{" "}
            <Text style={styles.termsText}>terms and conditions</Text>
          </Text>
        </TouchableOpacity>

        {/* Button inside scroll so it moves with keyboard */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={[
              styles.loginButton,
              isLoginEnabled
                ? styles.loginButtonEnabled
                : styles.loginButtonDisabled,
            ]}
            onPress={handleLogin}
            disabled={!isLoginEnabled || loading}
          >
            {loading ? (
              <ActivityIndicator color="#003366" />
            ) : (
              <Text style={styles.buttonText}>SEND OTP</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoImage: {
    width: 250,
    height: 80,
    resizeMode: "contain",
    alignSelf: "center",
    marginBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: "90%",
    alignSelf: "center",
  },
  checkboxText: {
    color: "#fff",
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap",
  },
  termsText: {
    color: "#FFA07A",
    fontWeight: "bold",
  },
  footer: {
    marginTop: 30,
    marginBottom: 20,
  },
  loginButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    width: "40%",
    alignSelf: "center",
  },
  loginButtonEnabled: {
    backgroundColor: "#fff",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  buttonText: {
    color: "#003366",
    fontWeight: "bold",
  },
});

export default LoginScreen;

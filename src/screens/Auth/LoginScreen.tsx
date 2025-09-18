import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Image,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import FloatingLabelInput from './FloatingLabelInput'; // Assuming this component exists
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// Define the stack param list for navigation
type RootStackParamList = {
  Login: undefined;
  Otp: { mobile: string, otp: string };
  // Add other screens if necessary
};

type Props = NativeStackScreenProps<RootStackParamList, "Login">;

const LoginScreen = ({ navigation }: Props) => {
  const [empCode, setEmpCode] = useState("");
  const [mobile, setmobile] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoginEnabled = empCode.length > 0 && mobile.length > 0 && agreed;

  const handleLogin = async () => {
    if (!isLoginEnabled) {
      Alert.alert("Validation Error", "Please fill all fields correctly.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("empCode", empCode);
      formData.append("mobile", mobile);
       console.log(formData ,"ttutututtttttt");
       
      const response = await fetch("https://arogyamantra.com/app-api/login.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      console.log("API Response:", data);

      if (data.result === "true") {
        Alert.alert("Success", "OTP sent successfully");
        navigation.navigate("Otp", { mobile: mobile, otp: data.otp });
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
     <KeyboardAwareScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      enableOnAndroid={true}
      extraScrollHeight={40}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.container}>
        {/* Replace the Text logo with an Image */}
        <Image
          source={require("../../assets/white-logo.png")}
          style={styles.logoImage}
        />

        {/* Employee Code Input */}
        <FloatingLabelInput
          label="Employee Code"
          value={empCode}
          onChangeText={setEmpCode}
          keyboardType="default"
        />

        {/* Phone Number Input */}
        <FloatingLabelInput
          label="Phone Number"
          value={mobile}
          onChangeText={setmobile}
          keyboardType="phone-pad"
          // maxLength={10} // Assuming phone number should be 10 digits
        />

        {/* Checkbox */}
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

        {/* Login Button */}
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
            <Text
              style={[
                styles.buttonText,
                { color: isLoginEnabled ? "#003366" : "#666" },
              ]}
            >
              SEND OTP
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
 
  container: {
    flex: 1,
    backgroundColor: "#024F7D",
    justifyContent: "center",
    padding: 20,
  },
  logoImage: {
    width: 250,
    height: 80,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    width: '90%',
    alignSelf: 'center',
  },
  checkboxText: {
    color: "#fff",
    marginLeft: 10,
    flex: 1,
    flexWrap: 'wrap',
  },
  termsText: {
    color: "#FFA07A",
    fontWeight: "bold",
    marginBottom: 20,
  },
  loginButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    position: 'absolute',
    bottom: 50,
    width: '40%',
    alignSelf: 'center',
  },
  loginButtonEnabled: {
    backgroundColor: "#fff",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
  },
});

export default LoginScreen;
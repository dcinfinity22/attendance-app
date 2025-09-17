import React, { useState } from "react"; 
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faEye,
  faEyeSlash,
  faCheckSquare,
  faSquare,
} from "@fortawesome/free-solid-svg-icons";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StackNavigationProp } from '@react-navigation/stack';
import { AuthStackParamList  } from "../../types/navigation";

type Props = {
  navigation: StackNavigationProp<AuthStackParamList, 'Login'>;
};
export default function LoginScreen({ navigation }: Props) {
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const isLoginEnabled = mobile.length === 10 && password.length > 0 && agreed;

  const handleLogin = async () => {
    if (!isLoginEnabled) {
      Alert.alert("Validation Error", "Please fill all fields correctly.");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("password", password);

      const response = await fetch("https://arogyamantra.com/app-api/login.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setLoading(false);
      console.log("API Response:", data);

      if (data.result === "true") {
        Alert.alert("Success", "OTP sent successfully");
        navigation.navigate("Otp", { mobile, otp: data.otp });
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
        <Text style={styles.logo}>CREWCAM</Text>

        {/* Mobile Input */}
        <TextInput
          style={styles.input}
          placeholder="Mobile Number"
          placeholderTextColor="#bbb"
          value={mobile}
          onChangeText={(text) => setMobile(text.replace(/[^0-9]/g, ""))}
          keyboardType="number-pad"
          maxLength={10}
        />

        {/* Password Input */}
        <View style={styles.passwordContainer}>
          <TextInput
            style={[styles.input, { marginBottom: 0 }]}
            placeholder="Password"
            placeholderTextColor="#bbb"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
          />
          <TouchableOpacity
            style={styles.eyeIcon}
            onPress={() => setShowPassword(!showPassword)}
          >
            <FontAwesomeIcon
              icon={showPassword ? faEyeSlash : faEye}
              size={20}
              color="#fff"
            />
          </TouchableOpacity>
        </View>

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
              LOGIN
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#024F7D",
    justifyContent: "center",
    padding: 20,
  },
  logo: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 40,
    fontWeight: "bold",
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: "#fff",
    color: "#fff",
    fontSize: 16,
    paddingVertical: 10,
    marginBottom: 25,
  },
  passwordContainer: {
    position: "relative",
    justifyContent: "center",
    marginBottom: 25,
  },
  eyeIcon: {
    position: "absolute",
    right: 0,
    top: 10,
    padding: 5,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  checkboxText: {
    color: "#fff",
    marginLeft: 10,
    flexShrink: 1,
  },
  termsText: {
    color: "red",
    fontWeight: "bold",
  },
  loginButton: {
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  loginButtonEnabled: {
    backgroundColor: "#fff",
  },
  loginButtonDisabled: {
    backgroundColor: "#ccc",
  },
  buttonText: {
    fontWeight: "bold",
  },
});

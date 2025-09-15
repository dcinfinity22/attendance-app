import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from "@react-native-async-storage/async-storage"; // ✅ For saving token
import { OtpScreenProps } from "../types/navigation";

export default function OtpScreen({ route, navigation }: OtpScreenProps) {
  const { mobile, otp } = route.params; // OTP from API response
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const inputs = useRef<(TextInput | null)[]>([]);

  const handleChange = (text: string, index: number) => {
    const newOtpValues = [...otpValues];
    newOtpValues[index] = text;
    setOtpValues(newOtpValues);

    if (text && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    const enteredOtp = otpValues.join("");
    console.log(enteredOtp);
    if (enteredOtp.length < 6) {
      Alert.alert("Error", "Please enter full 6-digit OTP");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("mobile", mobile);
      formData.append("otp", enteredOtp);

      const response = await fetch(
        "https://arogyamantra.com/app-api/verify-otp.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setLoading(false);

      console.log("OTP Verify Response:", data);

      if (data.status === "success") {
        // ✅ Save token in AsyncStorage
        await AsyncStorage.setItem("auth_token", data.token);
        await AsyncStorage.setItem("user_mobile", data.mobile);

        Alert.alert("Success", "Login Successful!");
        navigation.replace("PaymentLeave");
      } else {
        Alert.alert("Invalid OTP", data.message || "Please try again");
      }
    } catch (error) {
      setLoading(false);
      console.error(error);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid={true}
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>CREWCAM</Text>
        <Text style={styles.subtitle}>
          We'll send OTP in registered mobile no.
        </Text>

        {/* OTP Input Boxes */}
        <View style={styles.otpContainer}>
          {otpValues.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={styles.otpInput}
              value={value}
              onChangeText={(text) =>
                handleChange(text.replace(/[^0-9]/g, ""), index)
              }
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        {/* Verify Button */}
        <TouchableOpacity
          style={[
            styles.button,
            otpValues.join("").length < 6 && styles.disabled,
          ]}
          onPress={handleVerify}
          disabled={otpValues.join("").length < 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#003366" />
          ) : (
            <Text style={styles.buttonText}>LOGIN NOW</Text>
          )}
        </TouchableOpacity>

        {/* Resend OTP */}
        <TouchableOpacity
          onPress={() => Alert.alert("Resend OTP", "OTP has been resent.")}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

        {/* Debug OTP */}
        <Text style={styles.debug}>Debug OTP: {otp}</Text>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#024F7D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logo: {
    fontSize: 32,
    color: "#fff",
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  otpInput: {
    width: 45,
    height: 55,
    borderWidth: 1,
    borderColor: "#fff",
    color: "#fff",
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 5,
    borderRadius: 5,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    alignItems: "center",
    backgroundColor: "#fff",
    marginBottom: 20,
  },
  disabled: {
    backgroundColor: "#ccc",
    opacity: 0.6,
  },
  buttonText: {
    color: "#003366",
    fontWeight: "bold",
    fontSize: 16,
  },
  resendText: {
    fontSize: 16,
    color: "#fff",
    marginTop: 10,
  },
  debug: {
    marginTop: 20,
    textAlign: "center",
    color: "yellow",
    fontSize: 12,
  },
});

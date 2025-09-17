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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import {
  AuthStackParamList,
  RootStackParamList,
} from "../../types/navigation";

// ✅ Type for Auth navigation (Login & Otp)
type OtpScreenRouteProp = RouteProp<AuthStackParamList, "Otp">;

// ✅ Root navigator types (Auth | PreHome | App)
type RootNavProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: OtpScreenRouteProp;
};

export default function OtpScreen({ route }: Props) {
  const { mobile, otp } = route.params;
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootNavProp>(); // 👈 root-level navigation
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

      if (data.status === "success") {
        // ✅ Save login state
        await AsyncStorage.setItem("auth_token", data.token);
        await AsyncStorage.setItem("user_mobile", data.mobile);

        Alert.alert("Success", "Login Successful!");

        // 👇 Always start from PreHome → PaymentLeave
        navigation.replace("PreHome");
      } else {
        Alert.alert("Invalid OTP", data.message || "Please try again");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  return (
    <KeyboardAwareScrollView
      contentContainerStyle={styles.container}
      enableOnAndroid
      extraScrollHeight={20}
    >
      <View style={styles.container}>
        <Text style={styles.logo}>CREWCAM</Text>
        <Text style={styles.subtitle}>Enter the 6-digit OTP sent to {mobile}</Text>

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

        <TouchableOpacity
          onPress={() => Alert.alert("Resend OTP", "OTP has been resent.")}
        >
          <Text style={styles.resendText}>Resend OTP</Text>
        </TouchableOpacity>

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
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 16,
    color: "#ddd",
    marginBottom: 30,
    textAlign: "center",
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
  disabled: { backgroundColor: "#ccc", opacity: 0.6 },
  buttonText: { color: "#003366", fontWeight: "bold", fontSize: 16 },
  resendText: { fontSize: 16, color: "#fff", marginTop: 10 },
  debug: { marginTop: 20, color: "yellow", fontSize: 12 },
});

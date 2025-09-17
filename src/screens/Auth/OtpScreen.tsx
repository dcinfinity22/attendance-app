import React, { useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  Image,
  KeyboardAvoidingView,
  Platform,
  Dimensions,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { AuthStackParamList, RootStackParamList } from "../../types/navigation";

// ✅ SVG import (Requires correct metro and type declaration setup)
import Group259 from "../../assets/Group259.svg";

const { width } = Dimensions.get("window");

type OtpScreenRouteProp = RouteProp<AuthStackParamList, "Otp">;
type RootNavProp = StackNavigationProp<RootStackParamList>;

type Props = {
  route: OtpScreenRouteProp;
};

export default function OtpScreen({ route }: Props) {
  const { mobile, otp } = route.params;
  const [otpValues, setOtpValues] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RootNavProp>();
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
        await AsyncStorage.setItem("auth_token", data.token);
        await AsyncStorage.setItem("user_mobile", data.mobile);
        Alert.alert("Success", "Login Successful!");
        navigation.navigate("PreHome");
      } else {
        Alert.alert("Invalid OTP", data.message || "Please try again");
      }
    } catch (error) {
      setLoading(false);
      Alert.alert("Error", "Something went wrong. Please try again.");
    }
  };

  const handleResend = () => {
    Alert.alert("Resend OTP", "OTP has been resent.");
  };

  const handleAutofill = () => {
    const autoOtp = otp.toString().split("");
    setOtpValues(autoOtp);
    Alert.alert("Autofilled", "OTP has been auto-filled.");
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.keyboardAvoidingContainer}
    >
      <View style={styles.container}>
        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require("../../assets/white-logo.png")}
            style={styles.img}
            resizeMode="contain"
          />
        </View>

        <Text style={styles.subtitle}>
          Enter the 6-digit OTP sent to {mobile}
        </Text>

        {/* OTP Boxes */}
        <View style={styles.otpContainer}>
          {otpValues.map((value, index) => (
            <TextInput
              key={index}
              ref={(ref) => {
                inputs.current[index] = ref;
              }}
              style={styles.otpBox}
              value={value}
              onChangeText={(text) =>
                handleChange(text.replace(/[^0-9]/g, ""), index)
              }
              keyboardType="number-pad"
              maxLength={1}
            />
          ))}
        </View>

        {/* Autofill (SVG) + Resend Row */}
        <View style={styles.rowButtons}>
          {/* SVG Icon as button */}
          <TouchableOpacity
            onPress={handleAutofill}
            style={[styles.equalButton, styles.svgWrapper]}
          >
            <Group259 width={width * 0.35} height={50} />
          </TouchableOpacity>

          {/* Resend OTP text button */}
          <TouchableOpacity
            style={[styles.equalButton, styles.textButton]}
            onPress={handleResend}
          >
            <Text style={styles.smallButtonText}>Resend OTP</Text>
          </TouchableOpacity>
        </View>
        
        {/* <Text style={styles.debug}>Debug OTP: {otp}</Text> */}
      </View>

      {/* Login Button fixed at bottom */}
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={[
            styles.loginButton,
            otpValues.join("").length < 6 && styles.loginButtonDisabled,
          ]}
          onPress={handleVerify}
          disabled={otpValues.join("").length < 6 || loading}
        >
          {loading ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.loginButtonText}>LOGIN NOW</Text>
          )}
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  keyboardAvoidingContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#024F7D",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 30,
    height: 30,
  },
  img: {
    width: width * 0.7,
    height: width * 0.1,
  },
  subtitle: {
    fontSize: 15,
    color: "#fff",
    marginBottom: 20,
    textAlign: "center",
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "85%",
    marginBottom: 10,
  },
  otpBox: {
    width: width / 8.5,
    height: width / 7,
    marginHorizontal: 3,
    backgroundColor: "#084469",
    borderBottomWidth: 2,
    borderColor: "#fff",
    fontSize: 22,
    color: "#fff",
    textAlign: "center",
  },
  rowButtons: {
    flexDirection: "row",
    width: "85%",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  equalButton: {
    flex: 1,
    marginHorizontal: 5,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
  },
  svgWrapper: {
    backgroundColor: "transparent",
  },
  textButton: {
    backgroundColor: "#E0E0E0",
  },
  smallButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  debug: {
    marginTop: 20,
    color: "yellow",
    fontSize: 12,
  },
  bottomContainer: {
    backgroundColor: "#024F7D",
    padding: 15,
    paddingBottom: Platform.OS === "ios" ? 30 : 15,
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  loginButton: {
    backgroundColor: "#E0E0E0",
    paddingVertical: 15,
    alignItems: "center",
    borderRadius: 5,
    width: "40%",
    alignSelf: "center",
  },
  loginButtonText: {
    color: "#000",
    fontWeight: "bold",
    fontSize: 16,
  },
  loginButtonDisabled: {
    opacity: 0.5,
  },
});
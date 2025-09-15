import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "../types/navigation";
// Screens
import LoginScreen from "../screens/LoginScreen";
import OtpScreen from "../screens/OtpScreen";
import PaymentLeaveScreen from "../screens/PaymentLeaveScreen";
import DailyUpdateScreen from "../screens/DailyUpdateScreen";
import HomeTabs from "../screens/HomeScreen"; // your bottom tabs


const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
<Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* Auth flow */}
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Otp" component={OtpScreen} />

      {/* After login + OTP */}
      <Stack.Screen name="DailyUpdate" component={DailyUpdateScreen} />
      <Stack.Screen name="PaymentLeave" component={PaymentLeaveScreen} />

      {/* Final app tabs */}
      <Stack.Screen name="HomeTabs" component={HomeTabs} />
    </Stack.Navigator>
  );
}

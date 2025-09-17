import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import PaymentLeaveScreen from "../screens/PreHome/PaymentLeaveScreen";
import DailyUpdateScreen from "../screens/PreHome/DailyUpdateScreen";
import AppNavigator from "./AppNavigator";

export type PreHomeStackParamList = {
  PaymentLeave: undefined;
  DailyUpdate: undefined;
  App: undefined;
};

const PreHomeStack = createStackNavigator<PreHomeStackParamList>();

export default function PreHomeNavigator() {
  return (
    <PreHomeStack.Navigator
      initialRouteName="PaymentLeave"
      screenOptions={{ headerShown: false }}
    >
      <PreHomeStack.Screen name="PaymentLeave" component={PaymentLeaveScreen} />
      <PreHomeStack.Screen name="DailyUpdate" component={DailyUpdateScreen} />
      <PreHomeStack.Screen name="App" component={AppNavigator} />
    </PreHomeStack.Navigator>
  );
}

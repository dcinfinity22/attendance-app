import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import AuthNavigator from "./AuthNavigator";
import PreHomeNavigator from "./PreHomeNavigator";
import { RootStackParamList } from "../types/navigation";
import { AuthContext } from "../context/AuthContext";

const RootStack = createStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  const { isLoggedIn } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <RootStack.Screen name="Auth" component={AuthNavigator} />
        ) : (
          <RootStack.Screen name="PreHome" component={PreHomeNavigator} />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
}

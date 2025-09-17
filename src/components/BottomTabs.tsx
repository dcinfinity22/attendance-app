import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faListCheck,
  faBell,
  faUser,
  faClockRotateLeft,
} from "@fortawesome/free-solid-svg-icons";

import HomeScreen from "../screens/Main/DashboardScreen";
import CompanyUpdateScreen from "../screens/Main/CompanyUpdates";
import ProfileScreen from "../screens/Main/ProfileScreen"; // Example, you can replace

import { colors } from "../theme";
import TodoScreens from "../screens/Main/TodoScreens";
import HistoryScreen from "../screens/Main/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true, 
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopWidth: 0,
          height: 60,
          marginBottom:60,
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "#aaa",
      }}
    >
    
     <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarLabel: "Home",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHome} size={size ?? 16} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Todo"
        component={TodoScreens}
        options={{
          tabBarLabel: "Todo",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faListCheck} size={size ?? 16} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="CompanyUpdate"
        component={CompanyUpdateScreen}
        options={{
          tabBarLabel: "C.Updates",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faBell} size={size ?? 16} color={color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faUser} size={size ?? 16} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faClockRotateLeft} size={size ?? 16} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

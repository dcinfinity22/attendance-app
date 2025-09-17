import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClipboardList,
  faSync,
  faQuestionCircle,
  faUser,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";

import DashboardScreen from "../screens/Main/DashboardScreen";
import UpdatesScreen from "../screens/Main/CompanyUpdates";
import HRSupportScreen from "../screens/Main/HrSupport";
import ProfileScreen from "../screens/Main/ProfileScreen";
import HistoryScreen from "../screens/Main/HistoryScreen";

const Tab = createBottomTabNavigator();

export default function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen
        name="Dashboard"
        component={DashboardScreen}
        options={{
          tabBarLabel: "To do",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faClipboardList}
              size={size ?? 20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="CUpdates"
        component={UpdatesScreen}
        options={{
          tabBarLabel: "C.Updates",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faSync}
              size={size ?? 20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="HRSupport"
        component={HRSupportScreen}
        options={{
          tabBarLabel: "HR Support",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faQuestionCircle}
              size={size ?? 20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          tabBarLabel: "Profile",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faUser}
              size={size ?? 20}
              color={color}
            />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={HistoryScreen}
        options={{
          tabBarLabel: "History",
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon
              icon={faHistory}
              size={size ?? 20}
              color={color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

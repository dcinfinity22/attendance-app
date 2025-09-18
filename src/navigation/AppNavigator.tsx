import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faHome,
  faCalendarCheck,
  faSync,
  faQuestionCircle,
  faUser,
  faHistory,
} from "@fortawesome/free-solid-svg-icons";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
// Screens
import DashboardScreen from "../screens/Main/DashboardScreen";
import ToDoScreen from "../screens/Main/TodoScreens";
import CreateTodo from "../screens/Main/CreateTodo";
import UpdatesScreen from "../screens/Main/CompanyUpdates";
import HrSupportScreen from "../screens/Main/HrSupport";
import ProfileScreen from "../screens/Main/ProfileScreen";
import HistoryScreen from "../screens/Main/HistoryScreen";
import AboutScreen from "../screens/Main/AboutScreen";
import HolidayListScreen from "../screens/Main/HolidayListScreen";
import { colors } from "../theme";
// Drawer
import CustomDrawerContent from "../components/CustomDrawerContent";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const ToDoStack = createStackNavigator();
// ✅ ToDo Stack (for ToDo + CreateTodo)
function ToDoStackNavigator() {
  return (
    <ToDoStack.Navigator screenOptions={{ headerShown: false }}>
      <ToDoStack.Screen name="ToDoMain" component={ToDoScreen} />
      <ToDoStack.Screen name="CreateTodo" component={CreateTodo} />
    </ToDoStack.Navigator>
  );
}
function BottomTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: "#fff",
        tabBarInactiveTintColor: "#ddd",
        tabBarStyle: { backgroundColor: colors.panel },
        tabBarIcon: ({ color, size }) => {
          let icon: IconProp = faHome; // default fallback ✅

          if (route.name === "Dashboard") icon = faHome;
          else if (route.name === "ToDo") icon = faCalendarCheck;
          else if (route.name === "CUpdates") icon = faSync;
          else if (route.name === "HRSupport") icon = faQuestionCircle;
          else if (route.name === "Profile") icon = faUser;
          else if (route.name === "History") icon = faHistory;

          return <FontAwesomeIcon icon={icon} size={size ?? 20} color={color} />;
        },
      })}
    >
      {/* ✅ Now Dashboard & ToDo are separate */}
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="ToDo" component={ToDoStackNavigator} />
      <Tab.Screen name="CUpdates" component={UpdatesScreen} />
      <Tab.Screen name="HRSupport" component={HrSupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "front", // ✅ overlay drawer
        drawerStyle: {
          width: 250,
          marginTop: 36, // ✅ drawer niche se start karega
          marginBottom: 93, // ✅ bottom tabs ke upar khatam hoga
          backgroundColor: "#fff",
          zIndex:111,
        },
        overlayColor: "transparent", // ✅ dark overlay hata diya
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}
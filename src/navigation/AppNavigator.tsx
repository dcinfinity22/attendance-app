import React from "react";
import { View, Dimensions } from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

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
import AttendanceScreen from "../screens/Main/AttendanceScreen";
import LeaveMgmt from "../screens/Main/LeaveMgmt";
import MeetingVisit from "../screens/Main/MeetingVisit";
import MasterEye from "../screens/Main/MasterEye";
import EmpTrackingScreen from "../screens/Main/EmpTrackingScreen";
import NotificationsHello from "../screens/Main/NotificationsHello";
import DailyAttendanceScreen from "../screens/Main/DailyAttendance";
import AttendanceStatus from "../screens/Main/AttendanceStatus";
import LeaveRequest from "../screens/Main/LeaveRequest";
import CheckInScreen from "../screens/Main/CheckInScreen";

const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();
const ToDoStack = createStackNavigator();
const HomeStack = createStackNavigator();
const AttendanceStack = createStackNavigator();
const DailyAttendanceStack = createStackNavigator();

// ✅ ToDo Stack
function ToDoStackNavigator() {
  return (
    <ToDoStack.Navigator screenOptions={{ headerShown: false }}>
      <ToDoStack.Screen name="ToDoMain" component={ToDoScreen} />
      <ToDoStack.Screen name="Notification" component={NotificationsHello} />
      <ToDoStack.Screen name="CreateTodo" component={CreateTodo} />
    </ToDoStack.Navigator>
  );
}

// ✅ Daily Attendance Stack
function DailyAttendanceStackNavigator() {
  return (
    <DailyAttendanceStack.Navigator screenOptions={{ headerShown: false }}>
      <DailyAttendanceStack.Screen
        name="DailyAttendanceMain"
        component={DailyAttendanceScreen}
      />
      <DailyAttendanceStack.Screen name="CheckIn" component={CheckInScreen} />
      <DailyAttendanceStack.Screen
        name="Notification"
        component={NotificationsHello}
      />
      {/* <DailyAttendanceStack.Screen name="CheckOut" component={CreateTodo} />
      <DailyAttendanceStack.Screen name="OfficeOut" component={CreateTodo} /> */}
    </DailyAttendanceStack.Navigator>
  );
}

// ✅ Attendance Stack
function AttendanceStackNavigator() {
  return (
    <AttendanceStack.Navigator screenOptions={{ headerShown: false }}>
      <AttendanceStack.Screen
        name="AttendanceMgmtMain"
        component={AttendanceScreen}
      />

      {/* 🔥 Renamed to avoid duplicate name */}
      <AttendanceStack.Screen
        name="DailyAttendance"
        component={DailyAttendanceStackNavigator}
      />

      <AttendanceStack.Screen
        name="Notification"
        component={NotificationsHello}
      />
      <AttendanceStack.Screen
        name="AttendanceStatus"
        component={AttendanceStatus}
      />
      <AttendanceStack.Screen name="LeaveRequest" component={LeaveRequest} />
    </AttendanceStack.Navigator>
  );
}

// ✅ Home Stack
function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="DashboardMain" component={DashboardScreen} />
      <HomeStack.Screen name="Notification" component={NotificationsHello} />
      <HomeStack.Screen name="AttendanceMgmt" component={AttendanceStackNavigator} />
      <HomeStack.Screen name="LeaveMgmt" component={LeaveMgmt} />
      <HomeStack.Screen name="MeetingVisit" component={MeetingVisit} />
      <HomeStack.Screen name="Tracking" component={EmpTrackingScreen} />
      <HomeStack.Screen name="MasterEye" component={MasterEye} />
    </HomeStack.Navigator>
  );
}

// ✅ Bottom Tabs
function BottomTabs() {
  const insets = useSafeAreaInsets();

  return (
    <View style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#fff",
          tabBarInactiveTintColor: "#ddd",
          tabBarStyle: {
            backgroundColor: colors.panel,
            height: 55 + insets.bottom, // ✅ tabs height includes safe area
          },
          tabBarIcon: ({ color }) => {
            let icon: IconProp = faHome;

            if (route.name === "Home") icon = faHome;
            else if (route.name === "ToDo") icon = faCalendarCheck;
            else if (route.name === "C.Updates") icon = faSync;
            else if (route.name === "HR Support") icon = faQuestionCircle;
            else if (route.name === "Profile") icon = faUser;
            else if (route.name === "History") icon = faHistory;

            return <FontAwesomeIcon icon={icon} size={16} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeStackNavigator} />
        <Tab.Screen name="ToDo" component={ToDoStackNavigator} />
        <Tab.Screen name="C.Updates" component={UpdatesScreen} />
        <Tab.Screen name="HR Support" component={HrSupportScreen} />
        <Tab.Screen name="Profile" component={ProfileScreen} />
        <Tab.Screen name="History" component={HistoryScreen} />
      </Tab.Navigator>
    </View>
  );
}

// ✅ App Navigator
export default function AppNavigator() {
  const insets = useSafeAreaInsets();
  const screenHeight = Dimensions.get("window").height;
  const bottomTabHeight = 55 + insets.bottom;

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerType: "front",
        drawerStyle: {
          backgroundColor: "#fff",
          height: screenHeight - bottomTabHeight, // ✅ stops at top of BottomTabs
        },
        overlayColor: "transparent",
        headerShown: false,
      }}
    >
      <Drawer.Screen
        name="HomeTabs"
        component={BottomTabs}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="About"
        component={AboutScreen}
        options={{ headerShown: false }}
      />
      <Drawer.Screen
        name="HolidayList"
        component={HolidayListScreen}
        options={{ headerShown: false }}
      />
    </Drawer.Navigator>
  );
}

// src/navigation/AppTabs.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import DashboardScreen from '../screens/HomeScreen';
import NotificationScreen from '../screens/NotificationScreen';
import HistoryScreen from '../screens/HistoryScreen';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faBell, faHistory } from '@fortawesome/free-solid-svg-icons';

type TabParamList = {
  Dashboard: undefined;
  Notifications: undefined;
  History: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

export default function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: { backgroundColor: '#0E5C78' },
        tabBarActiveTintColor: '#ffffff',
        tabBarInactiveTintColor: '#ccc',
        tabBarIcon: ({ color, size }) => {
          const icons: Record<string, any> = {
            Dashboard: faHome,
            Notifications: faBell,
            History: faHistory,
          };
          return <FontAwesomeIcon icon={icons[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={DashboardScreen} />
      <Tab.Screen name="Notifications" component={NotificationScreen} />
      <Tab.Screen name="History" component={HistoryScreen} />
    </Tab.Navigator>
  );
}

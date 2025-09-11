import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the stack param list
type RootStackParamList = {
  LoginPassword: undefined;
  LoginOTP: undefined;
  Home: { screen: keyof TabParamList; params?: any };
  Notifications: undefined;
};

// Define the tab param list for Home
type TabParamList = {
  Dashboard: undefined;
  Notifications: undefined;
  History: undefined;
};

// Type the route prop to include the required 'key' property
type TabRouteProp = RouteProp<TabParamList, keyof TabParamList> & { key: string };

const NotificationScreen = () => {
  const navigation = useNavigation<NativeStackScreenProps<RootStackParamList, 'Home'>['navigation']>();
  const route = useRoute<TabRouteProp>();

  const isHistory = route.name === 'History';

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Mohit</Text>
      <Text style={styles.title}>Important {isHistory ? 'History' : 'Notification'}</Text>
      <View style={styles.notificationBox}>
        <Text style={styles.noUpdate}>There is no {isHistory ? 'history' : 'update'}</Text>
      </View>
      <TouchableOpacity onPress={() => navigation.navigate('Home', { screen: 'Dashboard' as const })}>
        <Text style={styles.back}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#003366', padding: 20 },
  greeting: { color: '#fff', fontSize: 24 },
  title: { color: '#fff', fontSize: 20, marginBottom: 20 },
  notificationBox: { backgroundColor: '#001f3f', padding: 20, borderRadius: 5, flex: 1, justifyContent: 'center' },
  noUpdate: { color: '#fff', textAlign: 'center' },
  back: { color: '#fff', textAlign: 'center', marginTop: 20 },
});

export default NotificationScreen;
import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faCalendar, faUsers, faMapMarker, faList, faEye, faBriefcase, faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../components/MenuItem';
import CustomHeader from '../components/CustomHeader';
import Banner from '../components/Banner';
import {colors} from '../theme';

const DashboardScreen = ({ navigation }: any) => {
  const handleMenuPress = () => {
    // Open drawer or menu
    console.log("Menu pressed");
  };

  const handleNotifPress = () => {
    // Go to notifications screen
    navigation.navigate("DailyUpdate");
  };
  return (
    <View style={styles.container}>
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />
      <Banner />
      <Text style={styles.menuTitle}>Crewcam Service Menu</Text>
      <ScrollView>
        <MenuItem icon={faClock} title="Attendance Management" />
        <MenuItem icon={faCalendar} title="Leave Management" />
        <MenuItem icon={faUsers} title="Meeting & Site Visit" />
        <MenuItem icon={faMapMarker} title="Employee Live Tracking" />
        <MenuItem icon={faList} title="Request List" />
        <MenuItem icon={faEye} title="Master Eye" />
        <MenuItem icon={faBriefcase} title="DHIPL Projects" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  logo: { color: '#fff', fontSize: 24 },
  headerIcons: { flexDirection: 'row', gap: 10 },
  icon: { marginLeft: 10 },
  menuTitle: { color: '#fff', fontSize: 20, padding: 10 },
});

export default DashboardScreen;
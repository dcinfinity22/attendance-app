import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faClock, faCalendar, faUsers, faMapMarker, faList, faEye, faBriefcase, faEnvelope, faBell, faUser } from '@fortawesome/free-solid-svg-icons';
import MenuItem from '../components/MenuItem';
import Banner from '../components/Banner';

const DashboardScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>CREWCAM</Text>
        <View style={styles.headerIcons}>
          <FontAwesomeIcon icon={faEnvelope} size={20} color="#fff" style={styles.icon} />
          <FontAwesomeIcon icon={faBell} size={20} color="#fff" style={styles.icon} />
          <FontAwesomeIcon icon={faUser} size={20} color="#fff" style={styles.icon} />
        </View>
      </View>
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
  container: { flex: 1, backgroundColor: '#003366' },
  header: { flexDirection: 'row', justifyContent: 'space-between', padding: 10, alignItems: 'center' },
  logo: { color: '#fff', fontSize: 24 },
  headerIcons: { flexDirection: 'row', gap: 10 },
  icon: { marginLeft: 10 },
  menuTitle: { color: '#fff', fontSize: 20, padding: 10 },
});

export default DashboardScreen;
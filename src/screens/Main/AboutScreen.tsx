import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';

const AboutScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
          <FontAwesomeIcon icon={faArrowLeft} size={24} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>About Us</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.iconButton}>
          <FontAwesomeIcon icon={faHome} size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.scrollView}>
        {/* About Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>About us</Text>
          <Text style={styles.sectionText}>
            Live attendance In Time and Out Time update feature with photo and location.
            Employee location Tracking.
            Employee see their Attendance Summary.
            Employee can apply their leaves easily.
            Employee can see their leave status its approve or not.
          </Text>
        </View>

        {/* App Info Section */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>App info</Text>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Version</Text>
            <Text style={styles.infoValue}>31</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Updated On</Text>
            <Text style={styles.infoValue}>20 October 2021</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Downloads</Text>
            <Text style={styles.infoValue}>100+</Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Offered by</Text>
            <Text style={styles.infoValue}>Design House India Pvt. Ltd.</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#363435',
    paddingHorizontal: 16,
    height: 40, // Set the header height to 40
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  iconButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  scrollView: {
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 8,
    color: '#222',
  },
  sectionText: {
    fontSize: 15,
    lineHeight: 22,
    color: '#555',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  infoLabel: {
    fontSize: 15,
    color: '#777',
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: '#333',
    textAlign: 'right',
  },
});

export default AboutScreen;
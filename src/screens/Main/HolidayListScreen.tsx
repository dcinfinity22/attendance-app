import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { faArrowLeft, faHome } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { colors } from '../../theme';

// Centralized data for reusability
const HOLIDAYS_DATA = [
  { date: '26 Jan 2025', name: 'Republic Day' },
  { date: '14 Mar 2025', name: 'Holi' },
  { date: '09 Aug 2025', name: 'Raksha Bandhan', note: '(Hindu Employee only)' },
  { date: '15 Aug 2025', name: 'Independence Day' },
  { date: '02 Oct 2025', name: 'Gandhi Jayanti' },
  { date: '02 Oct 2025', name: 'Dussehra' },
  { date: '21 Oct 2025', name: 'Diwali' },
  { date: '23 Oct 2025', name: 'Bhai Duj', note: '(Hindu Employee only)' },
  { date: '30 Mar 2025', name: 'Idul Fitr', note: '(Muslim Employee only)' },
  { date: '06 Jun 2025', name: 'Bakrid/ EID al Adha', note: '(Muslim Employee Only) off' },
];

// Reusable Header Component
const AppHeader = ({ title, onBackPress, onHomePress }:any) => (
  <View style={styles.appHeader}>
    <TouchableOpacity onPress={onBackPress} style={styles.iconButton}>
      <FontAwesomeIcon icon={faArrowLeft} size={20} color="#fff" />
    </TouchableOpacity>
    <Text style={styles.headerTitle}>{title}</Text>
    <TouchableOpacity onPress={onHomePress} style={styles.iconButton}>
      <FontAwesomeIcon icon={faHome} size={20} color="#fff" />
    </TouchableOpacity>
  </View>
);

// Reusable Holiday List Item Component
const HolidayItem = ({ holiday }:any) => (
  <View style={styles.holidayItem}>
    <View style={styles.dateContainer}>
      <Text style={styles.holidayDate}>{holiday.date}</Text>
    </View>
    <View style={styles.holidayNameContainer}>
      <Text style={styles.holidayName}>{holiday.name}</Text>
      {holiday.note && (
        <Text style={styles.holidayNote}>{holiday.note}</Text>
      )}
    </View>
  </View>
);

const HolidayListScreen = ({ navigation }:any) => {
  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <AppHeader
        title="Company Holiday List"
        onBackPress={() => navigation.goBack()}
        onHomePress={() => navigation.navigate('Home')}
      />

      {/* Greeting Section */}
      <View style={styles.greetingSection}>
        <Text style={styles.greetingText}>Hi, Ajith</Text>
      </View>

      {/* Holiday List */}
      <ScrollView style={styles.scrollView}>
        {HOLIDAYS_DATA.map((holiday, index) => (
          <HolidayItem key={index} holiday={holiday} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#363435',
    paddingHorizontal: 16,
    height: 40, // Height changed to 40
  },
  iconButton: {
    padding: 10,
  },
  headerTitle: {
    fontSize: 16, // Font size adjusted for the smaller header
    fontWeight: '600',
    color: '#EAF0F6',
  },
  greetingSection: {
    paddingHorizontal: 20,
    paddingVertical: 10, // Padding adjusted for the smaller text
  },
  greetingText: {
    fontSize: 13, // Font size changed to 13
    fontWeight: 'bold',
    color: '#EAF0F6',
  },
  scrollView: {
    flex: 1,
  },
  holidayItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panel,
    borderRadius: 8,
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginHorizontal: 16,
    marginBottom: 12,
  },
  dateContainer: {
    width: 110,
  },
  holidayDate: {
    color: '#4DA6FF',
    fontSize: 16,
    fontWeight: 'bold',
    flexWrap: 'wrap',
  },
  holidayNameContainer: {
    flex: 1,
    marginLeft: 20,
  },
  holidayName: {
    color: '#EAF0F6',
    fontSize: 14,
    fontWeight: '500',
  },
  holidayNote: {
    color: '#869AB5',
    fontSize: 10,
    marginTop: 2,
  },
});

export default HolidayListScreen;
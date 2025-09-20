import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DateTimePicker,{ DateTimePickerEvent } from '@react-native-community/datetimepicker';
import moment from 'moment';
import { colors } from '../../theme';
import { DrawerActions } from "@react-navigation/native"
import CustomHeader from '../../components/CustomHeader';
// Define the type for a single day's record
type DailyRecord = {
  status: string;
  checkIn: string;
  checkOut: string;
  hours: string;
  user: string;
};

// Mock data
const mockData: { [key: string]: DailyRecord } = {
  '2025-09-19': {
    status: 'P',
    checkIn: '09:56',
    checkOut: '09:56',
    hours: '0:0',
    user: 'Crewcam',
  },
  '2025-09-18': {
    status: 'Present',
    checkIn: '09:56',
    checkOut: '19:00',
    hours: '9:4',
    user: 'Crewcam',
  },
  '2025-09-17': {
    status: 'Present',
    checkIn: '09:57',
    checkOut: '19:00',
    hours: '9:3',
    user: 'Crewcam',
  },
  '2025-09-16': {
    status: 'Present',
    checkIn: '09:57',
    checkOut: '20:06',
    hours: '10:10',
    user: 'Crewcam',
  },
  '2025-09-15': {
    status: 'Leave',
    checkIn: '09:58',
    checkOut: '19:20',
    hours: '9:21',
    user: 'Crewcam',
  },
  '2025-09-14': {
    status: 'Present',
    checkIn: '00:00',
    checkOut: '00:00',
    hours: '0:0',
    user: 'Vijay',
  },
  '2025-09-13': {
    status: 'Present',
    checkIn: '00:00',
    checkOut: '00:00',
    hours: '0:0',
    user: 'Vijay',
  },
  '2025-09-12': {
    status: 'Present',
    checkIn: '09:57',
    checkOut: '19:15',
    hours: '9:17',
    user: 'Crewcam',
  },
  '2025-09-11': {
    status: 'Present',
    checkIn: '09:59',
    checkOut: '19:05',
    hours: '9:6',
    user: 'Crewcam',
  },
  '2025-09-10': {
    status: 'Present',
    checkIn: '09:59',
    checkOut: '19:03',
    hours: '9:3',
    user: 'Crewcam',
  },
  '2025-09-09': {
    status: 'Present',
    checkIn: '09:57',
    checkOut: '19:12',
    hours: '9:14',
    user: 'Crewcam',
  },
};

const attendanceSummary = [
  { name: 'Present Days', code: 'P', nos: 31, rule: '31/2', days: 15.5 },
  { name: 'Late Coming', code: 'LC', nos: 0, rule: '0/2', days: 0.0 },
  { name: 'Week off-Present', code: 'WP', nos: 0, rule: '0/2', days: 0.0 },
  { name: 'Week off Days', code: 'WO', nos: 2, rule: '2/2', days: 1.0 },
  { name: 'Holiday Present', code: 'HP', nos: 0, rule: '0/2', days: 0.0 },
  { name: 'Holiday Days', code: 'H', nos: 0, rule: '0/2', days: 0.0 },
  { name: 'Absent Days', code: 'AB', nos: 0, rule: '0/0', days: 0.0 },
  { name: 'Office Leave', code: 'L', nos: 6, rule: '6/2', days: 3.0 },
  { name: 'Job Not Complete', code: 'JNC', nos: 0, rule: '0/2', days: 0.0 },
  { name: 'Paid Leave', code: 'PL', nos: 0, rule: '0/2', days: 0.0 },
];

const salaryDetails = [
  { left: 'Monthly CTC', right: 'Earn CTC' },
  { left: 'Gross Salary', right: 'ESI Contribution' },
  { left: 'PF Contribution', right: 'OT Salary' },
  { left: 'Incentive Amt.', right: 'Earned Salary' },
  { left: 'TDS Deduction', right: 'Loan Installment' },
  { left: 'Advance for Expense', right: 'Expense Received' },
  { left: 'Adv. Salary deduction', right: 'Penalty deduction' },
  { left: 'Net Payable Salary', right: 'Loan Balance' },
];

const HistoryScreen = ({ navigation }: any) => {


  const [date, setDate] = useState(new Date('2025-09-19T11:00:00Z'));
  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDate(currentDate);
  };

  const showDatepicker = () => {
    setShowPicker(true);
  };

  const filteredData = Object.keys(mockData)
    .filter(d => moment(d).isSame(date, 'month'))
    .sort((a, b) => moment(b).diff(moment(a)))
    .reduce<{ [key: string]: DailyRecord }>((obj, key) => {
      obj[key] = mockData[key];
      return obj;
    }, {});
  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Open Drawer
  };

  const handleNotifPress = () => {
    navigation.navigate("Updates"); // Example navigation
  };

  return (
    <SafeAreaView style={styles.safeArea}>
    <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>Hi, Ajit</Text>
            <Text style={styles.headerSubtitle}>
              He-re is your monthly presence details. If you have any discrepancy
              regarding details, please contact the HR Department for amendment.
            </Text>
          </View>
          <Image
            source={{ uri: 'https://i.imgur.com/GzQ58oN.png' }}
            style={styles.headerImage}
          />
        </View>

        {/* Month Selector & Score */}
        <View style={styles.infoContainer}>
          <View style={styles.monthSelector}>
            <Text style={styles.infoLabel}>Select Month</Text>
            <TouchableOpacity
              onPress={showDatepicker}
              style={styles.pickerButton}>
              <Text style={styles.pickerText}>
                {moment(date).format('YYYY-MMM')}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={styles.scoreBox}>
            <Text style={styles.infoLabel}>Attendance Score</Text>
            <Text style={styles.scoreText}>46.66/20</Text>
          </View>
        </View>

        {/* Daily Details */}
        <View style={styles.tableContainer}>
          <View style={styles.tableTitle}>
            <Text style={styles.tableTitleText}>
              Design House India Pvt. Ltd.
            </Text>
          </View>
          <View style={styles.tableHeader}>
            <Text style={styles.tableHeaderText}>DATE</Text>
            <Text style={styles.tableHeaderText}>INTIME</Text>
            <Text style={styles.tableHeaderText}>OUTIME</Text>
            <Text style={styles.tableHeaderText}>HOURS</Text>
            <Text style={styles.tableHeaderText}>USER</Text>
          </View>
          {Object.keys(filteredData).length > 0 ? (
            Object.keys(filteredData).map((d, index) => (
              <View
                key={d}
                style={[
                  styles.tableRow,
                  index % 2 === 1 && styles.tableRowOdd,
                ]}>
                <Text style={styles.tableCell}>
                  {moment(d).format('DD MMM')}
                </Text>
                <Text style={styles.tableCell}>
                  {filteredData[d].checkIn === '00:00'
                    ? filteredData[d].status
                    : filteredData[d].checkIn}
                </Text>
                <Text style={styles.tableCell}>{filteredData[d].checkOut}</Text>
                <Text style={styles.tableCell}>{filteredData[d].hours}</Text>
                <Text style={styles.tableCell}>{filteredData[d].user}</Text>
              </View>
            ))
          ) : (
            <View style={styles.noDataRow}>
              <Text style={styles.noDataText}>
                No data available for this month.
              </Text>
            </View>
          )}
        </View>

        {/* Attendance Summary */}
        <View style={[styles.tableContainer, styles.marginTop]}>
          <View style={styles.attendanceHeader}>
            <Text style={styles.attendanceNameHeader}>Attendance Name</Text>
            <Text style={styles.smallHeader}>Code</Text>
            <Text style={styles.smallHeader}>Nos.</Text>
            <Text style={styles.smallHeader}>Rule</Text>
            <Text style={styles.smallHeader}>Days</Text>
          </View>
          {attendanceSummary.map((item, index) => (
            <View
              key={index}
              style={[
                styles.tableRow,
                index % 2 === 1 && styles.tableRowOdd,
              ]}>
              <Text style={styles.attendanceNameCell}>{item.name}</Text>
              <Text style={styles.smallCell}>{item.code}</Text>
              <Text style={styles.smallCell}>{item.nos}</Text>
              <Text style={styles.smallCell}>{item.rule}</Text>
              <Text style={styles.smallCell}>{item.days}</Text>
            </View>
          ))}
        </View>

        {/* Salary Details */}
        <View style={[styles.tableContainer, styles.marginTop]}>
          <View style={styles.salaryContainer}>
            {salaryDetails.map((item, index) => (
              <View
                key={index}
                style={[
                  styles.salaryRow,
                  index % 2 === 1 && styles.salaryRowOdd,
                ]}>
                <View style={styles.salaryCell}>
                  <Text style={styles.salaryText}>{item.left}</Text>
                  <Text style={styles.salaryValue}>-</Text>
                </View>
                <View style={styles.salaryCell}>
                  <Text style={styles.salaryText}>{item.right}</Text>
                  <Text style={styles.salaryValue}>-</Text>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Date Picker */}
        {showPicker && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#115C7C',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  header: {
    backgroundColor: '#115C7C',
    paddingHorizontal: 20,
    paddingVertical: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    color: '#fff',
    fontWeight: 400,
  },
  headerSubtitle: {
    fontSize: 13,
    color: '#fff',
    marginTop: 5,
    lineHeight: 18,
    flexShrink: 1,
  },
  headerImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginLeft: 15,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    margin: 15,
  },
  monthSelector: {
    flex: 1,
    marginRight: 10,
  },
  scoreBox: {
    flex: 1,
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 14,
    color: '#fff',
    marginBottom: 5,
  },
  pickerButton: {
    backgroundColor: '#21698D',
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
  },
  pickerText: {
    fontSize: 16,
    fontWeight: 400,
    color: '#fff',
  },
  scoreText: {
    fontSize: 18,
    fontWeight: 400,
    color: '#fff',
    textAlign: 'center',
    backgroundColor: '#21698D',
    padding: 10,
    height: 40,
  },
  tableContainer: {
    marginHorizontal: 15,
    borderRadius: 8,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#5D93B5',
    marginTop: 15,
  },
  tableTitle: {
    backgroundColor: colors.panel,
    paddingVertical: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#5D93B5',
  },
  tableTitleText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 400,
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#186481',
    borderBottomWidth: 1,
    borderBottomColor: '#5D93B5',
  },
  tableHeaderText: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#5D93B5',
    alignItems: 'center',
  backgroundColor: colors.panel,
  },
  tableRowOdd: {
  backgroundColor: colors.panel,
  },
  tableCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
  noDataRow: {
    padding: 20,
    alignItems: 'center',
      backgroundColor: colors.panel,
  },
  noDataText: {
    color: '#fff',
    fontStyle: 'italic',
  },
  marginTop: {
    marginTop: 20,
  },
  salaryContainer: {
    padding: 10,
   backgroundColor: colors.panel,
  },
  salaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#5D93B5',
  },
  salaryRowOdd: {
    backgroundColor: colors.panel,
  },
  salaryCell: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    paddingHorizontal: 5,
  },
  salaryText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
  },
  salaryValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 400,
  },
  attendanceHeader: {
    flexDirection: 'row',
    backgroundColor: '#186481',
    borderBottomWidth: 1,
    borderBottomColor: '#5D93B5',
  },
  attendanceNameHeader: {
    flex: 2.5,
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
  smallHeader: {
    flex: 1,
    fontSize: 12,
    fontWeight: 400,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
  attendanceNameCell: {
    flex: 2.5,
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
  smallCell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 12,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: '#5D93B5',
  },
});

export default HistoryScreen;
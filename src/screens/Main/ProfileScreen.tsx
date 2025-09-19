import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Progress from "react-native-progress";
import Icon from "react-native-vector-icons/FontAwesome5";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../theme"; // ✅ your theme colors
import { SafeAreaView } from "react-native-safe-area-context";

// Navigation type
type RootStackParamList = { Dashboard: undefined };
type NavigationProp = StackNavigationProp<RootStackParamList>;

const ProfileScreen = () => {
  const [activeTab, setActiveTab] = useState("OFFICE");
  const tabs = ["OFFICE", "PERSONAL", "ACCOUNT", "SCORE"];
  const navigation = useNavigation<NavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };
  const handleNotifPress = () => {
    navigation.navigate("Dashboard");
  };

  return (
    <SafeAreaView style={styles.container}>
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Greeting */}
        <View style={styles.greetingBox}>
          <Text style={styles.greeting}>Hi, Mohit 👋</Text>
          <Text style={styles.subText}>
            Here are your personal details. If you find any discrepancy, please
            contact HR department for amendment.
          </Text>
        </View>

        {/* Tabs */}
        <View style={styles.tabContainer}>
          {tabs.map((tab) => (
            <TouchableOpacity
              key={tab}
              onPress={() => setActiveTab(tab)}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === tab && styles.activeTabText,
                ]}
                numberOfLines={1}
              >
                {tab}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* OFFICE TAB → Table Layout */}
        {activeTab === "OFFICE" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>🏢 Office Details</Text>
            <View style={styles.table}>
              <TableRow label1="Full Name" value1="Mohit Tyagi" label2="Unique ID" value2="DHIPL/20/017" />
              <TableRow label1="Designation" value1="Software Developer" label2="Department" value2="Software Development" />
              <TableRow label1="Office No" value1="8057965238" label2="Email" value2="web@namogange.org" />
              <TableRow label1="Reporting Boss" value1="Mr. Vijay Sharma" label2="Boss Contact" value2="9810247319" />
              <TableRow label1="Joining Date" value1="28 Dec 2016" label2="Location" value2="Delhi, India" />
            </View>
          </View>
        )}

        {/* SCORE TAB */}
        {activeTab === "SCORE" && (
          <View style={styles.card}>
            <Text style={styles.sectionTitle}>📊 Performance Score</Text>
            <ProgressItem label="Work Attendance" value={122} total={240} />
            <ProgressItem label="Ambition / Initiative" value={1} total={100} />
            <ProgressItem label="Productivity / Deadlines" value={8} total={300} />
            <ProgressItem label="Quality of Work" value={9} total={100} />
            <ProgressItem label="Focus towards Tasks" value={8} total={40} />
            <ProgressItem label="Stress Management" value={7} total={40} />
            <ProgressItem label="Reliability" value={8} total={100} />
            <ProgressItem label="Achievements" value={9} total={100} />
            <ProgressItem label="Knowledge Level" value={7} total={40} />
            <ProgressItem label="Company Oriented" value={7} total={150} />
            <ProgressItem label="Cooperation" value={9} total={40} />
            <ProgressItem label="Communication Skills" value={7} total={100} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

// ✅ Table Row (4 columns: label, value, label, value)
const TableRow = ({ label1, value1, label2, value2 }: any) => (
  <View style={styles.row}>
    <Text style={styles.cellLabel}>{label1}</Text>
    <Text style={styles.cellValue}>{value1}</Text>
    <Text style={styles.cellLabel}>{label2}</Text>
    <Text style={styles.cellValue}>{value2}</Text>
  </View>
);

// ✅ Progress Item
const ProgressItem = ({ label, value, total }: any) => {
  const progress = value / total;
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>
        {label}: <Text style={styles.value}>{value + " / " + total}</Text>
      </Text>
      <Progress.Bar
        progress={progress}
        width={null}
        height={8}
        borderRadius={5}
        color={colors.panel}
        unfilledColor="#e0e0e0"
      />
    </View>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  greetingBox: {
    padding: 20,
    backgroundColor: "#fff",
    borderRadius: 12,
    margin: 15,
    elevation: 3,
  },
  greeting: { fontSize: 22, fontWeight: "bold", color: colors.panel },
  subText: { fontSize: 14, color: "#555", marginTop: 5 },
  tabContainer: {
    flexDirection: "row",
    marginHorizontal: 15,
    marginBottom: 15,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 4,
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
    alignItems: "center",
  },
  activeTab: { backgroundColor: colors.panel },
  tabText: { color: "#333", fontWeight: "600", fontSize: 13 },
  activeTabText: { color: "#fff" },
  card: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 15,
    marginBottom: 20,
    elevation: 4,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: colors.panel,
  },
  // ✅ Table styles
  table: { borderTopWidth: 1, borderColor: "#ddd" },
  row: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
    paddingVertical: 10,
  },
  cellLabel: {
    flex: 1,
    fontWeight: "600",
    color: "#555",
    fontSize: 13,
  },
  cellValue: {
    flex: 1,
    color: "#000",
    fontSize: 13,
  },
  label: { fontWeight: "600", color: "#333" },
  value: { color: "#555" },
});

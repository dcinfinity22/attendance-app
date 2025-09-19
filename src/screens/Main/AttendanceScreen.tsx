import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../theme";
import CustomHeader from "../../components/CustomHeader";

type RootStackParamList = {
  DailyAttendance: undefined;
  AttendanceStatus: undefined;
  LeaveRequest: undefined;
  Notification: undefined;
};

type AttendanceMgmtScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DailyAttendance"
>;

const AttendanceMgmtScreen = () => {
  const navigation = useNavigation<AttendanceMgmtScreenNavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Drawer open
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification"); // ✅ Navigate back to Dashboard
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <CustomHeader
        onMenuPress={handleMenuPress}
        onNotifPress={handleNotifPress}
      />

      {/* Scrollable content */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.greeting}>Hi, Mohit</Text>
        <Text style={styles.subTitle}>
          Please select one of the options below
        </Text>

        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>👨‍💼⏰</Text>
        </View>

        <Text style={styles.goodEvening}>Good Evening Mohit !!</Text>

        {/* Attendance Options */}
        <OptionButton
          title="Daily Attendance"
          onPress={() => navigation.navigate("DailyAttendance")}
        />
        <OptionButton
          title="Attendance Status"
          onPress={() => navigation.navigate("AttendanceStatus")}
        />
        <OptionButton
          title="Leave Request"
          onPress={() => navigation.navigate("LeaveRequest")}
        />
      </ScrollView>
    </View>
  );
};

export default AttendanceMgmtScreen;

/* ------------------------
   Reusable Button
------------------------ */
const OptionButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => (
  <TouchableOpacity style={styles.button} onPress={onPress}>
    <Text style={styles.buttonText}>{title}</Text>
  </TouchableOpacity>
);

/* ------------------------
   Styles
------------------------ */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 20,
    alignItems: "center",
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    alignSelf: "flex-start",
  },
  subTitle: {
    fontSize: 14,
    color: "#e6e6e6",
    marginBottom: 20,
    alignSelf: "flex-start",
  },
  emojiContainer: {
    marginVertical: 15,
  },
  emoji: {
    fontSize: 60,
  },
  goodEvening: {
    fontSize: 18,
    fontWeight: "600",
    color: "#fff",
    marginBottom: 20,
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: colors.panel,
    marginBottom: 15,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

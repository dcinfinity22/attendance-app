import React from "react";
import { View, Text, ScrollView, StyleSheet } from "react-native";
import { DrawerActions } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faClock,
  faCalendar,
  faUsers,
  faMapMarker,
  faEye,
} from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuItem from "../../components/MenuItem";
import CustomHeader from "../../components/CustomHeader";
import Banner from "../../components/Banner";
import { colors } from "../../theme";

export default function DashboardScreen({ navigation }: any) {
  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Open Drawer
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification"); // ✅ Fixed route name
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <CustomHeader
        onMenuPress={handleMenuPress}
        onNotifPress={handleNotifPress}
      />

      {/* Banner */}
      <Banner />

      {/* Service Menu */}
      <Text style={styles.menuTitle}>Crewcam Service Menu</Text>
      <ScrollView>
        <MenuItem
          icon={faClock}
          title="Attendance Management"
          onPress={() => navigation.navigate("AttendanceMgmt")} // ✅ Navigates to new screen
        />
        <MenuItem
          icon={faCalendar}
          title="Leave Management"
          onPress={() => navigation.navigate("LeaveMgmt")} // (add screen later)
        />
        <MenuItem
          icon={faUsers}
          title="Meeting & Site Visit"
          onPress={() => navigation.navigate("MeetingVisit")} // (add screen later)
        />
        <MenuItem
          icon={faMapMarker}
          title="Employee Live Tracking"
          onPress={() => navigation.navigate("Tracking")} // (add screen later)
        />
        <MenuItem
          icon={faEye}
          title="Master Eye"
          onPress={() => navigation.navigate("MasterEye")} // (add screen later)
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  menuTitle: { color: "#fff", fontSize: 20, padding: 10 },
});

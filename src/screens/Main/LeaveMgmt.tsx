import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../theme";

type RootStackParamList = {
  UrgentLeave: undefined;
  CasualLeave: undefined;
  OutstationLeave: undefined;
  Notification: undefined;
};

type LeaveMgmtNavigationProp = StackNavigationProp<
  RootStackParamList,
  "UrgentLeave"
>;

const LeaveMgmt = () => {
  const navigation = useNavigation<LeaveMgmtNavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification");
  };

  return (
    <View style={styles.container}>
      {/* ✅ Fixed Custom Header */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      {/* ✅ Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hi, Mohit</Text>
        <Text style={styles.subTitle}>
          Please select one of the Leave options below.
        </Text>

        {/* Emoji / Icon */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>📅➕</Text>
        </View>
        <Text style={styles.goodMorning}>Good Morning Mohit !!</Text>

        {/* Leave Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("UrgentLeave")}
        >
          <Text style={styles.buttonText}>Urgent Leave</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CasualLeave")}
        >
          <Text style={styles.buttonText}>Casual Leave</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("OutstationLeave")}
        >
          <Text style={styles.buttonText}>Outstation Leave</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default LeaveMgmt;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
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
    marginVertical: 10,
  },
  emoji: {
    fontSize: 60,
  },
  goodMorning: {
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
    elevation: 3,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
  },
});

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
  AddMeeting: undefined;
  ScheduledMeeting: undefined;
  CreateMOM: undefined;
  MeetingHistory: undefined;
  AddSiteVisit: undefined;
  RecceHistory: undefined;
  Notification: undefined;
};

type MeetingVisitNavigationProp = StackNavigationProp<
  RootStackParamList,
  "AddMeeting"
>;

const MeetingVisit = () => {
  const navigation = useNavigation<MeetingVisitNavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification");
  };

  return (
    <View style={styles.container}>
      {/* ✅ Fixed Header */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      {/* ✅ Scrollable content */}
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Emoji / Icon */}
        <View style={styles.emojiContainer}>
          <Text style={styles.emoji}>👥</Text>
        </View>

        {/* Greeting */}
        <Text style={styles.goodMorning}>Good Morning Mohit !!</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddMeeting")}
        >
          <Text style={styles.buttonText}>Add New Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("ScheduledMeeting")}
        >
          <Text style={styles.buttonText}>Scheduled Meeting</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("CreateMOM")}
        >
          <Text style={styles.buttonText}>Create MoM's</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("MeetingHistory")}
        >
          <Text style={styles.buttonText}>Meeting History</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("AddSiteVisit")}
        >
          <Text style={styles.buttonText}>Add Site Visit</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default MeetingVisit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 20,
    alignItems: "center",
  },
  emojiContainer: {
    marginVertical: 20,
  },
  emoji: {
    fontSize: 80,
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
    borderRadius: 8,
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

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { colors, spacing } from "../theme";
import AppButton from "../components/AppButton";
import { DailyUpdateScreenProps } from "../types/navigation";

export default function DailyUpdateScreen({ navigation }: DailyUpdateScreenProps) {
  const isHistory = false;

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Mohit</Text>
      <Text style={styles.title}>
        Important {isHistory ? "History" : "Notification"}
      </Text>

      <NotificationCard message={`There is no ${isHistory ? "history" : "update"}`} />

      {/* AppButton fixed at bottom */}
      <View style={styles.bottomButton}>
        <AppButton
          title="Back to Dashboard"
          onPress={() => navigation.replace("HomeTabs")}
        />
      </View>
    </View>
  );
}

function NotificationCard({ message }: any) {
  return (
    <View style={styles.notificationBox}>
      <Text style={styles.noUpdate}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: spacing(2),
    marginTop:spacing(3),
  },
  title: {
    color: "#fff",
    fontSize: 20,
    paddingLeft: spacing(2),
  },
  notificationBox: {
    flex: 1,
    backgroundColor: colors.panel,
    padding: spacing(4),
     borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 3,
    margin:spacing(2),
  },
  noUpdate: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
  bottomButton: {
    position: "absolute",
    bottom: spacing(6),
    left: spacing(4),
    right: spacing(4),
  },
});

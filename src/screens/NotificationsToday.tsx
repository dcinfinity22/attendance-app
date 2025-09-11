import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppButton from "../components/AppButton";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../../App"; // 👈 import types from App.tsx

type Props = NativeStackScreenProps<RootStackParamList, "NotifyToday">;

export default function NotificationsToday({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.brand}>CREWCAM</Text>
      <Text style={styles.heading}>Today's Notifications</Text>
      <Text style={styles.sub}>
        Kindly, check all the notifications before proceeding to application!
      </Text>

      <View style={styles.card}>
        <Text style={styles.bubble}>There is no update</Text>
      </View>

      <AppButton
        title="Continue to App"
        onPress={() => navigation.replace("HomeTabs")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
    padding: spacing(3),
  },
  brand: {
    color: "#c0cbd3",
    fontWeight: "800",
    fontSize: 22,
    marginBottom: spacing(1),
  },
  heading: { color: colors.text, fontSize: 28, fontWeight: "800" },
  sub: { color: colors.text, opacity: 0.9, marginBottom: spacing(2) },
  card: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: spacing(3),
    marginTop: spacing(2),
  },
  bubble: {
    alignSelf: "center",
    backgroundColor: colors.btn,
    color: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: spacing(2),
  },
});

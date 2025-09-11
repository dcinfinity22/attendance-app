import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import AppButton from "../components/AppButton";
import { colors, spacing } from "../theme";
import { RootStackParamList } from "../../App"; // 👈 import navigation types

type Props = NativeStackScreenProps<RootStackParamList, "NotifyHello">;

export default function NotificationsHello({ route, navigation }: Props) {
  const name = route.params?.name || "User";

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>CREWCAM</Text>
      <Text style={styles.hi}>Hi, {name}</Text>
      <Text style={styles.title}>Important Notification</Text>

      <View style={styles.card}>
        <Text style={styles.bubble}>There is no update</Text>
      </View>

      <AppButton
        title="Proceed"
        onPress={() => navigation.replace("NotifyToday")}
        style={{
          position: "absolute",
          left: spacing(3),
          bottom: spacing(3),
          width: 120,
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg, padding: spacing(3) },
  brand: {
    color: "#c0cbd3",
    fontWeight: "800",
    fontSize: 22,
    marginBottom: spacing(3),
  },
  hi: { color: colors.text, fontSize: 28, fontWeight: "800" },
  title: { color: colors.text, fontSize: 20, marginBottom: spacing(2) },
  card: {
    flex: 1,
    backgroundColor: colors.panel,
    borderRadius: 20,
    padding: spacing(3),
    marginTop: spacing(2),
  },
  bubble: {
    alignSelf: "flex-start",
    backgroundColor: colors.btn,
    color: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
  },
});

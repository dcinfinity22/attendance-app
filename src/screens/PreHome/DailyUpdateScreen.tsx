import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation, CommonActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { RootStackParamList } from "../../types/navigation";
import { colors, spacing } from "../../theme";
import AppButton from "../../components/AppButton";

type RootNavProp = StackNavigationProp<RootStackParamList>;

export default function DailyUpdateScreen() {
  const navigation = useNavigation<RootNavProp>();

  const handleContinue = () => {
    // ✅ Reset navigation to Drawer > Tabs > Dashboard
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          {
            name: "App", // Drawer
            state: {
              routes: [
                {
                  name: "HomeTabs", // Drawer screen
                  state: {
                    index: 0, // focus first tab
                    routes: [{ name: "Dashboard" }], // actual tab route name
                  },
                },
              ],
            },
          },
        ],
      })
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Hi, Mohit</Text>
      <Text style={styles.title}>Important Notification</Text>

      <View style={styles.notificationBox}>
        <Text style={styles.noUpdate}>No updates available.</Text>
      </View>

      <View style={styles.bottomButton}>
        <AppButton title="Continue to App" onPress={handleContinue} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  greeting: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    paddingLeft: spacing(2),
    marginTop: spacing(3),
  },
  title: { color: "#fff", fontSize: 20, paddingLeft: spacing(2) },
  notificationBox: {
    flex: 1,
    backgroundColor: colors.panel,
    padding: spacing(4),
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
    margin: spacing(2),
  },
  noUpdate: { color: "#fff", fontSize: 16, textAlign: "center" },
  bottomButton: {
    position: "absolute",
    bottom: spacing(6),
    left: spacing(4),
    right: spacing(4),
  },
});

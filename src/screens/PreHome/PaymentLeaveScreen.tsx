import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { PreHomeStackParamList } from "../../types/navigation";
import AppButton from "../../components/AppButton";
import { colors, spacing } from "../../theme";

// ✅ Props typing for PreHome stack
type PaymentLeaveScreenProps = {
  navigation: StackNavigationProp<PreHomeStackParamList, "PaymentNotification">;
};

export default function PaymentLeaveScreen({ navigation }: PaymentLeaveScreenProps) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <Text style={styles.brand}>CREWCAM</Text>
      <Text style={styles.heading}>Today's Notifications</Text>
      <Text style={styles.sub}>
        Kindly, check all the notifications before proceeding to application!
      </Text>

      {/* Card with content + button at bottom */}
      <View style={styles.card}>
        <Text style={styles.bubble}>There is no update</Text>

        <View style={styles.cardFooter}>
          <AppButton
            title="Next"
            onPress={() => navigation.replace("DailyUpdate")}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  brand: {
    color: "#c0cbd3",
    fontWeight: "800",
    fontSize: 22,
    paddingLeft: spacing(2),
    paddingTop: spacing(3),
    marginBottom: spacing(1),
  },
  heading: {
    color: colors.text,
    fontSize: 28,
    fontWeight: "800",
    paddingLeft: spacing(2),
  },
  sub: {
    color: colors.text,
    opacity: 0.9,
    paddingLeft: spacing(2),
    marginBottom: spacing(2),
  },
  card: {
    flex: 1,
    backgroundColor: colors.panel,
    padding: spacing(3),
    margin: spacing(1),
    borderRadius: 12,
    justifyContent: "space-between", // pushes button to bottom
  },
  bubble: {
    alignSelf: "center",
    backgroundColor: colors.btn,
    color: colors.black,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 24,
    marginTop: spacing(2),
    fontWeight: "600",
  },
  cardFooter: {
    marginTop: spacing(3),
    marginBottom: spacing(3),
  },
});

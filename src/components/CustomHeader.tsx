import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { colors, spacing } from "../theme";

type CustomHeaderProps = {
  onMenuPress: () => void;
  onNotifPress: () => void;
};

export default function CustomHeader({ onMenuPress, onNotifPress }: CustomHeaderProps) {
  return (
    <View>
      {/* Top green bar */}
      <View style={styles.topBar} />

      <View style={styles.container}>
        <View style={styles.left}>
          <Pressable onPress={onMenuPress} style={{ marginRight: spacing(2) }}>
            <FontAwesomeIcon icon={faBars} size={18} color={colors.text} />
          </Pressable>
          <Text style={styles.logo}>CREWCAM</Text>
        </View>

        <View style={styles.right}>
          <Pressable onPress={onNotifPress} style={{ marginRight: spacing(2) }}>
            <FontAwesomeIcon icon={faBell} size={18} color={colors.text} />
          </Pressable>
          <Image
            source={{ uri: "https://i.pravatar.cc/300" }}
            style={styles.avatar}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  topBar: {
    height: 36,
    backgroundColor: colors.bg, // Light green; you can replace with your theme green
  },
  container: {
    height: 40,
    backgroundColor: "#040404ff",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing(2),
  },
  left: { flexDirection: "row", alignItems: "center", gap: spacing(1) },
  right: { flexDirection: "row", alignItems: "center" },
  logo: { color: "#fff", fontSize: 18, fontWeight: "700" },
  avatar: { width: 28, height: 28, borderRadius: 16 },
});

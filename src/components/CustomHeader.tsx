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
    <View style={styles.container}>
      <View style={styles.left}>
        <Pressable onPress={onMenuPress}>
          <FontAwesomeIcon icon={faBars} size={24} color={colors.text} />
        </Pressable>
        <Text style={styles.logo}>CREWCAM</Text>
      </View>

      <View style={styles.right}>
        <Pressable onPress={onNotifPress} style={{ marginRight: spacing(2) }}>
          <FontAwesomeIcon icon={faBell} size={22} color={colors.text} />
        </Pressable>
        <Image
          source={{ uri: "https://i.pravatar.cc/300" }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 60,
    backgroundColor: "#0f4f6a",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing(2),
  },
  left: { flexDirection: "row", alignItems: "center", gap: spacing(1) },
  right: { flexDirection: "row", alignItems: "center" },
  logo: { color: "#fff", fontSize: 20, fontWeight: "700" },
  avatar: { width: 32, height: 32, borderRadius: 16 },
});

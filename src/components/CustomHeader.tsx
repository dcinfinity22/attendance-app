import React from "react";
import { View, Text, Pressable, Image, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBars, faBell } from "@fortawesome/free-solid-svg-icons";
import { colors, spacing } from "../theme";

type CustomHeaderProps = {
  onMenuPress: () => void;
  onNotifPress: () => void;
};

// Make sure to update the path to your logo file
const logo = require("../assets/white-logo.png");

export default function CustomHeader({ onMenuPress, onNotifPress }: CustomHeaderProps) {
  return (
    <View>
      <View style={styles.container}>
        <View style={styles.left}>
          <Pressable onPress={onMenuPress} style={{ marginRight: spacing(2) }}>
            <FontAwesomeIcon icon={faBars} size={18} color={colors.text} />
          </Pressable>
          {/* ✅ The logo image replaces the text here */}
          <Image source={logo} style={styles.logoImage} resizeMode="contain" />
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
  container: {
    height: 40,
    backgroundColor: "#363435",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: spacing(2),
  },
  left: { flexDirection: "row", alignItems: "center", gap: spacing(1) },
  right: { flexDirection: "row", alignItems: "center" },
  logoImage: {
    width: 120, // Adjust the width as needed
    height: 30, // Adjust the height as needed
  },
  avatar: { width: 28, height: 28, borderRadius: 0 },
});
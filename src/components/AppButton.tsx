import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ViewStyle,
  StyleProp,
  GestureResponderEvent,
} from "react-native";
import { colors, radius, spacing } from "../theme";

interface AppButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
}

export default function AppButton({
  title,
  onPress,
  disabled = false,
  style,
}: AppButtonProps) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.btn,
        pressed && { opacity: 0.9 },
        disabled && styles.disabled,
        style,
      ]}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: {
    backgroundColor: colors.btn,
    paddingVertical: spacing(1.5),
    borderRadius: radius,
    alignItems: "center",
  },
  disabled: { opacity: 0.5 },
  title: { fontWeight: "700", color: colors.black, letterSpacing: 0.5 },
});

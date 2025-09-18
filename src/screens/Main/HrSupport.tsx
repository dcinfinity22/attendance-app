import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useNavigation, DrawerActions } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Picker } from "@react-native-picker/picker";
import CustomHeader from "../../components/CustomHeader"; // ✅ same as ProfileScreen
import { colors } from "../../theme"; // ✅ your theme

// Navigation type
type RootStackParamList = { Dashboard: undefined };
type NavigationProp = StackNavigationProp<RootStackParamList>;

const HrSupportScreen = () => {
  const [query, setQuery] = useState("Application crashed issue");
  const [remark, setRemark] = useState("");
  const navigation = useNavigation<NavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Dashboard");
  };

  const handleSend = () => {
    console.log("Query:", query);
    console.log("Remark:", remark);
    //alert("✅ Your HR query has been submitted!");
  };

  return (
    <View style={styles.container}>
      {/* ✅ Custom Header */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      <ScrollView contentContainerStyle={{ padding: 20 }}>
        {/* Greeting / Instructions */}
        <View style={styles.card}>
          <Text style={styles.title}>📝 HR Support</Text>
          <Text style={styles.subText}>
            Select your query, add remarks, and attach files if required. Our HR
            team will get back to you.
          </Text>
        </View>

        {/* Query Dropdown */}
        <Text style={styles.label}>Select your query</Text>
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={query}
            onValueChange={(itemValue) => setQuery(itemValue)}
          >
            <Picker.Item label="Application crashed issue" value="crash" />
            <Picker.Item label="Login issue" value="login" />
            <Picker.Item label="Password reset" value="password" />
            <Picker.Item label="Other" value="other" />
          </Picker>
        </View>

        {/* Remark */}
        <Text style={styles.label}>Remark</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your remark"
          value={remark}
          onChangeText={setRemark}
          multiline
        />

        {/* Attachment */}
        <Text style={styles.label}>Click below to add attachment</Text>
        <TouchableOpacity style={styles.attachmentBtn}>
          <Image
            source={require("../../assets/attachment.png")} // 👈 replace with your icon
            style={styles.attachmentIcon}
          />
        </TouchableOpacity>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>SEND</Text>
        </TouchableOpacity>

        {/* Section Footer */}
        <Text style={styles.sectionTitle}>📌 HR Queries</Text>
      </ScrollView>
    </View>
  );
};

export default HrSupportScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 3,
  },
  title: { fontSize: 18, fontWeight: "bold", color: colors.panel },
  subText: { fontSize: 14, color: "#555", marginTop: 5 },
  label: { fontSize: 14, color: "#444", marginBottom: 6, marginTop: 12 },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 14,
    padding: 10,
    minHeight: 60,
    textAlignVertical: "top",
  },
  attachmentBtn: {
    alignSelf: "center",
    marginVertical: 16,
  },
  attachmentIcon: { width: 80, height: 80, resizeMode: "contain" },
  sendButton: {
    backgroundColor: colors.panel,
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: "center",
    marginVertical: 16,
  },
  sendText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
    textTransform: "uppercase",
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 20,
    color: "#333",
    borderBottomWidth: 2,
    borderBottomColor: "#ccc",
    alignSelf: "flex-start",
  },
});

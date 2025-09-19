import React, { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faInfoCircle,
  faClipboardList,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext";

// Make sure to update the path to your logo
const logo = require("../assets/white-logo.png");

const CustomDrawerContent = (props: any) => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ✅ Drawer Header */}
      <View style={styles.header}>
        <Image source={logo} style={styles.logo} resizeMode="contain" />
        <Text style={styles.userName}>Ajit Roy</Text>
      </View>

      {/* ✅ Drawer Menu */}
      <DrawerContentScrollView {...props}>
        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("About")}
        >
          <FontAwesomeIcon icon={faInfoCircle} size={20} color="#0077A7" />
          <Text style={styles.menuText}>About us</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => props.navigation.navigate("HolidayList")}
        >
          <FontAwesomeIcon icon={faClipboardList} size={20} color="#0077A7" />
          <Text style={styles.menuText}>Holiday List</Text>
        </TouchableOpacity>

        {/* ✅ Logout button */}
        <TouchableOpacity style={styles.menuItem} onPress={logout}>
          <FontAwesomeIcon icon={faPowerOff} size={20} color="#0077A7" />
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#1f6d8c", // Solid blue background color
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 180, // Adjust this height as needed
  },
  logo: {
    width: 150, // Adjust this width as needed
    height: 90, // Adjust this height as needed
    marginBottom: 10,
  },
  userName: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    marginTop: 4,
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 0,
  },
  menuText: { fontSize: 16, marginLeft: 15 },
});

export default CustomDrawerContent;
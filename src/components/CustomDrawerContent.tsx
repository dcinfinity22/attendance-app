import React from "react";
import { useContext } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle, faClipboardList, faPowerOff } from "@fortawesome/free-solid-svg-icons";
import { AuthContext } from "../context/AuthContext"; 

const CustomDrawerContent = (props: any) => {
  const { logout } = useContext(AuthContext);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* ✅ Drawer Header */}
      <View style={styles.header}>
        <Text style={styles.logoText}>CREWCAM</Text>
        <Text style={styles.userName}>Mohit Tyagi</Text>
      </View>

      {/* ✅ Drawer Menu */}
      <DrawerContentScrollView {...props} style={{ marginBottom: 120 }}>
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
    backgroundColor: "#1f6d8cff",
    padding: 20,
    alignItems: "center",
    height: 200,
    justifyContent: "center",
  },
  logoText: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
  },
  userName: {
    fontSize: 16,
    color: "#fff",
    marginTop: 4,
    textAlign: "center",
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomColor: "#eee",
    borderBottomWidth: 1,
  },
  menuText: { fontSize: 16, marginLeft: 15 },
});

export default CustomDrawerContent;

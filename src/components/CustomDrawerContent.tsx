import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faInfoCircle, faClipboardList, faPowerOff } from "@fortawesome/free-solid-svg-icons";

const CustomDrawerContent = (props: any) => {
  return (
    <SafeAreaView style={{ flex: 1}}>
      {/* ✅ Drawer Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>CREWCAM</Text>
          <Text style={styles.userName}>Mohit Tyagi</Text>
        </View>
      </View>

      {/* ✅ Drawer Menu */}
      <DrawerContentScrollView {...props} style={{marginBottom:120}}>
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

        <TouchableOpacity
          style={styles.menuItem}
          onPress={() => console.log("Logout pressed")}
        >
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
    height:200,
    justifyContent: "center",
    textAlign:"center"
  },
  
  logoText: { fontSize: 22, fontWeight: "bold", color: "#fff",textAlign:"center"},
  userName: { fontSize: 16, color: "#fff", marginTop: 4,textAlign:"center" },
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

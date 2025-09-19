import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { colors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  DailyAttendance: undefined;
  CheckIn: undefined;
  CheckOut: undefined;
  OfficeOut: undefined;
  OfficeIn: undefined;
  PaidLeave: undefined;
  UrgentLeave: undefined;
  Notification: undefined;
};

const DailyAttendanceScreen = () => {
  const navigation = useNavigation();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification" as never);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Fixed Header at Top */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      {/* ✅ Page Content */}
      <View style={styles.headingContent}>
        <Text style={styles.greeting}>Hi, Mohit</Text>
        <Text style={styles.subTitle}>
          Please select one of the options in the Daily Attendance menu below.
        </Text>
        </View>
     <View style={styles.content}>
        <Text style={styles.welcome}>Good Morning Mohit !!</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("CheckIn" as never)}
        >
          <Text style={styles.btnText}>CHECK IN</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("CheckOut" as never)}
        >
          <Text style={styles.btnText}>CHECK OUT</Text>
        </TouchableOpacity>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() => navigation.navigate("OfficeOut" as never)}
          >
            <Text style={styles.btnText}>OFFICE OUT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.smallBtn}
            onPress={() => navigation.navigate("OfficeIn" as never)}
          >
            <Text style={styles.btnText}>OFFICE IN</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("PaidLeave" as never)}
        >
          <Text style={styles.btnText}>PAID LEAVE</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("UrgentLeave" as never)}
        >
          <Text style={styles.btnText}>URGENT LEAVE</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DailyAttendanceScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  headingContent:{
    paddingHorizontal: 20,
  },
  content: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginTop: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#e6e6e6",
    marginBottom: 20,
  },
  welcome: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  mainBtn: {
    backgroundColor: "#1E3A5F",
    width: "90%",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 10,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
    marginBottom: 10,
  },
  smallBtn: {
    flex: 1,
    backgroundColor: "#1E3A5F",
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    marginHorizontal: 0,
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

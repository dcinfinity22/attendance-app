import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,   // ✅ yahi use karna hai
} from "react-native";
import CustomHeader from "../../components/CustomHeader";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { colors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";
import { getGreeting } from "../../utils/getGreeting";

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
type DailyAttendanceScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CheckIn"
>;
const DailyAttendanceScreen = () => {
  const navigation = useNavigation<DailyAttendanceScreenNavigationProp>();

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
        <View style={styles.headerRow}>
         

          {/* Greeting + Subtitle */}
          <View style={{ flex: 1, marginLeft: 10 }}>
            <Text style={styles.greeting}>Hi, Mohit</Text>
            <Text style={styles.subTitle}>
              Please select one of the options in the Daily Attendance menu below.
            </Text>
          </View>
          
        </View>
      </View>

      <View style={styles.content}>
         {/* Avatar + Calendar Row */}
          <View style={styles.avatarRow}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />
            <Image
              source={require("../../assets/calendar.png")}
              style={styles.calendar}
            />
          </View>
        <Text style={styles.welcome}>{getGreeting()} Mohit !!</Text>

        {/* Buttons */}
        <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("CheckIn")}
        >
          <Text style={styles.btnText}>CHECK IN</Text>
        </TouchableOpacity>

        {/* <TouchableOpacity
          style={styles.mainBtn}
          onPress={() => navigation.navigate("CheckOut" as never)}
        >
          <Text style={styles.btnText}>CHECK OUT</Text>
        </TouchableOpacity> */}

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
  headingContent: {
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
   avatarRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    gap: 10,
  },
   avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: "#fff",
  },
  calendar: {
    width: 40,
    height: 40,
    marginLeft: 10,
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
  },
  subTitle: {
    fontSize: 14,
    color: "#e6e6e6",
    marginTop: 2,
  },
  welcome: {
    color: "#fff",
    fontSize: 16,
    marginBottom: 20,
  },
  mainBtn: {
    backgroundColor: colors.panel,
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
    gap: 10,
  },
  smallBtn: {
    flex: 1,
    backgroundColor: colors.panel,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
  },
  btnText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

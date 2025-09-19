import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../theme";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";
import { SafeAreaView } from "react-native-safe-area-context";

type RootStackParamList = {
  Dashboard: undefined;
};

type EmpTrackingNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Dashboard"
>;

const EmpTrackingScreen = () => {
  const navigation = useNavigation<EmpTrackingNavigationProp>();
  const [username, setUsername] = useState("");

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Dashboard");
  };

  const handleSearch = () => {
    console.log("Searching for:", username);
    // TODO: fetch API for user tracking details
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* ✅ Custom Header */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Greeting */}
        <Text style={styles.greeting}>Hi, Mohit</Text>
        <Text style={styles.subTitle}>Tracking details of all employee</Text>

        {/* Search Input */}
        <View style={styles.searchRow}>
          <TextInput
            style={styles.input}
            placeholder="User Name"
            placeholderTextColor="#ccc"
            value={username}
            onChangeText={setUsername}
          />
          <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>

        {/* Employee Card */}
      <View style={styles.cardWrapper}>
        <View style={styles.card}>
          <Text style={styles.cardText}>
            Nitin Kumar | Software Developer | Inactive now
          </Text>
          <Text style={styles.cardText}>
            Battery 45% | Signal Strength Good
          </Text>
          <Text style={styles.cardTextBold}>Last Inactive Location:</Text>
          <Text style={styles.cardText}>
            12/52 Site - 2 Sunrise Industrial Area{"\n"}
            Mohan Nagar Loni Industrial Area{"\n"}
            Mohan Nagar Sahibabad Ghaziabad Uttar Pradesh{"\n"}
            201007 India | 09:30 | 19 Sept
          </Text>

          {/* Location Icon */}
          <View style={styles.iconRow}>
            <FontAwesomeIcon icon={faMapMarkerAlt} size={22} color="red" />
          </View>
        </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EmpTrackingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  scrollContent: {
    padding: 20,
  },
  greeting: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
  },
  subTitle: {
    fontSize: 14,
    color: "#e6e6e6",
    marginBottom: 15,
  },
  searchRow: {
    flexDirection: "row",
    marginBottom: 20,
  },
  input: {
    flex: 1,
    backgroundColor: "#1E3A5F",
    padding: 12,
    borderRadius: 6,
    color: "#fff",
    marginRight: 10,
  },
  searchBtn: {
    backgroundColor: colors.panel,
    paddingHorizontal: 20,
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontWeight: "600",
  },
  cardWrapper:{
    flex:1,
    marginTop: 10,
  },
  card: {
    flex: 1,              // expand inside wrapper
  backgroundColor: "#144d73",
  borderRadius: 10,
  padding: 15,
  justifyContent: "space-between",
  },
  cardText: {
    color: "#fff",
    marginBottom: 5,
  },
  cardTextBold: {
    color: "#fff",
    fontWeight: "bold",
    marginTop: 8,
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 10,
  },
});

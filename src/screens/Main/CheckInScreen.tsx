import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
} from "react-native";
import Geolocation from "react-native-geolocation-service";
import { getDistance } from "geolib";
import { colors } from "../../theme";
const jobLocation = {
  latitude: 28.6139, // Example: Delhi
  longitude: 77.2090,
};

const ALLOWED_DISTANCE = 200; // meters

const CheckInScreen = () => {
  const [location, setLocation] = useState<any>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
      } else {
        console.log("❌ Location permission denied");
      }
    } else {
      getCurrentLocation();
    }
  };

  const getCurrentLocation = () => {
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setLocation({ latitude, longitude });

        // check distance from job location
        const distance = getDistance(
          { latitude, longitude },
          jobLocation
        );

        setIsInside(distance <= ALLOWED_DISTANCE);
      },
      (error) => {
        console.log("❌ Error getting location: ", error);
      },
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Check In Location</Text>

      {/* ✅ Live User Location */}
      {location ? (
        <Text style={styles.locationText}>
          📍 Your Location: {"\n"}
          Lat: {location.latitude} {"\n"}
          Lng: {location.longitude}
        </Text>
      ) : (
        <Text style={styles.locationText}>Fetching location...</Text>
      )}

      <Text
        style={{
          color: isInside ? "green" : "red",
          marginBottom: 20,
          marginTop: 10,
          fontWeight: "bold",
        }}
      >
        {isInside
          ? "✅ You are inside Job Location"
          : "❌ You are outside Job Location"}
      </Text>

      {/* ✅ Button only if inside */}
      {isInside && (
        <TouchableOpacity style={styles.btn}>
          <Text style={styles.btnText}>CHECK IN</Text>
        </TouchableOpacity>
      )}

      <TouchableOpacity
        onPress={getCurrentLocation}
        style={[styles.btn, { backgroundColor: "#555", marginTop: 15 }]}
      >
        <Text style={styles.btnText}>Refresh Location</Text>
      </TouchableOpacity>
    </View>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f6fc",
  },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 15 },
  locationText: { fontSize: 14, marginBottom: 10, textAlign: "center" },
  btn: {
    backgroundColor:colors.panel,
    padding: 15,
    borderRadius: 8,
    alignItems: "center",
    width: "70%",
  },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});

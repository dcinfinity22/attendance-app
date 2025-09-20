import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import Geolocation from "react-native-geolocation-service";
import { getDistance } from "geolib";
import { getGreeting } from "../../utils/getGreeting"; // 👈 tumhara greeting util

const { width, height } = Dimensions.get("window");

// 📍 Office Location
const officeLocation = {
  latitude: 28.671246, // change to your office coordinates
  longitude: 77.391029,
};
const ALLOWED_DISTANCE = 200; // meters

const CheckInScreen = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState<any>(null);
  const [isInside, setIsInside] = useState(false);

  useEffect(() => {
    requestLocationPermission();
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const requestLocationPermission = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        getCurrentLocation();
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

        const distance = getDistance({ latitude, longitude }, officeLocation);
        setIsInside(distance <= ALLOWED_DISTANCE);
      },
      (error) => console.log("❌ Error: ", error),
      { enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 }
    );
  };

  const formattedTime = time.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const formattedDate = time.toLocaleDateString([], {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>CREWCAM</Text>
        <Text style={styles.title}>Check In time & location</Text>
      </View>

      {/* Banner */}
      <View style={styles.banner}>
        {/* <Image
          source={require("../assets/avatar-clock.png")} // 👈 apni image path daalna
          style={styles.bannerImage}
          resizeMode="contain"
        /> */}
        <Text style={styles.greeting}>{getGreeting()} Mohit !!</Text>
      </View>

      {/* Date & Time */}
      <View style={styles.card}>
        <Text style={styles.dateTime}>
          {formattedDate}, {formattedTime}
        </Text>

        {/* Location */}
        {location ? (
          <Text style={styles.location}>
            📍 Lat: {location.latitude.toFixed(5)}, Lng:{" "}
            {location.longitude.toFixed(5)}
          </Text>
        ) : (
          <Text style={styles.location}>Fetching location...</Text>
        )}

        {/* ✅ Check-In Button only if inside */}
        {isInside && (
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>CHECK IN</Text>
          </TouchableOpacity>
        )}

        {/* Refresh Button */}
        <TouchableOpacity
          onPress={getCurrentLocation}
          style={[styles.button, { backgroundColor: "#555" }]}
        >
          <Text style={styles.buttonText}>Refresh Location</Text>
        </TouchableOpacity>
      </View>

      {/* Google Map */}
      {location && (
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="Your Location" pinColor="blue" />
          <Marker coordinate={officeLocation} title="Office Location" pinColor="red" />
        </MapView>
      )}
    </ScrollView>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  header: {
    backgroundColor: "#1E3A5F",
    paddingVertical: 15,
    alignItems: "center",
  },
  logo: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  title: { color: "#fff", fontSize: 16, marginTop: 5 },
  banner: {
    backgroundColor: "#005f99",
    padding: 20,
    alignItems: "center",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  bannerImage: { width: 80, height: 80, marginBottom: 10 },
  greeting: { color: "#FFD700", fontSize: 18, fontWeight: "bold" },
  card: {
    backgroundColor: "#fff",
    margin: 15,
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    elevation: 4,
  },
  dateTime: { fontSize: 16, fontWeight: "bold", marginBottom: 10 },
  location: { fontSize: 14, marginBottom: 15, textAlign: "center" },
  button: {
    backgroundColor: "#003366",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginTop: 10,
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  map: {
    width: width - 20,
    height: height * 0.4,
    margin: 10,
    borderRadius: 10,
  },
});

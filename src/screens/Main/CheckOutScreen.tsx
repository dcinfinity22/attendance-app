import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { getGreeting } from "../../utils/getGreeting"; // Greeting utility

const { width, height } = Dimensions.get("window");

const CheckInScreen = () => {
  const [time, setTime] = useState(new Date());
  const [location, setLocation] = useState({
    latitude: 28.671246, // Example Ghaziabad lat
    longitude: 77.391029, // Example Ghaziabad lng
    address:
      "12/52, Site - 2, Sunrise Industrial Area, Mohan Nagar, Loni Industrial Area, Mohan Nagar, Sahibabad, Ghaziabad, Uttar Pradesh 201007, India",
  });

  // Auto update time every minute
  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 60000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = time.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  const formattedDate = time.toLocaleDateString([], { day: "2-digit", month: "short", year: "numeric" });

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>CREWCAM</Text>
        <Text style={styles.greeting}>{getGreeting()}</Text>
      </View>

      {/* Check-in Info */}
      <View style={styles.card}>
        <Text style={styles.title}>Check In time & location</Text>
        <Text style={styles.text}>You are at:</Text>
        <Text style={styles.address}>{location.address}</Text>
      </View>

      {/* Current Info */}
      <View style={styles.card}>
        <Text style={styles.title}>Current time & location</Text>
        <Text style={styles.text}>
          {formattedDate}, {formattedTime}
        </Text>
        <Text style={styles.address}>{location.address}</Text>
      </View>

      {/* Checkout Button */}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>CHECK OUT</Text>
      </TouchableOpacity>

      {/* Google Map */}
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={{ latitude: location.latitude, longitude: location.longitude }} />
      </MapView>
    </ScrollView>
  );
};

export default CheckInScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f2f2f2" },
  header: {
    backgroundColor: "#1E3A5F",
    padding: 15,
    alignItems: "center",
  },
  logo: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  greeting: { color: "#FFD700", fontSize: 16, marginTop: 5 },
  card: {
    backgroundColor: "#005f99",
    margin: 10,
    borderRadius: 10,
    padding: 15,
  },
  title: { fontSize: 18, fontWeight: "bold", color: "#fff", marginBottom: 5, textAlign: "center" },
  text: { fontSize: 16, color: "#fff", marginBottom: 5 },
  address: { fontSize: 14, color: "#eee", lineHeight: 20 },
  button: {
    margin: 15,
    backgroundColor: "#003366",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  map: {
    width: width - 20,
    height: height * 0.4,
    margin: 10,
    borderRadius: 10,
  },
});

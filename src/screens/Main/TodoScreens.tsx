import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerActions } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons"; // ✅ import arrow icon
import CustomHeader from "../../components/CustomHeader";
import { SafeAreaView } from "react-native-safe-area-context";
// Apne navigator ka type define karo
type RootStackParamList = {
  Dashboard: undefined;
  Notification: undefined;
  CreateTodo: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const TodoScreen = () => {
  const navigation = useNavigation<NavigationProp>();
 const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Open Drawer
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification"); // Example navigation
  };
  return (
    <SafeAreaView style={styles.container}>
       {/* Custom Header */}
            <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />
      <View style={styles.content}>
         <Text style={styles.noTodoText}>Don't have any todo</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("CreateTodo")}
      >
        <Text style={styles.buttonText}>CREATE TODO</Text>
      </TouchableOpacity>
      </View>
      

      {/* ✅ Skip button with FontAwesomeIcon */}
      <TouchableOpacity
        style={styles.skipButton}
        onPress={() => navigation.navigate("Dashboard")}
      >
        <FontAwesomeIcon icon={faArrowRight} size={20} color="#000" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default TodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,   
    backgroundColor: "#fff",   
  },
  content: {
     flex:1,
     padding: 20,
     justifyContent: "center",
    alignItems: "center",
  },
  noTodoText: {
    
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#004B6F",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 4,
    elevation: 3,
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  skipButton: {
    position: "absolute", // fixed bottom-left
    bottom: 30,
    left: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 30,
    width: 50,
    height: 50,
    justifyContent: "center",
    alignItems: "center",
    elevation: 4, // shadow
  },
});

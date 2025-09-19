import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Platform,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { DrawerActions, useNavigation } from "@react-navigation/native";
import { Picker } from "@react-native-picker/picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import CustomHeader from "../../components/CustomHeader";
import { colors } from "../../theme";
import { SafeAreaView } from "react-native-safe-area-context";

// Navigator type
type RootStackParamList = {
  Notification: undefined;
};

type NavigationProp = StackNavigationProp<RootStackParamList>;

const CreateTodoScreen = () => {
  const [task, setTask] = useState("");
  const [deadline, setDeadline] = useState<Date | null>(null);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);
  const [employee, setEmployee] = useState("");
  const [hod, setHod] = useState("");

  const navigation = useNavigation<NavigationProp>();

  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer());
  };

  const handleNotifPress = () => {
    navigation.navigate("Notification");
  };

  // iOS + Android date/time handling
  const handleDateChange = (_: any, selectedDate?: Date) => {
    if (Platform.OS === "android") {
      setShowDatePicker(false);
      if (selectedDate) {
        const newDate = new Date(selectedDate);
        setDeadline(newDate);
        setShowTimePicker(true); // after date, show time picker
      }
    } else {
      setDeadline(selectedDate || deadline);
    }
  };

  const handleTimeChange = (_: any, selectedTime?: Date) => {
    setShowTimePicker(false);
    if (selectedTime && deadline) {
      const newDateTime = new Date(deadline);
      newDateTime.setHours(selectedTime.getHours());
      newDateTime.setMinutes(selectedTime.getMinutes());
      setDeadline(newDateTime);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Custom Header */}
      <CustomHeader
        onMenuPress={handleMenuPress}
        onNotifPress={handleNotifPress}
      />

      <ScrollView contentContainerStyle={styles.form}>
        {/* Task */}
        <Text style={styles.label}>Create Task</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter Task"
          placeholderTextColor="#888"
          value={task}
          onChangeText={setTask}
        />

        {/* Deadline */}
        <Text style={styles.label}>Job Deadline</Text>
        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <View style={styles.input}>
            <Text style={{ color: deadline ? "#000" : "#888" }}>
              {deadline ? deadline.toLocaleString() : "Select Date & Time"}
            </Text>
          </View>
        </TouchableOpacity>

        {/* iOS datetime picker */}
        {Platform.OS === "ios" && showDatePicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="datetime"
            display="spinner"
            onChange={handleDateChange}
          />
        )}

        {/* Android date picker */}
        {Platform.OS === "android" && showDatePicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="date"
            display="default"
            onChange={handleDateChange}
          />
        )}

        {/* Android time picker */}
        {Platform.OS === "android" && showTimePicker && (
          <DateTimePicker
            value={deadline || new Date()}
            mode="time"
            display="default"
            onChange={handleTimeChange}
          />
        )}

        {/* Employee Picker */}
        <View style={styles.pickerWrapper}>
          <Picker
            selectedValue={employee}
            onValueChange={(value) => setEmployee(value)}
          >
            <Picker.Item label="Select Employee" value="" />
            <Picker.Item label="Employee 1" value="emp1" />
            <Picker.Item label="Employee 2" value="emp2" />
          </Picker>
        </View>

        {/* HOD Picker */}
        <View style={styles.pickerWrapper}>
          <Picker selectedValue={hod} onValueChange={(value) => setHod(value)}>
            <Picker.Item label="Select HOD's" value="" />
            <Picker.Item label="HOD 1" value="hod1" />
            <Picker.Item label="HOD 2" value="hod2" />
          </Picker>
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveButton}>
          <Text style={styles.saveButtonText}>SAVE</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CreateTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg,
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
    color: "#fff",
  },
  input: {
    backgroundColor: "#ffffff",
    borderBottomWidth: 1,
    borderColor: "#989696ff",
    padding: 10,
    marginBottom: 20,
    borderRadius: 5,
    height: 45,
    justifyContent: "center",
  },
  pickerWrapper: {
    backgroundColor: "#fff",
    borderRadius: 5,
    marginBottom: 20,
    height: 45,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: "#004B6F",
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 10,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { colors } from '../../theme';
import { DrawerActions } from "@react-navigation/native"
import CustomHeader from '../../components/CustomHeader';
import Banner from "../../components/Banner";
// A simple color theme object to match the provided image


const HrSupportScreen = ( { navigation }: any) => {
  const [query, setQuery] = useState('Application crashed issue');
  const [remark, setRemark] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Function to handle the form submission
  const handleSend = () => {
    console.log("Query:", query);
    console.log("Remark:", remark);
    setIsSubmitted(true);
    // Clear the form and success message after a short delay
    setTimeout(() => {
      setIsSubmitted(false);
      setQuery('Application crashed issue');
      setRemark('');
    }, 3000);
  };
  const handleMenuPress = () => {
    navigation.dispatch(DrawerActions.openDrawer()); // ✅ Open Drawer
  };

  const handleNotifPress = () => {
    navigation.navigate("Updates"); // Example navigation
  };

  return (
    <View style={styles.container}>

        {/* Custom Header */}
      <CustomHeader onMenuPress={handleMenuPress} onNotifPress={handleNotifPress} />


      {/* Support Us Header */}
 
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Query Dropdown */}
        <View style={styles.formSection}>
            <Text style={styles.heading}>Suport Us</Text>
          <Text style={styles.label}>Select your query</Text>
          <View style={styles.pickerWrapper}>
            <Picker
              selectedValue={query}
              onValueChange={(itemValue) => setQuery(itemValue)}
            >
              <Picker.Item label="Application crashed issue" value="Application crashed issue" />
              <Picker.Item label="Login issue" value="Login issue" />
              <Picker.Item label="Password reset" value="Password reset" />
              <Picker.Item label="Other" value="Other" />
            </Picker>
          </View>
        </View>

        {/* Remark Text Input */}
        <View style={styles.formSection}>
          <Text style={styles.label}>Remark</Text>
          <TextInput
            placeholder="Enter your remark"
            value={remark}
            onChangeText={setRemark}
            multiline
            style={styles.remarkInput}
          />
        </View>
        
        {/* Attachment Button */}
        <View style={styles.attachmentContainer}>
          <Text style={styles.label}>Click below icon to add attachment.</Text>
          <TouchableOpacity style={styles.attachmentButton}>
            <Text style={{ fontSize: 40, color: '#2c525f' }}>📎</Text>
          </TouchableOpacity>
        </View>

        {/* Send Button */}
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
          <Text style={styles.sendText}>SEND</Text>
        </TouchableOpacity>

        {/* Section Footer */}
        <Text style={styles.sectionTitle}>HR Queries</Text>
        
        {/* Submission success message */}
        {isSubmitted && (
            <View style={styles.successMessage}>
              <Text style={styles.successText}>✅ Your HR query has been submitted!</Text>
            </View>
          )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    padding: 20,
  },
  appHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#363435',
    paddingHorizontal: 16,
    height: 40,
  },
  headerTitle: {
      fontSize: 20,
      fontWeight: 'bold',
      color: '#fff',
  },
  formSection: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    color: '#444',
    marginBottom: 5,
  },
    heading: {
    fontSize: 20,
    color: '#444',
    fontWeight:400,
    marginBottom: 8,
  },
  pickerWrapper: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    overflow: 'hidden',
  },
  remarkInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 14,
    paddingHorizontal: 10,
    minHeight: 40,
  },
  attachmentContainer: {
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  attachmentButton: {
    marginTop: 10,
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButton: {
    backgroundColor: colors.bg,
    paddingVertical: 12,
    borderRadius: 0,
    alignItems: 'center',
    marginBottom: 20,
  },
  sendText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textTransform: 'uppercase',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#444',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingBottom: 5,
  },
  successMessage: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#d1fae5',
    borderRadius: 6,
    alignItems: 'center',
  },
  successText: {
    color: '#065f46',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default HrSupportScreen;

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the stack param list
type RootStackParamList = {
  LoginPassword: undefined;
  LoginOTP: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LoginOTP'>;

const LoginOTPScreen = ({ navigation }: Props) => {
  const [otp, setOtp] = useState('');

  const handleLogin = () => {
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CREWCAM</Text>
      <Text style={styles.info}>We'll send OTP in registered mobile no.</Text>
      <View style={styles.otpContainer}>
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <TextInput
            key={i}
            style={styles.otpInput}
            maxLength={1}
            keyboardType="numeric"
            onChangeText={(text) => {
              const newOtp = otp.split('');
              newOtp[i - 1] = text;
              setOtp(newOtp.join(''));
            }}
          />
        ))}
      </View>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>LOGIN NOW</Text>
      </TouchableOpacity>
      <TouchableOpacity>
        <Text style={styles.resend}>Resend OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#003366', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, color: '#fff', textAlign: 'center', marginBottom: 40 },
  info: { color: '#fff', textAlign: 'center', marginBottom: 20 },
  otpContainer: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  otpInput: { backgroundColor: '#fff', width: 40, height: 40, textAlign: 'center', borderRadius: 5 },
  loginButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 5, alignItems: 'center' },
  buttonText: { color: '#000', fontWeight: 'bold' },
  resend: { color: '#fff', textAlign: 'center', marginTop: 20 },
});

export default LoginOTPScreen;
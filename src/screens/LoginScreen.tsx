import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEye, faCheckSquare, faSquare } from '@fortawesome/free-solid-svg-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

// Define the stack param list (you can expand this as needed)
type RootStackParamList = {
  LoginPassword: undefined;
  LoginOTP: undefined;
  Home: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'LoginPassword'>;

const LoginPasswordScreen = ({ navigation }: Props) => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [agreed, setAgreed] = useState(false);

  const handleLogin = () => {
    if (agreed) navigation.navigate('Home');
  };

  const handleOTPLogin = () => {
    navigation.navigate('LoginOTP');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>CREWCAM</Text>
      <TextInput
        style={styles.input}
        placeholder="Mobile Number"
        value={mobile}
        onChangeText={setMobile}
        keyboardType="phone-pad"
      />
      <View style={styles.passwordContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <FontAwesomeIcon icon={faEye} size={20} color="#fff" style={styles.eyeIcon} />
      </View>
      <TouchableOpacity style={styles.checkboxContainer} onPress={() => setAgreed(!agreed)}>
        <FontAwesomeIcon icon={agreed ? faCheckSquare : faSquare} size={20} color="#fff" />
        <Text style={styles.checkboxText}>I have read and agree to the terms and conditions</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={!agreed}>
        <Text style={styles.buttonText}>LOGIN</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={handleOTPLogin}>
        <Text style={styles.otpLink}>Login with OTP</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#003366', justifyContent: 'center', padding: 20 },
  logo: { fontSize: 32, color: '#fff', textAlign: 'center', marginBottom: 40 },
  input: { backgroundColor: '#fff', padding: 10, marginBottom: 20, borderRadius: 5 },
  passwordContainer: { position: 'relative' },
  eyeIcon: { position: 'absolute', right: 10, top: 15 },
  checkboxContainer: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  checkboxText: { color: '#fff', marginLeft: 10 },
  loginButton: { backgroundColor: '#ccc', padding: 15, borderRadius: 5, alignItems: 'center', opacity: 0.5 },
  buttonText: { color: '#000', fontWeight: 'bold' },
  otpLink: { color: '#fff', textAlign: 'center', marginTop: 20 },
});

export default LoginPasswordScreen;
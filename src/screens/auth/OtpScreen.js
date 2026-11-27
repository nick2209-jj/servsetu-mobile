import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, TextInput, View } from 'react-native';
import { Button, Field, Header, Icon } from '../../components';
import { C } from '../../theme';
import { styles } from '../../theme/appStyles';

export default function OtpScreen({ role, go }) {
  const [mobile, setMobile] = useState('');
  const [code, setCode] = useState('');
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    setSent(true);
  };

  const verify = () => {
    if (!sent || code.length !== 6) {
      setError('Enter your mobile number and the complete 6-digit OTP.');
      return;
    }
    setError('');
    go(role === 'customer' ? 'home' : 'techDashboard');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.authScroll}>
        <Header title="Login with OTP" onBack={() => go('login')} />
        <View style={styles.otpHero}>
          <View style={styles.otpIcon}><Icon name="keypad-outline" size={32} color={C.teal} /></View>
          <Text style={styles.authTitle}>Verify your number</Text>
          <Text style={styles.authSubtitle}>We will send a 6-digit code to your +91 number.</Text>
        </View>
        <View style={styles.authCard}>
          <Field label="Mobile number" placeholder="10-digit mobile number" keyboardType="phone-pad" prefix="+91" value={mobile} onChangeText={(value) => { setMobile(value.replace(/\D/g, '').slice(0, 10)); setCode(''); setSent(false); setError(''); }} />
          <Button onPress={sendOtp}>Send OTP</Button>
          {sent && <Field label="6-digit OTP" placeholder="Enter code" value={code} onChangeText={(value) => { setCode(value.replace(/\D/g, '').slice(0, 6)); setError(''); }} keyboardType="number-pad" />}
          {error ? <Text style={{ color: C.red, fontSize: 12, marginBottom: 10 }}>{error}</Text> : null}
          <Button secondary onPress={verify}>Verify & continue</Button>
          <Text style={styles.centerNote}>You can resend a code in 00:42</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

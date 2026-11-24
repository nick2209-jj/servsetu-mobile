import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { Button, Field, Header, Icon } from '../../components';
import { C } from '../../theme';
import { styles } from '../../theme/appStyles';

export default function OtpScreen({ go }) {
  const [code, setCode] = useState('');
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
          <Field label="Mobile number" placeholder="10-digit mobile number" keyboardType="phone-pad" prefix="+91" />
          <Button onPress={() => setCode('123456')}>Send OTP</Button>
          <Field label="6-digit OTP" placeholder="Enter code" value={code} onChangeText={setCode} keyboardType="number-pad" />
          <Button secondary onPress={() => go('home')}>Verify & continue</Button>
          <Text style={styles.centerNote}>You can resend a code in 00:42</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

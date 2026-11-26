import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logo } from '../../assets';
import { C } from '../../theme';
import { Button, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';

export default function LoginScreen({ role, setRole, go }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');

  const signIn = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    setError('');
    go(role === 'customer' ? 'home' : 'techDashboard');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.authHeaderCenter}>
          <View style={styles.smallLogo}><Image source={logo} style={styles.smallLogoImage} /></View>
          <Text style={styles.brandName}>ServSetu</Text>
          <Text style={styles.brandCopy}>Transparent Home Repairs</Text>
        </View>
        <RoleToggle role={role} setRole={setRole} />
        <View style={styles.authCard}>
          <Text style={styles.fieldLabel}>MOBILE NUMBER</Text>
          <View style={[styles.fieldBox, { marginBottom: 16 }]}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              value={mobile}
              onChangeText={(t) => setMobile(t.replace(/\D/g, '').slice(0, 10))}
              placeholder="10-digit mobile number"
              placeholderTextColor="#9AA8B5"
              keyboardType="number-pad"
              style={styles.fieldInput}
            />
          </View>
          <Text style={styles.fieldLabel}>PASSWORD</Text>
          <View style={[styles.fieldBox, { marginBottom: 6 }]}>
            <TextInput
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#9AA8B5"
              secureTextEntry={!showPw}
              style={styles.fieldInput}
            />
            <Pressable onPress={() => setShowPw(!showPw)} style={styles.eyeBtn}>
              <Ionicons name={showPw ? 'eye-off-outline' : 'eye-outline'} size={21} color={C.muted} />
            </Pressable>
          </View>
          <Pressable onPress={() => go('forgot')} style={styles.forgotLink}>
            <Text style={styles.link}>Forgot Password?</Text>
          </Pressable>
          {error ? <Text style={{ color: C.red, fontSize: 12, marginBottom: 10 }}>{error}</Text> : null}
          <Button onPress={signIn}>Sign In</Button>
          <View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orText}>OR</Text><View style={styles.orLine} /></View>
          <Button secondary onPress={() => go('otp')}>Quick Login with SMS OTP</Button>
          <View style={styles.registerRow}>
            <Text style={styles.mutedText}>New to ServSetu?</Text>
            <Pressable onPress={() => go('register')}><Text style={styles.link}> Register Now</Text></Pressable>
          </View>
        </View>
        <Text style={styles.secureNote}><Ionicons name="shield-checkmark-outline" size={14} color={C.teal} /> Your information is encrypted and secure</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { logo } from '../../assets';
import { C } from '../../theme';
import { Button, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';
import { testAccounts } from '../../data/demo';

export default function LoginScreen({ role, setRole, go }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [showDemoAccounts, setShowDemoAccounts] = useState(true);

  const signIn = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setError('Enter a valid 10-digit Indian mobile number.');
      return;
    }
    if (!password.trim()) {
      setError('Enter your password to continue.');
      return;
    }
    const account = testAccounts.find(
      (item) => item.mobile === mobile && item.password === password && item.role === role
    );
    if (!account) {
      setError('Account not found. Choose one of the local demo accounts below.');
      return;
    }
    setError('');
    go(account.role === 'customer' ? 'home' : 'techDashboard');
  };

  const selectDemoAccount = (account) => {
    setRole(account.role);
    setMobile(account.mobile);
    setPassword(account.password);
    setError('');
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
          <Pressable
            onPress={() => setShowDemoAccounts(!showDemoAccounts)}
            style={{ alignSelf: 'center', paddingVertical: 13 }}
          >
            <Text style={styles.link}>{showDemoAccounts ? 'Hide' : 'View'} 4 local demo accounts</Text>
          </Pressable>
          {showDemoAccounts && (
            <View style={{ marginBottom: 4 }}>
              <Text style={[styles.mutedText, { textAlign: 'center', marginBottom: 8 }]}>
                Select an account to fill its test credentials
              </Text>
              {testAccounts.map((account) => (
                <Pressable
                  key={account.mobile}
                  onPress={() => selectDemoAccount(account)}
                  style={{
                    paddingVertical: 10,
                    paddingHorizontal: 12,
                    marginBottom: 7,
                    borderRadius: 10,
                    borderWidth: 1,
                    borderColor: C.line,
                    backgroundColor: C.white,
                  }}
                >
                  <Text style={{ color: C.navy, fontSize: 13, fontWeight: '700' }}>
                    {account.name} · {account.role === 'customer' ? 'Customer' : 'Technician'}
                  </Text>
                  <Text style={{ color: C.muted, fontSize: 12, marginTop: 2 }}>+91 {account.mobile}</Text>
                </Pressable>
              ))}
              <Text style={{ color: C.muted, fontSize: 11, textAlign: 'center', marginBottom: 10 }}>
                Local UI test accounts only — no backend or real accounts are created.
              </Text>
            </View>
          )}
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

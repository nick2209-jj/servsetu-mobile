import React, { useState } from 'react';
import { Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { logo } from '../../assets';
import { C } from '../../theme';
import { Button, Field, Icon, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';

export default function LoginScreen({ role, setRole, go }) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled">
        <View style={styles.authBrand}>
          <View style={styles.smallLogo}><Image source={logo} style={styles.smallLogoImage} /></View>
          <Text style={styles.brandName}>ServSetu</Text>
          <Text style={styles.brandCopy}>Reliable repairs, right at your doorstep.</Text>
        </View>
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>Welcome back</Text>
          <Text style={styles.authSubtitle}>Sign in to manage your home repairs.</Text>
          <RoleToggle role={role} setRole={setRole} />
          <Field label="Mobile number" placeholder="10-digit mobile number" value={mobile} onChangeText={setMobile} keyboardType="phone-pad" prefix="+91" />
          <Field label="Password" placeholder="Enter your password" value={password} onChangeText={setPassword} secureTextEntry />
          <Pressable onPress={() => go('forgot')} style={styles.forgotLink}><Text style={styles.link}>Forgot password?</Text></Pressable>
          <Button onPress={() => go(role === 'customer' ? 'home' : 'techDashboard')}>Sign in</Button>
          <View style={styles.orRow}><View style={styles.orLine} /><Text style={styles.orText}>OR</Text><View style={styles.orLine} /></View>
          <Button secondary onPress={() => go('otp')}>Login with OTP</Button>
          <View style={styles.registerRow}><Text style={styles.mutedText}>New to ServSetu?</Text><Pressable onPress={() => go('register')}><Text style={styles.link}> Create account</Text></Pressable></View>
        </View>
        <Text style={styles.secureNote}><Icon name="shield-checkmark-outline" size={14} color={C.teal} /> Your information is encrypted and secure</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

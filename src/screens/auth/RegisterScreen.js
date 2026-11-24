import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { Button, Field, Header, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';

export default function RegisterScreen({ role, setRole, go }) {
  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={styles.authScroll} keyboardShouldPersistTaps="handled">
        <Header title="Create account" onBack={() => go('login')} />
        <View style={styles.authCard}>
          <Text style={styles.authTitle}>{role === 'customer' ? 'Make home repairs easy' : 'Grow your local business'}</Text>
          <Text style={styles.authSubtitle}>Set up your ServSetu profile in a minute.</Text>
          <RoleToggle role={role} setRole={setRole} />
          <Field label="Full name" placeholder={role === 'customer' ? 'e.g. Priya Shah' : 'e.g. Ramesh Patel'} />
          <Field label="Mobile number" placeholder="10-digit mobile number" keyboardType="phone-pad" prefix="+91" />
          {role === 'customer' ? (
            <>
              <Field label="Flat / House no." placeholder="e.g. B-204" />
              <Field label="Society / Area" placeholder="e.g. Alkapuri" />
              <View style={styles.twoFields}>
                <View style={styles.half}><Field label="Pincode" placeholder="390007" keyboardType="number-pad" /></View>
                <View style={styles.half}><Field label="City" placeholder="Vadodara" /></View>
              </View>
            </>
          ) : (
            <>
              <Field label="Primary trade" placeholder="Plumber, Electrician, AC & Fridge..." />
              <View style={styles.twoFields}>
                <View style={styles.half}><Field label="Experience" placeholder="Years" keyboardType="number-pad" /></View>
                <View style={styles.half}><Field label="Service radius" placeholder="5 km" keyboardType="number-pad" /></View>
              </View>
              <View style={styles.uploadBox}>
                <FieldIcon />
                <View>
                  <Text style={styles.uploadTitle}>Upload Aadhaar / PAN</Text>
                  <Text style={styles.uploadSub}>PDF or image · Required for Verified badge</Text>
                </View>
              </View>
            </>
          )}
          <Field label="Create password" placeholder="At least 8 characters" secureTextEntry />
          <Button onPress={() => go(role === 'customer' ? 'home' : 'techDashboard')}>Create account</Button>
          <Text style={styles.terms}>By continuing, you agree to our Terms and Privacy Policy.</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

function FieldIcon() {
  return <Icon name="cloud-upload-outline" size={24} color={C.teal} />;
}

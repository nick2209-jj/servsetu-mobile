import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Field, Header } from '../../components';
import { styles } from '../../theme/appStyles';

export default function ForgotScreen({ go }) {
  return (
    <ScrollView contentContainerStyle={styles.authScroll}>
      <Header title="Reset password" onBack={() => go('login')} />
      <View style={styles.stepper}>
        <View style={styles.stepActive}><Text style={styles.stepNumber}>1</Text></View>
        <View style={styles.stepLine} />
        <View style={styles.step}><Text style={styles.stepNumber}>2</Text></View>
        <View style={styles.stepLine} />
        <View style={styles.step}><Text style={styles.stepNumber}>3</Text></View>
      </View>
      <View style={styles.authCard}>
        <Text style={styles.authTitle}>Forgot your password?</Text>
        <Text style={styles.authSubtitle}>Enter your registered number and we will help you get back in.</Text>
        <Field label="Mobile number" placeholder="10-digit mobile number" keyboardType="phone-pad" prefix="+91" />
        <Button onPress={() => go('otp')}>Send reset OTP</Button>
        <Text style={styles.centerNote}>Step 1 of 3 · It only takes a moment</Text>
      </View>
    </ScrollView>
  );
}

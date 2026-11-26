import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header } from '../../components';
import { styles } from '../../theme/appStyles';

const STEPS = ['Verify Mobile', 'Enter OTP', 'New Password'];

export default function ForgotScreen({ go }) {
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [seconds, setSeconds] = useState(30);
  const [pw, setPw] = useState('');
  const [confirm, setConfirm] = useState('');
  const [pwError, setPwError] = useState('');
  const boxRefs = useRef([]);

  useEffect(() => {
    if (step !== 1) return;
    setSeconds(30);
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, [step]);

  const onOtpChange = (i, val) => {
    const d = val.replace(/\D/g, '');
    setOtp((prev) => prev.map((c, idx) => (idx === i ? d.slice(-1) : c)));
    if (d && i < 5) boxRefs.current[i + 1]?.focus();
  };

  const updatePassword = () => {
    if (pw.length < 8) { setPwError('Password must be at least 8 characters.'); return; }
    if (pw !== confirm) { setPwError('Passwords do not match.'); return; }
    setPwError('');
    go('login');
  };

  return (
    <ScrollView contentContainerStyle={styles.authScroll}>
      <Header title="Reset Password" onBack={() => go('login')} />
      <View style={styles.stepper}>
        {STEPS.map((label, i) => (
          <React.Fragment key={label}>
            {i > 0 && <View style={styles.stepLine} />}
            <View style={[i <= step ? styles.stepActive : styles.step]}>
              <Text style={styles.stepNumber}>{i + 1}</Text>
            </View>
          </React.Fragment>
        ))}
      </View>
      <Text style={{ color: C.muted, fontSize: 11, textAlign: 'center', marginBottom: 14 }}>
        Step {step + 1} of 3 · {STEPS[step]}
      </Text>

      <View style={styles.authCard}>
        {step === 0 && (
          <>
            <Text style={styles.authTitle}>Forgot your password?</Text>
            <Text style={styles.authSubtitle}>Enter your registered number and we will send a code.</Text>
            <Field label="MOBILE NUMBER" placeholder="10-digit mobile number" keyboardType="number-pad" prefix="+91" />
            <Button onPress={() => setStep(1)}>Send 6-Digit OTP</Button>
          </>
        )}

        {step === 1 && (
          <>
            <Text style={styles.authTitle}>Enter the code</Text>
            <Text style={styles.authSubtitle}>We sent a 6-digit code to your mobile number.</Text>
            <View style={styles.otpBoxes}>
              {otp.map((d, i) => (
                <TextInput
                  key={i}
                  ref={(r) => { boxRefs.current[i] = r; }}
                  value={d}
                  onChangeText={(v) => onOtpChange(i, v)}
                  keyboardType="number-pad"
                  maxLength={1}
                  style={[styles.otpBox, d && styles.otpBoxActive]}
                />
              ))}
            </View>
            <Text style={styles.centerNote}>
              {seconds > 0 ? `Resend OTP in 00:${String(seconds).padStart(2, '0')}` : 'Did not receive the code? You can resend now.'}
            </Text>
            <Button onPress={() => setStep(2)}>Verify Code</Button>
          </>
        )}

        {step === 2 && (
          <>
            <Text style={styles.authTitle}>Set a new password</Text>
            <Text style={styles.authSubtitle}>Choose a password you have not used before.</Text>
            <Field label="NEW PASSWORD" placeholder="At least 8 characters" secureTextEntry value={pw} onChangeText={setPw} />
            <Field label="CONFIRM PASSWORD" placeholder="Re-enter password" secureTextEntry value={confirm} onChangeText={setConfirm} />
            {pwError ? <Text style={{ color: C.red, fontSize: 12, marginBottom: 10 }}>{pwError}</Text> : null}
            <Button onPress={updatePassword}>Update Password</Button>
          </>
        )}
      </View>
    </ScrollView>
  );
}

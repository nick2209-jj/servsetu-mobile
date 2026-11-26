import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Button, Field, Header, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';

const TRADES = ['Plumber', 'Electrician', 'AC & Fridge', 'Washing Machine', 'RO Purifier', 'Carpenter'];

export default function RegisterScreen({ role, setRole, go }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpError, setOtpError] = useState('');
  const [trade, setTrade] = useState('');
  const [tradeOpen, setTradeOpen] = useState(false);
  const [radius, setRadius] = useState(5);
  const [kycDone, setKycDone] = useState(false);
  const [terms, setTerms] = useState(false);
  const [gpsNote, setGpsNote] = useState('');

  const pickCity = (text) => {
    const digits = text.replace(/\D/g, '').slice(0, 6);
    return digits;
  };

  const sendOtp = () => setOtpSent(true);

  const onOtpChange = (i, val) => {
    const d = val.replace(/\D/g, '');
    setOtp((prev) => prev.map((c, idx) => (idx === i ? d.slice(-1) : c)));
    setOtpError('');
  };

  const gps = () => {
    setGpsNote('Locating...');
    setTimeout(() => setGpsNote('Location captured (demo)'), 900);
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.authScroll, { paddingBottom: 40 }]} keyboardShouldPersistTaps="handled">
        <Header title="Create Account" onBack={() => go('login')} />
        <RoleToggle role={role} setRole={setRole} />
        <View style={styles.authCard}>
          <Field label="FULL NAME" placeholder={role === 'customer' ? 'e.g. Priya Shah' : 'e.g. Ramesh Patel'} />
          <Text style={styles.fieldLabel}>MOBILE NUMBER</Text>
          <View style={[styles.fieldBox, { marginBottom: 12 }]}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              placeholder="10-digit mobile number"
              placeholderTextColor="#9AA8B5"
              keyboardType="number-pad"
              style={styles.fieldInput}
            />
            <Pressable onPress={sendOtp} style={styles.inlineVerify}>
              <Text style={styles.inlineVerifyText}>{otpSent ? 'OTP SENT' : 'VERIFY OTP'}</Text>
            </Pressable>
          </View>
          {otpSent && (
            <View style={{ marginBottom: 14 }}>
              <View style={styles.otpBoxes}>
                {otp.map((d, i) => (
                  <TextInput
                    key={i}
                    value={d}
                    onChangeText={(v) => onOtpChange(i, v)}
                    keyboardType="number-pad"
                    maxLength={1}
                    style={[styles.otpBox, d && styles.otpBoxActive]}
                  />
                ))}
              </View>
              {otpError ? <Text style={{ color: C.red, fontSize: 11, marginBottom: 6 }}>{otpError}</Text> : null}
            </View>
          )}
          <Field label="CREATE PASSWORD" placeholder="At least 8 characters" secureTextEntry />

          {role === 'customer' ? (
            <>
              <Field label="FLAT / HOUSE NO." placeholder="e.g. B-204" />
              <Field label="BUILDING / SOCIETY" placeholder="e.g. Shreeji Heights" />
              <Field label="AREA / LOCALITY" placeholder="e.g. Alkapuri" />
              <View style={styles.twoFields}>
                <View style={styles.half}>
                  <Field label="PINCODE" placeholder="390007" keyboardType="number-pad" value={undefined} onChangeText={pickCity} />
                </View>
                <View style={styles.half}>
                  <Field label="CITY" placeholder="Auto-filled" />
                </View>
              </View>
              <Pressable onPress={gps} style={styles.gpsBtn}>
                <Ionicons name="navigate" size={18} color={C.teal} />
                <Text style={styles.gpsBtnText}>{gpsNote || 'Use Current GPS Location'}</Text>
              </Pressable>
            </>
          ) : (
            <>
              <Text style={styles.fieldLabel}>PRIMARY TRADE</Text>
              <Pressable onPress={() => setTradeOpen(!tradeOpen)} style={styles.tradeSelect}>
                <Text style={[styles.tradeSelectText, !trade && { color: '#9AA8B5' }]}>{trade || 'Select your trade'}</Text>
                <Ionicons name={tradeOpen ? 'chevron-up' : 'chevron-down'} size={18} color={C.muted} />
              </Pressable>
              {tradeOpen && (
                <View style={{ backgroundColor: C.white, borderRadius: 12, borderWidth: 1, borderColor: C.line, marginBottom: 16, overflow: 'hidden' }}>
                  {TRADES.map((t) => (
                    <Pressable
                      key={t}
                      onPress={() => { setTrade(t); setTradeOpen(false); }}
                      style={{ paddingVertical: 12, paddingHorizontal: 14, borderBottomWidth: 1, borderBottomColor: C.line }}
                    >
                      <Text style={[styles.tradeSelectText, t === trade && { color: C.teal, fontWeight: '800' }]}>{t}</Text>
                    </Pressable>
                  ))}
                </View>
              )}
              <Field label="YEARS OF EXPERIENCE" placeholder="e.g. 8" keyboardType="number-pad" />
              <Text style={styles.fieldLabel}>SERVICE AREA PINCODE</Text>
              <View style={[styles.fieldBox, { marginBottom: 16 }]}>
                <TextInput placeholder="390007" placeholderTextColor="#9AA8B5" keyboardType="number-pad" style={styles.fieldInput} />
              </View>
              <View style={[styles.radiusCard, { marginBottom: 16 }]}>
                <Text style={styles.radiusValue}>{radius} km</Text>
                <Text style={styles.radiusSub}>Service radius</Text>
                <View style={{ flexDirection: 'row', gap: 8, marginTop: 12, alignItems: 'center' }}>
                  {[2, 5, 10, 15, 20].map((r) => (
                    <Pressable
                      key={r}
                      onPress={() => setRadius(r)}
                      style={{
                        flex: 1,
                        paddingVertical: 8,
                        borderRadius: 9,
                        backgroundColor: r === radius ? C.teal : C.paper,
                        alignItems: 'center',
                      }}
                    >
                      <Text style={{ fontSize: 11, fontWeight: '800', color: r === radius ? C.white : C.muted }}>{r}</Text>
                    </Pressable>
                  ))}
                </View>
                <Text style={styles.sliderLabels}>2 km{'\n'}20 km</Text>
              </View>
              <Pressable onPress={() => setKycDone(true)} style={styles.uploadBox}>
                <Ionicons name={kycDone ? 'checkmark-circle' : 'cloud-upload-outline'} size={24} color={kycDone ? C.green : C.teal} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.uploadTitle}>{kycDone ? 'KYC Documents Attached' : 'Upload Aadhaar / PAN'}</Text>
                  <Text style={styles.uploadSub}>Front & back photos · Required for Verified badge</Text>
                </View>
              </Pressable>
            </>
          )}

          <Pressable onPress={() => setTerms(!terms)} style={styles.cbRow}>
            <View style={[styles.cbBox, terms && styles.cbBoxActive]}>
              {terms && <Ionicons name="checkmark" size={15} color={C.white} />}
            </View>
            <Text style={{ color: C.muted, fontSize: 12, flex: 1 }}>I agree to the Terms & Conditions and Privacy Policy.</Text>
          </Pressable>
          <Button onPress={() => go(role === 'customer' ? 'home' : 'techDashboard')}>Create Account</Button>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

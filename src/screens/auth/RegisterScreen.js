import React, { useEffect, useState } from 'react';
import { Alert, Image, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Button, Field, Header, RoleToggle } from '../../components';
import { styles } from '../../theme/appStyles';
import { detectCurrentAddress, pickDocumentImage } from '../../utils/devicePickers';

const TRADES = ['Plumber', 'Electrician', 'AC & Fridge', 'Washing Machine', 'RO Purifier', 'Carpenter'];

export default function RegisterScreen({ role, setRole, go }) {
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [formError, setFormError] = useState('');
  const [name, setName] = useState('');
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [house, setHouse] = useState('');
  const [building, setBuilding] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');
  const [city, setCity] = useState('');
  const [coordinates, setCoordinates] = useState(null);
  const [gpsLoading, setGpsLoading] = useState(false);
  const [cityLookupLoading, setCityLookupLoading] = useState(false);
  const [cityLookupError, setCityLookupError] = useState('');
  const [kycFront, setKycFront] = useState(null);
  const [kycBack, setKycBack] = useState(null);
  const [experience, setExperience] = useState('');
  const [servicePincode, setServicePincode] = useState('');
  const [trade, setTrade] = useState('');
  const [tradeOpen, setTradeOpen] = useState(false);
  const [radius, setRadius] = useState(5);
  const [terms, setTerms] = useState(false);

  useEffect(() => {
    if (pincode.length !== 6) {
      setCityLookupLoading(false);
      setCityLookupError('');
      return undefined;
    }

    const controller = new AbortController();
    let active = true;
    setCityLookupLoading(true);
    setCityLookupError('');

    fetch(`https://api.postalpincode.in/pincode/${pincode}`, { signal: controller.signal })
      .then((response) => {
        if (!response.ok) throw new Error('Pincode lookup failed. Check your connection and try again.');
        return response.json();
      })
      .then((data) => {
        const district = data?.[0]?.Status === 'Success' ? data?.[0]?.PostOffice?.[0]?.District : '';
        if (!district) throw new Error('No city was found for this pincode. Enter your city manually.');
        if (active) setCity(district);
      })
      .catch((error) => {
        if (error.name !== 'AbortError' && active) {
          setCityLookupError(error.message || 'Unable to look up this pincode. Enter your city manually.');
        }
      })
      .finally(() => {
        if (active) setCityLookupLoading(false);
      });

    return () => {
      active = false;
      controller.abort();
    };
  }, [pincode]);

  const sendOtp = () => {
    if (!/^[6-9]\d{9}$/.test(mobile)) {
      setOtpError('Enter a valid 10-digit Indian mobile number first.');
      return;
    }
    setOtpError('');
    setOtpSent(true);
    setOtpVerified(false);
  };

  const onOtpChange = (i, val) => {
    const d = val.replace(/\D/g, '');
    setOtp((prev) => prev.map((c, idx) => (idx === i ? d.slice(-1) : c)));
    setOtpError('');
    setOtpVerified(false);
  };

  const verifyOtp = () => {
    if (otp.some((digit) => !digit)) {
      setOtpError('Enter the complete 6-digit OTP.');
      return;
    }
    setOtpError('');
    setOtpVerified(true);
  };

  const useCurrentLocation = async () => {
    setGpsLoading(true);
    try {
      const address = await detectCurrentAddress();
      if (!address) return;
      setArea(address.area);
      setCity(address.city);
      setPincode(address.pincode.replace(/\D/g, '').slice(0, 6));
      setCoordinates(address.coordinates);
      setCityLookupError('');
    } catch (error) {
      Alert.alert('Unable to detect location', error.message || 'Please enter your service address manually.');
    } finally {
      setGpsLoading(false);
    }
  };

  const pickKycDocument = async (side) => {
    try {
      const image = await pickDocumentImage();
      if (!image) return;
      if (side === 'front') setKycFront(image);
      else setKycBack(image);
    } catch (error) {
      Alert.alert('Unable to select document', error.message || 'Please try selecting the image again.');
    }
  };

  const createAccount = () => {
    if (!name.trim() || !/^[6-9]\d{9}$/.test(mobile) || password.length < 8) {
      setFormError('Enter your name, a valid 10-digit mobile number, and a password of at least 8 characters.');
      return;
    }
    if (!otpVerified) {
      setFormError('Verify your mobile number with the 6-digit OTP before continuing.');
      return;
    }
    if (role === 'customer' && (!house.trim() || !building.trim() || !area.trim() || !/^\d{6}$/.test(pincode) || !city.trim())) {
      setFormError('Complete your service address, including a 6-digit pincode and city.');
      return;
    }
    if (role === 'technician' && (!trade || !experience || !/^\d{6}$/.test(servicePincode))) {
      setFormError('Select a trade and enter your experience and a valid service area pincode.');
      return;
    }
    if (!terms) {
      setFormError('Accept the Terms & Conditions to create your account.');
      return;
    }
    setFormError('');
    go(role === 'customer' ? 'home' : 'techDashboard');
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ScrollView contentContainerStyle={[styles.authScroll, { paddingBottom: 40 }]} keyboardShouldPersistTaps="handled">
        <Header title="Create Account" onBack={() => go('login')} />
        <RoleToggle role={role} setRole={setRole} />
        <View style={styles.authCard}>
          <Field label="FULL NAME" placeholder={role === 'customer' ? 'e.g. Priya Shah' : 'e.g. Ramesh Patel'} value={name} onChangeText={setName} />
          <Text style={styles.fieldLabel}>MOBILE NUMBER</Text>
          <View style={[styles.fieldBox, { marginBottom: 12 }]}>
            <Text style={styles.prefix}>+91</Text>
            <TextInput
              value={mobile}
              onChangeText={(value) => {
                setMobile(value.replace(/\D/g, '').slice(0, 10));
                setOtp(['', '', '', '', '', '']);
                setOtpSent(false);
                setOtpVerified(false);
                setOtpError('');
              }}
              placeholder="10-digit mobile number"
              placeholderTextColor="#9AA8B5"
              keyboardType="number-pad"
              style={styles.fieldInput}
            />
            <Pressable onPress={sendOtp} style={styles.inlineVerify}>
              <Text style={styles.inlineVerifyText}>{otpVerified ? 'VERIFIED' : otpSent ? 'RESEND OTP' : 'VERIFY OTP'}</Text>
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
              {!otpVerified && <Pressable onPress={verifyOtp} style={{ alignSelf: 'flex-end' }}><Text style={styles.link}>Verify Code</Text></Pressable>}
            </View>
          )}
          <Field label="CREATE PASSWORD" placeholder="At least 8 characters" secureTextEntry value={password} onChangeText={setPassword} />

          {role === 'customer' ? (
            <>
              <Field label="FLAT / HOUSE NO." placeholder="e.g. B-204" value={house} onChangeText={setHouse} />
              <Field label="BUILDING / SOCIETY" placeholder="e.g. Shreeji Heights" value={building} onChangeText={setBuilding} />
              <Field label="AREA / LOCALITY" placeholder="e.g. Alkapuri" value={area} onChangeText={setArea} />
              <View style={styles.twoFields}>
                <View style={styles.half}>
                  <Field label="PINCODE" placeholder="390007" keyboardType="number-pad" value={pincode} onChangeText={(value) => { setPincode(value.replace(/\D/g, '').slice(0, 6)); setCity(''); setCoordinates(null); }} />
                </View>
                <View style={styles.half}>
                  <Field label="CITY" placeholder={cityLookupLoading ? 'Looking up…' : 'Enter city'} value={city} onChangeText={setCity} />
                </View>
              </View>
              {cityLookupError ? <Text style={{ color: C.red, fontSize: 11, marginTop: -8, marginBottom: 10 }}>{cityLookupError}</Text> : null}
              {coordinates && <Text style={{ color: C.muted, fontSize: 10, marginTop: -8, marginBottom: 10 }}>GPS coordinates captured</Text>}
              <Pressable onPress={useCurrentLocation} disabled={gpsLoading} style={styles.gpsBtn}>
                <Ionicons name={gpsLoading ? 'time-outline' : 'navigate'} size={18} color={C.teal} />
                <Text style={styles.gpsBtnText}>{gpsLoading ? 'Detecting current location…' : 'Use Current GPS Location'}</Text>
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
              <Field label="YEARS OF EXPERIENCE" placeholder="e.g. 8" keyboardType="number-pad" value={experience} onChangeText={(value) => setExperience(value.replace(/\D/g, '').slice(0, 2))} />
              <Text style={styles.fieldLabel}>SERVICE AREA PINCODE</Text>
              <View style={[styles.fieldBox, { marginBottom: 16 }]}>
                <TextInput value={servicePincode} onChangeText={(value) => setServicePincode(value.replace(/\D/g, '').slice(0, 6))} placeholder="390007" placeholderTextColor="#9AA8B5" keyboardType="number-pad" style={styles.fieldInput} />
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
              <Text style={styles.fieldLabel}>AADHAAR / PAN DOCUMENT</Text>
              <View style={{ flexDirection: 'row', gap: 10, marginBottom: 17 }}>
                {[
                  ['front', 'Front Side', kycFront],
                  ['back', 'Back Side', kycBack],
                ].map(([side, label, image]) => (
                  <Pressable key={side} onPress={() => pickKycDocument(side)} style={{ flex: 1, height: 112, borderWidth: 1, borderStyle: 'dashed', borderColor: '#A8D9D3', backgroundColor: '#F4FCFB', borderRadius: 13, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                    {image?.uri ? (
                      <>
                        <Image source={{ uri: image.uri }} style={{ width: '100%', height: '100%', position: 'absolute' }} resizeMode="cover" />
                        <View style={{ position: 'absolute', right: 6, top: 6, backgroundColor: C.navy, borderRadius: 9, paddingHorizontal: 8, paddingVertical: 4 }}>
                          <Text style={{ color: C.white, fontSize: 10, fontWeight: '800' }}>Change</Text>
                        </View>
                      </>
                    ) : (
                      <>
                        <Ionicons name="cloud-upload-outline" size={22} color={C.teal} />
                        <Text style={styles.photoText}>{label}</Text>
                        <Text style={styles.uploadSub}>Tap to upload</Text>
                      </>
                    )}
                  </Pressable>
                ))}
              </View>
            </>
          )}
        </View>
      </ScrollView>
      <View style={styles.footerCta}>
        <Pressable onPress={() => setTerms(!terms)} style={styles.cbRow}>
          <View style={[styles.cbBox, terms && styles.cbBoxActive]}>
            {terms && <Ionicons name="checkmark" size={15} color={C.white} />}
          </View>
          <Text style={{ color: C.muted, fontSize: 12, flex: 1 }}>I agree to the Terms & Conditions and Privacy Policy.</Text>
        </Pressable>
        {formError ? <Text style={{ color: C.red, fontSize: 12, marginBottom: 6 }}>{formError}</Text> : null}
        <Button onPress={createAccount}>Create Account</Button>
      </View>
    </KeyboardAvoidingView>
  );
}

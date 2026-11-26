import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function BookingForm({ go, warrantyClaim = false }) {
  const [slot, setSlot] = useState('Afternoon');
  const fee = warrantyClaim ? '₹0' : '₹149';
  const submit = () => {
    Alert.alert(
      warrantyClaim ? 'Warranty request ready' : 'Service request ready',
      warrantyClaim ? 'Your free warranty re-visit request has been prepared.' : 'Your service request has been prepared.',
      [{ text: 'Continue', onPress: () => go('bookingDetails') }],
    );
  };

  return (
    <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <Header
        title={warrantyClaim ? 'Warranty re-visit' : 'Request service'}
        subtitle={warrantyClaim ? 'LG Front-Load · covered repair' : 'Ramesh Patel · ₹149 visiting charge'}
        onBack={() => go(warrantyClaim ? 'settingsAppliances' : 'technicianDetails')}
      />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.formInfo}>
          <Icon name="shield-checkmark-outline" color={C.teal} size={18} />
          <Text style={styles.formInfoText}>
            {warrantyClaim ? 'This repair is within warranty. The re-visit fee is ₹0.' : 'Visiting fee is waived when you approve the repair quote.'}
          </Text>
        </View>
        <Field label="What needs fixing?" placeholder={warrantyClaim ? 'Same issue as the covered repair' : 'e.g. AC not cooling'} />
        <Field label="Tell us more" placeholder="Describe the issue briefly..." />
        <Text style={styles.fieldLabel}>ADD A PHOTO <Text style={styles.optional}>OPTIONAL</Text></Text>
        <Pressable style={styles.photoBox}>
          <Icon name="camera-outline" size={24} color={C.teal} />
          <Text style={styles.photoText}>Add a photo of the issue</Text>
        </Pressable>
        <Text style={styles.fieldLabel}>PREFERRED SLOT</Text>
        <View style={styles.slotRow}>
          {['Morning', 'Afternoon', 'Evening'].map((item, i) => (
            <Pressable key={item} onPress={() => setSlot(item)} style={[styles.slot, slot === item && styles.slotActive]}>
              <Icon name={i === 0 ? 'sunny-outline' : i === 1 ? 'partly-sunny-outline' : 'moon-outline'} size={17} color={slot === item ? C.teal : C.muted} />
              <Text style={[styles.slotText, slot === item && { color: C.teal, fontWeight: '800' }]}>{item}</Text>
              <Text style={styles.slotTime}>{['9–12', '12–4', '4–8'][i]}</Text>
            </Pressable>
          ))}
        </View>
        <View style={styles.addressCard}>
          <Icon name="location-outline" size={20} color={C.teal} />
          <View style={{ flex: 1 }}>
            <Text style={styles.addressTitle}>Service location</Text>
            <Text style={styles.addressText}>B-204, Shreeji Heights, Alkapuri</Text>
          </View>
          <Icon name="chevron-forward" size={18} color={C.muted} />
        </View>
        <Text style={[styles.settingsSub, { marginBottom: 8 }]}>Visiting fee: {fee}</Text>
        <Button onPress={submit}>{warrantyClaim ? 'Request Free Warranty Re-visit' : 'Send service request'}</Button>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function PayoutScreen({ go }) {
  const [method, setMethod] = useState('UPI');
  const [upi, setUpi] = useState('');
  const [holder, setHolder] = useState('');
  const [account, setAccount] = useState('');
  const [ifsc, setIfsc] = useState('');
  const [verified, setVerified] = useState(false);
  const verify = () => {
    const validUpi = /^[\w.-]+@[\w.-]+$/.test(upi.trim());
    const validIfsc = /^[A-Z]{4}0[A-Z0-9]{6}$/.test(ifsc.trim().toUpperCase());
    if (method === 'UPI' && !validUpi) {
      Alert.alert('Check your UPI ID', 'Enter a valid UPI ID, for example ramesh@okicici.');
      return;
    }
    if (method === 'Bank' && (!holder.trim() || account.length < 8 || !validIfsc)) {
      Alert.alert('Check your bank details', 'Enter the account holder name, a valid account number, and an 11-character IFSC code.');
      return;
    }
    setVerified(true);
    Alert.alert('Payout details verified', 'Your payout method has been saved in this demo.');
  };

  return (
    <View style={styles.flex}>
      <Header title="Payout Account" subtitle="Manage where online earnings are settled" onBack={() => go('techSettings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.payoutHero}>
          <Icon name="wallet-outline" size={28} color={C.teal} />
          <Text style={styles.payoutTitle}>Your earnings, your way</Text>
          <Text style={styles.payoutSub}>Add a UPI ID or bank account for online customer payments.</Text>
        </View>

        <Text style={styles.fieldLabel}>PAYOUT METHOD</Text>
        <View style={styles.dateChipRow}>
          {['UPI', 'Bank'].map((item) => (
            <Pressable key={item} onPress={() => { setMethod(item); setVerified(false); }} style={[styles.dateChip, method === item && styles.dateChipActive]}>
              <Text style={[styles.chipText, method === item && { color: C.teal }]}>{item === 'UPI' ? 'UPI ID' : 'Bank Account'}</Text>
            </Pressable>
          ))}
        </View>

        {method === 'UPI' ? (
          <Field label="UPI ID" placeholder="ramesh@okicici" value={upi} onChangeText={(value) => { setUpi(value); setVerified(false); }} />
        ) : (
          <>
            <Field label="ACCOUNT HOLDER NAME" placeholder="Name as on bank account" value={holder} onChangeText={(value) => { setHolder(value); setVerified(false); }} />
            <Text style={styles.fieldLabel}>BANK ACCOUNT NUMBER</Text>
            <View style={[styles.fieldBox, { marginBottom: 16 }]}><TextInput value={account} onChangeText={(value) => { setAccount(value.replace(/[^0-9]/g, '')); setVerified(false); }} placeholder="Enter account number" keyboardType="number-pad" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>
            <Field label="IFSC CODE" placeholder="e.g. HDFC0001234" value={ifsc} onChangeText={(value) => { setIfsc(value.toUpperCase()); setVerified(false); }} />
          </>
        )}

        <Button onPress={verify}>Verify & Save Payout Method</Button>
        {verified && (
          <View style={[styles.verifiedBanner, { marginTop: 12 }]}>
            <Icon name="checkmark-circle" size={20} color={C.green} />
            <Text style={styles.verifiedTitle}>Payout method verified</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

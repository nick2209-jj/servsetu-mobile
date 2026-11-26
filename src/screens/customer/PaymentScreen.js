import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header } from '../../components';
import { styles } from '../../theme/appStyles';

const INVOICE = [
  ['Compressor part (90 days warranty)', '₹300'],
  ['Extra capacitor (90 days warranty)', '₹180'],
  ['Labor charge', '₹350'],
  ['Visiting fee waiver', '-₹149'],
];
const TOTAL = '₹681';

const RATING_ROWS = ['Punctuality', 'Price Transparency', 'Work Quality'];
const UPI_ICONS = ['logo-google', 'phone-portrait-outline', 'wallet-outline', 'card-outline'];

function Stars() {
  const [val, setVal] = useState(0);
  return (
    <View style={{ flexDirection: 'row', gap: 2 }}>
      {[1, 2, 3, 4, 5].map((n) => (
        <Pressable key={n} onPress={() => setVal(n)} style={styles.starBtn}>
          <Ionicons name={n <= val ? 'star' : 'star-outline'} size={20} color={C.orange} />
        </Pressable>
      ))}
    </View>
  );
}

export default function PaymentScreen({ go }) {
  const [mode, setMode] = useState(null);
  const [showPin, setShowPin] = useState(false);
  const [paid, setPaid] = useState(false);

  const onPay = () => {
    if (!mode) return;
    if (mode === 'cash') { setShowPin(true); return; }
    setPaid(true);
  };

  return (
    <View style={styles.flex}>
      <Header title="Complete Payment" subtitle="Booking #SRV-4092 · Ramesh Patel" onBack={() => go('bookings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Text style={styles.sectionTitle}>Final invoice</Text>
        <View style={styles.billCard}>
          {INVOICE.map(([label, val]) => (
            <View key={label} style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>{label}</Text>
              <Text style={[styles.quoteValue, val.startsWith('-') && { color: C.green }]}>{val}</Text>
            </View>
          ))}
          <View style={styles.quoteDivider} />
          <View style={styles.quoteRow}>
            <Text style={styles.quoteTotalLabel}>Grand total</Text>
            <Text style={styles.quoteTotal}>{TOTAL}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Choose payment method</Text>

        <Pressable onPress={() => setMode('online')} style={[styles.payCard, mode === 'online' && styles.payCardActive]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={styles.paymentIcon}><Ionicons name="phone-portrait-outline" size={21} color={C.teal} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentTitle}>Pay Online</Text>
              <Text style={styles.paymentSub}>UPI / Cards / NetBanking</Text>
            </View>
            <View style={[styles.radio, mode === 'online' && styles.radioActive]}>{mode === 'online' && <View style={styles.radioDot} />}</View>
          </View>
          {mode === 'online' && (
            <View style={styles.upiIcons}>
              {UPI_ICONS.map((ic, i) => (
                <View key={i} style={styles.upiIconBox}><Ionicons name={ic} size={17} color={C.ink} /></View>
              ))}
            </View>
          )}
        </Pressable>

        <Pressable onPress={() => setMode('cash')} style={[styles.payCard, mode === 'cash' && styles.payCardActive]}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <View style={[styles.paymentIcon, { backgroundColor: C.orangeLight }]}><Ionicons name="cash-outline" size={21} color={C.orange} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.paymentTitle}>Pay Offline (Cash)</Text>
              <Text style={styles.paymentSub}>Get a 4-digit confirmation PIN</Text>
            </View>
            <View style={[styles.radio, mode === 'cash' && styles.radioActive]}>{mode === 'cash' && <View style={styles.radioDot} />}</View>
          </View>
          {mode === 'cash' && showPin && (
            <View style={{ marginTop: 14 }}>
              <View style={styles.pinWrap}>{['4', '8', '2', '9'].map((d, i) => <View key={i} style={styles.pinDigit}><Text style={styles.pinDigitText}>{d}</Text></View>)}</View>
              <Text style={styles.pinHelp}>Hand {TOTAL} cash to the technician and share this PIN to close the job.</Text>
            </View>
          )}
        </Pressable>

        <Pressable
          disabled={!mode || (mode === 'cash' && showPin)}
          onPress={onPay}
          style={[styles.button, { marginTop: 8 }, (!mode || (mode === 'cash' && showPin)) && styles.buttonDisabled]}
        >
          <Text style={styles.buttonText}>
            {mode === 'cash'
              ? (showPin ? 'Waiting for Technician Confirmation' : 'Show Cash PIN')
              : mode === 'online' ? `Pay ${TOTAL} Securely` : 'Select a payment method'}
          </Text>
        </Pressable>
        <View style={styles.secureNote}>
          <Ionicons name="lock-closed-outline" size={14} color={C.teal} />
          <Text style={styles.mutedText}> Secure payments powered by ServSetu</Text>
        </View>
      </ScrollView>

      <Modal transparent visible={paid} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalCard}>
            <View style={styles.checkCircle}><Ionicons name="checkmark" size={34} color={C.green} /></View>
            <Text style={styles.authTitle}>Payment Successful!</Text>
            <Text style={styles.centerNote}>Digital Warranty Activated · 90 days on replaced parts</Text>
            <View style={{ width: '100%', marginTop: 12 }}>
              {RATING_ROWS.map((label) => (
                <View key={label} style={styles.rateRow}>
                  <Text style={styles.rateRowLabel}>{label}</Text>
                  <Stars />
                </View>
              ))}
            </View>
            <View style={[styles.fieldBox, { height: 64, alignItems: 'flex-start', paddingTop: 12, marginTop: 14, width: '100%' }]}>
              <TextInput multiline placeholder="Write a short review (optional)..." placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} />
            </View>
            <Pressable onPress={() => { setPaid(false); go('bookings'); }} style={[styles.button, { width: '100%', marginTop: 14 }]}>
              <Text style={styles.buttonText}>Submit Review & Done</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header, IconButton } from '../../components';
import { styles } from '../../theme/appStyles';

const STEPS = ['Requested', 'Arrived', 'Quote Approved', 'In Progress', 'Completed'];

const QUOTE_ROWS = [
  ['Compressor part · 90 days warranty', '₹300'],
  ['Labor charge', '₹350'],
  ['Visiting fee waiver', '-₹149'],
];

function StatusStepper({ current }) {
  return (
    <View style={[styles.jobSteps, { paddingVertical: 18 }]}>
      {STEPS.map((label, i) => {
        const done = i <= current;
        return (
          <View key={label} style={styles.jobStep}>
            <View style={[styles.jobStepCircle, done && styles.jobStepDone]}>
              {done ? <Ionicons name="checkmark" size={13} color={C.white} /> : <Text style={styles.jobStepNumber}>{i + 1}</Text>}
            </View>
            <Text style={[styles.jobStepText, done && { color: C.teal, fontWeight: '700' }]}>{label}</Text>
            {i < STEPS.length - 1 && <View style={[styles.jobStepLine, i < current && { backgroundColor: C.teal }]} />}
          </View>
        );
      })}
    </View>
  );
}

export default function BookingDetails({ go, initialStatus = 'quotePending' }) {
  const [status, setStatus] = useState(initialStatus);
  const [extra, setExtra] = useState('pending');
  const completed = status === 'completed';

  const approve = () => { setStatus('inProgress'); Alert.alert('Quote approved', 'Ramesh can begin the repair. The visiting fee is waived.'); };
  const reject = () => { Alert.alert('Quote declined', '₹149 visit fee applies. The technician has been notified.'); go('bookings'); };
  const pay = () => go('payment');

  return (
    <View style={styles.flex}>
      <Header title="Booking #SRV-4092" onBack={() => go('bookings')} right={<IconButton name="help-circle-outline" onPress={() => go('support')} />} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.pagePadding, { paddingBottom: 120 }]}>
        <StatusStepper current={completed ? 4 : status === 'inProgress' ? 3 : 1} />

        <View style={[styles.personCard, { marginTop: 16 }]}>
          <View style={[styles.avatar, { backgroundColor: C.tealLight }]}><Text style={styles.avatarText}>RP</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.techName}>Ramesh Patel</Text>
            <Text style={styles.techTrade}>Electrician · 4.9 ★ · Today 4–6 PM</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Call Technician', 'Calling is available once a live technician phone number is connected.')} style={styles.callButton}>
            <Ionicons name="call-outline" size={16} color={C.teal} />
            <Text style={styles.callText}>Call Technician</Text>
          </Pressable>
        </View>

        <View style={[styles.photoThumb, { marginTop: 10 }]}>
          <Ionicons name="image-outline" size={24} color={C.muted} />
          <Text style={styles.photoThumbText}>2 problem photos attached</Text>
        </View>

        <Text style={styles.sectionTitle}>Itemized digital quotation</Text>
        <View style={styles.quoteCard}>
          {QUOTE_ROWS.map(([label, val]) => (
            <View key={label} style={styles.quoteRow}>
              <Text style={styles.quoteLabel}>{label}</Text>
              <Text style={[styles.quoteValue, val.startsWith('-') && { color: C.green }]}>{val}</Text>
            </View>
          ))}
          <View style={styles.quoteDivider} />
          <View style={styles.quoteRow}>
            <Text style={styles.quoteTotalLabel}>Net total</Text>
            <Text style={styles.quoteTotal}>₹501</Text>
          </View>

          {status === 'quotePending' && (
            <View style={styles.quoteActions}>
              <Pressable onPress={reject} style={[styles.payBtn, { backgroundColor: C.white, borderWidth: 1.5, borderColor: C.red, flex: 1 }]}>
                <Text style={[styles.payBtnText, { color: C.red }]}>Reject (Pay ₹149)</Text>
              </Pressable>
              <Pressable onPress={approve} style={[styles.payBtn, { backgroundColor: C.teal, flex: 1 }]}>
                <Text style={styles.payBtnText}>Approve Quote</Text>
              </Pressable>
            </View>
          )}
          {status === 'inProgress' && (
            <View style={[styles.warrantyPill, { backgroundColor: C.greenLight }]}><Text style={styles.warrantyPillText}>Quote approved · Work in progress</Text></View>
          )}
        </View>

        {extra === 'pending' && status === 'inProgress' && (
          <>
            <Text style={styles.sectionTitle}>Mid-repair additional charge</Text>
            <View style={[styles.waiverNote, { backgroundColor: C.orangeLight, borderRadius: 14, padding: 14, flexDirection: 'column', gap: 8 }]}>
              <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
                <Ionicons name="warning-outline" size={20} color={C.orange} />
                <Text style={[styles.waiverText, { fontWeight: '800', color: C.orange, fontSize: 12 }]}>Extra part discovered during repair</Text>
              </View>
              <View style={[styles.photoThumb, { backgroundColor: C.white, height: 58 }]}>
                <Ionicons name="image-outline" size={22} color={C.muted} />
                <Text style={styles.photoThumbText}>Photo proof of faulty capacitor</Text>
              </View>
              <Text style={styles.waiverText}>Capacitor replacement needed — ₹180 extra. Warranty 90 days on part.</Text>
              <View style={styles.quoteActions}>
                <Pressable onPress={() => setExtra('declined')} style={[styles.payBtn, { backgroundColor: C.white, borderWidth: 1.5, borderColor: C.line, flex: 1 }]}>
                  <Text style={[styles.payBtnText, { color: C.muted }]}>Decline</Text>
                </Pressable>
                <Pressable onPress={() => { setExtra('approved'); Alert.alert('Extra charge approved', 'The technician has been notified. Payment unlocks after the service is marked completed.'); }} style={[styles.payBtn, { backgroundColor: C.orange, flex: 1 }]}>
                  <Text style={styles.payBtnText}>Approve Extra ₹180</Text>
                </Pressable>
              </View>
            </View>
          </>
        )}
        {extra === 'approved' && (
          <View style={[styles.formInfo, { marginTop: 12 }]}>
            <Ionicons name="time-outline" size={18} color={C.teal} />
            <Text style={styles.formInfoText}>Extra charge approved. Payment stays locked until the technician marks the job completed.</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.stickyBar}>
        <View style={styles.stickyFee}>
          <Text style={styles.cardCaption}>TOTAL TO PAY</Text>
          <Text style={styles.cardPrice}>{extra === 'approved' ? '₹681' : '₹501'}</Text>
        </View>
        <Pressable
          onPress={completed ? pay : undefined}
          disabled={!completed}
          style={[styles.payBtn, !completed && styles.payBtnDisabled, completed && { backgroundColor: C.teal }]}
        >
          {!completed && (
            <View style={styles.lockRow}>
              <Ionicons name="lock-closed" size={13} color={C.white} />
              <Text style={styles.payBtnText}>Proceed to Pay · Locked</Text>
            </View>
          )}
          {completed && <Text style={styles.payBtnText}>Proceed to Pay {extra === 'approved' ? '₹681' : '₹501'}</Text>}
        </Pressable>
      </View>
      {!completed && (
        <Text style={{ position: 'absolute', bottom: 6, left: 0, right: 0, textAlign: 'center', color: C.muted, fontSize: 9 }}>
          Unlocks once technician marks service as Completed
        </Text>
      )}
    </View>
  );
}

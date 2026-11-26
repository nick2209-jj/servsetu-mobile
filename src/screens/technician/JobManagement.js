import React, { useMemo, useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon, IconButton, StatusPill } from '../../components';
import { styles } from '../../theme/appStyles';

const WARRANTY_OPTIONS = ['No Warranty', '30', '90', '180'];
const INITIAL_PARTS = [{ id: 1, name: 'Drain pump replacement', price: '200', warranty: '90' }];

export default function JobManagement({ go }) {
  const [arrived, setArrived] = useState(false);
  const [parts, setParts] = useState(INITIAL_PARTS);
  const [labor, setLabor] = useState('650');
  const [waiveVisit, setWaiveVisit] = useState(true);
  const [inspectionPhoto, setInspectionPhoto] = useState(false);
  const [quoteSent, setQuoteSent] = useState(false);
  const [quoteApproved, setQuoteApproved] = useState(false);
  const [workStarted, setWorkStarted] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [extraOpen, setExtraOpen] = useState(false);
  const [extraPhoto, setExtraPhoto] = useState(false);
  const [extraName, setExtraName] = useState('');
  const [extraAmount, setExtraAmount] = useState('');
  const [extraCharge, setExtraCharge] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [pin, setPin] = useState('');

  const partTotal = parts.reduce((sum, part) => sum + (Number(part.price) || 0), 0);
  const total = useMemo(
    () => Math.max(0, partTotal + (Number(labor) || 0) - (waiveVisit ? 149 : 0) + (extraCharge?.status === 'APPROVED' ? Number(extraCharge.amount) : 0)),
    [partTotal, labor, waiveVisit, extraCharge],
  );
  const hasPendingExtra = extraCharge?.status === 'PENDING';
  const statusLabel = completed ? 'Completed' : workStarted ? 'In Progress' : quoteApproved ? 'Quote Approved' : quoteSent ? 'Quote Sent' : arrived ? 'Arrived' : 'Requested';

  const updatePart = (id, key, value) => setParts((current) => current.map((part) => part.id === id ? { ...part, [key]: value } : part));
  const addPart = () => setParts((current) => [...current, { id: Date.now(), name: '', price: '', warranty: '30' }]);
  const sendQuote = () => {
    if (!arrived || !parts.length || parts.some((part) => !part.name.trim() || !part.price || Number(part.price) < 0) || Number(labor) < 0) {
      Alert.alert('Quote needs attention', 'Mark your arrival and enter a part name, valid price, and labor charge before sending.');
      return;
    }
    setQuoteSent(true);
    Alert.alert('Quote sent', 'The itemized quote is now awaiting customer approval.');
  };
  const simulateQuoteApproval = () => {
    setQuoteApproved(true);
    Alert.alert('Quote approved', 'Customer approval received. You can now start the repair.');
  };
  const submitExtra = () => {
    if (!extraPhoto || !extraName.trim() || !extraAmount || Number(extraAmount) <= 0) {
      Alert.alert('Complete the additional charge', 'Attach a fault photo and enter a part name and a valid amount.');
      return;
    }
    setExtraCharge({ name: extraName.trim(), amount: extraAmount, status: 'PENDING' });
    setExtraOpen(false);
    Alert.alert('Approval requested', 'The additional charge is waiting for customer approval. Job completion is paused.');
  };
  const verifyCash = () => {
    if (!/^\d{4}$/.test(pin)) {
      Alert.alert('Enter the cash PIN', 'The confirmation PIN must contain exactly four digits.');
      return;
    }
    if (pin !== '4829') {
      Alert.alert('PIN did not match', 'Check the customer confirmation PIN and try again.');
      return;
    }
    Alert.alert('Cash payment verified', `₹${total} received and recorded.`);
  };
  const advanceJob = () => {
    if (!arrived) {
      setArrived(true);
      return;
    }
    if (!quoteSent) {
      Alert.alert('Send the quote first', 'Customers must approve the itemized quote before repair work begins.');
      return;
    }
    if (!quoteApproved) {
      Alert.alert('Approval required', 'Wait for customer approval before starting repair work.');
      return;
    }
    if (!workStarted) {
      setWorkStarted(true);
      return;
    }
    if (hasPendingExtra) {
      Alert.alert('Waiting for customer approval', 'You cannot complete the job while an additional charge is pending.');
      return;
    }
    setCompleted(true);
    Alert.alert('Service completed', 'The customer can now proceed to payment.');
  };

  return (
    <View style={styles.flex}>
      <Header
        title="Job #SS-24072"
        subtitle="Washing machine noise"
        onBack={() => go('techDashboard')}
        right={<StatusPill label={statusLabel} />}
      />
      <ScrollView contentContainerStyle={[styles.pagePadding, { paddingBottom: 24 }]}>
        <View style={styles.customerJobCard}>
          <View style={[styles.avatar, { backgroundColor: C.tealLight }]}><Text style={styles.avatarText}>PS</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.techName}>Priya Shah</Text>
            <Text style={styles.techTrade}>B-204, Shreeji Heights, Alkapuri · 390007</Text>
          </View>
          <IconButton name="call-outline" onPress={() => Alert.alert('Call customer', 'Calling is available once a live customer number is connected.')} />
        </View>

        <View style={styles.jobPhoto}>
          <Icon name="image-outline" size={27} color={C.muted} />
          <Text style={styles.photoThumbText}>Customer fault photo · Washing machine pump</Text>
        </View>

        <Text style={styles.sectionTitle}>Job progress</Text>
        <View style={[styles.jobSteps, { paddingVertical: 16 }]}>
          {[
            ['Arrived', arrived],
            ['Quote approved', quoteApproved],
            ['In progress', workStarted],
            ['Completed', completed],
          ].map(([label, done], index) => (
            <View key={label} style={styles.jobStep}>
              <View style={[styles.jobStepCircle, done && styles.jobStepDone]}>
                {done ? <Icon name="checkmark" size={14} color={C.white} /> : <Text style={styles.jobStepNumber}>{index + 1}</Text>}
              </View>
              <Text style={[styles.jobStepText, done && { color: C.teal, fontWeight: '700' }]}>{label}</Text>
              {index < 3 && <View style={[styles.jobStepLine, done && { backgroundColor: C.teal }]} />}
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Itemized quotation</Text>
        <View style={styles.quoteCard}>
          {parts.map((part, index) => (
            <View key={part.id} style={{ marginBottom: 12 }}>
              <Text style={styles.fieldLabel}>SPARE PART {index + 1}</Text>
              <View style={[styles.fieldBox, { marginBottom: 8 }]}><TextInput value={part.name} onChangeText={(value) => updatePart(part.id, 'name', value)} placeholder="Part name" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>
              <View style={{ flexDirection: 'row', gap: 8 }}>
                <View style={[styles.fieldBox, { flex: 1 }]}><TextInput value={part.price} onChangeText={(value) => updatePart(part.id, 'price', value.replace(/[^0-9]/g, ''))} placeholder="Price ₹" keyboardType="number-pad" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>
                <View style={[styles.dateChipRow, { flex: 1, marginBottom: 0 }]}>
                  {WARRANTY_OPTIONS.map((days) => (
                    <Pressable key={days} onPress={() => updatePart(part.id, 'warranty', days)} style={[styles.dateChip, { paddingVertical: 7 }, part.warranty === days && styles.dateChipActive]}>
                      <Text style={[styles.chipText, { fontSize: 9 }, part.warranty === days && { color: C.teal }]}>{days === 'No Warranty' ? 'None' : `${days}d`}</Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </View>
          ))}
          <Pressable onPress={addPart} style={{ paddingVertical: 7 }}>
            <Text style={styles.link}>+ Add Another Part</Text>
          </Pressable>

          <Field label="LABOR CHARGE (₹)" value={labor} onChangeText={(value) => setLabor(value.replace(/[^0-9]/g, ''))} keyboardType="number-pad" />
          <Pressable onPress={() => setWaiveVisit((value) => !value)} style={[styles.checkRow, { paddingVertical: 5 }]}>
            <View style={[styles.checkbox, waiveVisit && styles.checkboxActive]}>{waiveVisit && <Icon name="checkmark" size={15} color={C.white} />}</View>
            <Text style={[styles.radioText, { flex: 1 }]}>Deduct ₹149 visiting fee on quote approval</Text>
          </Pressable>

          <Pressable onPress={() => setInspectionPhoto(true)} style={[styles.photoBox, { height: 66, marginTop: 10 }]}>
            <Icon name={inspectionPhoto ? 'checkmark-circle' : 'camera-outline'} size={21} color={C.teal} />
            <Text style={styles.photoText}>{inspectionPhoto ? 'Inspection photo attached' : 'Upload inspection photo'}</Text>
          </Pressable>

          <View style={styles.quoteDivider} />
          <View style={styles.quoteRow}>
            <Text style={styles.quoteTotalLabel}>Live total quote</Text>
            <Text style={styles.quoteTotal}>₹{total}</Text>
          </View>
          <Button onPress={sendQuote} disabled={!arrived || quoteSent || completed}>
            {quoteSent ? 'Quote Sent · Awaiting Approval' : 'Send Quote to Customer for Approval'}
          </Button>
          {quoteSent && !quoteApproved && (
            <Button secondary onPress={simulateQuoteApproval}>Simulate Customer Quote Approval</Button>
          )}
        </View>

        {workStarted && !completed && (
          <>
            <Text style={styles.sectionTitle}>Additional charge</Text>
            {extraCharge ? (
              <View style={styles.quoteCard}>
                <View style={styles.quoteRow}>
                  <Text style={styles.quoteLabel}>{extraCharge.name} · ₹{extraCharge.amount}</Text>
                  <StatusPill label={extraCharge.status} color={extraCharge.status === 'APPROVED' ? C.green : C.orange} background={extraCharge.status === 'APPROVED' ? C.greenLight : C.orangeLight} />
                </View>
                {extraCharge.status === 'PENDING' && <Button secondary onPress={() => setExtraCharge((current) => ({ ...current, status: 'APPROVED' }))}>Simulate Customer Approval</Button>}
              </View>
            ) : (
              <View style={styles.quoteCard}>
                {!extraOpen ? (
                  <Button secondary onPress={() => setExtraOpen(true)}>+ Request Additional Part / Charge</Button>
                ) : (
                  <>
                    <Pressable onPress={() => setExtraPhoto(true)} style={[styles.photoBox, { height: 62, marginTop: 0 }]}>
                      <Icon name={extraPhoto ? 'checkmark-circle' : 'camera-outline'} size={20} color={C.teal} />
                      <Text style={styles.photoText}>{extraPhoto ? 'Fault photo attached' : 'Attach fault photo'}</Text>
                    </Pressable>
                    <View style={[styles.fieldBox, { marginBottom: 9 }]}><TextInput value={extraName} onChangeText={setExtraName} placeholder="Part name and reason" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>
                    <View style={[styles.fieldBox, { marginBottom: 9 }]}><TextInput value={extraAmount} onChangeText={(value) => setExtraAmount(value.replace(/[^0-9]/g, ''))} placeholder="Extra amount ₹" keyboardType="number-pad" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>
                    <Button onPress={submitExtra}>Send for Customer Approval</Button>
                    <Button secondary onPress={() => setExtraOpen(false)}>Cancel</Button>
                  </>
                )}
              </View>
            )}
          </>
        )}

        <Text style={styles.sectionTitle}>Job progression & settlement</Text>
        <View style={styles.quoteCard}>
          <Button onPress={advanceJob} disabled={completed || (quoteSent && !quoteApproved) || (workStarted && hasPendingExtra)}>
            {!arrived ? 'Mark Arrived at Location' : !quoteApproved ? (quoteSent ? 'Awaiting Customer Approval' : 'Send Quote Before Starting Work') : !workStarted ? 'Start Repair Work' : completed ? 'Service Completed' : 'Mark Service Completed'}
          </Button>
          {workStarted && !completed && !extraCharge && <Text style={styles.centerNote}>Completion is available after the approved work is done.</Text>}
          {workStarted && hasPendingExtra && <Text style={[styles.centerNote, { color: C.orange }]}>Completion is blocked until the customer approves the extra charge.</Text>}

          {completed && (
            <View style={{ marginTop: 8 }}>
              <Text style={styles.fieldLabel}>PAYMENT SETTLEMENT · ₹{total}</Text>
              <View style={styles.dateChipRow}>
                {['UPI', 'Cash'].map((method) => (
                  <Pressable key={method} onPress={() => setPaymentMethod(method)} style={[styles.dateChip, paymentMethod === method && styles.dateChipActive]}>
                    <Text style={[styles.chipText, paymentMethod === method && { color: C.teal }]}>{method === 'UPI' ? 'Online UPI' : 'Cash'}</Text>
                  </Pressable>
                ))}
              </View>
              {paymentMethod === 'UPI' ? (
                <View style={[styles.verifiedBanner, { backgroundColor: C.greenLight }]}>
                  <Icon name="checkmark-circle" size={20} color={C.green} />
                  <Text style={[styles.verifiedTitle, { color: C.green }]}>Paid Online via UPI — ₹{total}</Text>
                </View>
              ) : (
                <>
                  <Text style={styles.pinHelp}>Ask the customer for their 4-digit cash confirmation PIN.</Text>
                  <View style={[styles.fieldBox, { marginBottom: 9 }]}><TextInput value={pin} onChangeText={(value) => setPin(value.replace(/[^0-9]/g, '').slice(0, 4))} placeholder="Enter 4-digit PIN" keyboardType="number-pad" maxLength={4} placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlign: 'center', fontSize: 20, letterSpacing: 8 }]} /></View>
                  <Button onPress={verifyCash}>Verify Cash Received</Button>
                </>
              )}
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

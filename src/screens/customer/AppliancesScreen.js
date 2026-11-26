import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Button, Header } from '../../components';
import { styles } from '../../theme/appStyles';

const APPLIANCES = [
  { name: 'LG Front-Load', cat: 'Washing machine', last: 'Repaired 12 Sep 2024 · Mehul Parmar', parts: 'Drain pump · 90 days warranty', days: '54 Days Warranty Left', color: C.tealLight },
  { name: 'Voltas Split AC', cat: 'Air conditioner', last: 'Serviced 21 Aug 2024 · Ramesh Patel', parts: 'Gas refill · 30 days warranty', days: 'Warranty active · 89 days', color: C.orangeLight },
  { name: 'Aquaguard RO', cat: 'RO Purifier', last: 'Repaired 02 Jul 2024 · Imran Shaikh', parts: 'Membrane · 90 days warranty', days: 'Warranty expired', color: C.redLight },
];

function ApplianceView({ go }) {
  return (
    <>
      {APPLIANCES.map((a) => (
        <View key={a.name} style={styles.applianceCard}>
          <View style={[styles.applianceIcon, { backgroundColor: a.color }]}>
            <Ionicons name="sync-outline" size={24} color={C.teal} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.applianceName}>{a.name}</Text>
            <Text style={styles.applianceCategory}>{a.cat}</Text>
            <Text style={[styles.settingsSub, { marginTop: 5 }]}>{a.last}</Text>
            <Text style={styles.settingsSub}>{a.parts}</Text>
            <View style={[styles.warrantyPill, { backgroundColor: a.days.includes('expired') ? C.redLight : C.greenLight }]}>
              <Text style={[styles.warrantyPillText, a.days.includes('expired') && { color: C.red }]}>{a.days}</Text>
            </View>
            {a.days !== 'Warranty expired' && (
              <Pressable onPress={() => go('warrantyClaim')} style={[styles.bookBtn, { alignSelf: 'flex-start', marginTop: 8, backgroundColor: C.tealLight }]}>
                <Text style={[styles.bookBtnText, { color: C.teal }]}>Claim Free Warranty Re-visit</Text>
              </Pressable>
            )}
          </View>
        </View>
      ))}
      <View style={styles.infoCard}>
        <Ionicons name="shield-checkmark-outline" size={22} color={C.teal} />
        <Text style={styles.infoCardText}>Every completed repair gets a digital warranty certificate. If the same issue returns during the warranty period, your re-visit is free.</Text>
      </View>
    </>
  );
}

const TXNS = [
  ['26 Sep', 'Ramesh Patel', 'SRV-4092', 'UPI', '₹681'],
  ['08 Sep', 'Imran Shaikh', 'SRV-3988', 'Cash', '₹299'],
  ['21 Aug', 'Ramesh Patel', 'SRV-3950', 'UPI', '₹550'],
];

function TxnView() {
  return (
    <>
      {TXNS.map(([date, name, id, mode, amount]) => (
        <View key={id} style={styles.transactionRow}>
          <View style={styles.transactionDate}><Text style={styles.transactionDay}>{date.split(' ')[0]}</Text><Text style={styles.transactionMonth}>{date.split(' ')[1]}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>{name}</Text>
            <Text style={styles.transactionSub}>{id}</Text>
            <View style={[styles.addrTag, { alignSelf: 'flex-start', marginTop: 4, backgroundColor: mode === 'UPI' ? C.tealLight : C.orangeLight }]}>
              <Text style={[styles.addrTagText, { color: mode === 'UPI' ? C.teal : C.orange }]}>{mode}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.transactionAmount}>{amount}</Text>
            <Pressable accessibilityLabel={`Download invoice for ${id}`} onPress={() => Alert.alert('Invoice', `The invoice for ${id} is not available in this demo.`)}>
              <Ionicons name="download-outline" size={17} color={C.teal} />
            </Pressable>
          </View>
        </View>
      ))}
    </>
  );
}

const ADDRESSES = [
  ['Home', 'B-204, Shreeji Heights', 'Alkapuri, Vadodara · 390007', true],
  ['Work', 'Unit 12, Laxmi Complex', 'Race Course, Vadodara · 390007', false],
];

function AddressView() {
  const [addrs, setAddrs] = useState(ADDRESSES);
  const [addOpen, setAddOpen] = useState(false);
  const [tag, setTag] = useState('Home');
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const addAddress = () => {
    if (!line1.trim() || !line2.trim()) {
      Alert.alert('Complete the address', 'Enter the flat / society and area / pincode before saving.');
      return;
    }
    setAddrs((prev) => [...prev.map((a) => [a[0], a[1], a[2], false]), [tag, line1.trim(), line2.trim(), prev.length === 0]]);
    setLine1('');
    setLine2('');
    setAddOpen(false);
  };
  return (
    <>
      {addrs.map(([tag, line1, line2, def], i) => (
        <View key={i} style={styles.addressCard}>
          <Ionicons name={tag === 'Home' ? 'home-outline' : 'business-outline'} size={20} color={C.teal} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={styles.addrTag}><Text style={styles.addrTagText}>{tag}</Text></View>
              {def && <Text style={{ color: C.teal, fontSize: 9, fontWeight: '800' }}>DEFAULT</Text>}
            </View>
            <Text style={[styles.addressTitle, { marginTop: 5 }]}>{line1}</Text>
            <Text style={styles.addressText}>{line2}</Text>
          </View>
          <Pressable onPress={() => setAddrs((prev) => prev.map((a, j) => [a[0], a[1], a[2], j === i]))}>
            <Ionicons name="radio-button-on" size={18} color={def ? C.teal : C.muted} />
          </Pressable>
        </View>
      ))}
      <Button secondary onPress={() => setAddOpen(true)}>+ Add New Address</Button>
      <Modal transparent visible={addOpen} animationType="slide" onRequestClose={() => setAddOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setAddOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Add a saved address</Text>
            <View style={styles.chipWrap}>
              {['Home', 'Work', 'Society'].map((item) => (
                <Pressable key={item} onPress={() => setTag(item)} style={[styles.chip, tag === item && styles.chipActive]}>
                  <Text style={[styles.chipText, tag === item && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput value={line1} onChangeText={setLine1} placeholder="Flat no. and society" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 10 }]} />
            <TextInput value={line2} onChangeText={setLine2} placeholder="Landmark, city and pincode" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 14 }]} />
            <Button onPress={addAddress}>Save address</Button>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
}

const RATES = [
  ['Tap / mixer replacement', '₹150 – ₹250'],
  ['Concealed pipe leak', '₹400 – ₹600 + parts'],
  ['AC jet servicing', '₹450 – ₹650'],
  ['AC gas refill', '₹1,800 – ₹2,800'],
  ['Fan installation', '₹200 – ₹300'],
  ['Geyser repair', '₹300 – ₹550 + parts'],
];

function RateGuideView() {
  const [q, setQ] = useState('');
  const [booking, setBooking] = useState('');
  const [description, setDescription] = useState('');
  const list = RATES.filter(([n]) => n.toLowerCase().includes(q.toLowerCase()));
  const submitDispute = () => {
    if (!booking || !description.trim()) {
      Alert.alert('Complete the dispute form', 'Select a recent booking and describe what you would like us to review.');
      return;
    }
    Alert.alert('Dispute submitted', `Your concern about ${booking} has been recorded for review.`);
    setBooking('');
    setDescription('');
  };
  return (
    <>
      <View style={styles.searchGuide}>
        <Ionicons name="search-outline" size={17} color={C.muted} />
        <TextInput placeholder="Search standard repair rates..." placeholderTextColor={C.muted} style={styles.searchInput} value={q} onChangeText={setQ} />
      </View>
      <View style={styles.quoteCard}>
        {list.map(([name, range]) => (
          <View key={name} style={styles.rateRow}>
            <Text style={[styles.rateRowLabel, { fontWeight: '600' }]}>{name}</Text>
            <Text style={[styles.ratePrice, { fontSize: 12 }]}>{range}</Text>
          </View>
        ))}
        {list.length === 0 && <Text style={styles.centerNote}>No matching rates found.</Text>}
      </View>
      <View style={styles.disputeBox}>
        <Text style={styles.settingsTitle}>Raise a dispute</Text>
        <Text style={styles.settingsSub}>Choose a recent booking and tell us what happened.</Text>
        <View style={[styles.chipWrap, { marginTop: 10 }]}>
          {['SRV-4092', 'SRV-3988', 'SRV-3950'].map((id) => (
            <Pressable key={id} onPress={() => setBooking(id)} style={[styles.chip, booking === id && styles.chipActive]}>
              <Text style={[styles.chipText, booking === id && styles.chipTextActive]}>{id}</Text>
            </Pressable>
          ))}
        </View>
        <View style={[styles.fieldBox, { minHeight: 76, alignItems: 'flex-start', paddingTop: 10, marginTop: 12 }]}>
          <TextInput value={description} onChangeText={setDescription} multiline placeholder="Describe the issue with the quote or repair..." placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} />
        </View>
        <Button onPress={submitDispute}>Submit dispute</Button>
      </View>
    </>
  );
}

export default function AppliancesScreen({ go, view = 'appliances', fromSettings = false }) {
  const titles = {
    appliances: ['Appliances & Warranties', 'Your digital repair log'],
    transactions: ['Transaction History', 'Receipts for every payment'],
    addresses: ['Saved Addresses', 'Your service locations'],
    support: ['Rate Card Guide & Support', 'Standard market repair rates'],
  };
  const [title, subtitle] = titles[view];
  return (
    <View style={styles.flex}>
      <Header title={title} subtitle={subtitle} onBack={() => go(view === 'appliances' && !fromSettings ? 'bookings' : 'settings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        {view === 'appliances' && <ApplianceView go={go} />}
        {view === 'transactions' && <TxnView />}
        {view === 'addresses' && <AddressView />}
        {view === 'support' && <RateGuideView />}
      </ScrollView>
    </View>
  );
}

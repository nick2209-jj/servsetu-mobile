import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Share, Text, TextInput, View } from 'react-native';
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
  { date: '26 Sep', technician: 'Ramesh Patel', id: 'SRV-4092', service: 'AC compressor repair', mode: 'UPI', amount: 681 },
  { date: '08 Sep', technician: 'Imran Shaikh', id: 'SRV-3988', service: 'Kitchen tap replacement', mode: 'Cash', amount: 299 },
  { date: '21 Aug', technician: 'Ramesh Patel', id: 'SRV-3950', service: 'AC servicing', mode: 'UPI', amount: 550 },
];

function getReceiptTax(total) {
  const taxable = Number((total / 1.18).toFixed(2));
  return { taxable, gst: Number((total - taxable).toFixed(2)) };
}

function TxnView() {
  const [selectedReceipt, setSelectedReceipt] = useState(null);
  const selectedTax = selectedReceipt ? getReceiptTax(selectedReceipt.amount) : null;
  const shareReceipt = async () => {
    if (!selectedReceipt) return;
    const total = selectedReceipt.amount;
    const { taxable, gst } = getReceiptTax(total);
    const message = [
      'ServSetu receipt preview (demo)',
      `Booking: ${selectedReceipt.id}`,
      `Service: ${selectedReceipt.service}`,
      `Technician: ${selectedReceipt.technician}`,
      `Service amount before GST: ₹${taxable}`,
      `GST (18%): ₹${gst}`,
      `Total paid: ₹${total}`,
      `Payment method: ${selectedReceipt.mode}`,
    ].join('\n');
    try {
      await Share.share({ title: `Receipt ${selectedReceipt.id}`, message });
    } catch (error) {
      Alert.alert('Unable to share receipt', error.message || 'Please try again.');
    }
  };

  return (
    <>
      {TXNS.map((transaction) => (
        <View key={transaction.id} style={styles.transactionRow}>
          <View style={styles.transactionDate}><Text style={styles.transactionDay}>{transaction.date.split(' ')[0]}</Text><Text style={styles.transactionMonth}>{transaction.date.split(' ')[1]}</Text></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.transactionTitle}>{transaction.technician}</Text>
            <Text style={styles.transactionSub}>{transaction.id}</Text>
            <View style={[styles.addrTag, { alignSelf: 'flex-start', marginTop: 4, backgroundColor: transaction.mode === 'UPI' ? C.tealLight : C.orangeLight }]}>
              <Text style={[styles.addrTagText, { color: transaction.mode === 'UPI' ? C.teal : C.orange }]}>{transaction.mode}</Text>
            </View>
          </View>
          <View style={{ alignItems: 'flex-end' }}>
            <Text style={styles.transactionAmount}>₹{transaction.amount}</Text>
            <Pressable accessibilityLabel={`Preview receipt for ${transaction.id}`} onPress={() => setSelectedReceipt(transaction)}>
              <Ionicons name="download-outline" size={17} color={C.teal} />
            </Pressable>
          </View>
        </View>
      ))}
      <Modal transparent visible={!!selectedReceipt} animationType="slide" onRequestClose={() => setSelectedReceipt(null)}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalCard, { alignItems: 'stretch' }]}>
            {selectedReceipt && (
              <>
                <Text style={styles.sheetTitle}>Receipt Preview</Text>
                <Text style={styles.transactionSub}>Booking {selectedReceipt.id} · {selectedReceipt.date}</Text>
                <Text style={styles.centerNote}>Demo receipt · GST split is illustrative at 18%.</Text>
                <View style={[styles.billCard, { width: '100%', marginTop: 14 }]}>
                  <View style={styles.quoteRow}><Text style={styles.quoteLabel}>Service</Text><Text style={styles.quoteValue}>{selectedReceipt.service}</Text></View>
                  <View style={styles.quoteRow}><Text style={styles.quoteLabel}>Technician</Text><Text style={styles.quoteValue}>{selectedReceipt.technician}</Text></View>
                  <View style={styles.quoteRow}><Text style={styles.quoteLabel}>Service amount before GST</Text><Text style={styles.quoteValue}>₹{selectedTax.taxable.toFixed(2)}</Text></View>
                  <View style={styles.quoteRow}><Text style={styles.quoteLabel}>GST (18%)</Text><Text style={styles.quoteValue}>₹{selectedTax.gst.toFixed(2)}</Text></View>
                  <View style={styles.quoteDivider} />
                  <View style={styles.quoteRow}><Text style={styles.quoteTotalLabel}>Total paid</Text><Text style={styles.quoteTotal}>₹{selectedReceipt.amount}</Text></View>
                  <View style={[styles.addrTag, { alignSelf: 'flex-start', marginTop: 10, backgroundColor: selectedReceipt.mode === 'UPI' ? C.tealLight : C.orangeLight }]}>
                    <Text style={[styles.addrTagText, { color: selectedReceipt.mode === 'UPI' ? C.teal : C.orange }]}>Paid via {selectedReceipt.mode}</Text>
                  </View>
                </View>
                <Button onPress={shareReceipt}>Share / Save Receipt</Button>
                <Button secondary onPress={() => setSelectedReceipt(null)}>Close</Button>
              </>
            )}
          </View>
        </View>
      </Modal>
    </>
  );
}

const ADDRESSES = [
  { id: 'home', label: 'Home', flat: 'B-204', society: 'Shreeji Heights', area: 'Alkapuri, Vadodara', pincode: '390007', isDefault: true },
  { id: 'work', label: 'Work', flat: 'Unit 12', society: 'Laxmi Complex', area: 'Race Course, Vadodara', pincode: '390007', isDefault: false },
];

function AddressView() {
  const [addrs, setAddrs] = useState(ADDRESSES);
  const [addOpen, setAddOpen] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState(null);
  const [label, setLabel] = useState('Home');
  const [flat, setFlat] = useState('');
  const [society, setSociety] = useState('');
  const [area, setArea] = useState('');
  const [pincode, setPincode] = useState('');

  const openNewAddress = () => {
    setEditingAddressId(null);
    setLabel('Home');
    setFlat('');
    setSociety('');
    setArea('');
    setPincode('');
    setAddOpen(true);
  };

  const editAddress = (address) => {
    setEditingAddressId(address.id);
    setLabel(address.label);
    setFlat(address.flat);
    setSociety(address.society);
    setArea(address.area);
    setPincode(address.pincode);
    setAddOpen(true);
  };

  const saveAddress = () => {
    if (!label || !flat.trim() || !society.trim() || !area.trim() || !/^\d{6}$/.test(pincode)) {
      Alert.alert('Complete the address', 'Enter a flat, society, area and valid 6-digit pincode.');
      return;
    }
    const updatedAddress = {
      id: editingAddressId || `address-${Date.now()}`,
      label,
      flat: flat.trim(),
      society: society.trim(),
      area: area.trim(),
      pincode,
    };
    setAddrs((current) => editingAddressId
      ? current.map((address) => address.id === editingAddressId ? { ...address, ...updatedAddress } : address)
      : [...current, { ...updatedAddress, isDefault: current.length === 0 }]);
    setAddOpen(false);
  };

  const deleteAddress = (address) => {
    Alert.alert('Delete saved address?', `Remove ${address.label} from your saved addresses?`, [
      { text: 'Cancel', style: 'cancel' },
      {
        text: 'Delete',
        style: 'destructive',
        onPress: () => setAddrs((current) => {
          const remaining = current.filter((item) => item.id !== address.id);
          if (address.isDefault && remaining.length) {
            return remaining.map((item, index) => ({ ...item, isDefault: index === 0 }));
          }
          return remaining;
        }),
      },
    ]);
  };

  return (
    <>
      {addrs.map((address) => (
        <View key={address.id} style={styles.addressCard}>
          <Ionicons name={address.label === 'Home' ? 'home-outline' : 'business-outline'} size={20} color={C.teal} />
          <View style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', gap: 8, alignItems: 'center' }}>
              <View style={styles.addrTag}><Text style={styles.addrTagText}>{address.label}</Text></View>
              {address.isDefault && <Text style={{ color: C.teal, fontSize: 9, fontWeight: '800' }}>DEFAULT</Text>}
            </View>
            <Text style={[styles.addressTitle, { marginTop: 5 }]}>{address.flat}, {address.society}</Text>
            <Text style={styles.addressText}>{address.area} · {address.pincode}</Text>
          </View>
          <View style={{ alignItems: 'center', gap: 8 }}>
            <View style={{ flexDirection: 'row', gap: 6 }}>
              <Pressable accessibilityLabel={`Edit ${address.label} address`} onPress={() => editAddress(address)} style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: C.tealLight, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="pencil-outline" size={15} color={C.teal} />
              </Pressable>
              <Pressable accessibilityLabel={`Delete ${address.label} address`} onPress={() => deleteAddress(address)} style={{ width: 30, height: 30, borderRadius: 9, backgroundColor: C.redLight, alignItems: 'center', justifyContent: 'center' }}>
                <Ionicons name="trash-outline" size={15} color={C.red} />
              </Pressable>
            </View>
            <Pressable accessibilityLabel={`Set ${address.label} as default address`} onPress={() => setAddrs((current) => current.map((item) => ({ ...item, isDefault: item.id === address.id })))}>
              <Ionicons name={address.isDefault ? 'radio-button-on' : 'radio-button-off'} size={18} color={address.isDefault ? C.teal : C.muted} />
            </Pressable>
          </View>
        </View>
      ))}
      <Button secondary onPress={openNewAddress}>+ Add New Address</Button>
      <Modal transparent visible={addOpen} animationType="slide" onRequestClose={() => setAddOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setAddOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{editingAddressId ? 'Edit saved address' : 'Add a saved address'}</Text>
            <View style={styles.chipWrap}>
              {['Home', 'Work', 'Society'].map((item) => (
                <Pressable key={item} onPress={() => setLabel(item)} style={[styles.chip, label === item && styles.chipActive]}>
                  <Text style={[styles.chipText, label === item && styles.chipTextActive]}>{item}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput value={flat} onChangeText={setFlat} placeholder="Flat / house number" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 10 }]} />
            <TextInput value={society} onChangeText={setSociety} placeholder="Building / society" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 10 }]} />
            <TextInput value={area} onChangeText={setArea} placeholder="Area / locality" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 10 }]} />
            <TextInput value={pincode} onChangeText={(value) => setPincode(value.replace(/\D/g, '').slice(0, 6))} placeholder="6-digit pincode" keyboardType="number-pad" placeholderTextColor="#9AA8B5" style={[styles.fieldBox, { marginBottom: 14 }]} />
            <Button onPress={saveAddress}>{editingAddressId ? 'Save changes' : 'Save address'}</Button>
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

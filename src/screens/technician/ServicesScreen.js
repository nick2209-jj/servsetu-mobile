import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

const INITIAL_SERVICES = [
  { id: 'ac', name: 'Split AC jet servicing', trade: 'AC & Fridge', price: '499', priceType: 'Fixed Price', warranty: '30 Days', active: true, notes: '' },
  { id: 'tap', name: 'Tap / mixer replacement', trade: 'Plumbing', price: '150', priceType: 'Starting From', warranty: '30 Days', active: true, notes: 'Parts charged separately' },
  { id: 'washer', name: 'Washing machine pump repair', trade: 'Washing Machine', price: '650', priceType: 'Starting From', warranty: '90 Days', active: false, notes: '' },
  { id: 'switch', name: 'Switchboard repair', trade: 'Electrical', price: '249', priceType: 'Fixed Price', warranty: '30 Days', active: true, notes: '' },
];
const TRADES = ['Plumbing', 'Electrical', 'Washing Machine', 'AC & Fridge', 'RO Purifier'];
const WARRANTIES = ['No Warranty', '30 Days', '90 Days', '180 Days'];

export default function ServicesScreen({ go }) {
  const [services, setServices] = useState(INITIAL_SERVICES);
  const [visible, setVisible] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [name, setName] = useState('');
  const [trade, setTrade] = useState(TRADES[0]);
  const [priceType, setPriceType] = useState('Fixed Price');
  const [price, setPrice] = useState('');
  const [warranty, setWarranty] = useState('30 Days');
  const [notes, setNotes] = useState('');

  const openForm = (service) => {
    setEditingId(service?.id || null);
    setName(service?.name || '');
    setTrade(service?.trade || TRADES[0]);
    setPriceType(service?.priceType || 'Fixed Price');
    setPrice(service?.price || '');
    setWarranty(service?.warranty || '30 Days');
    setNotes(service?.notes || '');
    setVisible(true);
  };
  const save = () => {
    if (!name.trim() || !price || Number(price) <= 0) {
      Alert.alert('Complete the service details', 'Add a service title and a valid price before saving.');
      return;
    }
    const updated = { id: editingId || String(Date.now()), name: name.trim(), trade, price, priceType, warranty, notes, active: true };
    setServices((current) => editingId ? current.map((item) => item.id === editingId ? { ...item, ...updated, active: item.active } : item) : [...current, updated]);
    setVisible(false);
  };

  return (
    <MainLayout active="services" onChange={go} technician>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Header title="My Services & Rate Card" subtitle="Published on your customer profile" right={<Pressable onPress={() => openForm()} style={[styles.bookBtn, { paddingVertical: 9 }]}><Text style={styles.bookBtnText}>+ Add Service</Text></Pressable>} />
        <View style={styles.serviceNotice}>
          <Icon name="information-circle-outline" size={18} color={C.teal} />
          <Text style={styles.serviceNoticeText}>Clear prices, warranty terms, and service rules help customers choose you.</Text>
        </View>
        {services.map((service) => (
          <View key={service.id} style={styles.serviceCard}>
            <View style={styles.serviceIcon}><Icon name="construct-outline" size={20} color={C.teal} /></View>
            <Pressable onPress={() => openForm(service)} style={{ flex: 1 }}>
              <Text style={styles.serviceName}>{service.name}</Text>
              <View style={[styles.addrTag, { alignSelf: 'flex-start', marginTop: 4, backgroundColor: C.tealLight }]}>
                <Text style={[styles.addrTagText, { color: C.teal }]}>{service.trade}</Text>
              </View>
              <View style={styles.serviceMeta}>
                <Text style={styles.servicePrice}>{service.priceType === 'Starting From' ? 'Starts at ' : ''}₹{service.price}</Text>
                <Text style={styles.serviceWarranty}>{service.warranty} warranty</Text>
              </View>
              {!!service.notes && <Text style={styles.settingsSub}>{service.notes}</Text>}
            </Pressable>
            <View style={{ alignItems: 'center', marginLeft: 5 }}>
              <Switch
                value={service.active}
                onValueChange={(active) => setServices((current) => current.map((item) => item.id === service.id ? { ...item, active } : item))}
                trackColor={{ true: C.teal }}
              />
              <Text style={styles.settingsSub}>{service.active ? 'Active' : 'Inactive'}</Text>
            </View>
          </View>
        ))}
      </ScrollView>

      <Modal transparent visible={visible} animationType="slide" onRequestClose={() => setVisible(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setVisible(false)}>
          <Pressable style={[styles.sheet, { maxHeight: '90%' }]} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <ScrollView keyboardShouldPersistTaps="handled">
              <Text style={styles.sheetTitle}>{editingId ? 'Edit service' : 'Add a service'}</Text>
              <Field label="SERVICE TITLE" placeholder="e.g. Split AC foam-jet servicing" value={name} onChangeText={setName} />
              <Text style={styles.fieldLabel}>TRADE CATEGORY</Text>
              <View style={styles.chipWrap}>
                {TRADES.map((item) => <Pressable key={item} onPress={() => setTrade(item)} style={[styles.chip, trade === item && styles.chipActive]}><Text style={[styles.chipText, trade === item && styles.chipTextActive]}>{item}</Text></Pressable>)}
              </View>
              <Text style={styles.fieldLabel}>PRICE TYPE</Text>
              <View style={styles.dateChipRow}>
                {['Fixed Price', 'Starting From'].map((item) => <Pressable key={item} onPress={() => setPriceType(item)} style={[styles.dateChip, priceType === item && styles.dateChipActive]}><Text style={[styles.chipText, priceType === item && { color: C.teal }]}>{item}</Text></Pressable>)}
              </View>
              <Field label="PRICE (₹)" placeholder="499" value={price} onChangeText={(value) => setPrice(value.replace(/[^0-9]/g, ''))} keyboardType="number-pad" />
              <Text style={styles.fieldLabel}>WARRANTY DURATION</Text>
              <View style={styles.chipWrap}>
                {WARRANTIES.map((item) => <Pressable key={item} onPress={() => setWarranty(item)} style={[styles.chip, warranty === item && styles.chipActive]}><Text style={[styles.chipText, warranty === item && styles.chipTextActive]}>{item}</Text></Pressable>)}
              </View>
              <Text style={styles.fieldLabel}>SERVICE RULES / NOTES</Text>
              <View style={[styles.fieldBox, { height: 76, alignItems: 'flex-start', paddingTop: 10, marginBottom: 14 }]}><TextInput value={notes} onChangeText={setNotes} multiline placeholder="Explain what is included or charged separately" placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} /></View>
              <Button onPress={save}>Save Service</Button>
              <Button secondary onPress={() => setVisible(false)}>Cancel</Button>
            </ScrollView>
          </Pressable>
        </Pressable>
      </Modal>
    </MainLayout>
  );
}

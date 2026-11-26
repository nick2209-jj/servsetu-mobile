import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header, IconButton, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

const STATUS_COLORS = {
  Requested: [C.orange, C.orangeLight],
  Accepted: [C.teal, C.tealLight],
  'Quote Pending': [C.orange, C.orangeLight],
  'Extra Charge Pending': [C.red, C.redLight],
  'In Progress': [C.teal, C.tealLight],
  Completed: [C.green, C.greenLight],
  Paid: [C.green, C.greenLight],
};

const activeBookings = [
  { id: 'SRV-4077', title: 'AC compressor repair', cat: 'AC & Fridge', tech: 'Ramesh Patel', trade: 'Electrician · AC & Fridge', slot: 'Today, 1:00 – 3:00 PM', status: 'Completed', amount: '₹501 · Awaiting payment' },
  { id: 'SRV-4092', title: 'AC not cooling', cat: 'AC & Fridge', tech: 'Ramesh Patel', trade: 'Electrician · AC & Fridge', slot: 'Today, 4:00 – 6:00 PM', status: 'Quote Pending', amount: 'Quote received' },
  { id: 'SRV-4088', title: 'Kitchen tap leakage', cat: 'Plumbing', tech: 'Imran Shaikh', trade: 'Plumber · RO Purifier', slot: 'Tomorrow, 10:00 – 12:00 PM', status: 'Accepted', amount: 'Pending inspection' },
  { id: 'SRV-4081', title: 'Washing machine noise', cat: 'Washing Machine', tech: 'Mehul Parmar', trade: 'Washing Machine Specialist', slot: 'Today, 2:00 – 4:00 PM', status: 'In Progress', amount: '₹850 quoted' },
];

const pastBookings = [
  { id: 'SRV-3950', title: 'Geyser not heating', cat: 'Electrician', tech: 'Ramesh Patel', trade: 'Electrician', slot: '28 Aug 2024', status: 'Paid', amount: '₹550 paid' },
  { id: 'SRV-3921', title: 'Fan installation', cat: 'Electrician', tech: 'Imran Shaikh', trade: 'Plumber', slot: '14 Aug 2024', status: 'Completed', amount: '₹299 paid' },
];

function BookingCard({ b, onPress }) {
  const [color, bg] = STATUS_COLORS[b.status] || [C.teal, C.tealLight];
  return (
    <Pressable onPress={onPress} style={styles.bookingCard}>
      <View style={styles.bookingTop}>
        <View style={styles.bookingIcon}><Ionicons name="construct-outline" size={20} color={C.teal} /></View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={styles.bookingTitle}>{b.cat}</Text>
            <View style={[styles.statusPill, { backgroundColor: bg, marginTop: 0 }]}>
              <View style={[styles.statusDot, { backgroundColor: color }]} />
              <Text style={[styles.statusText, { color }]}>{b.status}</Text>
            </View>
          </View>
          <Text style={styles.bookingTech}>{b.slot}</Text>
        </View>
      </View>
      <View style={styles.bookingMeta}>
        <View style={{ flex: 1 }}>
          <Text style={styles.settingsTitle}>{b.tech}</Text>
          <Text style={styles.settingsSub}>{b.trade}</Text>
        </View>
      </View>
      <View style={styles.bookingMeta}>
        <Text style={styles.amount}>{b.amount}</Text>
        <Text style={styles.link}>View Details →</Text>
      </View>
    </Pressable>
  );
}

export default function BookingsScreen({ go }) {
  const [tab, setTab] = useState('active');
  return (
    <MainLayout active="bookings" onChange={go}>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Header title="My Bookings" />
        <Pressable onPress={() => go('appliances')} style={styles.applianceBanner}>
          <View style={styles.bannerIconLight}><Ionicons name="shield-checkmark-outline" size={21} color={C.teal} /></View>
          <View style={{ flex: 1 }}>
            <Text style={styles.bannerTitleDark}>My Appliances & Active Warranties</Text>
            <Text style={styles.bannerTextDark}>3 Active</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={C.teal} />
        </Pressable>
        <View style={styles.segmented}>
          <Pressable onPress={() => setTab('active')} style={[styles.segment, tab === 'active' && styles.segmentActive]}>
            <Text style={[styles.segmentText, tab === 'active' && styles.segmentTextActive]}>Active Jobs</Text>
          </Pressable>
          <Pressable onPress={() => setTab('past')} style={[styles.segment, tab === 'past' && styles.segmentActive]}>
            <Text style={[styles.segmentText, tab === 'past' && styles.segmentTextActive]}>Completed & Cancelled</Text>
          </Pressable>
        </View>
        {(tab === 'active' ? [...activeBookings].sort((a, b) => {
          const priority = { Completed: 0, 'Quote Pending': 1, 'Extra Charge Pending': 2 };
          return (priority[a.status] ?? 3) - (priority[b.status] ?? 3);
        }) : pastBookings).map((b) => (
          <BookingCard key={b.id} b={b} onPress={() => go(b.status === 'Completed' ? 'completedBookingDetails' : 'bookingDetails')} />
        ))}
      </ScrollView>
    </MainLayout>
  );
}

import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Header, Icon, IconButton, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

function StatusPill({ label, color = C.teal, background = C.tealLight }) {
  return <View style={[styles.statusPill, { backgroundColor: background }]}><View style={[styles.statusDot, { backgroundColor: color }]} /><Text style={[styles.statusText, { color }]}>{label}</Text></View>;
}

function BookingCard({ title, technician, date, amount, status, onPress }) {
  return <Pressable onPress={onPress} style={styles.bookingCard}><View style={styles.bookingTop}><View style={styles.bookingIcon}><Icon name="construct-outline" size={20} color={C.teal} /></View><View style={{ flex: 1 }}><Text style={styles.bookingTitle}>{title}</Text><Text style={styles.bookingTech}>{technician}</Text></View><Icon name="chevron-forward" size={18} color={C.muted} /></View><View style={styles.bookingMeta}><View style={styles.metaItem}><Icon name="calendar-outline" size={15} color={C.muted} /><Text style={styles.metaText}>{date}</Text></View><Text style={styles.amount}>{amount}</Text></View><StatusPill label={status} color={status === 'Accepted' ? C.teal : status === 'Completed' ? C.green : C.orange} background={status === 'Accepted' ? C.tealLight : status === 'Completed' ? C.greenLight : C.orangeLight} /></Pressable>;
}

export default function BookingsScreen({ go }) {
  const [tab, setTab] = useState('active');
  return <MainLayout active="bookings" onChange={go}><ScrollView contentContainerStyle={styles.pagePadding}><Header title="My bookings" subtitle="Track every repair in one place" right={<IconButton name="notifications-outline" onPress={() => go('notifications')} />} /><Pressable onPress={() => go('appliances')} style={styles.applianceBanner}><View style={styles.bannerIconLight}><Icon name="document-text-outline" size={21} color={C.teal} /></View><View style={{ flex: 1 }}><Text style={styles.bannerTitleDark}>My appliances & warranties</Text><Text style={styles.bannerTextDark}>2 active warranties</Text></View><Icon name="chevron-forward" size={20} color={C.teal} /></Pressable><View style={styles.segmented}><Pressable onPress={() => setTab('active')} style={[styles.segment, tab === 'active' && styles.segmentActive]}><Text style={[styles.segmentText, tab === 'active' && styles.segmentTextActive]}>Active (2)</Text></Pressable><Pressable onPress={() => setTab('past')} style={[styles.segment, tab === 'past' && styles.segmentActive]}><Text style={[styles.segmentText, tab === 'past' && styles.segmentTextActive]}>Past / cancelled</Text></Pressable></View>{tab === 'active' ? <><BookingCard title="AC not cooling" technician="Ramesh Patel" date="Today, 4:00 – 6:00 PM" amount="Quote pending" status="Quote pending" onPress={() => go('bookingDetails')} /><BookingCard title="Kitchen tap leakage" technician="Imran Shaikh" date="Tomorrow, 10:00 – 12:00 PM" amount="₹149 visiting" status="Accepted" onPress={() => go('bookingDetails')} /></> : <BookingCard title="Washing machine noise" technician="Mehul Parmar" date="12 Sep 2024" amount="₹850 paid" status="Completed" onPress={() => go('payment')} />}</ScrollView></MainLayout>;
}

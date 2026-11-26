import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header } from '../../components';
import { styles } from '../../theme/appStyles';

const seedAlerts = [
  { id: '1', title: '₹650 repair quote received', sub: 'Ramesh sent an itemized quote for your AC repair.', time: '10 mins ago', icon: 'rupee', unread: true, link: 'bookingDetails' },
  { id: '2', title: 'Job status updated', sub: 'Imran marked your tap repair as in progress.', time: '1 hr ago', icon: 'wrench', unread: true, link: 'bookingDetails' },
  { id: '3', title: 'Additional charge requested', sub: 'A spare part approval is needed for booking #SS-24072.', time: 'Yesterday', icon: 'wrench', unread: true, link: 'bookingDetails' },
  { id: '4', title: 'Payment confirmed', sub: 'Your payment of ₹650 was confirmed via UPI.', time: '12 Sep', icon: 'rupee', unread: false, link: 'bookingDetails' },
  { id: '5', title: 'Warranty activated', sub: 'Your Samsung washing machine warranty is active for 90 days.', time: '12 Sep', icon: 'shield', unread: false, link: 'bookingDetails' },
];

function AlertCard({ item, onPress }) {
  const iconName = item.icon === 'rupee' ? 'wallet-outline' : item.icon === 'wrench' ? 'construct-outline' : 'shield-checkmark-outline';
  return (
    <Pressable onPress={onPress} style={[styles.notificationRow, item.unread && styles.notificationUnread]}>
      <View style={styles.notificationIcon}>
        <Ionicons name={iconName} size={20} color={item.unread ? C.teal : C.muted} />
      </View>
      <View style={{ flex: 1 }}>
        <View style={styles.notificationTitleRow}>
          <Text style={styles.notificationTitle}>{item.title}</Text>
          {item.unread
            ? <View style={styles.unreadDot} />
            : <View style={styles.notifReadDot} />}
        </View>
        <Text style={styles.notificationSub}>{item.sub}</Text>
        <Text style={styles.notificationTime}>{item.time}</Text>
      </View>
    </Pressable>
  );
}

export default function CustomerNotifications({ go }) {
  const [alerts, setAlerts] = useState(seedAlerts);

  const unreadCount = alerts.filter((a) => a.unread).length;

  const markAllRead = () => setAlerts((prev) => prev.map((a) => ({ ...a, unread: false })));

  const tap = (item) => {
    if (item.unread) setAlerts((prev) => prev.map((a) => (a.id === item.id ? { ...a, unread: false } : a)));
    go(item.link);
  };

  return (
    <View style={styles.flex}>
      <Header
        title="Notifications"
        subtitle={unreadCount > 0 ? `${unreadCount} unread` : 'You are all caught up'}
        onBack={() => go('home')}
        right={
          <Pressable onPress={markAllRead}>
            <Text style={styles.markRead}>Mark All Read</Text>
          </Pressable>
        }
      />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        {alerts.map((item) => (
          <AlertCard key={item.id} item={item} onPress={() => tap(item)} />
        ))}
      </ScrollView>
    </View>
  );
}

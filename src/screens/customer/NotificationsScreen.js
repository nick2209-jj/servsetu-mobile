import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

const alerts = [
  ['₹650 repair quote received', 'Ramesh sent an itemized quote for your AC repair.', '11:18 AM', 'receipt-outline', true],
  ['Additional approval requested', 'A spare part approval is needed for booking #SS-24072.', 'Yesterday', 'alert-circle-outline', false],
  ['Payment received', 'Your payment of ₹650 was confirmed via UPI.', '12 Sep', 'checkmark-circle-outline', false],
  ['Warranty activated', 'Your Samsung washing machine warranty is active for 90 days.', '12 Sep', 'shield-checkmark-outline', false],
];

export default function CustomerNotifications({ go }) {
  return (
    <View style={styles.flex}>
      <Header title="Notifications" subtitle="You are all caught up" onBack={() => go('home')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        {alerts.map(([title, sub, time, icon, unread]) => (
          <Pressable key={title} onPress={() => go('bookingDetails')} style={[styles.notificationRow, unread && styles.notificationUnread]}>
            <View style={styles.notificationIcon}><Icon name={icon} size={20} color={unread ? C.teal : C.muted} /></View>
            <View style={{ flex: 1 }}>
              <View style={styles.notificationTitleRow}>
                <Text style={styles.notificationTitle}>{title}</Text>
                {unread && <View style={styles.unreadDot} />}
              </View>
              <Text style={styles.notificationSub}>{sub}</Text>
              <Text style={styles.notificationTime}>{time}</Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

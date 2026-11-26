import React, { useState } from 'react';
import { Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { C } from '../../theme';
import { Header } from '../../components';
import { styles } from '../../theme/appStyles';

const OPTIONS = [
  ['Push notifications', 'Booking updates, quotes and warranty reminders'],
  ['SMS notifications', 'Important service and payment updates by SMS'],
  ['Email receipts', 'Invoices and completed service summaries'],
];

export default function NotificationPreferencesScreen({ go, backTarget = 'settings', supportTarget }) {
  const [enabled, setEnabled] = useState([true, true, true]);
  return (
    <View style={styles.flex}>
      <Header title="Notification preferences" subtitle="Choose what ServSetu can send you" onBack={() => go(backTarget)} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        {OPTIONS.map(([title, subtitle], index) => (
          <View key={title} style={styles.settingsRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{title}</Text>
              <Text style={styles.settingsSub}>{subtitle}</Text>
            </View>
            <Switch
              value={enabled[index]}
              onValueChange={(value) => setEnabled((current) => current.map((item, i) => (i === index ? value : item)))}
              trackColor={{ true: C.teal }}
            />
          </View>
        ))}
        {supportTarget && (
          <View style={[styles.supportHero, { marginTop: 10 }]}>
            <Text style={styles.supportTitle}>Partner support</Text>
            <Text style={styles.supportSub}>Need help with a job, payout, or your account?</Text>
            <Pressable onPress={() => go(supportTarget)} style={styles.bookBtn}>
              <Text style={styles.bookBtnText}>Open Support</Text>
            </Pressable>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

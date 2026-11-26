import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

const MENU = [
  ['shield-checkmark-outline', 'My Appliances & Digital Warranties', '3 active', 'appliances', true],
  ['receipt-outline', 'Transaction & Receipt History', 'Invoices and payments', 'transactions', false],
  ['home-outline', 'Saved Addresses', 'Home / Office / Society', 'addresses', false],
  ['notifications-outline', 'Notification Preferences', 'Push, SMS and email alerts', 'notifications', false],
  ['book-outline', 'Rate Card Guide & Dispute Support', 'Standard market repair rates', 'support', false],
];

export default function SettingsScreen({ go }) {
  return (
    <MainLayout active="settings" onChange={go}>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Header title="Settings" />
        <View style={styles.settingsProfile}>
          <View style={[styles.profileAvatarSmall, { backgroundColor: C.tealLight }]}>
            <Text style={styles.profileInitialsSmall}>PS</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingsName}>Priya Shah</Text>
            <Text style={styles.settingsEmail}>+91 98765 43210 · Alkapuri, Vadodara</Text>
          </View>
          <Pressable onPress={() => go('profile')} style={styles.iconButton}>
            <Ionicons name="pencil-outline" size={17} color={C.navy} />
          </Pressable>
        </View>

        {MENU.map(([icon, title, sub, target, badge]) => (
          <Pressable key={target} onPress={() => go(target)} style={styles.settingsRow}>
            <View style={styles.settingsIcon}><Ionicons name={icon} size={20} color={C.teal} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{title}</Text>
              <Text style={styles.settingsSub}>{sub}</Text>
            </View>
            {badge && <View style={styles.menuBadge}><Text style={styles.menuBadgeText}>3</Text></View>}
            <Ionicons name="chevron-forward" size={18} color={C.muted} />
          </Pressable>
        ))}

        <View style={styles.settingsDivider} />
        <Pressable style={styles.logoutBtn} onPress={() => go('login')}>
          <Text style={styles.logoutText}>Logout</Text>
        </Pressable>
        <Text style={styles.appVersion}>ServSetu v1.0</Text>
      </ScrollView>
    </MainLayout>
  );
}

import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

function SettingsRow({ icon, iconColor, iconBg, title, sub, target, go, titleColor }) {
  return (
    <Pressable onPress={target ? () => go(target) : undefined} style={styles.settingsRow}>
      <View style={[styles.settingsIcon, iconBg && { backgroundColor: iconBg }]}>
        <Icon name={icon} size={20} color={iconColor || C.teal} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={[styles.settingsTitle, titleColor && { color: titleColor }]}>{title}</Text>
        {sub && <Text style={styles.settingsSub}>{sub}</Text>}
      </View>
      {!titleColor && <Icon name="chevron-forward" size={18} color={C.muted} />}
    </Pressable>
  );
}

export default function SettingsScreen({ go, technician = false }) {
  const items = technician
    ? [['person-outline', 'Profile & KYC', 'Your trade skills and verification', 'profile'], ['navigate-outline', 'Work rules & radius', 'Set visiting fee and service area', 'workRules'], ['wallet-outline', 'Payout account', 'UPI ID and bank details', 'payout'], ['notifications-outline', 'Notifications & help', 'Support for your business', 'notifications']]
    : [['document-text-outline', 'My appliances & warranties', '2 active warranties', 'appliances'], ['receipt-outline', 'Transaction history', 'Invoices and payment records', 'transactions'], ['person-outline', 'Profile & addresses', 'Personal details and saved locations', 'profile'], ['help-circle-outline', 'Support & rules', 'Rate card, cancellations and disputes', 'support']];
  return (
    <MainLayout active={technician ? 'techSettings' : 'settings'} onChange={go} technician={technician}>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Header title="Settings" subtitle={technician ? 'Manage your work profile' : 'Manage your ServSetu account'} />
        <View style={styles.settingsProfile}>
          <View style={[styles.profileAvatarSmall, { backgroundColor: technician ? C.orangeLight : C.tealLight }]}>
            <Text style={styles.profileInitialsSmall}>{technician ? 'RP' : 'PS'}</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.settingsName}>{technician ? 'Ramesh Patel' : 'Priya Shah'}</Text>
            <Text style={styles.settingsEmail}>{technician ? 'Electrician · Aadhaar verified' : '+91 98765 43210'}</Text>
          </View>
          <Icon name="chevron-forward" size={19} color={C.muted} />
        </View>
        {items.map(([icon, title, sub, target]) => <SettingsRow key={title} icon={icon} title={title} sub={sub} target={target} go={go} />)}
        <View style={styles.settingsDivider} />
        <SettingsRow icon="log-out-outline" iconColor={C.red} iconBg={C.redLight} title="Log out" titleColor={C.red} go={go} />
        <Text style={styles.appVersion}>ServSetu v1.0.0 · Made for India</Text>
      </ScrollView>
    </MainLayout>
  );
}

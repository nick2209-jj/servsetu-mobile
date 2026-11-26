import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { C } from '../theme';
import { Icon } from './Icon';
import { styles } from '../theme/appStyles';

export function BottomNav({ active, onChange, technician = false }) {
  const items = technician
    ? [['techDashboard', 'grid-outline', 'Dashboard'], ['services', 'list-outline', 'My services'], ['earnings', 'wallet-outline', 'Earnings'], ['techSettings', 'settings-outline', 'Settings']]
    : [['home', 'home-outline', 'Home'], ['bookings', 'calendar-outline', 'My Bookings'], ['settings', 'settings-outline', 'Settings']];
  return (
    <View style={styles.bottomNav}>
      {items.map(([key, icon, label]) => (
        <Pressable key={key} onPress={() => onChange(key)} style={styles.navItem}>
          <View style={[styles.navIconWrap, active === key && styles.navIconActive]}>
            <Icon name={icon} size={21} color={active === key ? C.white : C.muted} />
          </View>
          <Text style={[styles.navLabel, active === key && styles.navLabelActive]}>{label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function MainLayout({ children, active, onChange, technician = false }) {
  return <View style={styles.flex}><View style={styles.mainContent}>{children}</View><BottomNav active={active} onChange={onChange} technician={technician} /></View>;
}

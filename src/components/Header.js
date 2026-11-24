import React from 'react';
import { Pressable, Text, TextInput, View } from 'react-native';
import { C } from '../theme';
import { Icon, IconButton } from './index';
import { styles } from '../theme/appStyles';

export function Header({ title, subtitle, onBack, right, dark = false }) {
  return (
    <View style={[styles.header, dark && styles.headerDark]}>
      <View style={styles.headerLeft}>
        {onBack && <IconButton name="arrow-back" onPress={onBack} />}
        <View>
          <Text style={[styles.headerTitle, dark && styles.headerTitleDark]}>{title}</Text>
          {subtitle && <Text style={[styles.headerSubtitle, dark && styles.headerSubtitleDark]}>{subtitle}</Text>}
        </View>
      </View>
      {right}
    </View>
  );
}

export function Field({ label, placeholder, value, onChangeText, secureTextEntry = false, keyboardType = 'default', prefix }) {
  return (
    <View style={styles.fieldWrap}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <View style={styles.fieldBox}>
        {prefix && <Text style={styles.prefix}>{prefix}</Text>}
        <TextInput
          value={value}
          onChangeText={onChangeText}
          placeholder={placeholder}
          placeholderTextColor="#9AA8B5"
          secureTextEntry={secureTextEntry}
          keyboardType={keyboardType}
          style={styles.fieldInput}
        />
      </View>
    </View>
  );
}

export function RoleToggle({ role, setRole }) {
  return (
    <View style={styles.roleToggle}>
      {['customer', 'technician'].map((item) => (
        <Pressable key={item} onPress={() => setRole(item)} style={[styles.roleItem, role === item && styles.roleItemActive]}>
          <Icon name={item === 'customer' ? 'home-outline' : 'construct-outline'} size={16} color={role === item ? C.white : C.muted} />
          <Text style={[styles.roleText, role === item && styles.roleTextActive]}>{item === 'customer' ? 'I need a repair' : 'I am a mistri'}</Text>
        </Pressable>
      ))}
    </View>
  );
}

export function StatusPill({ label, color = C.teal, background = C.tealLight }) {
  return <View style={[styles.statusPill, { backgroundColor: background }]}><View style={[styles.statusDot, { backgroundColor: color }]} /><Text style={[styles.statusText, { color }]}>{label}</Text></View>;
}

export function SearchBar({ onFilter }) {
  return <View style={styles.searchRow}><View style={styles.searchBox}><Icon name="search-outline" size={19} color={C.muted} /><TextInput placeholder="Search plumber, AC gas refill..." placeholderTextColor={C.muted} style={styles.searchInput} /></View><Pressable onPress={onFilter} style={styles.filterButton}><Icon name="options-outline" size={20} color={C.navy} /></Pressable></View>;
}

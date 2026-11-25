import React, { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button, Header, Icon } from '../../components';
import { C } from '../../theme';
import { styles } from '../../theme/appStyles';

export default function FiltersScreen({ go }) {
  const [selected, setSelected] = useState('Top rated');
  const filters = ['Top rated', 'Lowest visiting fee', 'Nearest'];
  return <View style={styles.flex}><Header title="Filter technicians" subtitle="Find the right fit for your repair" onBack={() => go('home')} /><ScrollView contentContainerStyle={styles.pagePadding}><Text style={styles.formSectionTitle}>SORT BY</Text><View style={styles.sortList}>{filters.map((item) => <Pressable key={item} onPress={() => setSelected(item)} style={styles.radioRow}><View style={[styles.radio, selected === item && styles.radioActive]}>{selected === item && <View style={styles.radioDot} />}</View><Text style={styles.radioText}>{item}</Text></Pressable>)}</View><Text style={styles.formSectionTitle}>SHOW ONLY</Text>{['Visiting charge under ₹199', 'Within 5 km', '4★ and above', 'Available today'].map((item, i) => <View key={item} style={styles.checkRow}><View style={[styles.checkbox, i < 3 && styles.checkboxActive]}>{i < 3 && <Icon name="checkmark" size={15} color={C.white} />}</View><Text style={styles.radioText}>{item}</Text></View>)}<Button onPress={() => go('home')}>Show 12 technicians</Button></ScrollView></View>;
}

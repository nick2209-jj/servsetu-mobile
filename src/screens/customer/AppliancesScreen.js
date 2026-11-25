import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

function ApplianceCard({ name, category, warranty, color }) {
  return <View style={styles.applianceCard}><View style={[styles.applianceIcon, { backgroundColor: color }]}><Icon name={category === 'Washing machine' ? 'sync-outline' : 'snow-outline'} size={25} color={C.teal} /></View><View style={{ flex: 1 }}><Text style={styles.applianceName}>{name}</Text><Text style={styles.applianceCategory}>{category}</Text><View style={[styles.statusPill, { backgroundColor: C.tealLight }]}><View style={[styles.statusDot, { backgroundColor: C.teal }]} /><Text style={[styles.statusText, { color: C.teal }]}>{warranty}</Text></View></View><Icon name="chevron-forward" size={18} color={C.muted} /></View>;
}

export default function AppliancesScreen({ go }) {
  return <View style={styles.flex}><Header title="Appliances & warranties" subtitle="Your digital repair log" onBack={() => go('bookings')} /><ScrollView contentContainerStyle={styles.pagePadding}><Button secondary compact onPress={() => {}}>+ Add appliance</Button><ApplianceCard name="Samsung Front-Load" category="Washing machine" warranty="54 days warranty remaining" color={C.tealLight} /><ApplianceCard name="Voltas Split AC" category="Air conditioner" warranty="Warranty active · 89 days" color={C.orangeLight} /><Text style={styles.sectionTitle}>How warranties work</Text><View style={styles.infoCard}><Icon name="shield-checkmark-outline" size={23} color={C.teal} /><Text style={styles.infoCardText}>Every completed repair gets a digital warranty certificate. If the same issue returns during the warranty period, your re-visit is free.</Text></View></ScrollView></View>;
}

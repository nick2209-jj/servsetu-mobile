import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { Button, Header, Icon, IconButton, MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

const services = [
  ['Split AC jet servicing', 'AC & Fridge', '₹499', '30 days'],
  ['Tap / mixer replacement', 'Plumbing', '₹150 + parts', '30 days'],
  ['Washing machine pump repair', 'Washing Machine', '₹650 + parts', '90 days'],
  ['Switchboard repair', 'Electrical', '₹249', '30 days'],
];

export default function ServicesScreen({ go }) {
  return <MainLayout active="services" onChange={go} technician><ScrollView contentContainerStyle={styles.pagePadding}><Header title="My services" subtitle="Your public rate card" right={<IconButton name="add-outline" onPress={() => Alert.alert('Add service', 'Service form opened.')} />} /><View style={styles.serviceNotice}><Icon name="information-circle-outline" size={18} color={C.teal} /><Text style={styles.serviceNoticeText}>Clear rates help customers choose you faster.</Text></View>{services.map(([name, trade, price, warranty]) => <View key={name} style={styles.serviceCard}><View style={styles.serviceIcon}><Icon name="construct-outline" size={20} color={C.teal} /></View><View style={{ flex: 1 }}><Text style={styles.serviceName}>{name}</Text><Text style={styles.serviceTrade}>{trade}</Text><View style={styles.serviceMeta}><Text style={styles.servicePrice}>{price}</Text><Text style={styles.serviceWarranty}>Warranty {warranty}</Text></View></View><View style={styles.activeToggle}><View style={styles.activeKnob} /></View></View>)}<Button secondary onPress={() => Alert.alert('Add service', 'Service form opened.')}>+ Add a service</Button></ScrollView></MainLayout>;
}

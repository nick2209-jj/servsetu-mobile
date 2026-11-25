import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { Button, Field, Header, Icon, StatusPill } from '../../components';
import { C } from '../../theme';
import { styles } from '../../theme/appStyles';

export default function PayoutScreen({ go }) {
  return <View style={styles.flex}><Header title="Payout account" subtitle="Get paid securely" onBack={() => go('techSettings')} /><ScrollView contentContainerStyle={styles.pagePadding}><View style={styles.payoutHero}><Icon name="wallet-outline" size={28} color={C.teal} /><Text style={styles.payoutTitle}>Your earnings, your way</Text><Text style={styles.payoutSub}>Online payments settle to your verified account.</Text></View><Text style={styles.fieldLabel}>UPI ID</Text><View style={styles.upiInput}><Text style={styles.upiName}>rameshpatel@upi</Text><StatusPill label="Verified" color={C.green} background={C.greenLight} /></View><Text style={styles.sectionTitle}>Or add bank account</Text><Field label="Account number" placeholder="Enter account number" keyboardType="number-pad" /><Field label="IFSC code" placeholder="e.g. SBIN0001234" /><Button onPress={() => go('techSettings')}>Save payout details</Button></ScrollView></View>;
}

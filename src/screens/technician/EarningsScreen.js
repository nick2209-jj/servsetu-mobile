import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Header, Icon, MainLayout, StatusPill } from '../../components';
import { styles } from '../../theme/appStyles';

const LEDGER = [
  ['26 Nov', 'Priya Shah', 'Washing machine pump repair', '₹850', 'UPI'],
  ['24 Nov', 'Kunal Mehta', 'AC jet servicing', '₹499', 'UPI'],
  ['22 Nov', 'Maya Joshi', 'Tap replacement', '₹299', 'Cash'],
  ['18 Nov', 'Ankit Patel', 'AC compressor repair', '₹1,250', 'UPI'],
];
const WEEKLY = [5200, 6400, 7800, 9050];

export default function EarningsScreen({ go }) {
  const [month, setMonth] = useState(new Date(2026, 10, 1));
  const monthLabel = month.toLocaleDateString('en-IN', { month: 'long', year: 'numeric' });
  const moveMonth = (amount) => setMonth((current) => new Date(current.getFullYear(), current.getMonth() + amount, 1));
  const maxWeekly = Math.max(...WEEKLY);

  return (
    <MainLayout active="earnings" onChange={go} technician>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Header title="Earnings & Reports" subtitle="Your monthly income and settlements" />
        <View style={[styles.monthPill, { alignSelf: 'stretch', justifyContent: 'space-between' }]}>
          <Pressable onPress={() => moveMonth(-1)} accessibilityLabel="Previous month"><Icon name="chevron-back" size={18} color={C.teal} /></Pressable>
          <Text style={styles.monthText}>{monthLabel}</Text>
          <Pressable onPress={() => moveMonth(1)} accessibilityLabel="Next month"><Icon name="chevron-forward" size={18} color={C.teal} /></Pressable>
        </View>

        <View style={styles.incomeHero}>
          <Text style={styles.incomeLabel}>TOTAL NET INCOME</Text>
          <Text style={styles.incomeValue}>₹28,450</Text>
          <View style={styles.incomeChange}>
            <Icon name="briefcase-outline" size={15} color="#AFD7C0" />
            <Text style={styles.incomeChangeText}>34 completed jobs · November 2026</Text>
          </View>
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>₹19,200</Text>
            <Text style={styles.kpiLabel}>Online · UPI / Bank</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>₹9,250</Text>
            <Text style={styles.kpiLabel}>Offline · Cash</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Weekly revenue</Text>
        <View style={styles.chartCard}>
          <View style={[styles.chartBars, { height: 150 }]}>
            {WEEKLY.map((value, index) => (
              <View key={index} style={styles.chartColumn}>
                <Text style={styles.chartLabel}>₹{(value / 1000).toFixed(1)}k</Text>
                <View style={[styles.chartBar, { height: (value / maxWeekly) * 90, width: 30 }]} />
                <Text style={[styles.chartLabel, { marginBottom: 0 }]}>Week {index + 1}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={[styles.sectionHeader, { marginTop: 16 }]}>
          <Text style={styles.sectionTitle}>Job-wise income</Text>
        </View>
        {LEDGER.map(([date, customer, service, amount, method]) => (
          <View key={`${date}-${customer}`} style={styles.ledgerRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.ledgerDate}>{date}</Text>
              <Text style={styles.ledgerName}>{customer}</Text>
              <Text style={styles.ledgerService}>{service}</Text>
              <StatusPill label={method} color={method === 'UPI' ? C.teal : C.orange} background={method === 'UPI' ? C.tealLight : C.orangeLight} />
            </View>
            <Text style={styles.ledgerAmount}>{amount}</Text>
          </View>
        ))}
        <Button secondary onPress={() => Alert.alert('Report export', 'Monthly PDF / CSV export is not connected in this demo.')}>
          Download Monthly Report (PDF / CSV)
        </Button>
      </ScrollView>
    </MainLayout>
  );
}

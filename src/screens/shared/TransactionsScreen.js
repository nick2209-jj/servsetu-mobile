import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

function TransactionRow({ date, title, sub, amount }) {
  const [day, month] = date.split(' ');
  return (
    <View style={styles.transactionRow}>
      <View style={styles.transactionDate}><Text style={styles.transactionDay}>{day}</Text><Text style={styles.transactionMonth}>{month}</Text></View>
      <View style={{ flex: 1 }}><Text style={styles.transactionTitle}>{title}</Text><Text style={styles.transactionSub}>{sub} · {amount.mode}</Text></View>
      <View style={{ alignItems: 'flex-end' }}><Text style={styles.transactionAmount}>{amount.text}</Text><Icon name="download-outline" size={16} color={C.teal} /></View>
    </View>
  );
}

export default function TransactionsScreen({ go }) {
  return (
    <View style={styles.flex}>
      <Header title="Transaction history" subtitle="Receipts for every payment" onBack={() => go('settings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.monthPill}><Text style={styles.monthText}>September 2024</Text><Icon name="chevron-down" size={17} color={C.navy} /></View>
        {[
          ['12 Sep', 'Washing machine repair', 'Mehul Parmar', '₹850', 'UPI'],
          ['08 Sep', 'Kitchen tap replacement', 'Imran Shaikh', '₹299', 'Cash'],
          ['21 Aug', 'AC servicing', 'Ramesh Patel', '₹650', 'UPI'],
        ].map(([date, title, sub, amount, mode]) => <TransactionRow key={title} date={date} title={title} sub={sub} amount={{ text: amount, mode }} />)}
      </ScrollView>
    </View>
  );
}

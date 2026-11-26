import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

const helpTopics = [
  ['Rate card guide', 'Understand visiting fees, labor and parts'],
  ['Cancellation policy', 'Simple rules for changing a booking'],
  ['Dispute a repair', 'We will review your quote and service history'],
  ['Safety & trust', 'How ServSetu verifies every professional'],
];

export default function SupportScreen({ go, backTarget = 'settings' }) {
  return (
    <View style={styles.flex}>
      <Header title="Support & rules" subtitle="Clear answers, helpful support" onBack={() => go(backTarget)} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.supportHero}>
          <Icon name="headset-outline" size={30} color={C.teal} />
          <Text style={styles.supportTitle}>How can we help?</Text>
          <Text style={styles.supportSub}>Our support team is here 9 AM – 9 PM</Text>
          <Button compact onPress={() => Alert.alert('Support request', 'We will connect you with a support specialist shortly.')}>Start a support chat</Button>
        </View>
        {helpTopics.map(([title, sub]) => (
          <Pressable key={title} style={styles.helpRow}>
            <View style={styles.settingsIcon}><Icon name="book-outline" size={19} color={C.teal} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.settingsTitle}>{title}</Text>
              <Text style={styles.settingsSub}>{sub}</Text>
            </View>
            <Icon name="chevron-forward" size={18} color={C.muted} />
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Switch, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Icon, IconButton, MainLayout, StatusPill } from '../../components';
import { styles } from '../../theme/appStyles';

const INITIAL_REQUESTS = [
  { id: 'SRV-4104', title: 'AC making a loud noise', customer: 'Ankit · Alkapuri', distance: '2.1 km', slot: 'Today · 2:00–4:00 PM', icon: 'snow-outline' },
  { id: 'SRV-4107', title: 'Kitchen tap leakage', customer: 'Maya · Race Course', distance: '2.8 km', slot: 'Tomorrow · 9:00 AM–12:00 PM', icon: 'water-outline' },
];

function RequestCard({ request, onAccept, onDecline }) {
  return (
    <View style={styles.requestCard}>
      <View style={styles.requestTop}>
        <View style={[styles.jobPhoto, { width: 52, height: 52, marginTop: 0, marginRight: 0 }]}>
          <Icon name={request.icon} size={22} color={C.teal} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bookingTitle}>{request.title}</Text>
          <Text style={styles.bookingTech}>{request.customer} · {request.distance}</Text>
        </View>
        <Text style={styles.requestTime}>New</Text>
      </View>
      <Text style={[styles.requestDesc, { marginTop: 9 }]}>Customer fault photo attached</Text>
      <View style={[styles.requestBottom, { marginTop: 3 }]}>
        <Text style={styles.bookingTech}>Preferred: {request.slot}</Text>
        <View style={[styles.requestActions, { marginTop: 9 }]}>
          <Button secondary compact onPress={onDecline}>Decline</Button>
          <Button compact onPress={onAccept}>Accept Request</Button>
        </View>
      </View>
    </View>
  );
}

export default function TechnicianDashboard({ go }) {
  const [online, setOnline] = useState(true);
  const [requests, setRequests] = useState(INITIAL_REQUESTS);
  const decide = (request, accepted) => {
    setRequests((current) => current.filter((item) => item.id !== request.id));
    if (accepted) {
      Alert.alert('Request accepted', `${request.id} was added to your active jobs.`);
      go('jobManagement');
    } else {
      Alert.alert('Request declined', `${request.id} has been removed from your requests.`);
    }
  };

  return (
    <MainLayout active="techDashboard" onChange={go} technician>
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.techHeader}>
          <View style={{ flex: 1 }}>
            <Text style={styles.eyebrow}>GOOD MORNING, RAMESH</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 }}>
              <Text style={[styles.greeting, { marginTop: 0 }]}>Ready for today?</Text>
              <Icon name="shield-checkmark" size={17} color={C.green} />
            </View>
            <Text style={[styles.settingsSub, { color: C.green, fontWeight: '700' }]}>KYC Verified</Text>
          </View>
          <IconButton name="notifications-outline" badge onPress={() => go('notifications')} />
        </View>

        <View style={styles.dutyCard}>
          <View style={{ flex: 1 }}>
            <Text style={styles.dutyLabel}>YOU ARE</Text>
            <Text style={styles.dutyTitle}>{online ? 'On Duty' : 'Off Duty'}</Text>
            <Text style={styles.dutySub}>{online ? 'Accepting nearby requests' : 'New requests are paused'}</Text>
          </View>
          <Switch value={online} onValueChange={setOnline} trackColor={{ true: C.teal }} />
        </View>

        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>04</Text>
            <Text style={styles.kpiLabel}>Active jobs today</Text>
            <Icon name="briefcase-outline" size={19} color={C.teal} />
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiValue}>₹2,450</Text>
            <Text style={styles.kpiLabel}>Today's earnings</Text>
            <Icon name="trending-up-outline" size={19} color={C.orange} />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>New service requests</Text>
            <Text style={styles.sectionSub}>{online ? `${requests.length} people need your help` : 'Go on duty to receive requests'}</Text>
          </View>
        </View>
        {online && requests.map((request) => (
          <RequestCard
            key={request.id}
            request={request}
            onAccept={() => decide(request, true)}
            onDecline={() => decide(request, false)}
          />
        ))}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ongoing jobs</Text>
          <Text style={styles.link}>2 active</Text>
        </View>
        {[
          ['Washing machine noise', 'Priya Shah · B-204, Shreeji Heights', 'In Progress', C.teal, C.tealLight],
          ['AC compressor inspection', 'Kunal Mehta · Race Course', 'Quote Sent', C.orange, C.orangeLight],
          ['Kitchen tap leakage', 'Maya Joshi · Alkapuri', 'Arrived', C.teal, C.tealLight],
        ].map(([title, address, status, color, background]) => (
          <Pressable key={title} onPress={() => go('jobManagement')} style={styles.ongoingCard}>
            <View style={styles.progressBadge}><Icon name="construct-outline" size={19} color={C.teal} /></View>
            <View style={{ flex: 1 }}>
              <Text style={styles.bookingTitle}>{title}</Text>
              <Text style={styles.bookingTech}>{address}</Text>
              <StatusPill label={status} color={color} background={background} />
            </View>
            <Icon name="chevron-forward" size={18} color={C.muted} />
          </Pressable>
        ))}
      </ScrollView>
    </MainLayout>
  );
}

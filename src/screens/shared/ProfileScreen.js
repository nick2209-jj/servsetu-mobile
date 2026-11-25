import React from 'react';
import { Alert, Pressable, ScrollView, Text, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function ProfileScreen({ go, technician = false }) {
  return (
    <View style={styles.flex}>
      <Header title={technician ? 'Profile & KYC' : 'Profile & addresses'} subtitle={technician ? 'Keep your business details current' : 'Your personal details and locations'} onBack={() => go(technician ? 'techSettings' : 'settings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.editAvatar}>
          <View style={[styles.profileAvatar, { backgroundColor: technician ? C.orangeLight : C.tealLight }]}>
            <Text style={styles.profileInitials}>{technician ? 'RP' : 'PS'}</Text>
          </View>
          <Pressable style={styles.editAvatarButton}><Icon name="camera-outline" size={17} color={C.white} /></Pressable>
        </View>
        <Field label="Full name" placeholder={technician ? 'Ramesh Patel' : 'Priya Shah'} />
        <Field label="Mobile number" placeholder="+91 98765 43210" keyboardType="phone-pad" />
        <Field label={technician ? 'Trade skills' : 'Email address'} placeholder={technician ? 'Electrician, AC & Fridge' : 'priya@email.com'} />
        {technician && (
          <View style={styles.verifiedBanner}>
            <Icon name="shield-checkmark" size={21} color={C.teal} />
            <View style={{ flex: 1 }}>
              <Text style={styles.verifiedTitle}>KYC verified</Text>
              <Text style={styles.verifiedSub}>Aadhaar verified on 12 Aug 2024</Text>
            </View>
            <Icon name="checkmark-circle" size={21} color={C.green} />
          </View>
        )}
        {!technician && (
          <>
            <Text style={styles.sectionTitle}>Saved addresses</Text>
            <View style={styles.addressCard}>
              <Icon name="home-outline" size={20} color={C.teal} />
              <View style={{ flex: 1 }}>
                <Text style={styles.addressTitle}>Home · B-204, Shreeji Heights</Text>
                <Text style={styles.addressText}>Alkapuri, Vadodara · 390007</Text>
              </View>
              <Icon name="pencil-outline" size={17} color={C.muted} />
            </View>
          </>
        )}
        <Button onPress={() => go(technician ? 'techSettings' : 'settings')}>Save changes</Button>
      </ScrollView>
    </View>
  );
}

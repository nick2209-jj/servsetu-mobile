import React, { useState } from 'react';
import { Alert, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function ProfileScreen({ go, technician = false }) {
  const [experience, setExperience] = useState('8');
  const [bio, setBio] = useState('Verified local technician. Digital quote before every repair.');
  const [trades, setTrades] = useState(['Electrical', 'AC & Fridge']);
  const toggleTrade = (trade) => setTrades((current) => current.includes(trade) ? current.filter((item) => item !== trade) : [...current, trade]);
  return (
    <View style={styles.flex}>
      <Header title={technician ? 'Profile & KYC' : 'Profile & addresses'} subtitle={technician ? 'Keep your business details current' : 'Your personal details and locations'} onBack={() => go(technician ? 'techSettings' : 'settings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <View style={styles.editAvatar}>
          <View style={[styles.profileAvatar, { backgroundColor: technician ? C.orangeLight : C.tealLight }]}>
            <Text style={styles.profileInitials}>{technician ? 'RP' : 'PS'}</Text>
          </View>
          <Pressable onPress={() => Alert.alert('Profile photo', 'Photo selection will be available when image upload is connected.')} style={styles.editAvatarButton}><Icon name="camera-outline" size={17} color={C.white} /></Pressable>
        </View>
        <Field label="Full name" placeholder={technician ? 'Ramesh Patel' : 'Priya Shah'} />
        <Field label="Mobile number" placeholder="+91 98765 43210" keyboardType="phone-pad" />
        <Field label={technician ? 'Primary trade' : 'Email address'} placeholder={technician ? 'Electrician' : 'priya@email.com'} />
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
        {technician && (
          <>
            <Text style={styles.fieldLabel}>TRADE SKILLS</Text>
            <View style={styles.chipWrap}>
              {['Plumbing', 'Electrical', 'AC & Fridge', 'Washing Machine', 'RO Purifier'].map((trade) => (
                <Pressable key={trade} onPress={() => toggleTrade(trade)} style={[styles.chip, trades.includes(trade) && styles.chipActive]}>
                  <Text style={[styles.chipText, trades.includes(trade) && styles.chipTextActive]}>{trade}</Text>
                </Pressable>
              ))}
            </View>
            <Field label="YEARS OF EXPERIENCE" placeholder="8" value={experience} onChangeText={(value) => setExperience(value.replace(/[^0-9]/g, ''))} keyboardType="number-pad" />
            <Text style={styles.fieldLabel}>PROFILE BIO</Text>
            <View style={[styles.fieldBox, { height: 85, alignItems: 'flex-start', paddingTop: 11, marginBottom: 15 }]}><TextInput value={bio} onChangeText={setBio} multiline placeholder="Tell customers about your experience" placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} /></View>
            <Text style={styles.fieldLabel}>VERIFICATION DOCUMENTS</Text>
            {['Aadhaar Card', 'PAN Card'].map((document) => (
              <Pressable key={document} onPress={() => Alert.alert(document, 'Document re-upload will be available when secure KYC upload is connected.')} style={styles.settingsRow}>
                <View style={styles.settingsIcon}><Icon name="document-text-outline" size={18} color={C.teal} /></View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.settingsTitle}>{document}</Text>
                  <Text style={styles.settingsSub}>Verified · tap to view or replace</Text>
                </View>
                <Icon name="cloud-upload-outline" size={18} color={C.teal} />
              </Pressable>
            ))}
          </>
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
        <Button onPress={() => {
          Alert.alert('Profile saved', 'Your profile changes have been saved in this demo.');
          go(technician ? 'techSettings' : 'settings');
        }}>Save changes</Button>
      </ScrollView>
    </View>
  );
}

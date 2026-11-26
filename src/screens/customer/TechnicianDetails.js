import React, { useState } from 'react';
import { Alert, Modal, Pressable, ScrollView, Share, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { Header, StatusPill } from '../../components';
import { styles } from '../../theme/appStyles';

const RATE_TABLE = [
  ['Tap / mixer replacement', '₹150'],
  ['Concealed pipe leak repair', '₹450 + parts'],
  ['AC gas refill inspection', '₹299'],
  ['Switchboard repair', '₹249'],
  ['Drain pump replacement', '₹450 + parts'],
];

const RULES = [
  'Work starts only after you approve the digital quote in-app.',
  'Extra charges require photo proof + your approval in the app.',
  'Warranty applies automatically on all listed parts.',
];

const REVIEWS = [
  ['Neha P.', 5, 'Tap / mixer replacement', '"Very punctual and explained the issue clearly. The quote matched the final bill."'],
  ['Ankit T.', 5, 'AC gas refill', '"Showed the leaking part with a photo before charging anything. Very transparent."'],
  ['Maya J.', 4, 'Drain pump repair', '"Fixed the same day. Slight delay in arrival but informed me in advance."'],
];

const DATES = ['Today', 'Tomorrow', 'Pick Date'];
const SLOTS = [['Morning', '9–12'], ['Afternoon', '12–4'], ['Evening', '4–8']];

function Stepper({ go, service, setService, description, setDescription, photoCount, setPhotoCount, date, setDate, slot, setSlot }) {
  const [serviceOpen, setServiceOpen] = useState(false);
  const services = ['Split AC · Not cooling', 'Tap / mixer · Leakage', 'Washing machine · Not working', 'Other appliance'];
  return (
    <View style={styles.flex}>
      <Header title="Ramesh Patel" onBack={() => go('home')} right={<Pressable onPress={() => Share.share({ message: 'Book Ramesh Patel on ServSetu for verified home repairs.' })} style={styles.iconButton}><Ionicons name="share-social-outline" size={20} color={C.navy} /></Pressable>} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.pagePadding, { paddingBottom: 110 }]}>
        <View style={styles.profileHero}>
          <View style={[styles.profileAvatar, { backgroundColor: C.tealLight }]}>
            <Text style={styles.profileInitials}>RP</Text>
            <View style={[styles.kycBadge, { width: 24, height: 24, right: 2, bottom: 2 }]}><Ionicons name="checkmark" size={14} color={C.white} /></View>
          </View>
          <Text style={styles.profileName}>Ramesh Patel</Text>
          <View style={[styles.ratingRow, { marginTop: 6 }]}>
            <Ionicons name="shield-checkmark" size={14} color={C.teal} />
            <Text style={[styles.statLabel, { color: C.teal, fontWeight: '800', marginTop: 0 }]}>KYC Verified</Text>
          </View>
          <Text style={styles.profileTrade}>Electrician · AC & Fridge specialist</Text>
          <View style={styles.profileStats}>
            <View><Text style={styles.bigStat}>8 yrs</Text><Text style={styles.statLabel}>experience</Text></View>
            <View style={styles.statDivider} />
            <View><Text style={styles.bigStat}>96%</Text><Text style={styles.statLabel}>on-time arrival</Text></View>
            <View style={styles.statDivider} />
            <View><Text style={styles.bigStat}>328</Text><Text style={styles.statLabel}>jobs done</Text></View>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Transparent rate card & rules</Text>
        <View style={styles.rateCard}>
          <View style={styles.rateHighlight}>
            <Text style={styles.cardCaption}>VISITING / INSPECTION FEE</Text>
            <Text style={styles.rateAmount}>₹149</Text>
            <View style={[styles.warrantyPill, { marginTop: 8 }]}><Text style={styles.warrantyPillText}>100% Waived if you approve the repair quotation</Text></View>
          </View>
          {RATE_TABLE.map(([name, price]) => (
            <View key={name} style={styles.rateRow}>
              <Text style={styles.rateName}>{name}</Text>
              <Text style={styles.ratePrice}>{price}</Text>
            </View>
          ))}
        </View>

        <View style={[styles.ruleAccordion, { marginTop: 14 }]}>
          {RULES.map((r, i) => (
            <View key={i} style={styles.ruleBullet}>
              <Ionicons name="checkmark-circle" size={15} color={C.teal} />
              <Text style={styles.ruleBulletText}>{r}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Verified reviews</Text>
        {REVIEWS.map(([name, stars, service, text]) => (
          <View key={name} style={[styles.reviewCard, { marginBottom: 10 }]}>
            <View style={styles.reviewTop}>
              <Text style={styles.reviewName}>{name}</Text>
              <View style={styles.ratingRow}>{[...Array(5)].map((_, i) => <Ionicons key={i} name={i < stars ? 'star' : 'star-outline'} size={12} color={C.orange} />)}</View>
            </View>
            <Text style={{ color: C.teal, fontSize: 10, fontWeight: '800', marginTop: 5 }}>{service}</Text>
            <Text style={styles.reviewText}>{text}</Text>
          </View>
        ))}

        <Text style={styles.sectionTitle}>Send a service request</Text>
        <View style={styles.quoteCard}>
          <Text style={styles.fieldLabel}>SELECT SERVICE / APPLIANCE</Text>
          <Pressable onPress={() => setServiceOpen(true)} style={styles.tradeSelect}>
            <Text style={[styles.tradeSelectText, !service && { color: '#9AA8B5' }]}>{service || 'Select service / appliance'}</Text>
            <Ionicons name="chevron-down" size={18} color={C.muted} />
          </Pressable>
          <Text style={styles.fieldLabel}>ISSUE DESCRIPTION</Text>
          <View style={[styles.fieldBox, { height: 74, alignItems: 'flex-start', paddingTop: 12, marginBottom: 14 }]}>
            <TextInput value={description} onChangeText={setDescription} multiline placeholder="Describe the issue briefly..." placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} />
          </View>
          <Text style={styles.fieldLabel}>UPLOAD PROBLEM PHOTO <Text style={styles.optional}>UP TO 3</Text></Text>
          <Pressable onPress={() => setPhotoCount((count) => Math.min(count + 1, 3))} style={[styles.photoBox, { height: 64 }]}>
            <Ionicons name="camera-outline" size={22} color={C.teal} />
            <Text style={styles.photoText}>{photoCount ? `${photoCount} photo${photoCount === 1 ? '' : 's'} added · tap to add` : 'Tap to add photos'}{photoCount === 3 ? ' · limit reached' : ''}</Text>
          </Pressable>
          <Text style={styles.fieldLabel}>PREFERRED DATE</Text>
          <View style={styles.dateChipRow}>{DATES.map((d) => <Pressable key={d} onPress={() => setDate(d)} style={[styles.dateChip, date === d && styles.dateChipActive]}><Text style={[styles.chipText, date === d && styles.chipTextActive]}>{d}</Text></Pressable>)}</View>
          <View style={styles.slotRow}>{SLOTS.map(([label, time], i) => (
            <Pressable key={label} onPress={() => setSlot(label)} style={[styles.slot, slot === label && styles.slotActive]}>
              <Text style={[styles.slotText, slot === label && { color: C.teal }]}>{label}</Text>
              <Text style={styles.slotTime}>{time}</Text>
            </Pressable>
          ))}</View>
        </View>
      </ScrollView>

      <View style={styles.stickyBar}>
        <View style={styles.stickyFee}>
          <Text style={styles.cardCaption}>VISITING FEE</Text>
          <Text style={styles.cardPrice}>₹149</Text>
        </View>
        <Pressable onPress={() => {
          if (!service || !description.trim()) {
            Alert.alert('Add service details', 'Choose a service and describe the issue before sending your request.');
            return;
          }
          go('bookingDetails');
        }} style={[styles.payBtn, { backgroundColor: C.teal }]}>
          <Text style={styles.payBtnText}>Send Service Request</Text>
        </Pressable>
      </View>
      <Modal transparent visible={serviceOpen} animationType="slide" onRequestClose={() => setServiceOpen(false)}>
        <Pressable style={styles.sheetOverlay} onPress={() => setServiceOpen(false)}>
          <Pressable style={styles.sheet} onPress={() => {}}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>Select service / appliance</Text>
            {services.map((item) => (
              <Pressable key={item} onPress={() => { setService(item); setServiceOpen(false); }} style={styles.settingsRow}>
                <Text style={[styles.settingsTitle, { flex: 1 }]}>{item}</Text>
                {service === item && <Ionicons name="checkmark" size={18} color={C.teal} />}
              </Pressable>
            ))}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

export default function TechnicianDetails({ go }) {
  const [service, setService] = useState('');
  const [description, setDescription] = useState('');
  const [photoCount, setPhotoCount] = useState(0);
  const [date, setDate] = useState('Today');
  const [slot, setSlot] = useState('Afternoon');
  return <Stepper go={go} service={service} setService={setService} description={description} setDescription={setDescription} photoCount={photoCount} setPhotoCount={setPhotoCount} date={date} setDate={setDate} slot={slot} setSlot={setSlot} />;
}

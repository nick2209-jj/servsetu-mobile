import React, { useState } from 'react';
import { Modal, Pressable, ScrollView, Text, TextInput, View } from 'react-native';
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

function Stepper({ go }) {
  return (
    <View style={styles.flex}>
      <Header title="Technician profile" onBack={() => go('home')} right={<Pressable onPress={() => {}} style={styles.iconButton}><Ionicons name="share-social-outline" size={20} color={C.navy} /></Pressable>} />
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={[styles.pagePadding, { paddingBottom: 110 }]}>
        <View style={styles.profileHero}>
          <View style={[styles.profileAvatar, { backgroundColor: C.tealLight }]}>
            <Text style={styles.profileInitials}>RP</Text>
            <View style={[styles.kycBadge, { width: 24, height: 24, right: 2, bottom: 2 }]}><Ionicons name="checkmark" size={14} color={C.white} /></View>
          </View>
          <Text style={styles.profileName}>Ramesh Patel</Text>
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
          <Pressable style={styles.tradeSelect}>
            <Text style={[styles.tradeSelectText, { color: '#9AA8B5' }]}>e.g. Split AC · Not cooling</Text>
            <Ionicons name="chevron-down" size={18} color={C.muted} />
          </Pressable>
          <Text style={styles.fieldLabel}>ISSUE DESCRIPTION</Text>
          <View style={[styles.fieldBox, { height: 74, alignItems: 'flex-start', paddingTop: 12, marginBottom: 14 }]}>
            <TextInput multiline placeholder="Describe the issue briefly..." placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} />
          </View>
          <Text style={styles.fieldLabel}>UPLOAD PROBLEM PHOTO <Text style={styles.optional}>UP TO 3</Text></Text>
          <Pressable style={[styles.photoBox, { height: 64 }]}>
            <Ionicons name="camera-outline" size={22} color={C.teal} />
            <Text style={styles.photoText}>Tap to add photos</Text>
          </Pressable>
          <Text style={styles.fieldLabel}>PREFERRED DATE</Text>
          <View style={styles.dateChipRow}>{DATES.map((d) => <Pressable key={d} style={[styles.dateChip, d === 'Today' && styles.dateChipActive]}><Text style={[styles.chipText, d === 'Today' && styles.chipTextActive]}>{d}</Text></Pressable>)}</View>
          <View style={styles.slotRow}>{SLOTS.map(([label, time], i) => (
            <Pressable key={label} style={[styles.slot, i === 1 && styles.slotActive]}>
              <Text style={[styles.slotText, i === 1 && { color: C.teal }]}>{label}</Text>
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
        <Pressable onPress={() => go('bookingDetails')} style={[styles.payBtn, { backgroundColor: C.teal }]}>
          <Text style={styles.payBtnText}>Send Service Request</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default function TechnicianDetails({ go }) {
  const [submitted, setSubmitted] = useState(false);
  return <Stepper go={go} />;
}

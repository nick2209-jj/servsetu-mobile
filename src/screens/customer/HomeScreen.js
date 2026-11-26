import React, { useMemo, useState } from 'react';
import { Modal, Pressable, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { C } from '../../theme';
import { categories, technicians } from '../../data/demo';
import { MainLayout } from '../../components';
import { styles } from '../../theme/appStyles';

const SORTS = ['Lowest Visiting Fee', 'Highest Rated', 'Nearest'];
const FEES = ['Under ₹149', 'Under ₹249', 'Any'];
const DISTANCES = ['Within 2 km', 'Within 5 km', 'Within 10 km'];
const RATINGS = ['4.0★+', '4.5★+'];

function FilterSheet({ visible, onClose, filters, setFilters }) {
  const set = (key, val) => setFilters((f) => ({ ...f, [key]: val }));
  const chip = (active) => [styles.chip, active && styles.chipActive];
  const text = (active) => [styles.chipText, active && styles.chipTextActive];
  return (
    <Modal transparent visible={visible} animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.sheetOverlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          <View style={styles.sheetHandle} />
          <Text style={styles.sheetTitle}>Filter technicians</Text>
          <Text style={styles.formSectionTitle}>VISITING FEE</Text>
          <View style={styles.chipWrap}>{FEES.map((f) => <Pressable key={f} onPress={() => set('fee', f)} style={chip(filters.fee === f)}><Text style={text(filters.fee === f)}>{f}</Text></Pressable>)}</View>
          <Text style={styles.formSectionTitle}>DISTANCE</Text>
          <View style={styles.chipWrap}>{DISTANCES.map((d) => <Pressable key={d} onPress={() => set('distance', d)} style={chip(filters.distance === d)}><Text style={text(filters.distance === d)}>{d}</Text></Pressable>)}</View>
          <Text style={styles.formSectionTitle}>MINIMUM RATING</Text>
          <View style={styles.chipWrap}>{RATINGS.map((r) => <Pressable key={r} onPress={() => set('rating', r)} style={chip(filters.rating === r)}><Text style={text(filters.rating === r)}>{r}</Text></Pressable>)}</View>
          <View style={[styles.checkRow, { paddingVertical: 6, marginBottom: 14 }]}>
            <Text style={[styles.radioText, { flex: 1 }]}>Available Now</Text>
            <Switch value={filters.available} onValueChange={(v) => set('available', v)} trackColor={{ true: C.teal }} />
          </View>
          <Button label="Show technicians" onPress={onClose} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

function Button({ label, onPress }) {
  return <Pressable onPress={onPress} style={styles.button}><Text style={styles.buttonText}>{label}</Text></Pressable>;
}

export default function HomeScreen({ go }) {
  const [areaOpen, setAreaOpen] = useState(false);
  const [area, setArea] = useState('Alkapuri, Vadodara');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All');
  const [sort, setSort] = useState('Highest Rated');
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState({ fee: 'Any', distance: 'Within 10 km', rating: '4.0★+', available: false });
  const [unread, setUnread] = useState(2);

  const feed = useMemo(() => {
    let list = [...technicians];
    if (query.trim()) {
      const terms = query.toLowerCase().trim().split(/\s+/);
      list = list.filter((t) => {
        const searchable = `${t.name} ${t.trade} ${t.searchTerms || ''}`.toLowerCase();
        return terms.every((term) => searchable.includes(term));
      });
    }
    if (category !== 'All') list = list.filter((t) => t.trade.toLowerCase().includes(category.toLowerCase()));
    if (filters.fee === 'Under ₹149') list = list.filter((t) => Number(t.fee) < 149);
    if (filters.fee === 'Under ₹249') list = list.filter((t) => Number(t.fee) < 249);
    if (filters.distance) {
      const maxDistance = Number(filters.distance.match(/\d+/)?.[0]);
      list = list.filter((t) => Number(t.distance.match(/[\d.]+/)?.[0]) <= maxDistance);
    }
    if (filters.rating) {
      const minimumRating = Number(filters.rating.match(/[\d.]+/)?.[0]);
      list = list.filter((t) => Number(t.rating) >= minimumRating);
    }
    if (filters.available) list = list.filter((t) => t.available);
    if (sort === 'Lowest Visiting Fee') list.sort((a, b) => a.fee - b.fee);
    if (sort === 'Highest Rated') list.sort((a, b) => b.rating - a.rating);
    if (sort === 'Nearest') list.sort((a, b) => parseFloat(a.distance) - parseFloat(b.distance));
    return list;
  }, [category, filters, query, sort]);

  return (
    <MainLayout active="home" onChange={go}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.pagePadding}>
        <View style={styles.homeTop}>
          <Pressable onPress={() => setAreaOpen(!areaOpen)} style={styles.locationPill}>
            <Ionicons name="location" size={15} color={C.teal} />
            <Text style={styles.locationText}>{area}</Text>
            <Ionicons name="chevron-down" size={13} color={C.teal} />
          </Pressable>
          <Pressable onPress={() => { setUnread(0); go('notifications'); }} style={styles.iconButton}>
            <Ionicons name="notifications-outline" size={22} color={C.navy} />
            {unread > 0 && (
              <View style={styles.badgeDot}><Text style={{ color: C.white, fontSize: 8, fontWeight: '800' }}>{unread}</Text></View>
            )}
          </Pressable>
        </View>
        {areaOpen && ['Alkapuri, Vadodara', 'Race Course, Vadodara', 'Fatehgunj, Vadodara'].map((a) => (
          <Pressable key={a} onPress={() => { setArea(a); setAreaOpen(false); }} style={styles.settingsRow}>
            <Ionicons name="location-outline" size={18} color={C.teal} />
            <Text style={[styles.settingsTitle, { flex: 1, marginLeft: 8 }]}>{a}</Text>
            {a === area && <Ionicons name="checkmark" size={18} color={C.teal} />}
          </Pressable>
        ))}

        <View style={styles.searchRow}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={19} color={C.muted} />
            <TextInput value={query} onChangeText={setQuery} placeholder="Search plumber, AC gas refill, geyser..." placeholderTextColor={C.muted} style={styles.searchInput} />
          </View>
          <Pressable onPress={() => setFilterOpen(true)} style={styles.filterButton}>
            <Ionicons name="options-outline" size={20} color={C.navy} />
          </Pressable>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.chipsRow}>
          {[{ label: 'All', icon: 'grid-outline' }, ...categories].map(({ label, icon }) => (
            <Pressable key={label} onPress={() => setCategory(label)} style={[styles.categoryChip, category === label && styles.categoryChipActive]}>
              <Ionicons name={icon} size={14} color={category === label ? C.white : C.teal} />
              <Text style={[styles.categoryText, category === label && styles.categoryTextActive]}>{label}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ gap: 8, marginBottom: 16 }}>
          {SORTS.map((s) => (
            <Pressable key={s} onPress={() => setSort(s)} style={[styles.sortChip, sort === s && styles.sortChipActive]}>
              <Text style={[styles.chipText, sort === s && styles.chipTextActive]}>{s}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.sectionHeader}>
          <View><Text style={styles.sectionTitle}>Trusted near you</Text><Text style={styles.sectionSub}>{feed.length} verified pros match your filters</Text></View>
        </View>

        {feed.map((item) => (
          <Pressable key={item.name} onPress={() => go('technicianDetails')} style={({ pressed }) => [styles.techCard, pressed && { transform: [{ scale: 0.985 }] }]}>
            <View style={styles.techCardTop}>
              <View>
                <View style={[styles.avatar, { backgroundColor: item.color }]}><Text style={styles.avatarText}>{item.initials}</Text></View>
                {item.verified && (
                  <View style={styles.kycBadge}><Ionicons name="checkmark" size={10} color={C.white} /></View>
                )}
              </View>
              <View style={styles.techIdentity}>
                <View style={styles.nameRow}><Text style={styles.techName}>{item.name}</Text></View>
                <Text style={styles.techTrade}>{item.trade}</Text>
                <View style={styles.ratingRow}>
                  <Ionicons name="star" size={14} color={C.orange} />
                  <Text style={styles.rating}>{item.rating} ★ ({item.jobs} jobs)</Text>
                  <Text style={styles.dot}>·</Text>
                  <Ionicons name="location-outline" size={13} color={C.muted} />
                  <Text style={styles.jobs}>{item.distance} away</Text>
                </View>
              </View>
            </View>
            <View style={styles.techCardBottom}>
              <View><Text style={styles.cardCaption}>VISITING CHARGE</Text><Text style={styles.cardPrice}>₹{item.fee}</Text></View>
              <View><Text style={styles.cardCaption}>STARTS AT</Text><Text style={styles.cardPrice}>₹{item.startsAt}</Text></View>
              <Pressable onPress={() => go('technicianDetails')} style={styles.bookBtn}>
                <Text style={styles.bookBtnText}>View & Book</Text>
              </Pressable>
            </View>
          </Pressable>
        ))}
        {feed.length === 0 && (
          <View style={styles.infoCard}>
            <Ionicons name="search-outline" size={20} color={C.teal} />
            <Text style={styles.infoCardText}>No technicians match these filters. Try a wider distance or a lower minimum rating.</Text>
          </View>
        )}

        <View style={styles.trustStrip}>
          <Ionicons name="shield-checkmark-outline" size={20} color={C.teal} />
          <Text style={styles.trustText}><Text style={{ fontWeight: '800', color: C.ink }}>ServSetu Promise</Text> · Digital quotes before work. No hidden charges.</Text>
        </View>
      </ScrollView>

      <FilterSheet visible={filterOpen} onClose={() => setFilterOpen(false)} filters={filters} setFilters={setFilters} />
    </MainLayout>
  );
}

import React, { useState } from 'react';
import { Alert, ScrollView, Switch, Text, TextInput, View } from 'react-native';
import { C } from '../../theme';
import { Button, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function WorkRulesScreen({ go }) {
  const [radius, setRadius] = useState(5);
  const [trackWidth, setTrackWidth] = useState(1);
  const [fee, setFee] = useState('149');
  const [waive, setWaive] = useState(true);
  const [terms, setTerms] = useState('No hidden charges. Quote before work begins.');
  const percent = ((radius - 2) / 18) * 100;
  const setRadiusFromTouch = (event) => {
    const position = Math.max(0, Math.min(1, event.nativeEvent.locationX / trackWidth));
    setRadius(Math.round(2 + position * 18));
  };
  const save = () => {
    if (!fee || Number(fee) < 0) {
      Alert.alert('Enter a valid visiting fee', 'The visiting charge must be zero or more.');
      return;
    }
    Alert.alert('Work rules saved', 'Your service radius and visiting fee preferences have been saved in this demo.');
    go('techSettings');
  };

  return (
    <View style={styles.flex}>
      <Header title="Service Radius & Work Rules" subtitle="Choose where and how you take jobs" onBack={() => go('techSettings')} />
      <ScrollView contentContainerStyle={styles.pagePadding}>
        <Text style={styles.fieldLabel}>SERVICE RADIUS</Text>
        <View style={styles.radiusCard}>
          <Text style={styles.radiusValue}>{radius} km</Text>
          <Text style={styles.radiusSub}>Customers within your selected area can find you.</Text>
          <View
            onLayout={(event) => setTrackWidth(event.nativeEvent.layout.width)}
            onStartShouldSetResponder={() => true}
            onMoveShouldSetResponder={() => true}
            onResponderGrant={setRadiusFromTouch}
            onResponderMove={setRadiusFromTouch}
            style={[styles.sliderTrack, { marginHorizontal: 8 }]}
          >
            <View style={[styles.sliderFill, { width: `${percent}%` }]} />
            <View style={[styles.sliderThumb, { left: `${percent}%` }]} />
          </View>
          <View style={styles.sliderLabels}><Text>2 km</Text><Text>20 km</Text></View>
        </View>

        <Text style={styles.fieldLabel}>DEFAULT VISITING CHARGE (₹)</Text>
        <View style={[styles.fieldBox, { marginBottom: 17 }]}><TextInput value={fee} onChangeText={(value) => setFee(value.replace(/[^0-9]/g, ''))} placeholder="149" keyboardType="number-pad" placeholderTextColor="#9AA8B5" style={styles.fieldInput} /></View>

        <View style={styles.ruleSelect}>
          <Icon name="checkmark-circle" size={20} color={C.teal} />
          <View style={{ flex: 1 }}>
            <Text style={styles.settingsTitle}>Waive visiting fee on repair approval</Text>
            <Text style={styles.settingsSub}>Deduct the inspection fee from an approved repair quote.</Text>
          </View>
          <Switch value={waive} onValueChange={setWaive} trackColor={{ true: C.teal }} />
        </View>

        <Text style={styles.fieldLabel}>CUSTOM SERVICE TERMS</Text>
        <View style={[styles.fieldBox, { height: 94, alignItems: 'flex-start', paddingTop: 11, marginBottom: 18 }]}><TextInput value={terms} onChangeText={setTerms} multiline placeholder="Explain what customers should expect" placeholderTextColor="#9AA8B5" style={[styles.fieldInput, { textAlignVertical: 'top' }]} /></View>
        <Button onPress={save}>Save Work Rules</Button>
      </ScrollView>
    </View>
  );
}

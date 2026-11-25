import React from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { Button, Field, Header, Icon } from '../../components';
import { styles } from '../../theme/appStyles';

export default function WorkRulesScreen({ go }) {
  return <View style={styles.flex}><Header title="Work rules & radius" subtitle="Set expectations before the job" onBack={() => go('techSettings')} /><ScrollView contentContainerStyle={styles.pagePadding}><Field label="Default visiting charge" placeholder="₹149" keyboardType="number-pad" /><Text style={styles.fieldLabel}>SERVICE RADIUS</Text><View style={styles.radiusCard}><Text style={styles.radiusValue}>5 km</Text><Text style={styles.radiusSub}>Most customers nearby</Text><View style={styles.sliderTrack}><View style={styles.sliderFill} /><View style={styles.sliderThumb} /></View><View style={styles.sliderLabels}><Text>2 km</Text><Text>20 km</Text></View></View><Text style={styles.fieldLabel}>VISITING FEE RULE</Text><View style={styles.ruleSelect}><Icon name="checkmark-circle" size={20} color={C.teal} /><View style={{ flex: 1 }}><Text style={styles.settingsTitle}>Waive on quote approval</Text><Text style={styles.settingsSub}>Recommended · builds customer trust</Text></View><Icon name="chevron-down" size={18} color={C.muted} /></View><Field label="Your service promise" placeholder="No hidden charges. Quote before work." /><Button onPress={() => go('techSettings')}>Save work rules</Button></ScrollView></View>;
}

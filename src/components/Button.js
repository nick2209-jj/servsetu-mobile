import React from 'react';
import { Pressable, Text, View } from 'react-native';
import { C } from '../theme';
import { Icon } from './Icon';
import { styles } from '../theme/appStyles';

export function Button({ children, onPress, secondary = false, compact = false, disabled = false }) {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [
        styles.button,
        secondary && styles.buttonSecondary,
        compact && styles.buttonCompact,
        disabled && styles.buttonDisabled,
        pressed && !disabled && { transform: [{ scale: 0.98 }], opacity: 0.88 },
      ]}
    >
      <Text style={[styles.buttonText, secondary && styles.buttonSecondaryText]}>{children}</Text>
    </Pressable>
  );
}

export function IconButton({ name, onPress, badge }) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.iconButton, pressed && { opacity: 0.7 }]}>
      <Icon name={name} size={22} color={C.navy} />
      {badge && <View style={styles.badgeDot} />}
    </Pressable>
  );
}

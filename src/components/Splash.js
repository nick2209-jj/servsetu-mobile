import React, { useEffect, useRef } from 'react';
import { Animated, Image, Text, View } from 'react-native';
import { logo } from '../assets';
import { styles } from '../theme/appStyles';

function Splash({ onFinish }) {
  const fade = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(0.72)).current;
  const line = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(fade, { toValue: 1, duration: 650, useNativeDriver: true }),
        Animated.spring(scale, { toValue: 1, friction: 6, tension: 50, useNativeDriver: true }),
      ]),
      Animated.timing(line, { toValue: 1, duration: 600, useNativeDriver: true }),
      Animated.delay(700),
    ]).start(onFinish);
  }, [fade, line, onFinish, scale]);

  return (
    <View style={styles.splash}>
      <Animated.View style={{ opacity: fade, transform: [{ scale }] }}>
        <View style={styles.splashLogoWrap}>
          <Image source={logo} style={styles.splashLogo} />
        </View>
      </Animated.View>
      <Animated.View style={[styles.splashLine, { transform: [{ scaleX: line }] }]} />
      <Animated.Text style={[styles.splashTitle, { opacity: fade }]}>SERVSETU</Animated.Text>
      <Animated.Text style={[styles.splashTagline, { opacity: fade }]}>Connecting homes with trusted repair professionals</Animated.Text>
      <Text style={styles.splashVersion}>LOCAL HELP. CLEAR PRICES.</Text>
    </View>
  );
}

export function AnimatedScreen({ children }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const y = useRef(new Animated.Value(18)).current;
  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.spring(y, { toValue: 0, friction: 8, tension: 55, useNativeDriver: true }),
    ]).start();
  }, [opacity, y]);
  return <Animated.View style={{ flex: 1, opacity, transform: [{ translateY: y }] }}>{children}</Animated.View>;
}

export default Splash;

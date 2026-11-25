import React, { useState } from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import { C } from './src/theme';
import { AnimatedScreen, Splash } from './src/components';
import LoginScreen from './src/screens/auth/LoginScreen';
import OtpScreen from './src/screens/auth/OtpScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import ForgotScreen from './src/screens/auth/ForgotScreen';
import HomeScreen from './src/screens/customer/HomeScreen';
import FiltersScreen from './src/screens/customer/FiltersScreen';
import TechnicianDetails from './src/screens/customer/TechnicianDetails';
import BookingForm from './src/screens/customer/BookingForm';
import BookingsScreen from './src/screens/customer/BookingsScreen';
import BookingDetails from './src/screens/customer/BookingDetails';
import PaymentScreen from './src/screens/customer/PaymentScreen';
import CustomerNotifications from './src/screens/customer/NotificationsScreen';
import AppliancesScreen from './src/screens/customer/AppliancesScreen';
import TransactionsScreen from './src/screens/shared/TransactionsScreen';
import ProfileScreen from './src/screens/shared/ProfileScreen';
import SupportScreen from './src/screens/shared/SupportScreen';
import SettingsScreen from './src/screens/shared/SettingsScreen';
import TechnicianDashboard from './src/screens/technician/TechnicianDashboard';
import JobManagement from './src/screens/technician/JobManagement';
import ServicesScreen from './src/screens/technician/ServicesScreen';
import EarningsScreen from './src/screens/technician/EarningsScreen';
import WorkRulesScreen from './src/screens/technician/WorkRulesScreen';
import PayoutScreen from './src/screens/technician/PayoutScreen';

const screens = {
  login: (state) => <LoginScreen role={state.role} setRole={state.setRole} go={state.go} />,
  otp: (state) => <OtpScreen go={state.go} />,
  register: (state) => <RegisterScreen role={state.role} setRole={state.setRole} go={state.go} />,
  forgot: (state) => <ForgotScreen go={state.go} />,
  home: (state) => <HomeScreen go={state.go} />,
  filters: (state) => <FiltersScreen go={state.go} />,
  technicianDetails: (state) => <TechnicianDetails go={state.go} />,
  bookingForm: (state) => <BookingForm go={state.go} />,
  bookings: (state) => <BookingsScreen go={state.go} />,
  bookingDetails: (state) => <BookingDetails go={state.go} />,
  payment: (state) => <PaymentScreen go={state.go} />,
  notifications: (state) => <CustomerNotifications go={state.go} />,
  settings: (state) => <SettingsScreen go={state.go} />,
  appliances: (state) => <AppliancesScreen go={state.go} />,
  transactions: (state) => <TransactionsScreen go={state.go} />,
  profile: (state) => <ProfileScreen go={state.go} />,
  support: (state) => <SupportScreen go={state.go} />,
  techDashboard: (state) => <TechnicianDashboard go={state.go} />,
  jobManagement: (state) => <JobManagement go={state.go} />,
  services: (state) => <ServicesScreen go={state.go} />,
  earnings: (state) => <EarningsScreen go={state.go} />,
  techSettings: (state) => <SettingsScreen go={state.go} technician />,
  workRules: (state) => <WorkRulesScreen go={state.go} />,
  payout: (state) => <PayoutScreen go={state.go} />,
};

export default function App() {
  const [booting, setBooting] = useState(true);
  const [screen, setScreen] = useState('login');
  const [role, setRole] = useState('customer');
  const state = { role, setRole, go: setScreen };

  if (booting) return <Splash onFinish={() => setBooting(false)} />;

  const content = screens[screen] ? screens[screen](state) : screens.login(state);
  return (
    <SafeAreaView style={styles.root}>
      <StatusBar barStyle="dark-content" backgroundColor={C.paper} />
      <AnimatedScreen key={screen}>{content}</AnimatedScreen>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.paper },
});

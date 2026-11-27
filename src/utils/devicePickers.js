import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { Alert } from 'react-native';

export async function detectCurrentAddress() {
  const { status } = await Location.requestForegroundPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Location access is required to auto-fill your address.');
    return null;
  }

  const position = await Location.getCurrentPositionAsync({
    accuracy: Location.Accuracy.Balanced,
  });

  const [geo] = await Location.reverseGeocodeAsync({
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  });

  return {
    coordinates: [position.coords.longitude, position.coords.latitude],
    area: geo?.district || geo?.subregion || geo?.street || '',
    city: geo?.city || geo?.region || '',
    pincode: geo?.postalCode || '',
  };
}

export async function pickDocumentImage() {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission Denied', 'Gallery access is required to upload documents or photos.');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ['images'],
    allowsEditing: true,
    quality: 0.75,
  });

  if (result.canceled || !result.assets?.length) {
    return null;
  }

  return result.assets[0]; // { uri, fileName, mimeType }
}
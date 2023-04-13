import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { Button, IconButton, Text } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native';
import { ScreenName } from '../types';
import { useTranslation } from 'react-i18next';

export default function App() {
  var name = 'Matt';
  var navigation = useNavigation();
  const {t} = useTranslation();
    return (
      <View style={styles.container}>
        <View style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Text variant='titleLarge'>{t('writeScreen.welcome', {name: name})}</Text>
        <IconButton mode='outlined' icon="cog" onPress={() => navigation.navigate('Settings')} />
        </View>
        <StatusBar style="auto" />
      </View>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 16,
    },
  });
  
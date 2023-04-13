import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DropDown from 'react-native-paper-dropdown';
import { useTheme } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import enLocale from '../locales/en.json';
import plLocale from '../locales/pl.json';
import { List } from 'react-native-paper';
import ListItem from 'react-native-paper/lib/typescript/src/components/List/ListItem';

function LanguageDropdownComponent() {
  const [showDropDown, setShowDropDown] = useState(false);
  const { t, i18n } = useTranslation();
  const [lang, setlang] = useState(i18n.language);
  const langList = [
    
    {
      label: enLocale.name,
      value: "en",
    },
    {
      label: plLocale.name,
      value: "pl",
    }
  ];
  const theme = useTheme()
  useEffect(() => {
    i18n.changeLanguage(lang);
    AsyncStorage.setItem('language', lang)
  }, [lang])
  return (
    <DropDown
      label={"Language"}
      mode={"outlined"}
      visible={showDropDown}
      showDropDown={() => setShowDropDown(true)}
      onDismiss={() => setShowDropDown(false)}
      value={lang}
      setValue={setlang}
      theme={theme}
      list={langList}
    />
  )
}
export default function App() {
  const { t, i18n } = useTranslation();
  const theme = useTheme();
  return (
    <View style={styles.container}>
      
      <List.Item left={() => <List.Icon color={theme.colors.tertiary} icon="earth" />} title={t('settingsScreen.language.choose')} right={({color, style})=>{
        return <LanguageDropdownComponent />
      }} />
      
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

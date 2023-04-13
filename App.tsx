// THIS IS TYPESCRIPT FILE
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import i18n from "i18next";
import { useTranslation, initReactI18next } from "react-i18next";
import AsyncStorage from '@react-native-async-storage/async-storage';
import WriteScreen from './screens/Write';
import AnalizeScreen from './screens/Analize';
import SettingsScreen from './screens/Settings';
import AboutScreen from './screens/About';
import DetailsScreen from './screens/Details';
import HelpScreen from './screens/Help';
import HistoryScreen from './screens/History';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import enLocale from './locales/en.json';
import plLocale from './locales/pl.json';
import { Provider } from 'react-native-paper';

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

const languageDetector: any = {
  type: 'languageDetector',
  async: true,
  detect: (callback: (language: string) => void) => {
    AsyncStorage.getItem('language').then((language) => {
      if (language) {
        callback(language);
      } else {
        const userLanguage = navigator.language.split('-')[0];
        callback(userLanguage);
      }
    });
  },
  init: () => {},
  cacheUserLanguage: (language: string) => {
    AsyncStorage.setItem('language', language);
  },
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .use(languageDetector)
  .init({
    
    resources: {
      en: {
        translation: enLocale
      },
      pl: {
        translation: plLocale
      }
    },
    fallbackLng: "en",
    compatibilityJSON: "v3",
    interpolation: {
      escapeValue: false // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape
    }
  });

function TabScreensWrapper() {
  const {t} = useTranslation();
  return (
    <Tab.Navigator initialRouteName='Write'> 
      <Tab.Screen name="History" options={{
        tabBarLabel: t('historyScreen.titleShort') || undefined,
        tabBarIcon: ({ color, focused }) => {
          return (
            <MaterialCommunityIcons name={focused ? 'view-list' : 'view-list-outline'} color={color} size={24} />
          );
        }
      }} component={HistoryScreen} />
      <Tab.Screen name="Write" component={WriteScreen} options={{
        tabBarLabel: t('writeScreen.titleShort') || undefined,
        tabBarIcon: ({ color, focused }) => {
          return (
            <MaterialCommunityIcons name={focused ? 'pencil-plus' : 'pencil-plus-outline'} color={color} size={24} />
          );
        }
      }} />
      <Tab.Screen name="Analyze" component={AnalizeScreen} options={{
        tabBarLabel: t('analyzeScreen.titleShort') || undefined,
        tabBarIcon: ({ color, focused }) => {
          return (
            <MaterialCommunityIcons name={focused ? 'file-chart' : 'file-chart-outline'} color={color} size={24} />
          );
        }
      }} />
    </Tab.Navigator>
  );
}
export default function App() {
  const {t}= useTranslation();
  return (
    <Provider>
      <NavigationContainer>
      <Stack.Navigator screenOptions={{animation: 'fade_from_bottom'}}>
        <Stack.Screen name="Home" options={{
          headerShown: false,
          animation: 'slide_from_right',
          
        }} component={TabScreensWrapper} />
        <Stack.Screen name="Settings" options={{
          headerTitle: t('settingsScreen.title') || undefined,
        }} component={SettingsScreen} />
        <Stack.Screen name="About" component={AboutScreen} />
        <Stack.Screen name="Help" component={HelpScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

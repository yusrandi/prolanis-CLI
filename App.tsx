/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, type PropsWithChildren } from 'react';
import {
  Linking,
  NativeEventEmitter,
  PermissionsAndroid,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import RootNavigator from './src/navigator/RootNavigator';
import fonts from './src/config/fonts';
import SplashScreen from 'react-native-splash-screen'
import moment from 'moment';
import Notifications from './src/config/Notifications';
import AuthProvider from './src/context/AuthContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import PushNotification, { Importance } from 'react-native-push-notification';

const App = () => {

  const targetTime = new Date();

  // Set the desired time (02:40) on the targetTime object
  targetTime.setHours(4);
  targetTime.setMinutes(50);
  targetTime.setSeconds(0);


  Notifications.schduleNotification(new Date(Date.now() + 5 * 1000), "initial notif");
  // Notifications.schduleNotification(targetTime, "Jam 4:50");

  const requestPermission = async () => {

  };



  useEffect(() => {
    requestPermission()
  }, [])

  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide()
    }, 2000)
  }, [])



  return <AuthProvider>
    <SafeAreaProvider style={{ flex: 1 }} >
      <GestureHandlerRootView style={{ flex: 1 }}>
        <RootNavigator />
      </GestureHandlerRootView>
    </SafeAreaProvider>
  </AuthProvider>
};


export default App;

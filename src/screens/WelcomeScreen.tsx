import { View, Text, Image, StatusBar, TouchableOpacity, Platform, SafeAreaView, EventEmitter, NativeEventEmitter } from 'react-native'
import React, { useEffect } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import FontSize from '../constants/FontSize'
import Spacing from '../constants/Spacing'



export default function WelcomeScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "welcome">) {


    useEffect(() => {
        // BackgroundTimer.runBackgroundTimer(() => {
        //     //code that will be called every 3 seconds 
        //     console.log(`this is background ${new Date()}`);
        // },
        //     3000);

        // BackgroundTimer.stop();
    }, [])
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <Image source={require('../../assets/images/back.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                // edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, height: '100%' }}
            >
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing * 2 }}>
                    <Text style={{ fontSize: FontSize.large, fontWeight: 'bold', color: 'black' }}>Welcome to ProlanisCare.App</Text>
                    <Text style={{ fontSize: FontSize.small, fontWeight: 'bold' }}>Panduan Pola Hidup Sehat Untuk</Text>
                    <Text style={{ fontSize: FontSize.small, fontWeight: 'bold' }}>Kelompok Penderita Diabetes 2</Text>
                    <View style={{ width: '100%', paddingHorizontal: Spacing * 2 }}>
                        <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ backgroundColor: 'white', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * Spacing / 2, borderRadius: Spacing, elevation: 5 }}>
                            <Text style={{ fontSize: FontSize.medium, fontWeight: 'bold', color: 'black' }}>Sign In</Text>
                        </TouchableOpacity>
                        {/* <TouchableOpacity onPress={() => navigation.navigate('registerChoice')} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing, elevation: 5 }}>
                            <Text style={{ color: 'white', fontSize: FontSize.medium, fontWeight: 'bold' }}>Sign Up</Text>
                        </TouchableOpacity> */}
                    </View>
                </View>
            </SafeAreaView>
        </SafeAreaView>
    )
}
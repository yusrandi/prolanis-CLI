import { View, Text, StatusBar, ActivityIndicator, Image, Button, TouchableOpacity } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { NativeStackScreenProps, createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer, NavigatorScreenParams } from '@react-navigation/native';
import HomeScreen, { MenuTipsHome } from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import { CustomDefaultTheme } from '../themes/AppThemes';
import WelcomeScreen from '../screens/WelcomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import TabsNavigator, { TabsStackParamList } from './TabsNavigator';
import RegisterChoice from '../screens/RegisterChoice';
import RegisterNotUserScreen from '../screens/RegisterNotUser';
import DokterHomeScreen from '../screens/doctor-screen/DokterHomeScreen';
import { AuthUserContext } from '../context/AuthContext';
import auth from '@react-native-firebase/auth';
import { UserType, emptUser } from '../type/UserType';
import { usersDatabaseRef } from '../config/firebase';
import { DataRole } from '../data/DataRole';
import ProfileScreen from '../screens/ProfileScreen';
import { AsupanType } from '../type/AsupanType';
import AsupanNutrisiScreen from '../screens/featured-services/AsupanNutrisiScreen';
import AsupanDetail from '../screens/featured-services/AsupanDetail';
import KonsultasiChoice from '../screens/featured-services/KonsultasiChoice';
import KonsultasiScreen from '../screens/featured-services/KonsultasiScreen';
import { ResepType } from '../type/ResepType';
import ResepScreen from '../screens/featured-services/ResepScreen';
import ResepDetail from '../screens/featured-services/ResepDetail';
import BmiScreen from '../screens/BMI/BmiScreen';
import { JadwalNewType } from '../type/JadwalNewType';
import JadwalScreen from '../screens/featured-services/JadwalScreen';
import JadwalWaitingScreen from '../screens/featured-services/JadwalWaitingScreen';
import TipsVideoScreen from '../screens/TipsVideoScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { PenjelasanType } from '../type/PenjelasanType';
import PenjelasanDetailScreen from '../screens/penjelasan/PenjelasanDetailScreen';
import PenjelasanMenuScreen from '../screens/penjelasan/PenjelasanMenuScreen';
import TolakUkurScreen from '../screens/tolak-ukur/TolakUkurScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Font from '../constants/Font';
import FontSize from '../constants/FontSize';
import Spacing from '../constants/Spacing';
import PushNotification from 'react-native-push-notification';
import { dataNotifikasiss } from '../data/DataNotifikasi';
import Notifications from '../config/Notifications';
import DokterForumScreen from '../screens/doctor-screen/DokterForumScreen';
import DokterChatScreen from '../screens/doctor-screen/DokterChatScreen';


export type RootStackParamList = {
    tabs: NavigatorScreenParams<TabsStackParamList>;
    login: undefined
    register: undefined
    registerChoice: undefined
    registerNotUser: {
        role: string
    }
    home: undefined
    welcome: undefined
    profile: undefined
    asupan: {
        user: UserType
    }
    asupanDetail: {
        asupan: AsupanType
    }
    konsultasiChoice: undefined
    konsultasi: {
        senderId: string,
        title: string,
    }
    resep: {
        status: string
    }
    resepDetail: {
        resep: ResepType
    }
    bmi: {
        status: string
    }
    jadwal: {
        status: string
        jadwals: JadwalNewType[]
    }
    jadwalWait: {
        status: string
    }
    tipsVideo: {
        menuTips: MenuTipsHome
    }
    penjelasanDetail: {
        penjelasan: PenjelasanType
    }
    penjelasanMenu: undefined
    tolakUkur: undefined

    dokterHome: undefined
    dokterForum: undefined
    dokterChat: {
        user: UserType
    }


};

const RootStack = createNativeStackNavigator<RootStackParamList>();
export type RootStackScreenProps<T extends keyof RootStackParamList> =
    NativeStackScreenProps<RootStackParamList, T>;

function AuthStack() {
    return (
        <RootStack.Navigator initialRouteName="welcome">

            <RootStack.Screen
                name="welcome"
                component={WelcomeScreen}
                options={{
                    headerShown: false,
                }}
            />

            <RootStack.Screen
                name="login"
                component={LoginScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="register"
                component={RegisterScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="registerChoice"
                component={RegisterChoice}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="registerNotUser"
                component={RegisterNotUserScreen}
                options={{
                    headerShown: false,
                }}
            />
        </RootStack.Navigator>
    )
}
function DokterStack() {
    return (
        <RootStack.Navigator initialRouteName="dokterHome">
            <RootStack.Screen
                name="dokterHome"
                component={DokterHomeScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="dokterForum"
                component={DokterForumScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="dokterChat"
                component={DokterChatScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
        </RootStack.Navigator>
    )
}

function UserStack() {
    return (
        <RootStack.Navigator initialRouteName="tabs">
            <RootStack.Screen
                name="tabs"
                component={TabsNavigator}
                options={{
                    headerShown: false,
                }}

            />
            <RootStack.Screen
                name="profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="asupan"
                component={AsupanNutrisiScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="asupanDetail"
                component={AsupanDetail}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="konsultasiChoice"
                component={KonsultasiChoice}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="konsultasi"
                component={KonsultasiScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="resep"
                component={ResepScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="resepDetail"
                component={ResepDetail}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="bmi"
                component={BmiScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="jadwal"
                component={JadwalScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="jadwalWait"
                component={JadwalWaitingScreen}
                options={{
                    headerShown: false,
                }}
            />

            <RootStack.Screen
                name="tipsVideo"
                component={TipsVideoScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="penjelasanMenu"
                component={PenjelasanMenuScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="penjelasanDetail"
                component={PenjelasanDetailScreen}
                options={{
                    headerShown: false,
                }}
            />
            <RootStack.Screen
                name="tolakUkur"
                component={TolakUkurScreen}
                options={{
                    headerShown: false,
                }}
            />

        </RootStack.Navigator>
    )
}

export default function RootNavigator() {
    const { user, setUser } = useContext(AuthUserContext)
    const [loading, setLoading] = useState(true)
    const [hasSeenWelcome, setHasSeenWelcome] = useState(false);

    // useEffect(() => {
    //     PushNotification.deleteChannel("reminders");
    // }, [])
    useEffect(() => {
        // auth().signOut()
        // login("use@use.use", "1sampai8")
        console.log({ user });
        const unsubscribe = auth().onAuthStateChanged(async authenticatedUser => {
            console.log({ authenticatedUser });
            if (authenticatedUser) {
                usersDatabaseRef
                    .child(authenticatedUser.uid)
                    .once('value')
                    .then(snapshot => {
                        console.log('User data: ', snapshot.val());
                        const userType: UserType = snapshot.val() as UserType
                        setUser(userType)
                    })
                    .catch(error => console.log(error))
            } else {
                setUser(emptUser)
            }
            setLoading(false)

        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        // Cek penyimpanan lokal untuk menentukan apakah pengguna telah melihat layar selamat datang
        AsyncStorage.getItem('hasSeenWelcome').then((value) => {
            if (value !== null) {
                setHasSeenWelcome(true);
            } else {

                console.log("Create Notif");

                dataNotifikasiss.forEach((notif) => {
                    const targetTime = new Date();
                    targetTime.setHours(notif.time);
                    targetTime.setMinutes(0);
                    targetTime.setSeconds(0);

                    Notifications.schduleNotification(targetTime, notif.title);
                })
            }
        });
    }, []);

    const handleContinue = () => {
        // Simpan status selamat datang di penyimpanan lokal
        AsyncStorage.setItem('hasSeenWelcome', 'true').then(() => {
            setHasSeenWelcome(true);
        });
    };


    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../assets/images/back.png')} style={{ flex: 1, width: '100%', height: '100%', position: 'absolute' }} />
                <ActivityIndicator size={'large'} />
            </View>
        )
    }
    if (!hasSeenWelcome) {
        return (
            <View style={{ flex: 1, backgroundColor: 'white' }}>
                <View style={{ height: 250, alignItems: 'center', justifyContent: 'center' }}>
                    <Image source={require('../../assets/images/welcome.png')} style={{ width: '100%', height: '100%', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0 }} resizeMode='cover' />
                    <View style={{ backgroundColor: 'white', paddingHorizontal: Spacing * 2, paddingVertical: Spacing }}>
                        <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.large }}>Welcome to ProlanisCare</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', position: 'absolute', left: 0, bottom: 0, right: 0, padding: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-regular'], color: 'black', fontSize: FontSize.large }}>Hi...</Text>
                    <Text style={{ fontFamily: Font['poppins-regular'], color: 'black', fontSize: FontSize.large }}>Perkenalkan ProlanisCare.App yang akan membantu anda dalam mengetahui dan menerapkan pola hidup sehat ala vegetarian yang dapat membantu menurunkan risiko penyakit DM tipe 2.</Text>
                    <Image source={require('../../assets/images/welcome_doctor.png')} resizeMode='contain' style={{ height: 200, width: 300, alignSelf: 'center' }} />
                    <TouchableOpacity onPress={handleContinue} style={{ backgroundColor: '#DBB62B', margin: Spacing * 2, padding: Spacing, alignItems: 'center', marginTop: Spacing * 2, borderRadius: Spacing, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>Next</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
    return (
        <NavigationContainer theme={CustomDefaultTheme}>
            <BottomSheetModalProvider>
                {user.id !== "" ? (
                    user.role === DataRole.USER ? <UserStack /> : <DokterStack />
                ) : <AuthStack />}
            </BottomSheetModalProvider>
        </NavigationContainer>
    )
}
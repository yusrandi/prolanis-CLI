import { View, Text, TouchableOpacity, StatusBar, ImageSourcePropType, Image, FlatList, useWindowDimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigator/RootNavigator';
import Icon from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { TabsStackScreenProps } from '../navigator/TabsNavigator';
import { useTheme } from '@react-navigation/native';
import FontSize from '../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../constants/Spacing';
import Font from '../constants/Font';
import ItemMenuTips from '../components/ItemMenuTips';
import { UserType, emptUser } from '../type/UserType';
import { jadwalNormalDatabaseRef, jadwalObesitasDatabaseRef, resepNormalDatabaseRef, resepObesitasDatabaseRef, tolakUkursDatabaseRef, usersDatabaseRef, resepDatabaseRef, jadwalDatabaseRef, nutrisiDatabaseRef, tipsDatabaseRef } from '../config/firebase';
import { DataResepNormal } from '../data/DataResepNormal';
import { ResepType } from '../type/ResepType';
import { DataResepObesitas } from '../data/DataResepObesitas';
import { DataTolakUkurs } from '../data/DataTolakUkur';
import { TolakUkurType } from '../type/TolakUkurType';
import { dataJadwalsNormal } from '../data/DataJadwalsNormal';
import { dataJadwalsObesitas } from '../data/DataJadwalsObesitas';
import { listNutrisi } from '../data/DataNutrisi';
import { AsupanType } from '../type/AsupanType';


type VideoMenu = {
    id: number,
    video: string
}
export type MenuTipsHome = {
    id: number
    title: string
    image: ImageSourcePropType
    videos: VideoMenu[]
}

const list = [
    {
        id: 1,
        title: 'Makanan',
        image: require('../../assets/images/makanan.jpeg'),
        videos: [
            { id: 1, video: "bcTgN-xNSvo" },
            { id: 2, video: "PGWA0URvC_I" },
            { id: 3, video: "VJP7pQoi8wY" },
            { id: 4, video: "vOTGlMsVtr4" },
            { id: 5, video: "N5C78k_mMCs" },
            { id: 6, video: "i0-38e1NQI0" },
            { id: 7, video: "qfP3CY8sBDk" },
            { id: 8, video: "qLIMeMOcyNo" },
            { id: 9, video: "Cx1EeqKQlVw" }
        ]
    },
    {
        id: 2,
        title: 'Olahraga',
        image: require('../../assets/images/olahraga.jpg'),
        videos: [
            { id: 1, video: "MNEXe-PwxGg" },
            { id: 2, video: "vdG2CFKqKw8" },
            { id: 3, video: "h5pNmjDAAg8" },
            { id: 4, video: "aGBDpzK6oBI" },
            { id: 5, video: "G0IaSkG66eA" },
            { id: 6, video: "CLH87p-uCeE" },
            { id: 7, video: "CiQKXGh5UHc" },
            { id: 8, video: "myvnvO16K-A" },
            { id: 9, video: "fXzl8Fymcg8" },
            { id: 10, video: "KPUtjtkvr0g" }
        ]

    }
]


export default function HomeScreen({ navigation }: TabsStackScreenProps<"home">) {
    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";

    const { colors } = useTheme()

    const [user, setUser] = useState<UserType>(emptUser)
    const { width } = useWindowDimensions()


    useEffect(() => {
        getUser()
        // creteReseps()
        // createTolakUkurs()
        // createJadwals()
        // createNutrisi()
        // createTips()
    }, [])

    async function creteReseps() {
        DataResepNormal.map(async (resep: ResepType, index: number) => {
            await resepDatabaseRef.child(resepNormalDatabaseRef).child(resep.uid).set(resep)
                .then(() => console.log(`resepnormal index ${index} created`))
                .catch((error) => console.log(`resepnormal index ${index} error ${error}`))
        })
        DataResepObesitas.map(async (resep: ResepType, index: number) => {
            await resepDatabaseRef.child(resepObesitasDatabaseRef).child(resep.uid).set(resep)
                .then(() => console.log(`resepobesitas index ${index} created`))
                .catch((error) => console.log(`resepobesitas index ${index} error ${error}`))
        })

    }
    async function createTolakUkurs() {
        DataTolakUkurs.map(async (tolak: TolakUkurType, index: number) => {
            await tolakUkursDatabaseRef.child(tolak.id).set(tolak)
                .then(() => console.log(`tolakukur index ${index} created`))
                .catch((error) => console.log(`tolakukur index ${index} error ${error}`))
        })
    }
    async function createJadwals() {
        dataJadwalsNormal.map(async (jadwal, index: number) => {
            await jadwalDatabaseRef.child(jadwalNormalDatabaseRef).child(jadwal.title).set(jadwal)
                .then(() => console.log(`jadwalnormal index ${index} created`))
                .catch((error) => console.log(`jadwalnormal index ${index} error ${error}`))
        })
        dataJadwalsObesitas.map(async (jadwal, index: number) => {
            await jadwalDatabaseRef.child(jadwalObesitasDatabaseRef).child(jadwal.title).set(jadwal)
                .then(() => console.log(`jadwalobesitas index ${index} created`))
                .catch((error) => console.log(`jadwalobesitas index ${index} error ${error}`))
        })
    }
    async function createNutrisi() {
        listNutrisi.map(async (nutrisi: AsupanType, index: number) => {
            await nutrisiDatabaseRef.child(nutrisi.title).set(nutrisi)
                .then(() => console.log(`nutrsi index ${index} created`))
                .catch((error) => console.log(`nutrisi index ${index} error ${error}`))
        })
    }

    async function createTips() {
        list.map((item) => {
            item.videos.map((video, index) => {
                tipsDatabaseRef.child(item.title).child(video.video).set(video)
                    .then(() => console.log(`tips index ${index} created`))
                    .catch((error) => console.log(`tips index ${index} error ${error}`))
            })
        })
    }




    async function getUser() {
        usersDatabaseRef
            .child(auth().currentUser?.uid!)
            .on('value', snapshot => {
                // console.log('User data: ', snapshot.val());
                setUser(snapshot.val() as UserType)

            });
    }

    function Header() {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2, paddingHorizontal: Spacing * 2 }}>
                {/* <Image source={{ uri: AVATAR_URL, }} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" /> */}
                <FontAwesome name='user-circle-o' size={42} />
                <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text, }} numberOfLines={1}>
                        Hi, {user.nama} 👋
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        Prolanis Care App
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => auth().signOut()}
                    style={{
                        width: 40,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.primary,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icon name="logout" size={24} color={colors.text} style={{ position: 'relative' }} />
                        {/* <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 16,
                                height: 16,
                                borderRadius: 15 / 2,
                                right: 0,
                                top: +10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: FontSize.medium,
                                }}>
                                *
                            </Text>
                        </View> */}
                    </View>

                </TouchableOpacity>
                {/* <Image source={require('../assets/images/pola.png')} resizeMode='center' style={{ width: 50, height: 50 }} /> */}
            </View>
        )
    }
    function SearchBar() {
        return (
            <View style={{ flexDirection: "row", marginBottom: Spacing * 2, paddingHorizontal: Spacing * 2 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                        alignItems: "center",
                        paddingHorizontal: 24,
                        flexDirection: "row",

                    }}
                >
                    <Icon
                        name="search1"
                        size={24}
                        color={colors.text}
                        style={{ opacity: 0.5 }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: colors.text,
                            opacity: 0.5,
                            marginLeft: Spacing * 2
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        backgroundColor: colors.primary,
                        marginLeft: Spacing * 2
                    }}
                >
                    <Icon name="API" size={24} color={colors.background} />
                </TouchableOpacity>
            </View>
        )
    }



    return (
        <SafeAreaView style={{ flex: 1 }}>
            <StatusBar
                translucent
                backgroundColor="transparent"
                barStyle='dark-content'
            />
            <Header />
            {/* <SearchBar /> */}
            <Image source={require('../../assets/images/pola.png')} style={{ alignItems: 'center', alignSelf: 'center', marginBottom: Spacing * 2 }} />
            <Text style={{ textAlign: 'left', fontSize: FontSize.medium, fontFamily: Font['poppins-bold'], paddingHorizontal: Spacing * 2, marginBottom: Spacing, color: 'black' }}>Featured services</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%', paddingHorizontal: Spacing * 2 }}>
                <TouchableOpacity
                    onPress={() => navigation.navigate('bmi', { status: user.status })}
                    style={{}}
                >
                    <View style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', padding: Spacing * 2, borderRadius: Spacing * 2 }}>
                        <Icon name="calendar" size={36} color={colors.primary} />
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'center', marginTop: Spacing, color: 'black' }}>Jadwal</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('konsultasiChoice')}
                    style={{}}>
                    <View style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', padding: Spacing * 2, borderRadius: Spacing * 2 }}>
                        <Icon name="customerservice" size={36} color={colors.primary} />
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'center', marginTop: Spacing, color: 'black' }}>Konsultasi</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('resep', { status: user.status })}
                    style={{}}>
                    <View style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', padding: Spacing * 2, borderRadius: Spacing * 2 }}>
                        <Icon name="book" size={36} color={colors.primary} />
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'center', marginTop: Spacing, color: 'black' }}>Resep</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('asupan', { user })}
                    style={{}}>
                    <View style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', padding: Spacing * 2, borderRadius: Spacing * 2 }}>
                        <Icon name="medicinebox" size={36} color={colors.primary} />
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'center', marginTop: Spacing, color: 'black' }}>Nutrisi</Text>
                </TouchableOpacity>

            </View>

            <View style={{ height: Spacing * 2 }} />
            <Text style={{ textAlign: 'left', fontSize: FontSize.medium, fontFamily: Font['poppins-bold'], paddingHorizontal: Spacing * 2, marginBottom: Spacing, color: 'black' }}>Tips & Triks</Text>

            <FlatList
                keyExtractor={item => item.id.toString()}
                data={list}
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
                bounces={false}
                contentContainerStyle={{
                    paddingHorizontal: Spacing * 2

                }}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate("tipsVideo", {
                            menuTips: item
                        })}
                        style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', height: 200, borderRadius: Spacing * 2, marginRight: Spacing * 2 }}>
                        <Image source={item.image} resizeMode='cover' style={{ height: 160, width: width / 1.5, borderRadius: Spacing * 2 }} />
                        <Text style={{ padding: Spacing, fontFamily: Font['poppins-bold'] }}>{item.title}</Text>
                    </TouchableOpacity>
                )}

            />
        </SafeAreaView>
    )
}
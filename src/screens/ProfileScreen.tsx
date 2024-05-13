import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { UserType, emptUser } from '../type/UserType';
import auth from '@react-native-firebase/auth'
import { usersDatabaseRef } from '../config/firebase';
import FontSize from '../constants/FontSize';



export default function ProfileScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "profile">) {
    const AVATAR_URL = "https://images.unsplash.com/photo-1496345875659-11f7dd282d1d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2340&q=80";
    const { colors } = useTheme();
    const [user, setUser] = useState<UserType>(emptUser)


    useEffect(() => {
        getUser()

    }, [])

    async function getUser() {
        usersDatabaseRef
            .child(auth().currentUser?.uid!)
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                setUser(snapshot.val() as UserType)

            });
    }

    function Header() {
        return (
            <View style={{ paddingHorizontal: 24, flexDirection: "column", alignItems: "center", marginBottom: Spacing * 2 }}>
                {/* <Image source={require('../../assets/images/female_doctor.jpg')} style={{ width: 152, height: 152, aspectRatio: 1, borderRadius: 152 }} resizeMode="cover" /> */}
                <FontAwesome name='user-circle-o' size={112} />
                <View >
                    <Text style={{ fontSize: 18, fontWeight: "600", marginBottom: 8, color: colors.text, }} numberOfLines={1}>
                        Hi, {user.nama} 👋
                    </Text>
                </View>
            </View>
        )
    }



    return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing }}>
            <View style={{ flexDirection: 'row', position: 'absolute', top: Spacing * 4, left: Spacing * 2, padding: Spacing, alignItems: 'center' }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing }}>
                    <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                </TouchableOpacity>
                <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, color: 'black' }}>{"Profile"}</Text>
                </View>
            </View>

            <Header />
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('editProfile', { user })
                }}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', padding: Spacing, borderRadius: Spacing * 2, marginBottom: Spacing }}>

                <AntDesign name='user' size={20} color={colors.text} style={{ opacity: 0.5, marginRight: Spacing }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Edit Profile
                    </Text>
                    <Text
                        style={{ color: colors.text, opacity: 0.75 }}
                        numberOfLines={3}
                    >
                        nama, email, alamat, nomor handphone
                    </Text>
                </View>
                <AntDesign name='right' size={16} color={colors.text} style={{ opacity: 0.5, marginRight: Spacing }} />

            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => {
                    navigation.navigate('editPassword', { user })
                }}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', padding: Spacing, borderRadius: Spacing * 2, marginBottom: Spacing }}>

                <AntDesign name='key' size={20} color={colors.text} style={{ opacity: 0.5, marginRight: Spacing }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Edit Password
                    </Text>
                    <Text
                        style={{ color: colors.text, opacity: 0.75 }}
                        numberOfLines={3}
                    >
                        reset atau ganti password anda
                    </Text>
                </View>
                <AntDesign name='right' size={16} color={colors.text} style={{ opacity: 0.5, marginRight: Spacing }} />

            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => auth().signOut()}
                style={{ backgroundColor: 'white', width: '100%', flexDirection: 'row', alignItems: 'center', paddingHorizontal: Spacing, paddingVertical: Spacing * 2, borderRadius: Spacing * 2, marginBottom: Spacing }}>

                <AntDesign name='logout' size={18} color={colors.text} style={{ opacity: 0.5, marginRight: Spacing }} />
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: "600",
                            color: colors.text,
                        }}
                    >
                        Log Out
                    </Text>

                </View>

            </TouchableOpacity>


        </View>
    )
}
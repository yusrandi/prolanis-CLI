import { View, Text, Image, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { RootStackParamList } from '../navigator/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import AppTextInput from '../components/AppTextInput'
import { AuthUserContext } from '../context/AuthContext'
import { UserType, emptUser } from '../type/UserType'
import { DataRole } from '../data/DataRole'

export default function RegisterScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "register">) {
    const { register, isLoading } = useContext(AuthUserContext)
    const [user, setUser] = useState<UserType>(emptUser)
    const [password, setPassword] = useState<string>("")
    async function handleRegister() {
        console.log({ user });
        register(user, password, DataRole.USER)
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../assets/images/back.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: '90%', padding: Spacing * 2 }}
            >
                <View style={{ backgroundColor: 'white', flex: 1, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', padding: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>Prolanis Care</Text>
                    <ScrollView style={{ width: '100%', flex: 1 }} showsVerticalScrollIndicator={false} >
                        <AppTextInput placeholder='Nama' value={user.nama} onChangeText={text => setUser({ ...user, nama: text })} />
                        <AppTextInput placeholder='Usia' value={user.usia} onChangeText={text => setUser({ ...user, usia: text })} />
                        <AppTextInput placeholder='Jenis Kelamin' value={user.jk} onChangeText={text => setUser({ ...user, jk: text })} />
                        <AppTextInput placeholder='Pekerjaan' value={user.pekerjaan} onChangeText={text => setUser({ ...user, pekerjaan: text })} />
                        <AppTextInput placeholder='Berat Badan' value={user.berat} onChangeText={text => setUser({ ...user, berat: text })} keyboardType='numeric' />
                        <AppTextInput placeholder='Tinggi Badan' value={user.tinggi} onChangeText={text => setUser({ ...user, tinggi: text })} keyboardType='number-pad' />
                        <AppTextInput placeholder='Penyakit Komplikasi akibat menderita DM tipe 2' value={user.penyakit} onChangeText={text => setUser({ ...user, penyakit: text })} />
                        <AppTextInput placeholder='No Telepon' value={user.telepon} onChangeText={text => setUser({ ...user, telepon: text })} />
                        <AppTextInput placeholder='Email' value={user.email} onChangeText={text => setUser({ ...user, email: text })} />
                        <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                    </ScrollView>
                    <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>Sign Up</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ width: '100%', padding: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontSize: FontSize.small }}>sudah punya akun ? Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
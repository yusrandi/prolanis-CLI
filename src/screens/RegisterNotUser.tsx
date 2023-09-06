import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native'
import React, { useContext, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import AppTextInput from '../components/AppTextInput'
import Font from '../constants/Font'
import { RootStackParamList } from '../navigator/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import { AuthUserContext } from '../context/AuthContext'
import { UserType, emptUser } from '../type/UserType'
import { DataRole } from '../data/DataRole'

export default function RegisterNotUserScreen({ navigation, route: { params: { role } } }: NativeStackScreenProps<RootStackParamList, "registerNotUser">) {
    const { register, isLoading } = useContext(AuthUserContext)
    const [user, setUser] = useState<UserType>(emptUser)
    const [password, setPassword] = useState<string>("")
    async function handleRegister() {
        console.log({ user });
        register(user, password, role)
    }
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../assets/images/back.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: '70%', padding: Spacing * 2 }}
            >
                <View style={{ backgroundColor: 'white', flex: 1, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', padding: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, marginTop: Spacing }}>Prolanis Care</Text>
                    <ScrollView style={{ width: '100%', flex: 1 }} showsVerticalScrollIndicator={false} >
                        <AppTextInput placeholder='Nama' value={user.nama} onChangeText={text => setUser({ ...user, nama: text })} />
                        <AppTextInput placeholder='No Telepon' value={user.telepon} onChangeText={text => setUser({ ...user, telepon: text })} />
                        <AppTextInput placeholder='Email' value={user.email} onChangeText={text => setUser({ ...user, email: text })} />
                        <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                    </ScrollView>
                    <TouchableOpacity onPress={handleRegister} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>{isLoading ? "..." : "Sign Up"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ width: '100%', padding: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontSize: FontSize.small }}>sudah punya akun ? Login</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </View>
    )
}
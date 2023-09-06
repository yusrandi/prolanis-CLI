import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../navigator/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Font from '../constants/Font'
import Spacing from '../constants/Spacing'
import FontSize from '../constants/FontSize'
import { DataRole } from '../data/DataRole'

export default function RegisterChoice({ navigation }: RootStackScreenProps<"registerChoice">) {
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ position: 'absolute', right: 16, left: 16, bottom: 16, top: 0 }}>
                <Image source={require('../../assets/images/pola.png')} style={{ flex: 1, alignSelf: 'center', height: 200, width: 300 }} resizeMode='contain' />
                <View style={{}}>
                    <TouchableOpacity onPress={() => navigation.navigate('register')} style={{ backgroundColor: 'white', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing * 2, elevation: 5 }}>
                        <Text style={{ color: '#DBB62B', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{"Daftar sebagai Pengguna"}</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: Spacing, flexDirection: 'row' }}>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, flex: 1, marginBottom: 10 }} />
                        <Text style={{ fontSize: FontSize.medium, fontFamily: Font['poppins-regular'], marginHorizontal: Spacing }}>atau</Text>
                        <View style={{ borderBottomColor: 'black', borderBottomWidth: 1, flex: 1, marginBottom: 10 }} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('registerNotUser', { role: DataRole.DOKTER })} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing * 2, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{"Daftar sebagai Dokter"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('registerNotUser', { role: DataRole.AHLI })} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing * 2, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{"Daftar sebagai Ahli Gizi"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate('login')} style={{ width: '100%', padding: Spacing, marginVertical: Spacing * 2 }}>
                        <Text style={{ fontSize: FontSize.medium, fontFamily: Font['poppins-regular'] }}>sudah punya akun ?
                            <Text style={{ fontWeight: 'bold' }}> Masuk </Text>
                        </Text>
                    </TouchableOpacity>

                </View>
            </SafeAreaView>
        </View>
    )
}
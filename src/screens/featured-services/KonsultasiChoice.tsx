import { View, Text, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Font from '../../constants/Font'
import FontSize from '../../constants/FontSize'
import { DataRole } from '../../data/DataRole'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function KonsultasiChoice({ navigation }: RootStackScreenProps<"konsultasiChoice">) {
    const { colors } = useTheme();

    const docterId = "2K4tiElmB9ZGWXMXbbzroI1y3tb2"
    const ahliId = "F18t0DDCrtUhvROXdbgJ9XHx7rw1"
    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../../assets/images/doctor.png')} style={{ flex: 1, alignSelf: 'center', height: '100%', width: '100%', position: 'absolute' }} resizeMode='cover' />
            <SafeAreaView style={{ position: 'absolute', right: 16, left: 16, bottom: 16 }}>
                {/* <Image source={require('../../../assets/images/doctor.png')} style={{ flex: 1, alignSelf: 'center', height: 200, width: 300 }} resizeMode='contain' /> */}
                <View style={{}}>
                    <TouchableOpacity onPress={() => navigation.navigate('konsultasi', { senderId: docterId, title: "Dokter" })} style={{ backgroundColor: 'white', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing * 2, elevation: 5 }}>
                        <Text style={{ color: '#DBB62B', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{"Konsultasi dengan Dokter"}</Text>
                    </TouchableOpacity>
                    <View style={{ marginVertical: Spacing, flexDirection: 'row' }}>
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, flex: 1, marginBottom: 10 }} />
                        <Text style={{ fontSize: FontSize.medium, fontFamily: Font['poppins-regular'], marginHorizontal: Spacing }}>atau</Text>
                        <View style={{ borderBottomColor: 'grey', borderBottomWidth: 1, flex: 1, marginBottom: 10 }} />
                    </View>
                    <TouchableOpacity onPress={() => navigation.navigate('konsultasi', { senderId: ahliId, title: "Ahli Gizi" })} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing, borderRadius: Spacing * 2, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{"Konsultasi dengan Ahli Gizi"}</Text>
                    </TouchableOpacity>
                    <View style={{ height: Spacing * Spacing }} />
                </View>
            </SafeAreaView>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', margin: Spacing * 2 }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                    <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                </TouchableOpacity>
                <View style={{ flex: 1 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2, fontFamily: Font['poppins-bold'], color: 'black' }}>Konsultasi</Text>
                </View>
            </View>
        </View>
    )
}
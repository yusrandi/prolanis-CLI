import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import FontSize from '../../constants/FontSize'
import Icons from 'react-native-vector-icons/AntDesign';
import { SafeAreaView } from 'react-native-safe-area-context'
import Font from '../../constants/Font'
import YoutubePlayer from "react-native-youtube-iframe";



export default function ResepDetail({ navigation, route: { params: { resep } } }: RootStackScreenProps<"resepDetail">) {
    const { colors } = useTheme()

    return (
        <ScrollView style={{ flex: 1 }}>
            <SafeAreaView style={{ paddingHorizontal: Spacing * 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2 }}>{resep.title}</Text>
                    </View>
                </View>
                <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing * 2 }}>Berikut video resep yang bisa anda contoh cara pembuatan makanannya</Text>
                <View style={{ marginTop: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-bold'] }}>Bahan-bahan:</Text>
                    <Text style={{ fontFamily: Font['poppins-regular'] }}>{resep?.bahan}</Text>
                </View>
                <View style={{ marginTop: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-bold'] }}>Cara Pengolahan</Text>
                    <YoutubePlayer
                        height={220}
                        // play={playing}
                        videoId={resep?.cara}
                    // onChangeState={onStateChange}
                    />
                </View>
                <View style={{ marginTop: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-bold'] }}>Note:</Text>
                    <Text style={{ fontFamily: Font['poppins-regular'] }}>Apabila makanan telah di olah atau dimasak anda hanya bisa mengkonsumsi makanan tersebut sekian gram satu kali makan sesuai dengan yang tercantum pada Jadwal dan Menu Makanan</Text>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}
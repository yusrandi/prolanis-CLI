import { View, Text, ScrollView, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { jawabanTolakUkurs } from '../../data/DataJawabans';
import Spacing from '../../constants/Spacing';
import Font from '../../constants/Font';
import { Image } from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import { useTheme } from '@react-navigation/native';
import Icons from "react-native-vector-icons/AntDesign";

interface props {
    jawabans: string[]
}
export default function TolakUkurResult({ jawabans }: props) {
    const [result, setResult] = useState<string>("sama")
    const { colors } = useTheme()

    useEffect(() => {
        console.log({ jawabans });
        jawabans.map((item, index) => {
            // console.log(`item ${item} index ${index}`);
            if (item === jawabanTolakUkurs[index]) {
                console.log("sama");
            } else {
                setResult("tidak")
                console.log("Tidak");

            }

        })
    }, [])
    function MessageBerhasil() {
        return (
            <View style={{ width: '100%' }}>
                <Image source={require('../../../assets/images/female_doctor.jpg')} style={{ height: 150, width: '100%' }} resizeMode='center' />
                <Text style={{ textAlign: 'center', fontFamily: Font['poppins-regular'] }}>
                    Selamat anda berhasil menerapkan Pola hidup sehat ala diet vegetarian yang dapat menurunkan kadar gula darah anda, serta hal positif lainnya yang dapat anda rasakan
                </Text>
                <TouchableOpacity
                    onPress={() => {

                        try {

                            // or play from url
                            SoundPlayer.playUrl("https://firebasestorage.googleapis.com/v0/b/prolaniscare-74544.appspot.com/o/Berhasil.mp3?alt=media&token=a8ad2fdd-8e65-4b88-a297-39dd7e765931")


                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }}

                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: colors.primary,
                        borderRadius: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        flexDirection: "row",
                        alignSelf: 'flex-end',
                        marginTop: Spacing * 2
                    }}
                >
                    <Icons name="play" size={32} color={'white'} />
                </TouchableOpacity>
            </View>
        )
    }
    function MessageGagal() {
        return (
            <View style={{ width: '100%' }}>
                <Image source={require('../../../assets/images/male_doctor.jpg')} style={{ height: 150, width: '100%' }} resizeMode='center' />
                <Text style={{ textAlign: 'justify', fontFamily: Font['poppins-regular'] }}>
                    Mohon maaf anda belum berhasil dalam menerapkan pola hidup sehat ala diet vegetarian, coba untuk lebih tekun dan sabar dalam menjalankan diet vegetarian. Ikuti jadwal dan menu makanan yang baik dikonsumsi dan selalu konsultasi dengan dokter dan ahli gizi terkait penyakit DM tipe 2 yang anda derita, serta perhatikan asupan nutrisi yang baik untuk anda, dan juga cari tahu informasi terkait diet vegetarian dan apa pengaruhnya bagi penderita DM tipe 2 sehingga anda termotivasi untuk menjalankan diet vegetarian dan jangan lupa untuk selalu melakukan aktivitas fisik(Olahraga).
                </Text>
                <Text style={{ textAlign: 'center', fontFamily: Font['poppins-semiBold'] }}>
                    Itu semua mudah dilakukan dengan bantuan aplikasi ProlanisCare.App
                </Text>
                <TouchableOpacity
                    onPress={() => {

                        try {
                            // or play from url
                            SoundPlayer.playUrl("https://firebasestorage.googleapis.com/v0/b/prolaniscare-74544.appspot.com/o/Belum%20berhasil.mp3?alt=media&token=0f2a8d7a-a1ef-4538-aa64-6984518dd239")

                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }}

                    style={{
                        width: 50,
                        height: 50,
                        backgroundColor: colors.primary,
                        borderRadius: 60,
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        flexDirection: "row",
                        alignSelf: 'flex-end',
                        marginTop: Spacing * 2
                    }}
                >
                    <Icons name="play" size={32} color={'white'} />
                </TouchableOpacity>
            </View>
        )
    }
    return (
        <View style={{ alignItems: 'center', justifyContent: 'center', paddingHorizontal: Spacing * 2 }}>
            {result === "sama" ? <MessageBerhasil /> : <MessageGagal />}
        </View>
    )
}
import { View, Text, TouchableOpacity, ScrollView, StatusBar } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import { Image } from 'react-native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { useTheme } from '@react-navigation/native'
import Icons from "react-native-vector-icons/AntDesign";
import FontSize from '../../constants/FontSize'
import Spacing from '../../constants/Spacing'
import Font from '../../constants/Font'
import { BlurView } from "@react-native-community/blur";
import SoundPlayer from 'react-native-sound-player'




export default function PenjelasanDetailScreen({ navigation, route: { params: { penjelasan } } }: RootStackScreenProps<"penjelasanDetail">) {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets();


    return (
        <View style={{ flex: 1 }}>
            <Image blurRadius={10} source={require('../../../assets/images/back_a.png')} resizeMode='repeat' style={{ flex: 1 }} />
            <StatusBar barStyle={'light-content'} />

            <SafeAreaView
                edges={["top", "bottom"]}
                style={{ position: "absolute", top: 0, left: Spacing, right: Spacing, bottom: 0 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, color: 'black' }}>{penjelasan.title}</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false} style={{ backgroundColor: 'white', borderRadius: Spacing * 2, margin: Spacing, paddingHorizontal: Spacing * 2, height: '100%', marginTop: Spacing * 2 }}>
                    <View style={{}}>
                        <View style={{ height: Spacing }} />
                        <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{penjelasan.title}</Text>
                        <Image source={penjelasan.image} style={{ height: 200, width: '100%' }} resizeMode='contain' />
                        <Text style={{ fontFamily: Font['poppins-regular'], textAlign: 'justify' }}>{penjelasan.detail}</Text>
                    </View>
                </ScrollView>
            </SafeAreaView>


            <View style={{
                flexDirection: 'row', alignItems: "center",
                justifyContent: "center",
                position: "absolute",
                bottom: Spacing,
                right: Spacing
            }}>
                <TouchableOpacity
                    onPress={() => {
                        try {
                            // or play from url
                            SoundPlayer.playUrl(penjelasan.sound)
                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }}

                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: 'white',
                        borderWidth: 5,
                        borderRadius: 30
                    }}
                >
                    <Icons name="play" size={30} color={colors.primary} />
                </TouchableOpacity>
                <View style={{ width: Spacing }} />
                <TouchableOpacity
                    onPress={() => {
                        try {
                            // or play from url
                            SoundPlayer.stop()
                        } catch (e) {
                            console.log(`cannot play the sound file`, e)
                        }
                    }}

                    style={{
                        alignItems: "center",
                        justifyContent: "center",
                        borderColor: 'white',
                        borderWidth: 5,
                        borderRadius: 30
                    }}
                >
                    <Icons name="pausecircle" size={30} color={colors.primary} />
                </TouchableOpacity>
            </View>

            {/* <TouchableOpacity
                onPress={() => {

                    try {

                        // or play from url
                        SoundPlayer.playUrl(penjelasan.sound)

                    } catch (e) {
                        console.log(`cannot play the sound file`, e)
                    }
                }}

                style={{
                    width: 80,
                    height: 80,
                    backgroundColor: colors.primary,
                    borderRadius: 60,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "absolute",
                    bottom: Spacing,
                    right: Spacing
                }}
            >
                <Icons name="play" size={32} color={'white'} />
            </TouchableOpacity> */}
        </View>
    )
}
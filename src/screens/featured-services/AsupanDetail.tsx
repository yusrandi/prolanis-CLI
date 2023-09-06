import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native'
import React from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'
import AntDesign from 'react-native-vector-icons/AntDesign';
import SoundPlayer from 'react-native-sound-player'

export default function AsupanDetail({ navigation, route: { params: { asupan } } }: RootStackScreenProps<"asupanDetail">) {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1 }}>
            <Image source={asupan.image} style={{ position: 'absolute', height: '100%', width: '100%', opacity: 0.3 }} resizeMode='cover' />
            <SafeAreaView style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing * 2 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2, fontFamily: Font['poppins-bold'], color: 'black' }}>{asupan.title}</Text>
                    </View>
                </View>

                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={{}}>
                        <ItemAsupanDetail title='Definisi' desc={asupan.definisi} sound={asupan.definisiSound} />
                        <View style={{ height: Spacing * 2 }} />
                        <ItemAsupanDetail title='Kebutuhan' desc={asupan.kebutuhan} sound={asupan.kebutuhanSound} />
                        <View style={{ height: Spacing * 2 }} />
                        <ItemAsupanDetail title='Dianjurkan' desc={asupan.dianjurkan} sound={asupan.dianjurkanSound} />
                        <View style={{ height: Spacing * 2 }} />
                        <ItemAsupanDetail title='Dibatasi' desc={asupan.dibatasi} sound={asupan.dibatasiSound} />
                        <View style={{ height: Spacing * 2 }} />
                        <ItemAsupanDetail title='Dihindari' desc={asupan.dihindari} sound={asupan.dihindariSound} />
                        <View style={{ height: Spacing * 2 }} />
                    </View>
                </ScrollView>

            </SafeAreaView>
        </View>
    )

}

interface props {
    title: string,
    desc: string
    sound: string
}
function ItemAsupanDetail({ title, desc, sound }: props) {
    const { colors } = useTheme()
    return (
        <View>
            <View style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: Spacing, alignItems: 'center' }}>
                    <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.medium, color: 'black' }}>{title}</Text>
                    <TouchableOpacity
                        onPress={() => {

                            try {

                                // or play from url
                                SoundPlayer.playUrl(sound)

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
                        <AntDesign name="play" size={30} color={colors.primary} />
                    </TouchableOpacity>
                </View>
                <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small, color: 'black' }}>{desc}</Text>
            </View>
        </View>
    )
}
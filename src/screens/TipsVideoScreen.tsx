import { View, Text, Alert, TouchableOpacity, FlatList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { RootStackScreenProps } from '../navigator/RootNavigator'
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icons from "react-native-vector-icons/AntDesign";
import YoutubePlayer from "react-native-youtube-iframe";
import FontSize from '../constants/FontSize';

export default function TipsVideoScreen({ navigation, route: {
    params: { menuTips },
}, }: RootStackScreenProps<"tipsVideo">) {

    const { colors } = useTheme()
    const [playing, setPlaying] = useState(false);
    const onStateChange = useCallback((state: any) => {
        if (state === "ended") {
            setPlaying(false);
            Alert.alert("video has finished playing!");
        }
    }, []);

    useEffect(() => {
        console.log({ menuTips });

    }, [])

    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
            <SafeAreaView
                edges={["top"]}
                style={{}}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2 }}>Video Tips {menuTips.title}</Text>
                    </View>
                </View>
                <View style={{ marginVertical: Spacing }}>

                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={menuTips.videos}
                        contentContainerStyle={{
                            paddingVertical: Spacing * 2,
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item, index }) => (
                            <YoutubePlayer
                                key={item.id}
                                height={220}
                                play={playing}
                                videoId={item.video}
                                onChangeState={onStateChange}
                            />
                        )}

                    />


                </View>
            </SafeAreaView>
        </View>
    )
}
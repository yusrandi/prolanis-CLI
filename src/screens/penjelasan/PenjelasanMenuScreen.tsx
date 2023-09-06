import { View, Text, Image, TouchableOpacity, StatusBar } from 'react-native'
import React from 'react'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context'
import { RootStackParamList, RootStackScreenProps } from '../../navigator/RootNavigator'
import { useTheme } from '@react-navigation/native'
import Icons from "react-native-vector-icons/AntDesign";
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import { CustomDefaultTheme } from '../../themes/AppThemes'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { dataPenjelasans } from '../../data/DataPenjelasan'
import { PenjelasanType } from '../../type/PenjelasanType'
import Font from '../../constants/Font'
import { BlurView } from "@react-native-community/blur";

interface propsMenu {
    penjelasan: PenjelasanType
    navigation: NativeStackNavigationProp<RootStackParamList, "penjelasanMenu">
}
function MenuPenjelasan({ penjelasan, navigation }: propsMenu) {
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('penjelasanDetail', { penjelasan: penjelasan })}
            style={{
                backgroundColor: CustomDefaultTheme.colors.primary,
                borderRadius: 64,
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
                flexDirection: "row",
                paddingHorizontal: 12,
                paddingVertical: Spacing,
                marginBottom: Spacing
            }}
        >
            <Text
                style={{
                    flex: 1,
                    textAlign: 'center',
                    fontSize: FontSize.small,
                    fontWeight: "600",
                    color: 'white',
                    paddingHorizontal: 16,
                }}
            >
                {penjelasan.title}
            </Text>

            <View
                style={{
                    backgroundColor: CustomDefaultTheme.colors.card,
                    width: 20,
                    aspectRatio: 1,
                    borderRadius: 40,
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Icons name="arrowright" size={12} color={CustomDefaultTheme.colors.text} />
            </View>
        </TouchableOpacity>

    )
}
export default function PenjelasanMenuScreen({ navigation }: RootStackScreenProps<"penjelasanMenu">) {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets();

    return (
        <View style={{ flex: 1 }}>
            <Image blurRadius={2} source={require('../../../assets/images/back_a.png')} resizeMode='cover' style={{ flex: 1 }} />
            <StatusBar barStyle={'light-content'} />
            {/* <BlurView
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0
                }}
                blurType="dark"
                blurAmount={1}
                reducedTransparencyFallbackColor="black"
            /> */}
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginLeft: Spacing * 2 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                        <Text style={{ fontSize: FontSize.medium, color: 'black', fontFamily: Font['poppins-bold'] }}>Penjelasan</Text>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.small, color: 'black' }}>Pola Hidup Sehat Vegetarian</Text>
                    </View>
                </View>

                <View style={{ flex: 1 }}>
                    <View style={{ flex: 1 }} />
                    <View style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: Spacing * Spacing, paddingHorizontal: Spacing * 2, margin: Spacing * 2, borderRadius: Spacing * 2 }}>
                        <View>
                            <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text, alignSelf: 'center' }}>
                                Pola Hidup Sehat Vegetarian
                            </Text>
                            <Text style={{ fontSize: FontSize.small, fontWeight: "600", color: colors.text, alignSelf: 'center', marginBottom: Spacing * 2 }}>
                                Diet Vegetarian
                            </Text>
                        </View>

                        <View style={{ width: "100%" }}>

                            <View style={{ flexDirection: "column", alignItems: "center", width: "100%" }}>


                                {
                                    dataPenjelasans.map((item) => (
                                        <MenuPenjelasan key={item.id} navigation={navigation} penjelasan={item} />
                                    ))
                                }

                            </View>
                        </View>
                    </View>
                    <View style={{ flex: 1 }} />
                </View>

            </SafeAreaView>


            {/* <BottomSheet
                detached
                snapPoints={[500, 500]}
                index={0}
                style={{ marginHorizontal: 20 }}
                bottomInset={insets.bottom + 20}
                backgroundStyle={{
                    borderRadius: 24,
                    backgroundColor: colors.background,
                }}
                handleIndicatorStyle={{
                    backgroundColor: colors.primary,
                }}
            >

            </BottomSheet> */}
        </View>
    )
}
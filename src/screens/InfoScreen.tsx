import { View, Text, TouchableOpacity, Image, StatusBar } from 'react-native'
import React from 'react'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import BottomSheet from "@gorhom/bottom-sheet";
import Icons from 'react-native-vector-icons/AntDesign'
import { TabsStackScreenProps } from '../navigator/TabsNavigator';
import Spacing from '../constants/Spacing';
import { BlurView } from '@react-native-community/blur';

export default function InfoScreen({ navigation }: TabsStackScreenProps<"info">) {

    const { colors } = useTheme()
    const insets = useSafeAreaInsets();


    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../assets/images/back_a.png')} resizeMode='repeat' style={{ flex: 1 }} />
            <BlurView
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
            />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: 0, right: 0 }}
            >
            </SafeAreaView>
            <BottomSheet
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
                <View style={{ padding: 16, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text, alignSelf: 'center' }}>
                        {"Informasi"}
                    </Text>


                    <View style={{ flexDirection: "column", alignItems: "center", marginTop: Spacing * 2 }}>

                        <TouchableOpacity
                            onPress={() => navigation.navigate('penjelasanMenu')}
                            style={{
                                backgroundColor: colors.primary,
                                height: 64,
                                borderRadius: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexDirection: "row",
                                padding: 12,
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                    paddingHorizontal: 16,
                                }}
                            >
                                Penjelasan
                            </Text>

                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    width: 40,
                                    aspectRatio: 1,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",

                                }}
                            >
                                <Icons name="arrowright" size={24} color={colors.text} />
                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('tolakUkur')}
                            style={{
                                backgroundColor: colors.primary,
                                height: 64,
                                borderRadius: 64,
                                alignItems: "center",
                                justifyContent: "center",
                                position: "relative",
                                flexDirection: "row",
                                padding: 12,
                                marginTop: Spacing * 2
                            }}
                        >
                            <Text
                                style={{
                                    textAlign: 'center',
                                    flex: 1,
                                    fontSize: 16,
                                    fontWeight: "600",
                                    color: colors.background,
                                    paddingHorizontal: 16,
                                }}
                            >
                                Tingkat Keberhasilan Program
                            </Text>

                            <View
                                style={{
                                    backgroundColor: colors.card,
                                    width: 40,
                                    aspectRatio: 1,
                                    borderRadius: 40,
                                    alignItems: "center",
                                    justifyContent: "center",
                                }}
                            >
                                <Icons name="arrowright" size={24} color={colors.text} />
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
            </BottomSheet>
        </View>
    )
}

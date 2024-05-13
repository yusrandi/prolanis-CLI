import { View, Text, TouchableOpacity, Image, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native';
import FontSize from '../../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigator/RootNavigator';
import MasonryList from "reanimated-masonry-list";
import { ResepType } from '../../type/ResepType';
import { DataResepNormal } from '../../data/DataResepNormal';
import { DataResepObesitas } from '../../data/DataResepObesitas';
import Icons from 'react-native-vector-icons/AntDesign';
import { resepDatabaseRef, resepNormalDatabaseRef, resepObesitasDatabaseRef } from '../../config/firebase';

export default function ResepScreen({ navigation, route: { params: { status } } }: RootStackScreenProps<"resep">) {
    const { colors } = useTheme();
    const [reseps, setReseps] = useState<ResepType[]>([])
    const [loading, setLoading] = useState<boolean>(true)


    useEffect(() => {
        getReseps()
    }, [])

    async function getReseps() {
        resepDatabaseRef
            .child(status === "normal" ? resepNormalDatabaseRef : resepObesitasDatabaseRef)
            .once('value')
            .then(snapshot => {
                // console.log('Resep data: ', snapshot.val());
                setReseps([])
                if (snapshot.exists()) {
                    const dataFromFirebase: ResepType[] = Object.values(snapshot.val() || {});
                    setReseps(dataFromFirebase)
                }
            })

        setLoading(false)
    }

    function SearchBar() {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: Spacing }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                        alignItems: "center",
                        paddingHorizontal: 24,
                        flexDirection: "row",
                    }}
                >
                    <Icons
                        name="search1"
                        size={24}
                        color={colors.text}
                        style={{ opacity: 0.5 }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: colors.text,
                            opacity: 0.5,
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        backgroundColor: colors.primary,
                        marginLeft: Spacing * 2
                    }}
                >
                    <Icons name="search1" size={24} color={colors.background} />
                </TouchableOpacity>
            </View>
        )
    }


    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: Spacing * 2 }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{
                            fontWeight: 'bold',
                            fontSize: FontSize.medium,
                            marginLeft: Spacing * 2
                        }}>Resep Makanan</Text>
                    </View>
                </View>
                {/* <SearchBar /> */}

                <View style={{ flex: 1, marginTop: Spacing * 2 }}>
                    {
                        loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} />
                        </View> : <MasonryList
                            keyExtractor={item => item.id.toString()}
                            data={reseps}
                            numColumns={2}
                            contentContainerStyle={{ paddingHorizontal: Spacing }}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item, i }: any) => {
                                return (
                                    <TouchableOpacity style={{ padding: 6 }}
                                        onPress={() => navigation.navigate('resepDetail', { resep: item })}
                                    >
                                        <View
                                            style={{
                                                aspectRatio: i === 0 ? 1 : 2 / 3,
                                                position: "relative",
                                                overflow: "hidden",
                                                borderRadius: 24,
                                            }}
                                        >
                                            <Image
                                                source={{ uri: item.image }}
                                                resizeMode="cover"
                                                style={StyleSheet.absoluteFill}
                                            />
                                            <View
                                                style={[
                                                    StyleSheet.absoluteFill,
                                                    {
                                                        padding: Spacing,
                                                    },
                                                ]}
                                            >
                                                <View style={{ flexDirection: "row", padding: 4 }}>
                                                    <View style={{ flex: 1 }}></View>
                                                    <View
                                                        style={{
                                                            backgroundColor: colors.card,
                                                            borderRadius: 100,
                                                            height: 32,
                                                            aspectRatio: 1,
                                                            alignItems: "center",
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Icons
                                                            name="like1"
                                                            size={20}
                                                            color={colors.text}
                                                        />
                                                    </View>
                                                </View>
                                                <View style={{ flex: 1 }} />
                                                <View
                                                    style={{
                                                        flexDirection: "row",
                                                        backgroundColor: "rgba(0,0,0,0.5)",
                                                        alignItems: "center",
                                                        padding: 6,
                                                        borderRadius: 100,
                                                        overflow: "hidden",
                                                    }}

                                                >
                                                    <Text
                                                        style={{
                                                            flex: 1,
                                                            fontSize: FontSize.small,
                                                            fontWeight: "600",
                                                            color: "#fff",
                                                            marginLeft: 8,
                                                        }}
                                                        numberOfLines={1}
                                                    >
                                                        {item.title}
                                                    </Text>

                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                )
                            }}
                            onEndReachedThreshold={0.1}
                        />
                    }
                </View>
            </SafeAreaView>
        </View>
    )
}
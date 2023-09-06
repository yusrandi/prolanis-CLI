import { View, Text, StyleSheet, Image, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigator/RootNavigator';
import Spacing from '../../constants/Spacing';
import FontSize from '../../constants/FontSize';
import Icons from "react-native-vector-icons/AntDesign";
import BottomSheet from "@gorhom/bottom-sheet";
import Font from '../../constants/Font';
import { TolakUkurType } from '../../type/TolakUkurType';
import { DataTolakUkurs } from '../../data/DataTolakUkur';
import { jawabanTolakUkurs } from '../../data/DataJawabans';
import TolakUkurResult from './TolakUkurResult';
import { BlurView } from "@react-native-community/blur";
import { StatusBar } from 'react-native';
import { tolakUkursDatabaseRef } from '../../config/firebase';
import SoundPlayer from 'react-native-sound-player'




export default function TolakUkurScreen({ navigation }: RootStackScreenProps<"tolakUkur">) {
    const { colors } = useTheme()
    const insets = useSafeAreaInsets();
    const [index, setIndex] = useState<number>(0)
    const [tolakUkurs, setTolakUkurs] = useState<TolakUkurType[]>([])
    const [loading, setLoading] = useState<boolean>(false)
    const [jawabans, setJawabans] = useState<string[]>([])


    useEffect(() => {
        // addTolakUkur()
        getTolakUkurs()
    }, [])

    async function getTolakUkurs() {
        // const querySnapshot = await getDocs(query(collection(firestore, "tolak-ukurs"), orderBy("id")));
        // setTolakUkurs([])
        // querySnapshot.forEach((doc) => {
        //     // doc.data() is never undefined for query doc snapshots
        //     // console.log(doc.id, " => ", doc.data());
        //     const tolakUkur: TolakUkurType = doc.data() as TolakUkurType;

        //     setTolakUkurs((prevData) => [
        //         ...prevData,
        //         tolakUkur,
        //     ]);
        // });
        tolakUkursDatabaseRef
            .once('value')
            .then(snapshot => {
                console.log(snapshot.val());
                setTolakUkurs([])
                if (snapshot.exists()) {
                    const dataFromFirebase: TolakUkurType[] = Object.values(snapshot.val() || {});
                    dataFromFirebase.forEach((tolak: TolakUkurType) => {
                        if (tolak !== null) {
                            setTolakUkurs((prevData) => [
                                ...prevData,
                                tolak,
                            ]);
                        }
                    })
                    // setTolakUkurs(dataFromFirebase)
                }
            })
        setLoading(false)
    }

    return (
        <View style={styles.container}>
            <Image blurRadius={2} source={require('../../../assets/images/back_a.png')} resizeMode='cover' style={{ flex: 1 }} />
            <StatusBar barStyle={'light-content'} />

            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", top: 0, left: Spacing, right: 0 }}
            >
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, color: 'white', marginLeft: Spacing * 2 }}>Tingkat Keberhasilan Program</Text>
                    </View>
                </View>

            </SafeAreaView>
            <BottomSheet
                detached
                snapPoints={[700, 700]}
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
                    {/* <Text style={{ fontSize: 20, fontWeight: "600", color: colors.text, alignSelf: 'center' }}>
                        {index === 0 ? "Tolak Ukur" : ""}
                    </Text> */}

                    {
                        loading ? <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <ActivityIndicator size={'large'} />
                        </View> :
                            <View style={{ width: "100%" }}>
                                {
                                    index === tolakUkurs.length ? <TolakUkurResult jawabans={jawabans} /> :
                                        <View>
                                            <Text style={{ fontSize: FontSize.small, fontFamily: Font['poppins-regular'], color: colors.text, alignSelf: 'center', textAlign: 'center', margin: Spacing }}>
                                                {tolakUkurs[index]?.soal}
                                            </Text>

                                            <View style={{ flexDirection: "column", alignItems: "center", width: "100%" }}>

                                                {
                                                    tolakUkurs[index]?.jawabans!.map(jawaban => (
                                                        <TouchableOpacity
                                                            onPress={() => {
                                                                setJawabans([...jawabans, jawaban.title])
                                                                setIndex(index + 1)

                                                            }}
                                                            key={jawaban.id}
                                                            style={{
                                                                backgroundColor: colors.primary,
                                                                borderRadius: 64,
                                                                alignItems: "center",
                                                                justifyContent: "center",
                                                                position: "relative",
                                                                flexDirection: "row",
                                                                paddingHorizontal: 12,
                                                                paddingVertical: Spacing,
                                                                marginTop: Spacing
                                                            }}
                                                        >
                                                            <Text
                                                                style={{
                                                                    flex: 1,
                                                                    textAlign: 'center',
                                                                    fontSize: FontSize.small,
                                                                    fontWeight: "600",
                                                                    color: colors.background,
                                                                    paddingHorizontal: 16,
                                                                }}
                                                            >
                                                                {jawaban.title}
                                                            </Text>

                                                            <View
                                                                style={{
                                                                    backgroundColor: colors.card,
                                                                    width: 20,
                                                                    aspectRatio: 1,
                                                                    borderRadius: 40,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                }}
                                                            >
                                                                <Icons name="arrowright" size={12} color={colors.text} />
                                                            </View>
                                                        </TouchableOpacity>
                                                    ))
                                                }


                                            </View>

                                            <TouchableOpacity
                                                onPress={() => {

                                                    try {

                                                        // or play from url
                                                        SoundPlayer.playUrl(tolakUkurs[index]?.sound)


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
                                }

                            </View>
                    }


                </View>
            </BottomSheet>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})
import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import BmiResult from './BmiResult'
import BmiRumus from './BmiRumus'
import { useTheme } from '@react-navigation/native'
import Icons from 'react-native-vector-icons/AntDesign';
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import { SafeAreaView } from 'react-native-safe-area-context'
import AppTextInput from '../../components/AppTextInput'
import Font from '../../constants/Font'
import { JadwalNewType } from '../../type/JadwalNewType'
import { jadwalDatabaseRef, jadwalNormalDatabaseRef, jadwalObesitasDatabaseRef, usersDatabaseRef } from '../../config/firebase'
import auth from '@react-native-firebase/auth';

export default function BmiScreen({ navigation, route: { params: { status } } }: RootStackScreenProps<"bmi">) {
    const { colors } = useTheme();
    const [tinggi, setTinggi] = useState("")
    const [berat, setBerat] = useState("")
    const [loading, setLoading] = useState(true)
    const [jadwals, setJadwals] = useState<JadwalNewType[]>([])

    useEffect(() => {
        // addJadwals()
        getJadwals()

    }, [])

    async function getJadwals() {
        jadwalDatabaseRef
            .child(status === "normal" ? jadwalNormalDatabaseRef : jadwalObesitasDatabaseRef)
            .once('value')
            .then(snapshot => {
                // console.log('Resep data: ', snapshot.val());
                setJadwals([])
                if (snapshot.exists()) {
                    const dataFromFirebase: JadwalNewType[] = Object.values(snapshot.val() || {});
                    setJadwals(dataFromFirebase)
                }
                setLoading(false)

            })

    }

    const sorted = (): JadwalNewType[] => {
        // return []
        return [...jadwals].sort(
            (a, b) => a.id - b.id
        ) as JadwalNewType[];
    };


    async function updateStatus() {
        if (berat !== "" && tinggi !== "") {
            setLoading(true)
            const tinggiResult = Number(tinggi) / 100
            const beratResult = Number(berat)
            const status = (beratResult / (tinggiResult * tinggiResult)) >= 18.1 && (beratResult / (tinggiResult * tinggiResult)) < 23.1 ? "normal" : "obesitas"

            console.log({ status });

            usersDatabaseRef
                .child(auth().currentUser?.uid!)
                .update({
                    status: status
                })
                .then(async () => {
                    setLoading(false)
                    navigation.navigate('jadwalWait', { status })

                })

        }

    }

    function submitGotoJadwal() {
        if (berat !== "" && tinggi !== "") {
            updateStatus()
        } else {
            navigation.navigate('jadwal', { jadwals: sorted(), status })
        }
    }


    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing }}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2 }}>BMI Kalkulator</Text>
                    </View>
                </View>
                <ScrollView showsVerticalScrollIndicator={false} >
                    <View style={{ marginVertical: Spacing * 2 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.small }}>Tinggi Badan (cm) :</Text>
                        <AppTextInput placeholder='Tinggi Badan (cm)' keyboardType='numeric' value={tinggi} onChangeText={text => setTinggi(text)} />
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.small, marginTop: Spacing }}>Berat Badan (kg) :</Text>
                        <AppTextInput placeholder='Berat Badan (kg)' keyboardType='numeric' value={berat} onChangeText={text => setBerat(text)} />
                    </View>

                    <BmiResult />
                    <BmiRumus tinggi={Number(tinggi) / 100} berat={Number(berat)} />
                    <View style={{ margin: Spacing }}>
                        <Text>Berikut jadwal dan menu makanan beserta takarannya yang baik anda konsumsi</Text>
                        <TouchableOpacity onPress={submitGotoJadwal} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', backgroundColor: colors.primary, borderRadius: Spacing, paddingVertical: Spacing, paddingHorizontal: Spacing, marginTop: Spacing * 2 }}>
                            <Text style={{ fontFamily: Font['poppins-bold'], color: 'white', flex: 1, alignSelf: 'center', textAlign: 'center' }}>{loading ? "mohon tunggu ...." : "NEXT"}</Text>
                            <Icons name='arrowright' color={'white'} size={24} />
                        </TouchableOpacity>
                    </View>

                </ScrollView>

            </SafeAreaView>
        </View>
    )
}
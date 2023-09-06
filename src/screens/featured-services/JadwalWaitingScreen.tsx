import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import LottieView from 'lottie-react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import Spacing from '../../constants/Spacing'
import Font from '../../constants/Font'
import FontSize from '../../constants/FontSize'
import { JadwalNewType } from '../../type/JadwalNewType'
import { jadwalDatabaseRef, jadwalNormalDatabaseRef, jadwalObesitasDatabaseRef } from '../../config/firebase'

export default function JadwalWaitingScreen({ navigation, route: { params: { status } } }: RootStackScreenProps<"jadwalWait">) {
    const [loading, setLoading] = useState(true)

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
                if (snapshot.exists()) {
                    const dataFromFirebase: JadwalNewType[] = Object.values(snapshot.val() || {});
                    navigation.navigate('jadwal', { jadwals: sorted(dataFromFirebase), status })
                }
                setLoading(false)

            })

    }

    const sorted = (jadwals: JadwalNewType[]): JadwalNewType[] => {
        // return []
        return [...jadwals].sort(
            (a, b) => a.id - b.id
        ) as JadwalNewType[];
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
            <View style={{ flex: 1 }} />
            <View style={{ alignItems: 'center', margin: Spacing * 2 }}>
                <LottieView source={require('../../../assets/lotties/doctor-wait.json')} autoPlay loop style={{ height: 200, width: '100%' }} />
                <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.large, marginTop: Spacing }}>mohon menunggu ...</Text>
            </View>
        </SafeAreaView>
    )
}
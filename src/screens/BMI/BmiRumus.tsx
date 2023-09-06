import { View, Text } from 'react-native'
import React, { useEffect } from 'react'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import { useTheme } from '@react-navigation/native'


interface props {
    tinggi: number
    berat: number
}
export default function BmiRumus({ tinggi, berat }: props) {
    const { colors } = useTheme()



    return (
        <View style={{ backgroundColor: 'white', marginVertical: Spacing, padding: Spacing * 2, borderRadius: Spacing }}>
            <Text style={{ fontWeight: 'bold', fontSize: FontSize.small, borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: Spacing, paddingBottom: Spacing }}>BMI Rumus</Text>
            <Text>BmiRumus tinggi: {tinggi}, berat: {berat}</Text>

            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: Spacing }}>
                <Text style={{ fontWeight: 'bold', fontSize: FontSize.small, }}>BMI = </Text>
                <View style={{}}>
                    <View style={{ flexDirection: 'row', borderBottomColor: 'black', borderBottomWidth: 0.5, paddingBottom: Spacing }}>
                        <Text style={{}}>Berat Badan</Text><Text style={{ marginLeft: Spacing, fontWeight: 'bold' }}>{berat} kg</Text>
                    </View>
                    <View style={{ flexDirection: 'row', marginTop: Spacing }}>
                        <Text>Tinggi Badan </Text><Text style={{ fontSize: 10 }}>2</Text><Text style={{ marginLeft: Spacing, fontWeight: 'bold' }}>{tinggi} cm</Text>
                    </View>
                </View>
                <Text style={{ fontWeight: 'bold', fontSize: FontSize.small }}> = {(berat / (tinggi * tinggi)).toFixed(1)} </Text>
            </View>

            <View style={{ backgroundColor: colors.primary, borderRadius: Spacing, padding: Spacing, marginTop: Spacing * 2 }}>
                <Text style={{ color: 'white' }}>BMI anda {(berat / (tinggi * tinggi)).toFixed(1)} Termasuk Berat Badan <Text style={{ fontWeight: 'bold' }}>{(berat / (tinggi * tinggi)) >= 18.1 && (berat / (tinggi * tinggi)) < 23.1 ? "Normal" : "Berlebih (Obesitas)"}</Text> </Text>
            </View>
        </View>
    )
}
import { View, Text } from 'react-native'
import React from 'react'
import Spacing from '../../constants/Spacing'
import FontSize from '../../constants/FontSize'
import Font from '../../constants/Font'

export default function BmiResult() {
    return (
        <View style={{ marginVertical: Spacing, backgroundColor: 'white', padding: Spacing * 2, borderRadius: Spacing }}>
            <Text style={{ fontWeight: 'bold', fontSize: FontSize.small, borderBottomColor: 'grey', borderBottomWidth: 0.5, marginBottom: Spacing, paddingBottom: Spacing }}>Penjelasan</Text>
            <Text style={{ fontSize: FontSize.small, textAlign: 'auto', fontFamily: Font['poppins-regular'] }}>Antara 18.1 – 23.1, maka kamu normal. Antara 23.1 – 28.1, maka kamu kelebihan berat badan.</Text>
        </View>
    )
}
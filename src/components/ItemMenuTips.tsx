import { View, Text, Image, useWindowDimensions } from 'react-native'
import React from 'react'
import Spacing from '../constants/Spacing'
import Font from '../constants/Font'
import { MenuTipsHome } from '../screens/HomeScreen'

interface props {
    item: MenuTipsHome
}
export default function ItemMenuTips({ item }: props) {
    const { width } = useWindowDimensions()

    return (
        <View style={{ backgroundColor: 'rgba(238, 196, 134, 0.3)', height: 200, borderRadius: Spacing * 2, marginHorizontal: Spacing }}>
            <Image source={item.image} resizeMode='cover' style={{ height: 160, width: width / 1.5, borderRadius: Spacing * 2 }} />
            <Text style={{ padding: Spacing, fontFamily: Font['poppins-bold'] }}>{item.title}</Text>
        </View>
    )
}
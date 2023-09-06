import { View, Text, Animated, useWindowDimensions } from 'react-native'
import React, { useEffect } from 'react'
import { useTheme } from '@react-navigation/native'
import { JadwalDayType } from '../type/JadwalType'
import { JadwalNewType } from '../type/JadwalNewType'

interface props {
    item: JadwalNewType[]
    currentIndex: number
}
export default function Paginator({ item, currentIndex }: props) {
    const { width } = useWindowDimensions()
    const { colors } = useTheme();


    return (
        <View style={{ flexDirection: 'row', height: 64, alignItems: 'center', justifyContent: 'center', width: '100%' }}>
            {
                item.map((_, i) => {
                    const inputRange = [(i - 1) * width, i * width, (i + 1) * width]
                    return <View style={[{ height: 5, borderRadius: 5, backgroundColor: i === currentIndex ? colors.primary : 'grey', marginHorizontal: 4 }, { width: i === currentIndex ? 10 : 5 }]} key={i.toString()} />
                })
            }
        </View>
    )
}
import { View, Text, FlatList, useWindowDimensions, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { JadwalDayType, JadwalType } from '../type/JadwalType';
import Spacing from '../constants/Spacing';
import { CustomDefaultTheme } from '../themes/AppThemes';
import FontSize from '../constants/FontSize';
import { useTheme } from '@react-navigation/native';
import Font from '../constants/Font';
import { JadwalMakananType, JadwalResepType } from '../type/JadwalNewType';
import { RootStackParamList } from '../navigator/RootNavigator';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ResepType } from '../type/ResepType';

interface props {
    makanans: JadwalMakananType[]
    navigation: NativeStackNavigationProp<RootStackParamList, "jadwal">
}
export default function ItemJadwalDay({ makanans, navigation }: props) {
    const { width } = useWindowDimensions()
    const { colors } = useTheme();


    return (
        <View style={[{ flex: 1 }, { width }]}>
            <FlatList
                data={makanans}
                keyExtractor={item => item.title}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{
                    paddingHorizontal: Spacing
                }}
                renderItem={({ item, index }) => {
                    const topLineStyle = index == 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
                    const bottomLineStyle = index == makanans.length - 1 ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;
                    return (
                        <View style={{ flexDirection: 'row' }}>
                            <View style={[styles.row, { width: '100%' }]}>
                                <View style={styles.timeline}>
                                    <View style={styles.line}>
                                        <View style={topLineStyle} />
                                        <View style={bottomLineStyle} />
                                    </View>
                                    <View style={styles.dot} />
                                </View>
                                <View style={styles.content}>
                                    <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, gap: Spacing * 2, alignItems: 'center' }}>

                                        <View style={{ flex: 1 }}>
                                            <View>
                                                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                    <Text style={{ fontSize: FontSize.medium, color: colors.text, fontFamily: Font['poppins-regular'] }} numberOfLines={1}>
                                                        {item.title.split(" ")[0]}
                                                    </Text>
                                                    <Text style={{ fontSize: FontSize.small, color: colors.text, fontFamily: Font['poppins-bold'] }} numberOfLines={1}>
                                                        {item.title.split(" ")[1]}
                                                    </Text>

                                                </View>
                                                {
                                                    item.reseps.map((resepType: JadwalResepType) => (
                                                        <TouchableOpacity key={resepType.id}
                                                            onPress={() => navigation.navigate('resepDetail', { resep: resepType.resep })}

                                                        >
                                                            <Text style={{ color: colors.primary, fontSize: FontSize.small, fontFamily: Font['poppins-regular'] }}>- {resepType.title}</Text>
                                                        </TouchableOpacity>
                                                    ))
                                                }

                                            </View>

                                        </View>
                                    </View>

                                </View>
                            </View>
                        </View>
                    );
                }}

            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    listView: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
    row: {
        padding: 4,
        paddingLeft: 0,
    },
    content: {
        marginLeft: 40,
        backgroundColor: 'white',
        padding: Spacing * 2,
        borderRadius: Spacing
    },
    timeline: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        width: 40,
        justifyContent: 'center', // center the dot
        alignItems: 'center',
    },
    line: {
        position: 'absolute',
        top: 0,
        left: 18,
        width: 4,
        bottom: 0,
    },
    topLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'grey',
    },
    bottomLine: {
        flex: 1,
        width: 2,
        backgroundColor: 'grey',
    },
    hiddenLine: {
        width: 0,
    },
    dot: {
        width: 16,
        height: 16,
        borderRadius: 8,
        backgroundColor: CustomDefaultTheme.colors.primary,
    },
});
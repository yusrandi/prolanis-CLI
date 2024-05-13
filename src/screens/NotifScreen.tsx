import { View, Text, StyleSheet, FlatList, RefreshControl } from 'react-native'
import React, { useState } from 'react'
import { useTheme } from '@react-navigation/native';
import Spacing from '../constants/Spacing';
import { CustomDefaultTheme } from '../themes/AppThemes';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontSize from '../constants/FontSize';
import { dataNotifikasiss } from '../data/DataNotifikasi';
import moment from 'moment';

export default function NotifScreen() {

    const { colors } = useTheme()
    const [refreshing, setRefreshing] = useState(false);

    function getNotifikasi() { }


    return (
        <View style={styles.container}>
            <SafeAreaView>
                <FlatList
                    data={dataNotifikasiss}
                    keyExtractor={item => item.id.toString()}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={getNotifikasi} />
                    }
                    contentContainerStyle={{
                        paddingVertical: Spacing * 5,
                        paddingHorizontal: Spacing

                    }}
                    renderItem={({ item, index }) => {
                        const topLineStyle = index == 0 ? [styles.topLine, styles.hiddenLine] : styles.topLine;
                        const bottomLineStyle = index == dataNotifikasiss.length - 1 ? [styles.bottomLine, styles.hiddenLine] : styles.bottomLine;
                        return (
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

                                <View style={[styles.row, { flex: 4 }]}>
                                    <View style={styles.timeline}>
                                        <View style={styles.line}>
                                            <View style={topLineStyle} />
                                            <View style={bottomLineStyle} />
                                        </View>
                                        <View style={styles.dot} />
                                    </View>
                                    <View style={styles.content}>
                                        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                                <Text style={{ fontSize: FontSize.small / 2 + 4, }}>{item.status}</Text>
                                            </View>
                                            <Text style={{ fontSize: FontSize.small / 2 + 4, }}>{moment().format('DD/MM/YYYY')}</Text>
                                        </View>
                                        <View style={{ backgroundColor: 'white', flexDirection: 'row', padding: Spacing, alignItems: 'center' }}>

                                            <View style={{ flex: 1 }}>
                                                <View>
                                                    <Text style={{ fontSize: FontSize.medium, color: colors.text, }} numberOfLines={1}>
                                                        {item.title}
                                                    </Text>
                                                    <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: FontSize.small }}>{item.time}.00</Text>

                                                </View>

                                            </View>
                                        </View>

                                    </View>
                                </View>
                            </View>
                        );
                    }}
                />
            </SafeAreaView>
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
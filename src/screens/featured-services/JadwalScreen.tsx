import { View, Text, TouchableOpacity, FlatList, Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native';
import Icons from 'react-native-vector-icons/AntDesign';
import FontSize from '../../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import Paginator from '../../components/Paginator';
import ItemJadwalDay from '../../components/ItemJadwalDay';
import Font from '../../constants/Font';
import { dataJadwalsNormal } from '../../data/DataJadwalsNormal';
import { dataJadwalsObesitas } from '../../data/DataJadwalsObesitas';


export default function JadwalScreen({ navigation, route: { params: { jadwals, status } } }: RootStackScreenProps<"jadwal">) {
    const { colors } = useTheme();

    const slideRef = useRef<any>(null)
    const scrollx = useRef(new Animated.Value(0)).current
    const [currentIndex, setCurrentIndex] = useState(0)

    const scrollTo = () => {
        if (currentIndex < jadwals.length - 1) {
            slideRef!.current!.scrollToIndex({ index: currentIndex + 1 })
        } else {
            console.log('Last Item')
        }
    }

    const viewAbleItemChanged = useRef(({ viewableItems }: any) => {
        setCurrentIndex(viewableItems[0].index)
        // console.log({ scrollx });

    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: "100%" }}>
            <SafeAreaView>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingHorizontal: Spacing * 2, marginBottom: Spacing * 2 }}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('bmi', { status })}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, marginLeft: Spacing * 2 }}>Jadwal dan Menu</Text>
                    </View>
                </View>

                <View style={{ flex: 1, width: '100%' }}>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={jadwals}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        pagingEnabled
                        bounces={false}
                        renderItem={({ item, i }: any) => {
                            return <View key={i} >
                                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, marginLeft: Spacing * 2 }}>{item.title}</Text>
                                <ItemJadwalDay makanans={item.makanans} navigation={navigation} />
                            </View>

                        }}
                        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollx } } }], {
                            useNativeDriver: false
                        })}
                        onViewableItemsChanged={viewAbleItemChanged}
                        viewabilityConfig={viewConfig}
                        ref={slideRef}

                    />
                </View>

                <Paginator item={jadwals} currentIndex={currentIndex} />
                {/* <NextButton percentage={(currentIndex + 1) * (100 / jadwals.length)} scrollTo={scrollTo} /> */}

            </SafeAreaView>
        </View>
    )
}


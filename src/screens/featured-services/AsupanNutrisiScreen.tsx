import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigator/RootNavigator';
import FontSize from '../../constants/FontSize';
import Font from '../../constants/Font';
import { UserType, emptUser } from '../../type/UserType';
import { AsupanType } from '../../type/AsupanType';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { listNutrisi } from '../../data/DataNutrisi';



export default function AsupanNutrisiScreen({ navigation, route: { params: { user } } }: RootStackScreenProps<"asupan">) {
    const { colors } = useTheme();

    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
            <SafeAreaView style={{}}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium }}>Asupan Nutrisi</Text>
                    </View>
                </View>
                <View style={{ backgroundColor: 'white', padding: Spacing * 2, borderRadius: Spacing * 2, marginTop: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small }}>Hai {user.nama} kami ingin menginformasikan asupan nutrisi apa saja yg baik di konsumsi oleh penderita DM tipe 2 maupun yang masih gejala Dm tipe 2 secara umum</Text>
                </View>
                <View style={{ marginTop: Spacing * 2 }}>
                    <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small }}>Asupan Nutrisi yang baik di konsumsi oleh penderita DM tipe 2 adalah :</Text>
                    <FlatList
                        keyExtractor={item => item.id.toString()}
                        data={listNutrisi}
                        numColumns={2}
                        pagingEnabled
                        bounces={false}
                        contentContainerStyle={{
                            paddingVertical: Spacing * 2,

                        }}
                        renderItem={({ item }) => {
                            return (
                                <TouchableOpacity onPress={() => navigation.navigate("asupanDetail", { asupan: item })} style={{ flex: 1, margin: Spacing }}>
                                    <Image source={item.image} style={{ borderRadius: Spacing * 2, height: 150, width: "100%" }} />
                                    <Text style={{ fontFamily: Font['poppins-semiBold'], fontSize: FontSize.small, backgroundColor: colors.primary, borderRadius: Spacing, padding: Spacing, textAlign: 'center', marginTop: Spacing }}>{item.title}</Text>
                                </TouchableOpacity>
                            )

                        }}

                    />
                </View>
            </SafeAreaView>
        </View >
    )
}
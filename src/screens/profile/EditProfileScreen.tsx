import { View, Text, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { RootStackScreenProps } from '../../navigator/RootNavigator'
import { useTheme } from '@react-navigation/native';
import Spacing from '../../constants/Spacing';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontSize from '../../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import AppTextInput from '../../components/AppTextInput';
import { UserType } from '../../type/UserType';
import Font from '../../constants/Font';
import { usersDatabaseRef } from '../../config/firebase';


export default function EditProfileScreen({ navigation, route: { params: { user } } }: RootStackScreenProps<'editProfile'>) {
    const { colors } = useTheme();
    const [editUser, setUser] = useState<UserType>(user)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    async function handleUpdateProfile() {
        console.log(user.id);
        setIsLoading(true)
        await usersDatabaseRef.child(user.id).update(editUser)
            .then(() => console.log("User update"))
            .catch((error) => console.log(error))

        setIsLoading(false)
        navigation.goBack()
    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <View style={{ flexDirection: 'row', padding: Spacing, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing }}>
                            <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, color: 'black' }}>{"Edit Profile"}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: Spacing * 2, marginTop: Spacing * 2, flex: 1 }}>
                        <ScrollView style={{}} showsVerticalScrollIndicator={false} >
                            <Text style={{ fontFamily: Font['poppins-regular'] }}>Nama Lengkap</Text>
                            <AppTextInput placeholder='Nama' value={editUser.nama} onChangeText={text => setUser({ ...editUser, nama: text })} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Usia Anda</Text>
                            <AppTextInput placeholder='Usia' value={editUser.usia} onChangeText={text => setUser({ ...editUser, usia: text })} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Jenis Kelamin</Text>
                            <AppTextInput placeholder='Jenis Kelamin' value={editUser.jk} onChangeText={text => setUser({ ...editUser, jk: text })} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Pekerjaan</Text>
                            <AppTextInput placeholder='Pekerjaan' value={editUser.pekerjaan} onChangeText={text => setUser({ ...editUser, pekerjaan: text })} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Berat Badan (kg)</Text>
                            <AppTextInput placeholder='Berat Badan' value={editUser.berat} onChangeText={text => setUser({ ...editUser, berat: text })} keyboardType='numeric' />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Tinggi Badan (cm)</Text>
                            <AppTextInput placeholder='Tinggi Badan' value={editUser.tinggi} onChangeText={text => setUser({ ...editUser, tinggi: text })} keyboardType='number-pad' />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Penyakit Komplikasi akibat menderita DM tipe 2</Text>
                            <AppTextInput placeholder='Penyakit Komplikasi akibat menderita DM tipe 2' value={editUser.penyakit} onChangeText={text => setUser({ ...editUser, penyakit: text })} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>No Telepon</Text>
                            <AppTextInput placeholder='No Telepon' value={editUser.telepon} onChangeText={text => setUser({ ...editUser, telepon: text })} />
                            <TouchableOpacity onPress={handleUpdateProfile} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * 2, borderRadius: Spacing, elevation: 5 }}>
                                <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>{isLoading ? "..." : "Submit"}</Text>
                            </TouchableOpacity>
                            <View style={{ height: 100 }} />
                        </ScrollView>
                    </View>


                </View>
            </SafeAreaView>
        </View>
    )
}
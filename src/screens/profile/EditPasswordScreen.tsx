import { View, Text, TouchableOpacity, ScrollView, Alert } from 'react-native'
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


export default function EditPasswordScreen({ navigation, route: { params: { user } } }: RootStackScreenProps<'editPassword'>) {
    const { colors } = useTheme();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const [password, setPassword] = useState<string>("")
    const [passwordConfirm, setPasswordConfirm] = useState<string>("")


    async function handleUpdateProfile() {
        console.log(user.id);
        if (password === passwordConfirm && password !== "") {
            setIsLoading(true)
            await usersDatabaseRef.child(user.id).update({
                password: password
            })
                .then(() => console.log("User Password update"))
                .catch((error) => console.log(error))

            setIsLoading(false)
            navigation.goBack()
        } else {
            Alert.alert('Password and password confirm not same')
        }

    }
    return (
        <View style={{ flex: 1 }}>
            <SafeAreaView>
                <View >
                    <View style={{ flexDirection: 'row', padding: Spacing, alignItems: 'center' }}>
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing }}>
                            <AntDesign name='arrowleft' size={30} color={'white'} style={{}} />
                        </TouchableOpacity>
                        <View style={{ flex: 1, marginLeft: Spacing * 2 }}>
                            <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, color: 'black' }}>{"Edit Password"}</Text>
                        </View>
                    </View>
                    <View style={{ paddingHorizontal: Spacing * 2, marginTop: Spacing * 2 }}>
                        <ScrollView style={{}} showsVerticalScrollIndicator={false} >
                            <Text style={{ fontFamily: Font['poppins-regular'] }}>Password</Text>
                            <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                            <Text style={{ fontFamily: Font['poppins-regular'], marginTop: Spacing }}>Password Confirm</Text>
                            <AppTextInput placeholder='Password Confirm' secureTextEntry value={passwordConfirm} onChangeText={text => setPasswordConfirm(text)} />
                            <TouchableOpacity onPress={handleUpdateProfile} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * 2, borderRadius: Spacing, elevation: 5 }}>
                                <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>{isLoading ? "..." : "Submit"}</Text>
                            </TouchableOpacity>
                        </ScrollView>


                    </View>


                </View>
            </SafeAreaView>
        </View>
    )
}
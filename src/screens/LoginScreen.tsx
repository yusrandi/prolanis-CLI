import { View, Text, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import auth from '@react-native-firebase/auth'
import database from '@react-native-firebase/database'
import { useTheme } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'
import FontSize from '../constants/FontSize'
import Font from '../constants/Font'
import AppTextInput from '../components/AppTextInput'
import { RootStackParamList } from '../navigator/RootNavigator'
import { NativeStackScreenProps } from '@react-navigation/native-stack'
import Spacing from '../constants/Spacing'
import { AuthUserContext } from '../context/AuthContext'

export default function LoginScreen({ navigation }: NativeStackScreenProps<RootStackParamList, "login">) {
    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")
    const { isLoading, login } = useContext(AuthUserContext)

    async function handleSignIn() {
        login(email, password)
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}>
            <Image source={require('../../assets/images/back.png')} style={{ flex: 1, width: '100%', height: '100%' }} />
            <SafeAreaView
                edges={["top"]}
                style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: '60%', padding: Spacing * 2 }}
            >
                <View style={{ backgroundColor: 'white', flex: 1, borderRadius: Spacing * 2, alignItems: 'center', justifyContent: 'center', padding: Spacing * 2 }}>

                    <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large, marginBottom: Spacing * 2 }}>Prolanis Care</Text>
                    <View style={{ width: '100%' }}>
                        <AppTextInput placeholder='Email' value={email} onChangeText={text => setEmail(text)} keyboardType='email-address' />
                        <AppTextInput placeholder='Password' secureTextEntry value={password} onChangeText={text => setPassword(text)} />
                    </View>
                    <TouchableOpacity disabled={isLoading} onPress={handleSignIn} style={{ backgroundColor: '#DBB62B', width: '100%', padding: Spacing, alignItems: 'center', marginTop: Spacing * 2, borderRadius: Spacing, elevation: 5 }}>
                        <Text style={{ color: 'white', fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>{isLoading ? "..." : "Sign In"}</Text>
                    </TouchableOpacity>

                    {/* <TouchableOpacity onPress={() => navigation.navigate('registerChoice')} style={{ width: '100%', padding: Spacing, alignItems: 'center' }}>
                        <Text style={{ fontSize: FontSize.small }}>belum punya akun ? Daftar</Text>
                    </TouchableOpacity> */}
                </View>
            </SafeAreaView>
        </KeyboardAvoidingView>

    );
}
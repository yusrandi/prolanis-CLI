import { View, Text, Image, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { UserType, emptUser } from '../../type/UserType'
import Spacing from '../../constants/Spacing'
import Font from '../../constants/Font'
import FontSize from '../../constants/FontSize'
import { MessageType, emptyMessage } from '../../type/MessageType'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParamList } from '../../navigator/RootNavigator'
import { messagesDatabaseRef, usersDatabaseRef } from '../../config/firebase'
import auth from '@react-native-firebase/auth';

interface props {
    userKey: string
    recipent: string
    navigation: NativeStackNavigationProp<RootStackParamList, "dokterHome">
}
export default function ItemUsers({ userKey, recipent, navigation }: props) {
    const [user, setUser] = useState<UserType>(emptUser)
    const [lastMsg, setLastMsg] = useState<MessageType>(emptyMessage)

    useEffect(() => {
        getUser()
    }, [])

    async function getUser() {

        usersDatabaseRef
            .child(userKey)
            .on('value', snapshot => {
                // console.log('User data: ', snapshot.val());
                setUser(snapshot.val() as UserType)

            });
    }

    useEffect(() => {
        messagesDatabaseRef
            .child(auth()!.currentUser!.uid!)
            .child(userKey)
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                setLastMsg(emptyMessage)
                if (snapshot.exists()) {
                    // const dataFromFirebase = snapshot.val();
                    const dataFromFirebase: MessageType[] = Object.values(snapshot.val() || {});
                    setLastMsg(dataFromFirebase[0])

                }

            });

    }, [])

    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('dokterChat', {
                user: user
            })}
            style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: Spacing * 2 }}>
            <Image source={require('../../../assets/images/male_doctor.jpg')} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
            <View style={{ flex: 1, marginLeft: Spacing }}>
                <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.medium }}>{user.nama}</Text>
                <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small, color: 'grey' }}>{lastMsg?.text}</Text>
            </View>
            <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small / 2 + 4, color: 'grey' }}>{lastMsg?.timestamp}</Text>
        </TouchableOpacity>
    )
}
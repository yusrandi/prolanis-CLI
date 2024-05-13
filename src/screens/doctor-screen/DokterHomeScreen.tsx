import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { RootStackScreenProps } from '../../navigator/RootNavigator';
import Icons from "react-native-vector-icons/AntDesign";
import FontSize from '../../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import Spacing from '../../constants/Spacing';
import Font from '../../constants/Font';
import ItemUsers from './ItemUsers';
import { UserType, emptUser } from '../../type/UserType';
import { ForumType } from '../../type/ForumType';
import auth from '@react-native-firebase/auth';
import { forumsDatabaseRef, messagesDatabaseRef, usersDatabaseRef } from '../../config/firebase';


export type ChatType = {
    sender: string,
    recipent: string
}
export default function DokterHomeScreen({ navigation }: RootStackScreenProps<"dokterHome">) {
    const { colors } = useTheme()
    const [chats, setChats] = useState<ChatType[]>([])
    const [user, setUser] = useState<UserType>(emptUser)
    const [forums, setForums] = useState<ForumType[]>([])



    useEffect(() => {
        messagesDatabaseRef
            .child(auth()!.currentUser!.uid!)
            .on('value', snapshot => {
                // console.log('User data: ', snapshot.val());

                setChats([])

                if (snapshot.exists()) {
                    for (const key in snapshot.val()) {
                        console.log(key);
                        setChats((prevData) => [
                            ...prevData, {
                                sender: key,
                                recipent: auth().currentUser?.uid!
                            }
                        ])
                    }


                }

            });


    }, [])

    useEffect(() => {
        getUser()

    }, [])

    async function getUser() {

        usersDatabaseRef
            .child(auth().currentUser?.uid!)
            .on('value', snapshot => {
                // console.log('User data: ', snapshot.val());
                setUser(snapshot.val() as UserType)

            });

    }

    useEffect(() => {
        console.log(auth()!.currentUser!.uid!);
        forumsDatabaseRef
            .on('value', snapshot => {
                // console.log('User data: ', snapshot.val());
                setForums([])
                if (snapshot.exists()) {
                    // const dataFromFirebase = snapshot.val();
                    const dataFromFirebase: ForumType[] = Object.values(snapshot.val() || {});
                    dataFromFirebase.forEach((forums: ForumType, index: number) => {
                        setForums((prevMessages) => [
                            ...prevMessages,
                            {
                                id: index.toString(),
                                sender: forums.sender,
                                text: forums.text,
                                date: forums.date,
                                senderName: forums.senderName,
                                timestamp: forums.timestamp
                            },
                        ]);
                    })
                    // setMessages(dataFromFirebase)

                }

            });
    }, [])

    function Header() {
        return (
            <View style={{ paddingHorizontal: 24, flexDirection: "row", alignItems: "center", marginBottom: Spacing * 2 }}>
                <Image source={require('../../../assets/images/male_doctor.jpg')} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                <View style={{ flex: 1, marginLeft: Spacing }}>
                    <Text style={{ fontSize: 18, fontWeight: "600", color: colors.text, }} numberOfLines={1}>
                        Hi, {user.nama} 👋
                    </Text>
                    <Text style={{ color: colors.text, opacity: 0.75 }} numberOfLines={1}>
                        Prolanis Care App
                    </Text>
                </View>
                <TouchableOpacity
                    onPress={() => auth().signOut()}
                    style={{
                        width: 40,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.primary,
                    }}
                >
                    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                        <Icons name="logout" size={24} color={colors.text} style={{ position: 'relative' }} />
                        {/* <View
                            style={{
                                position: 'absolute',
                                backgroundColor: 'red',
                                width: 16,
                                height: 16,
                                borderRadius: 15 / 2,
                                right: 0,
                                top: +10,
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                            <Text
                                style={{
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    color: "#FFFFFF",
                                    fontSize: FontSize.medium,
                                }}>
                                *
                            </Text>
                        </View> */}
                    </View>

                </TouchableOpacity>
                {/* <Image source={require('../assets/images/pola.png')} resizeMode='center' style={{ width: 50, height: 50 }} /> */}
            </View>
        )
    }
    function SearchBar() {
        return (
            <View style={{ flexDirection: "row", paddingHorizontal: 24, marginBottom: Spacing * 2 }}>
                <TouchableOpacity
                    style={{
                        flex: 1,
                        height: 52,
                        borderRadius: 52,
                        borderWidth: 1,
                        borderColor: colors.border,
                        alignItems: "center",
                        paddingHorizontal: 24,
                        flexDirection: "row",

                    }}
                >
                    <Icons
                        name="search1"
                        size={24}
                        color={colors.text}
                        style={{ opacity: 0.5 }}
                    />
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            color: colors.text,
                            opacity: 0.5,
                            marginLeft: Spacing
                        }}
                    >
                        Search
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={{
                        width: 52,
                        aspectRatio: 1,
                        alignItems: "center",
                        justifyContent: "center",
                        borderRadius: 52,
                        backgroundColor: colors.primary,
                        marginLeft: Spacing
                    }}
                >
                    <Icons name="API" size={24} color={colors.background} />
                </TouchableOpacity>
            </View>
        )
    }

    // useEffect(() => { auth.signOut() }, [])
    return (
        <View style={{ flex: 1, paddingTop: Spacing }}>
            <SafeAreaView style={{}}>
                <Header />
                {/* <SearchBar /> */}
                <TouchableOpacity
                    onPress={() => navigation.navigate('dokterForum')}
                    style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: Spacing * 2, borderBottomColor: 'grey', borderBottomWidth: 0.5 }}>
                    <Image source={require('../../../assets/images/female_doctor.jpg')} style={{ width: 52, aspectRatio: 1, borderRadius: 52 }} resizeMode="cover" />
                    <View style={{ flex: 1, marginLeft: Spacing }}>
                        <Text style={{ fontFamily: Font['poppins-bold'], fontSize: FontSize.large }}>GROUP PROLANIS</Text>
                        <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small, color: 'grey' }}>{forums[0]?.text}</Text>
                    </View>
                    <Text style={{ fontFamily: Font['poppins-regular'], fontSize: FontSize.small / 2 + 4, color: 'grey' }}>{forums[0]?.timestamp}</Text>
                </TouchableOpacity>
                <View style={{ height: Spacing * 2 }} />
                <FlatList
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.sender}
                    data={chats}
                    contentContainerStyle={{
                        paddingHorizontal: Spacing * 2,

                    }}
                    renderItem={({ item }) => {
                        return (
                            <ItemUsers key={item.sender} userKey={item.sender} recipent={item.recipent} navigation={navigation} />
                        )
                    }}

                />
            </SafeAreaView>
        </View>
    )
}
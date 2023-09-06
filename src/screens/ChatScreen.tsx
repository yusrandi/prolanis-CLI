import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@react-navigation/native';
import { ForumType } from '../type/ForumType';
import { UserType, emptUser } from '../type/UserType';
import { forumsDatabaseRef, usersDatabaseRef } from '../config/firebase';
import auth from '@react-native-firebase/auth';
import moment from 'moment';
import Spacing from '../constants/Spacing';
import { SafeAreaView } from 'react-native-safe-area-context';
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { TabsStackScreenProps } from '../navigator/TabsNavigator';
import FontSize from '../constants/FontSize';
import AppTextInput from '../components/AppTextInput';
import Font from '../constants/Font';


export default function ChatScreen({ navigation }: TabsStackScreenProps<"forum">) {
    const { colors } = useTheme();
    const [forums, setForums] = useState<ForumType[]>([])
    const [textMessage, setTextMessage] = useState("")
    const [user, setUser] = useState<UserType>(emptUser)

    useEffect(() => {
        async function getUser() {
            usersDatabaseRef
                .child(auth().currentUser?.uid!)
                .on('value', snapshot => {
                    console.log('User data: ', snapshot.val());
                    setUser(snapshot.val() as UserType)

                });
        }
        getUser()
    }, [])

    useEffect(() => {
        console.log(auth()!.currentUser!.uid!);
        forumsDatabaseRef
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
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

    const sorted = (): ForumType[] => {
        // return []
        return [...forums].sort(
            (a, b) => b.date - a.date
        ) as ForumType[];
    };

    async function sendMessage() {

        if (textMessage.trim() !== "") {
            const message1Data = {
                sender: auth().currentUser?.uid,
                text: textMessage,
                senderName: user.nama,
                date: new Date().getTime(),
                timestamp: moment().format("YYYY/DD/MM, HH:mm"),
            };

            forumsDatabaseRef
                .push()
                .set(message1Data)
                .then(() => console.log("Message sent"))


            setTextMessage("")
        }

    }

    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row' }}>

                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium }}>Forum Chat Club</Text>
                        <Text style={{ fontSize: FontSize.small, opacity: 0.5 }}>online</Text>
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        data={sorted()}
                        inverted
                        contentContainerStyle={{
                            paddingHorizontal: Spacing * 2,
                        }}
                        renderItem={({ item }) => {
                            return (
                                <View key={item.id} style={[styles.containerChat, item.sender === auth().currentUser?.uid ? styles.chatSender : styles.chatReceiver]}>
                                    <Text style={[{ fontSize: 12 }, item.sender === auth().currentUser?.uid ? styles.textSenderName : styles.textReceiverName]}>{item.senderName}</Text>
                                    <Text style={[{ fontFamily: Font['poppins-regular'], }, item.sender === auth().currentUser?.uid ? styles.textSender : styles.textReceiver]}>{item.text}</Text>
                                    <Text style={[{ opacity: 0.5, fontSize: 12 }, item.sender === auth().currentUser?.uid ? styles.textSender : styles.textReceiver]}>{item.timestamp}</Text>
                                </View>
                            )
                        }}

                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: Spacing }}>
                    <View style={{ flex: 1, marginRight: Spacing }}>
                        <AppTextInput value={textMessage} placeholder='Ketik pesan' onChangeText={e => setTextMessage(e)} />
                    </View>
                    <TouchableOpacity
                        onPress={sendMessage}
                        style={{ backgroundColor: colors.primary, borderRadius: 150, height: 50, width: 50, padding: Spacing, justifyContent: 'center', alignItems: 'center' }}>
                        <FontAwesome name='send' size={20} color={'white'} style={{}} />
                    </TouchableOpacity>
                </View>
            </SafeAreaView>


        </View>
    )
}

const styles = StyleSheet.create({
    containerChat: {
        padding: Spacing,
        borderRadius: Spacing,
        maxWidth: '80%',
        marginBottom: Spacing

    },
    chatSender: {
        backgroundColor: 'white',
        alignSelf: 'flex-end'
    },
    chatReceiver: {
        backgroundColor: '#DBB62B',

    },
    textSender: {
        color: 'black',
        alignSelf: 'flex-end'
    },
    textReceiver: {
        color: 'white'
    },
    textSenderName: {
        color: 'black',
    },
    textReceiverName: {
        color: 'white'
    }
})
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import Spacing from '../../constants/Spacing'
import { useTheme } from '@react-navigation/native';
import Icons from "react-native-vector-icons/AntDesign"
import FontAwesome from "react-native-vector-icons/FontAwesome"
import FontSize from '../../constants/FontSize';
import { SafeAreaView } from 'react-native-safe-area-context';
import { RootStackScreenProps } from '../../navigator/RootNavigator';
import Font from '../../constants/Font';
import AppTextInput from '../../components/AppTextInput';
import { MessageType } from '../../type/MessageType';
import moment from 'moment';
import auth from '@react-native-firebase/auth';
import { messagesDatabaseRef } from '../../config/firebase';


export default function KonsultasiScreen({ navigation, route: { params: { senderId, title } } }: RootStackScreenProps<"konsultasi">) {

    const { colors } = useTheme();

    const [messages, setMessages] = useState<MessageType[]>([])
    const [textMessage, setTextMessage] = useState("")

    useEffect(() => {
        console.log(auth()!.currentUser!.uid!);
        messagesDatabaseRef
            .child(auth()!.currentUser!.uid!)
            .child(senderId)
            .on('value', snapshot => {
                console.log('User data: ', snapshot.val());
                setMessages([])
                if (snapshot.exists()) {
                    // const dataFromFirebase = snapshot.val();
                    const dataFromFirebase: MessageType[] = Object.values(snapshot.val() || {});
                    dataFromFirebase.forEach((message: MessageType, index: number) => {
                        setMessages((prevMessages) => [
                            ...prevMessages,
                            {
                                id: index.toString(),
                                sender: message.sender,
                                recipent: message.recipent,
                                d: message.recipent,
                                text: message.text,
                                date: message.date,
                                timestamp: message.timestamp
                            },
                        ]);
                    })
                    // setMessages(dataFromFirebase)

                }

            });
    }, [])

    const sorted = (): MessageType[] => {
        // return []
        return [...messages].sort(
            (a, b) => b.date - a.date
        ) as MessageType[];
    };

    function userSendMessage() {
        if (textMessage !== "") sendMessage(auth().currentUser?.uid!, senderId, textMessage)

    }
    async function sendMessage(sender: string, recipent: string, message: string) {

        const messageData = {
            sender: sender,
            recipent: recipent,
            text: message,
            timestamp: moment().format("YYYY/DD/MM, HH:mm"),
        }
        const newReference = messagesDatabaseRef.child(sender).child(recipent).push();
        newReference
            .set(messageData)
            .then(() => {
                const recipentReference = messagesDatabaseRef.child(recipent).child(sender).push();
                recipentReference.set(messageData)
                    .then(() => console.log("Message send"))
            })
            .catch(error => console.log(error))

        setTextMessage("")

    }


    return (
        <View style={{ flex: 1, paddingHorizontal: Spacing * 2 }}>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity
                        onPress={() => navigation.goBack()}
                        style={{ backgroundColor: colors.primary, borderRadius: 50, padding: Spacing, }}>
                        <Icons name='arrowleft' size={30} color={'white'} style={{}} />
                    </TouchableOpacity>
                    <View style={{ flex: 1 }}>
                        <Text style={{ fontWeight: 'bold', fontSize: FontSize.medium, fontFamily: Font['poppins-bold'], color: 'black', marginLeft: Spacing * 2 }}>Konsultasi Dokter {title}</Text>
                    </View>
                </View>
                <View style={{ flex: 1, marginTop: Spacing }}>
                    <FlatList
                        showsVerticalScrollIndicator={false}
                        keyExtractor={item => item.id.toString()}
                        data={messages}
                        inverted
                        contentContainerStyle={{
                            paddingHorizontal: Spacing * 2,

                        }}
                        renderItem={({ item }) => {
                            return (
                                <View key={item.id} style={[styles.containerChat, item.sender === auth().currentUser?.uid ? styles.chatSender : styles.chatReceiver]}>
                                    <Text style={[{ fontFamily: Font['poppins-regular'], }, item.sender === auth().currentUser?.uid ? styles.textSender : styles.textReceiver]}>{item.text}</Text>
                                    <Text style={[{ fontFamily: Font['poppins-regular'], opacity: 0.5, fontSize: FontSize.small / 2 + 4 }, item.sender === auth().currentUser?.uid ? styles.textSender : styles.textReceiver]}>{item.timestamp}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: Spacing }}>
                    <View style={{ flex: 1 }}>
                        <AppTextInput value={textMessage} placeholder='Ketik pesan' onChangeText={e => setTextMessage(e)} />
                    </View>
                    <TouchableOpacity
                        onPress={userSendMessage}
                        style={{ marginLeft: Spacing, backgroundColor: colors.primary, borderRadius: 150, height: 50, width: 50, padding: Spacing, justifyContent: 'center', alignItems: 'center' }}>
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
    }
})
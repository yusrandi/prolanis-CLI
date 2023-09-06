import { Dispatch, SetStateAction, createContext, useState } from 'react'
import { UserType, emptUser } from '../type/UserType'
import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { usersDatabaseRef } from '../config/firebase';

interface props {
    children: JSX.Element
}
export type AuthContextProps = {
    isLoading: boolean
    isLoggedIn: boolean
    user: UserType,
    setUser: Dispatch<SetStateAction<UserType>>,
    login: (email: string, password: string) => void
    register: (user: UserType, password: string, role: string) => void
    logOut: () => void
}

export const AuthUserContext = createContext({} as AuthContextProps)

export default function AuthProvider({ children }: props) {

    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false)
    const [user, setUser] = useState<UserType>(emptUser)

    async function login(email: string, password: string) {
        setIsLoading(true)
        await auth().signInWithEmailAndPassword(email, password)
            .then(async userCredential => {
                // console.log({ userCredential });
                const userId = userCredential.user.uid
                console.log({ userId });
            })
            .catch(error => Alert.alert(error.message))
        setIsLoggedIn(true)
        setIsLoading(false)
    }

    async function register(user: UserType, password: string, role: string) {
        const tinggiResult = Number(user.tinggi) / 100
        const beratResult = Number(user.berat)
        const status = (beratResult / (tinggiResult * tinggiResult)) >= 18.1 && (beratResult / (tinggiResult * tinggiResult)) < 23.1 ? "normal" : "obesitas"


        setIsLoading(true)
        await auth().createUserWithEmailAndPassword(user.email, password)
            .then(async userCredential => {
                // console.log({ userCredential });
                const userId = userCredential.user.uid
                console.log({ userId });

                usersDatabaseRef.child(userId).set({
                    id: userId,
                    email: userCredential.user.email,
                    online: true,
                    nama: user.nama,
                    usia: user.usia,
                    jk: user.jk,
                    pekerjaan: user.pekerjaan,
                    berat: user.berat,
                    tinggi: user.tinggi,
                    penyakit: user.penyakit,
                    telepon: user.telepon,
                    role: role,
                    status: status,
                })
                    .then(() => console.log("User added"))
                    .catch((error) => console.log(error))

            })
            .catch(error => Alert.alert(error.message))
        setIsLoggedIn(true)
        setIsLoading(false)
    }

    async function logOut() {
        setIsLoading(true)
        const userId = auth().currentUser?.uid
        await auth().signOut()
        setIsLoading(false)
    }

    return (
        <AuthUserContext.Provider value={{ isLoading: isLoading, user: user, setUser: setUser, isLoggedIn: isLoggedIn, login: login, register: register, logOut: logOut }}>
            {children}
        </AuthUserContext.Provider>

    )
}
import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CompositeScreenProps } from "@react-navigation/native";
import { RootStackScreenProps } from "./RootNavigator";
import HomeScreen from "../screens/HomeScreen";
import NotifScreen from "../screens/NotifScreen";
import InfoScreen from "../screens/InfoScreen";
import ChatScreen from "../screens/ChatScreen";
import Icon from 'react-native-vector-icons/AntDesign';
import { Text, View } from "react-native";
import CustomBottomTabs from "../components/CustomBottomTabs";

export type TabsStackParamList = {
    home: undefined;
    notif: undefined;
    info: undefined;
    chat: undefined;
    forum: undefined;
    profile: undefined;
};

const TabsStack = createBottomTabNavigator<TabsStackParamList>();
export type TabsStackScreenProps<T extends keyof TabsStackParamList> =
    CompositeScreenProps<
        BottomTabScreenProps<TabsStackParamList, T>,
        RootStackScreenProps<"tabs">
    >;


export default function TabsNavigator() {
    return (
        <TabsStack.Navigator screenOptions={{ tabBarShowLabel: false }}
            tabBar={(props) => <CustomBottomTabs {...props} />}
        >
            <TabsStack.Screen name="home" component={HomeScreen} options={{ headerShown: false, tabBarIcon(props) { return <Icon name="home" {...props} /> }, }} />
            <TabsStack.Screen name="notif" component={NotifScreen} options={{ headerShown: false, tabBarIcon(props) { return <Icon name="home" {...props} /> }, }} />
            <TabsStack.Screen name="info" component={InfoScreen} options={{ headerShown: false, tabBarIcon(props) { return <Icon name="home" {...props} /> }, }} />
            <TabsStack.Screen name="forum" component={ChatScreen} options={{ headerShown: false, tabBarIcon(props) { return <Icon name="home" {...props} /> }, }} />
            {/* <TabsStack.Screen name="profile" component={ProfileScreen} options={{ headerShown: false, tabBarIcon(props) { return <AntDesign name="user" {...props} /> }, }} /> */}

        </TabsStack.Navigator>
    )
}

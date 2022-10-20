import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainerProps, NavigationProp } from "@react-navigation/native";
import { Pressable } from "react-native";
import Layout from "../../components/Layout";
import { Text, View } from "../../components/Themed";
import { RootStackParamList, RootTabParamList } from "../../types";
import OrderScreen from "../OrderScreen";

type PropsProfileScreen = {
    navigation: NavigationProp<RootTabParamList>
}
const ProfileScreen: React.FC<PropsProfileScreen> = ({ navigation }) => {
    return(
        <>
            <Layout />
            <Pressable onPress={() => navigation.navigate('ProfileScreens', {
                screen: 'Orders',
            })}>
                <Text>Заказы</Text>
            </Pressable>
        </>
    )
}

export default ProfileScreen;
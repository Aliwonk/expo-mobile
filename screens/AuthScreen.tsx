import React, { useState } from 'react';
import { Dimensions, StyleSheet, TouchableOpacity, ActivityIndicator } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { Text, View } from "../components/Themed";
import EnterSVGIcon from '../assets/icons/Enter.svg';
import { loginUser } from '../reduxStore/features/authSlice';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { Notification } from '../components/Notification';
import { RootStackParamList, RootStackScreenProps } from '../types';
import { NavigationProp } from '@react-navigation/native';

type PropsAuthScreen = {
    navigation: NavigationProp<RootStackParamList>
}
export const AuthScreen: React.FC<PropsAuthScreen> = ({ navigation }) => {
    const dispatch = useAppDispatch();
    const { isLoading, user, errorFetch, message } = useAppSelector(state => state.auth);
    const [phone, setPhone] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [missPhone, setMissPhone] = useState<boolean>(false);
    const [missPass, setMissPass] = useState<boolean>(false);
    const [hideNotif, setHideNotif] = useState<boolean>(true);

    return (
        <View style={styles.authBlock}>
            <Notification hide={hideNotif} text={message} />
            <Text style={styles.caption}>АВТОРИЗАЦИЯ</Text>
            <View style={styles.itemInputs}>

                {/* input phone */}
                <View style={styles.labelInputs}>
                    <Text>Телефон</Text>
                    {missPhone && <Text style={styles.textRequired}>*</Text>}
                </View>
                <TextInput
                    style={styles.inputs}
                    keyboardType='phone-pad'
                    onChangeText={phone => setPhone(phone)}
                    // maxLength={12}
                    placeholder="+7 XXX-XXX-XXXX"
                    defaultValue={phone}
                    onChange={() => {
                        setHideNotif(true);
                        setMissPhone(false);
                    }}
                />

                {/* input password */}
                <View style={styles.labelInputs}>
                    <Text>Пароль</Text>
                    {missPass && <Text style={styles.textRequired}>*</Text>}
                </View>
                <TextInput
                    style={styles.inputs}
                    onChangeText={password => setPassword(password)}
                    placeholder="Введите пароль"
                    defaultValue={password}
                    onChange={() => {
                        setHideNotif(true);
                        setMissPass(false);
                    }}
                />

                {/* buttons */}
                <View style={styles.btns}>
                    <TouchableOpacity
                        style={styles.btnSubmit}
                        onPress={() => {
                            if (phone === '' && password === '') {
                                setMissPhone(true);
                                setMissPass(true);
                            } else if (password === '') {
                                setMissPass(true);
                            } else if (phone === '') {
                                setMissPhone(true);
                            } else {
                                dispatch(loginUser({ password, phone }));
                                setHideNotif(false);
                            }
                        }}
                    >
                        {isLoading ? (
                            <ActivityIndicator size='small' color='#00ff0' />
                        ) : (
                            <EnterSVGIcon width={40} height={40} />
                        )}
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.btnRegister}
                        onPress={() => navigation.navigate('Register')}
                    >
                        <Text style={styles.textBtnRegister}>Зарегистрироваться</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const widthWindow = Dimensions.get('window').width;
const heightWindow = Dimensions.get('window').height;
const styles = StyleSheet.create({
    authBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: widthWindow,
        height: heightWindow,
    },
    icon: {
        width: 60,
        height: 60
    },
    caption: {
        fontSize: 20,
        letterSpacing: 1.3,
        marginBottom: 30,
        marginTop: -50,
    },
    itemInputs: {
        display: 'flex',
        flexDirection: 'column',
        width: '70%',
        height: 'auto'
    },
    labelInputs: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingRight: 10,
        marginBottom: 10,
    },
    textRequired: {
        color: 'red'
    },
    inputs: {
        width: '100%',
        height: 40,
        paddingLeft: 10,
        marginBottom: 10,
        borderWidth: 1,
        borderRadius: 5,
        borderColor: '#dcdcdc'
    },
    btns: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
        height: 'auto',
        marginTop: 10
    },
    btnSubmit: {
        display: 'flex',
        alignItems: 'flex-start',
        width: 25,
        height: 27,
        borderRadius: 5,
    },
    btnRegister: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: 27,
    },
    textBtnRegister: {
        fontWeight: '600',
        color: 'blue'
    }
})

export default AuthScreen;
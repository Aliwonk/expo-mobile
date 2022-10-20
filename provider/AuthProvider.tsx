import React, { useState, useMemo, useEffect } from 'react';
import { Alert } from 'react-native';
import { CreateUser, LoginUser, UserResultFetch } from '../types/user';

interface IContext {
    userAuth: UserResultFetch | null
    isLoading: boolean
    register: (userData: CreateUser) => Promise<void>
    login: (userData: LoginUser) => Promise<void>
}

type PropsAuthProvider = {
    children: any
}

export const AuthContext = React.createContext<IContext>({} as IContext)

export const AuthProvider: React.FC<PropsAuthProvider> = ({ children }) => {
    const urlBackendRegister: string = '';
    const urlBackendLogin: string = '';
    const [userAuth, setUserAuth] = useState<UserResultFetch | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [isLoadingInitial, setLoadingInitial] = useState<boolean>(true);


    // create user function

    const registerUser = async (userData: CreateUser) => {
        setIsLoading(true);
        try {
            const response = await fetch(urlBackendRegister, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });
            const result: UserResultFetch | null = await response.json();
            setUserAuth(result);
        } catch (error: any) {
            // Alert.alert(error);
        } finally {
            setIsLoading(false);
        }
    }

    // login user function

    const loginUser = async (userData: LoginUser) => {
        setIsLoading(true);
        try {
            const response = await fetch(urlBackendLogin, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(userData)
            });

            const result: UserResultFetch | null = await response.json();
            setUserAuth(result);
            console.log(result);
        } catch (error: any) {
            // Alert.alert(error);
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        loginUser({ password: 'test123', phone: '8012' })
    }, [])


    const value = useMemo(() => ({
        userAuth, isLoading, login: loginUser, register: registerUser,
    }), [userAuth, isLoading]);

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
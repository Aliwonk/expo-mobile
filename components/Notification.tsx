import React, { useEffect, useRef } from "react";
import { Animated, StyleProp, StyleSheet } from "react-native";
import { Text, View } from "./Themed";

type PropsNotification = {
    hide: boolean,
    text: string | null | undefined;
}

export const Notification: React.FC<PropsNotification> = ({ hide, text }) => {
    const animLeft = useRef(new Animated.Value(0)).current;
    const animeOpacity = useRef(new Animated.Value(0)).current;

    const hideNotification = () => {
        Animated.parallel([
            Animated.timing(animLeft, {
                toValue: -100,
                delay: 200,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(animeOpacity, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false,
            })
        ]).start();
    }

    const showNotification = () => {
        Animated.parallel([
            Animated.timing(animLeft, {
                toValue: 0,
                duration: 500,
                useNativeDriver: false
            }),
            Animated.timing(animeOpacity, {
                toValue: 1,
                duration: 300,
                useNativeDriver: false,
            })
        ]).start();
    }

    if (hide) {
        hideNotification();
    } else {
        showNotification();
    }

    return (
        <Animated.View style={{
            ...styles.notification,
            left: animLeft.interpolate({
                inputRange: [-100, 0],
                outputRange: ['-100%', '0%']
            }),
            opacity: animeOpacity
        }}>
            <Text style={styles.text}>{text}</Text>
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    notification: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: 'auto',
        height: 40,
        paddingLeft: 10,
        paddingRight: 10,
        position: 'absolute',
        top: 55,
        left: -1,
        borderRadius: 5,
        borderColor: 'grey',
        borderWidth: 0.5,
    },
    text: {
        color: 'black',
    }
})
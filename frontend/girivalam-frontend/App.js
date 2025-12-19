import React, { useState, useEffect } from "react";
import { Platform } from "react-native";
import * as Notifications from "expo-notifications";
import { NavigationContainer } from "@react-navigation/native";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./src/firebaseConfig";
import StackNavigator from "./src/navigation/StackNavigator";
import AuthStack from "./src/navigation/AuthStack";

// Configure how notifications behave when received
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
    }),
});

export default function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const unsubscribeAuth = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        // Ask for permissions
        (async () => {
            const { status } = await Notifications.requestPermissionsAsync();
            if (status !== "granted") {
                alert("Permission for notifications not granted. Please enable it in settings.");
            }
        })();

        return () => {
            unsubscribeAuth();
        };
    }, []);

    return (
        <NavigationContainer>
            {user ? <StackNavigator /> : <AuthStack />}
        </NavigationContainer>
    );
}

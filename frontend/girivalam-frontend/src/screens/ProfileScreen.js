import React from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { auth } from "../firebaseConfig";
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
    const navigation = useNavigation();

    // Logout Function
    const handleLogout = () => {
        signOut(auth)
            .then(() => {
                Alert.alert("Logged Out", "You have been successfully logged out.");
                // Navigation handled by App.js or auth listener
            })
            .catch((error) => {
                Alert.alert("Logout Failed", error.message);
            });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>

            {/* Full Moon Icon */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FullMoonScreen")}>
                <Image source={require("../../assets/images/full-moon.jpg")} style={styles.icon} />
                <Text style={styles.buttonText}>Full Moon Dates</Text>
            </TouchableOpacity>

            {/* Video Gallery Icon */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("VideoGalleryScreen")}>
                <Ionicons name="videocam-outline" size={30} color="black" />
                <Text style={styles.buttonText}>Video Gallery</Text>
            </TouchableOpacity>

            {/* Feedback Icon */}
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("FeedbackScreen")}>
                <Ionicons name="chatbox-ellipses-outline" size={30} color="black" />
                <Text style={styles.buttonText}>Feedback</Text>
            </TouchableOpacity>

            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                <Ionicons name="log-out-outline" size={30} color="white" />
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#fff" },
    title: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },

    button: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#f1c40f",
        borderRadius: 10,
        marginTop: 20,
        width: "80%",
        justifyContent: "center",
    },
    icon: { width: 30, height: 30, marginRight: 10 },
    buttonText: { fontSize: 16, fontWeight: "bold", color: "black", marginLeft: 10 },

    logoutButton: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        backgroundColor: "#E74C3C",
        borderRadius: 10,
        marginTop: 40,
        width: "80%",
        justifyContent: "center",
    },
    logoutText: { fontSize: 16, fontWeight: "bold", color: "white", marginLeft: 10 },
});

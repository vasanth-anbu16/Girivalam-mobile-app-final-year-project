import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";

export default function LoginScreen() {
    const navigation = useNavigation();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async () => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            setError(err.message);
        }
    };

    return (
        <ImageBackground source={require("../../assets/images/log-sig.jpg")} style={styles.background}>
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                    {error ? <Text style={styles.error}>{error}</Text> : null}

                    <TextInput
                        placeholder="Email"
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                    />

                    {/* Password Input with Eye Icon */}
                    <View style={styles.passwordContainer}>
                        <TextInput
                            placeholder="Password"
                            style={styles.passwordInput}
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={!showPassword}
                        />
                        <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                            <Ionicons
                                name={showPassword ? "eye" : "eye-off"}
                                size={24}
                                color="gray"
                                style={styles.eyeIcon}
                            />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                        <Text style={styles.linkText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    background: { flex: 1, resizeMode: "cover", justifyContent: "center" },
    safeContainer: { flex: 1 },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        paddingTop: 50,  // Added padding to avoid status bar overlap
    },

    title: { fontSize: 26, fontWeight: "bold", color: "white", marginBottom: 20 },
    input: { width: "100%", borderWidth: 1, backgroundColor: "white", padding: 10, marginBottom: 10, borderRadius: 5 },

    passwordContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: "white",
        paddingHorizontal: 10,
        marginBottom: 10,
    },
    passwordInput: { flex: 1, paddingVertical: 10 },
    eyeIcon: { padding: 10 },

    button: { backgroundColor: "#007AFF", padding: 15, borderRadius: 5 },
    buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
    linkText: { marginTop: 10, color: "#FFD700" },
    error: { color: "red", marginBottom: 10 },
});

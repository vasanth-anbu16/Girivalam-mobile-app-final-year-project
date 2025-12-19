import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
    Keyboard,
    TouchableWithoutFeedback,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function FeedbackScreen() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [feedback, setFeedback] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (feedback.trim() === "") {
            Alert.alert("Empty Feedback", "Please enter some feedback.");
            return;
        }

        setLoading(true);

        try {
            const response = await fetch("http://192.168.72.218:5000/api/feedback", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: name.trim() || "Girivalam App User",
                    email: email.trim() || "Not provided",
                    message: feedback,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Alert.alert("Thank You!", data.message || "Your feedback has been submitted.");
                setName("");
                setEmail("");
                setFeedback("");
            } else {
                Alert.alert("Failed", data.error || "Something went wrong.");
            }
        } catch (error) {
            console.error("📡 Feedback Error:", error);
            Alert.alert("Network Error", "Could not send feedback. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}>Your Feedback</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Enter your name"
                    value={name}
                    onChangeText={setName}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Enter your email"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />

                <TextInput
                    style={[styles.input, styles.textArea]}
                    placeholder="Type your feedback here..."
                    multiline
                    numberOfLines={6}
                    value={feedback}
                    onChangeText={setFeedback}
                />

                <TouchableOpacity
                    style={[styles.submitButton, loading && { opacity: 0.7 }]}
                    onPress={handleSubmit}
                    disabled={loading}
                >
                    {loading ? (
                        <ActivityIndicator size="small" color="#fff" />
                    ) : (
                        <>
                            <Ionicons name="send-outline" size={24} color="white" />
                            <Text style={styles.submitText}>Submit</Text>
                        </>
                    )}
                </TouchableOpacity>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: "#fff",
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        borderColor: "#ccc",
        borderWidth: 1,
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        marginBottom: 15,
    },
    textArea: {
        textAlignVertical: "top",
        height: 120,
    },
    submitButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#27ae60",
        padding: 12,
        borderRadius: 10,
        marginTop: 10,
        justifyContent: "center",
    },
    submitText: {
        color: "white",
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
    },
});

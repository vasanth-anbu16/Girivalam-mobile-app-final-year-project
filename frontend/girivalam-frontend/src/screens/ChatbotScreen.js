import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import axios from "axios";

const OPENROUTER_API_URL = "https://openrouter.ai/api/v1/chat/completions";
const API_KEY = "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"; // 🔴 Replace with your OpenRouter API key

const ChatScreen = () => {
    const [messages, setMessages] = useState([]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const flatListRef = useRef(null);

    const sendMessage = async () => {
        if (!userInput.trim()) return;

        const userMsg = { role: "user", content: userInput };
        const newMessages = [...messages, userMsg];
        setMessages(newMessages);
        setUserInput("");
        setLoading(true);

        const systemPrompt = {
            role: "system",
            content: "You are a helpful assistant. Keep your answers short and concise — ideally in 2–3 lines only.",
        };

        try {
            const response = await axios.post(
                OPENROUTER_API_URL,
                {
                    model: "deepseek/deepseek-r1:free", // 🔁 You can change the model here
                    messages: [systemPrompt, ...newMessages],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${API_KEY}`,
                    },
                }
            );

            if (response.status === 200) {
                const botReply = response.data?.choices?.[0]?.message?.content || "I don't know.";
                setMessages([...newMessages, { role: "assistant", content: botReply }]);
            } else {
                console.error("Error: Non-200 status code", response.status);
                setMessages([...newMessages, { role: "assistant", content: "Error: Unable to process request." }]);
            }
        } catch (error) {
            console.error("Chatbot Error:", error);
            setMessages([...newMessages, { role: "assistant", content: "Error connecting to AI." }]);
        }

        setLoading(false);
    };

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => flatListRef.current?.scrollToEnd({ animated: true }), 300);
        }
    }, [messages]);

    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor="#007AFF" barStyle="light-content" />
            <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={{ flex: 1 }}>
                        <FlatList
                            ref={flatListRef}
                            data={messages}
                            keyExtractor={(item, index) => index.toString()}
                            keyboardShouldPersistTaps="handled"
                            renderItem={({ item }) => (
                                <View
                                    style={[
                                        styles.messageBubble,
                                        item.role === "user" ? styles.userBubble : styles.botBubble,
                                    ]}
                                >
                                    <Text style={styles.messageText}>{item.content}</Text>
                                </View>
                            )}
                        />
                        {loading && (
                            <View style={styles.typingIndicator}>
                                <ActivityIndicator size="small" color="#888" />
                                <Text style={{ marginLeft: 5, color: "#888" }}>AI is typing...</Text>
                            </View>
                        )}
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                value={userInput}
                                onChangeText={setUserInput}
                                placeholder="Type a message..."
                                onSubmitEditing={sendMessage}
                                returnKeyType="send"
                            />
                            <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
                                <Text style={styles.sendText}>Send</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

export default ChatScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    container: {
        flex: 1,
        backgroundColor: "#f4f4f4",
    },
    messageBubble: {
        maxWidth: "80%",
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        alignSelf: "flex-start",
        marginHorizontal: 10,
    },
    userBubble: {
        backgroundColor: "#007AFF",
        alignSelf: "flex-end",
    },
    botBubble: {
        backgroundColor: "#34A853",
        alignSelf: "flex-start",
    },
    messageText: {
        color: "#fff",
    },
    inputContainer: {
        flexDirection: "row",
        padding: 10,
        backgroundColor: "#fff",
        borderTopWidth: 1,
        borderColor: "#ddd",
    },
    input: {
        flex: 1,
        padding: 10,
        fontSize: 16,
    },
    sendButton: {
        backgroundColor: "#007AFF",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 5,
        marginLeft: 5,
    },
    sendText: {
        color: "#fff",
        fontWeight: "bold",
    },
    typingIndicator: {
        flexDirection: "row",
        alignItems: "center",
        padding: 10,
        justifyContent: "center",
    },
});

import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Video } from "expo-av";

export default function VideoGalleryScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Tap video to extract </Text>
            <Video
                source={require("../../assets/video.mp4")} // Place your video inside assets folder
                rate={1.0}
                volume={1.0}
                isMuted={false}
                resizeMode="contain"
                shouldPlay
                useNativeControls
                style={styles.video}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "center",
    },
    title: {
        fontSize: 20,
        fontWeight: "bold",
        marginBottom: 20,
    },
    video: {
        width: 300,
        height: 200,
    },
});

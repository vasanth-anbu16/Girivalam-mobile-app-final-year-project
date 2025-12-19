import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default function FootPathScreen() {
    return (
        <View style={styles.container}>
            <Image
                source={require("../../assets/images/girivalam_footpath.jpeg")}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "white",
    },
    image: {
        width: "100%",
        height: "100%",
    },
});

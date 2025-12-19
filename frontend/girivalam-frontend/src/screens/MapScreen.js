import React, { useState, useEffect } from "react";
import { View, StyleSheet, Modal, Text, Image, TouchableOpacity, Alert } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";
import * as Location from "expo-location";
import { useNavigation } from "@react-navigation/native";

export default function MapScreen() {
    const navigation = useNavigation();
    const [userLocation, setUserLocation] = useState(null);
    const [selectedLingam, setSelectedLingam] = useState(null);
    const [showAccuratePath, setShowAccuratePath] = useState(false);

    // 🔍 Helper to calculate distance to Tiruvannamalai (Haversine formula)
    const getDistanceFromTiruvannamalai = (lat1, lon1) => {
        const toRad = (value) => (value * Math.PI) / 180;
        const tiruvannamalai = { latitude: 12.2315, longitude: 79.0696 };
        const R = 6371;
        const dLat = toRad(tiruvannamalai.latitude - lat1);
        const dLon = toRad(tiruvannamalai.longitude - lon1);
        const a =
            Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(toRad(lat1)) *
            Math.cos(toRad(tiruvannamalai.latitude)) *
            Math.sin(dLon / 2) *
            Math.sin(dLon / 2);
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        const distance = R * c;
        return distance;
    };

    // 📍 Get User Location
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                alert("Permission to access location was denied");
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            const { latitude, longitude } = location.coords;

            const distance = getDistanceFromTiruvannamalai(latitude, longitude);
            console.log("Distance from Tiruvannamalai:", distance, "km");

            if (distance <= 5) {
                setUserLocation(location.coords);
            } else {
                setUserLocation(null);
                Alert.alert(
                    "Location Restriction",
                    "You're not in Tiruvannamalai. Foot path from your location is available only when you're there."
                );
            }
        })();
    }, []);

    // 📍 Girivalam Lingam Path
    const girivalamPath = [
        { latitude: 12.231506, longitude: 79.069619, title: "Arunachaleswarar Temple", description: "Main temple of Lord Shiva" },
        { latitude: 12.229787, longitude: 79.070397, title: "Indra Lingam", description: "First lingam of the Girivalam path" },
        { latitude: 12.224236, longitude: 79.059171, title: "Agni Lingam", description: "Represents the fire element" },
        { latitude: 12.226804, longitude: 79.044308, title: "Yama Lingam", description: "Associated with Lord Yama" },
        { latitude: 12.234699, longitude: 79.032167, title: "Niruthi Lingam", description: "Protection from negativity" },
        { latitude: 12.249473, longitude: 79.034859, title: "Varuna Lingam", description: "Represents the water element" },
        { latitude: 12.257845, longitude: 79.047370, title: "Vayu Lingam", description: "Symbolizes the air element" },
        { latitude: 12.255300, longitude: 79.061130, title: "Kubera Lingam", description: "Wealth and prosperity" },
        { latitude: 12.245447, longitude: 79.074045, title: "Eesanya Lingam", description: "Final lingam of the Girivalam path" }
    ];

    const toggleGirivalam = () => {
        setShowAccuratePath(!showAccuratePath);
    };

    return (
        <View style={styles.container}>
            <MapView
                style={styles.map}
                initialRegion={{
                    latitude: 12.231506,
                    longitude: 79.069619,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.05,
                }}
            >
                {/* 📍 User Marker */}
                {userLocation && (
                    <Marker coordinate={userLocation} title="You're Here">
                        <Image source={require("../../assets/images/you-are-here.png")} style={{ width: 40, height: 40 }} />
                    </Marker>
                )}

                {/* 📍 Lingams */}
                {girivalamPath.map((point, index) => (
                    <Marker
                        key={index}
                        coordinate={{ latitude: point.latitude, longitude: point.longitude }}
                        title={point.title}
                        description={point.description}
                        onPress={() => setSelectedLingam(point)}
                    >
                        <Image source={require("../../assets/images/lingam-icon.jpeg")} style={{ width: 30, height: 30 }} />
                    </Marker>
                ))}

                {/* 🔴 Dotted Girivalam Path */}
                {showAccuratePath && (
                    <Polyline coordinates={girivalamPath} strokeColor="red" strokeWidth={3} lineDashPattern={[5, 10]} />
                )}

                {/* 🟢 Dotted Line: User to Start Point */}
                {userLocation && showAccuratePath && (
                    <Polyline coordinates={[userLocation, girivalamPath[0]]} strokeColor="green" strokeWidth={3} lineDashPattern={[5, 10]} />
                )}
            </MapView>

            {/* 👣 Foot Path Button */}
            <TouchableOpacity style={styles.footPathButton} onPress={() => navigation.navigate("FootPathScreen")}>
                <Text style={styles.footPathButtonText}>Foot Path</Text>
            </TouchableOpacity>

            {/* ✅ Start/End Girivalam Button */}
            <TouchableOpacity
                style={[styles.startButton, { backgroundColor: showAccuratePath ? "red" : "green" }]}
                onPress={toggleGirivalam}
            >
                <Text style={styles.startButtonText}>{showAccuratePath ? "End Girivalam" : "Start Girivalam"}</Text>
            </TouchableOpacity>

            {/* 🔍 Lingam Info Modal */}
            {selectedLingam && (
                <Modal transparent={true} animationType="slide">
                    <View style={styles.modalContainer}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalTitle}>{selectedLingam.title}</Text>
                            <Text style={styles.modalText}>{selectedLingam.description}</Text>
                            <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedLingam(null)}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
}

// 🌟 Styles
const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { width: "100%", height: "100%" },
    footPathButton: {
        position: "absolute",
        bottom: 90,
        left: "50%",
        transform: [{ translateX: -75 }],
        backgroundColor: "#3498db",
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignItems: "center",
    },
    footPathButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    startButton: {
        position: "absolute",
        bottom: 30,
        left: "50%",
        transform: [{ translateX: -75 }],
        padding: 10,
        borderRadius: 10,
        width: 150,
        alignItems: "center",
    },
    startButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalView: {
        backgroundColor: "white",
        padding: 20,
        borderRadius: 10,
        width: "80%",
        alignItems: "center",
    },
    modalTitle: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    modalText: { fontSize: 14, textAlign: "center", marginBottom: 15 },
    closeButton: { backgroundColor: "#FF5733", padding: 10, borderRadius: 5 },
    closeButtonText: { color: "white", fontWeight: "bold" },
});

import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Share,
    ScrollView,
    Image,
    Linking,
    Dimensions
} from "react-native";
import * as Notifications from "expo-notifications";
import { useNavigation } from "@react-navigation/native";
import { getFullMoonDate } from "../utils/fullMoonCalculator";
import { fetchWeather } from "../utils/weatherAPI";
import { MaterialCommunityIcons, FontAwesome5, Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

const lingamLinks = {
    Indra: "https://arunachaleswarartemple.com/indra-lingam/",
    Agni: "https://arunachaleswarartemple.com/agni-lingam/",
    Yama: "https://arunachaleswarartemple.com/yama-lingam/",
    Niruthi: "https://arunachaleswarartemple.com/niruthi-lingam/",
    Varuna: "https://arunachaleswarartemple.com/varuna-lingam/",
    Vayu: "https://arunachaleswarartemple.com/vayu-lingam/",
    Kubera: "https://arunachaleswarartemple.com/kubera-lingam/",
    Esanya: "https://arunachaleswarartemple.com/esanya-lingam/"
};

const imageSources = [
    require("../../assets/images/tiruvannamalai_.jpg"),
    require("../../assets/images/girivalam3.jpg"),
    require("../../assets/images/girivalam1.jpg"),
    require("../../assets/images/girivalam4.jpg"),
    require("../../assets/images/girivalam10.jpg"),
    require("../../assets/images/girivalam8.jpg"),
    require("../../assets/images/girivalam.jpg"),
];

const HomeScreen = () => {
    const navigation = useNavigation();
    const [fullMoonDate, setFullMoonDate] = useState(null);
    const [countdown, setCountdown] = useState({});
    const [weather, setWeather] = useState(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isReminderSet, setIsReminderSet] = useState(false); // New state

    useEffect(() => {
        const nextFullMoon = getFullMoonDate();
        setFullMoonDate(nextFullMoon);

        const timer = setInterval(() => {
            const now = new Date().getTime();
            const distance = nextFullMoon.getTime() - now;

            if (distance > 0) {
                setCountdown({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
            } else {
                clearInterval(timer);
            }
        }, 1000);

        fetchWeather().then(setWeather);

        return () => clearInterval(timer);
    }, []);

    const toggleReminder = async () => {
        if (!fullMoonDate) return;

        if (isReminderSet) {
            await Notifications.cancelAllScheduledNotificationsAsync();
            alert("Reminder turned off.");
        } else {
            const oneDayBefore = new Date(fullMoonDate);
            oneDayBefore.setDate(oneDayBefore.getDate() - 1);
            oneDayBefore.setHours(9, 0, 0); // Notification at 9:00 AM
            await Notifications.scheduleNotificationAsync({
                content: {
                    title: "Girivalam Reminder",
                    body: `Girivalam is on ${fullMoonDate.toDateString()}.`,
                },
                trigger:  { seconds: 10 },
            });

            alert("Reminder set for one day before Girivalam.");
        }

        setIsReminderSet(!isReminderSet);
    };

    const shareFullMoonDate = async () => {
        if (fullMoonDate) {
            await Share.share({
                message: `Next Girivalam starts on ${fullMoonDate.toDateString()}!`,
            });
        }
    };

    const openLingamDetails = (lingam) => {
        const url = lingamLinks[lingam];
        if (url) {
            Linking.openURL(url);
        } else {
            alert("Lingam details not available.");
        }
    };

    return (
        <SafeAreaView style={styles.safeContainer}>
            <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
                <View style={styles.header}>
                    <Text style={styles.heading}>Next Girivalam</Text>
                </View>

                {weather && (
                    <Text style={styles.weather}>
                        NOW 🌞 {weather.temp}°C  |  {weather.description}
                    </Text>
                )}

                {fullMoonDate && (
                    <Text style={styles.date}>
                        <Text style={styles.bold}>{fullMoonDate.toDateString()}</Text>
                    </Text>
                )}

                {countdown.days !== undefined && (
                    <View style={styles.countdownContainer}>
                        <Text style={styles.startText}>
                            Starts on <Text style={styles.dateText}>{fullMoonDate.toDateString()} {fullMoonDate.toLocaleTimeString()}</Text>
                        </Text>
                        <View style={styles.timerContainer}>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeText}>{countdown.days}</Text>
                                <Text style={styles.label}>Days</Text>
                            </View>
                            <Text style={styles.separator}>:</Text>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeText}>{countdown.hours}</Text>
                                <Text style={styles.label}>Hours</Text>
                            </View>
                            <Text style={styles.separator}>:</Text>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeText}>{countdown.minutes}</Text>
                                <Text style={styles.label}>Minutes</Text>
                            </View>
                            <Text style={styles.separator}>:</Text>
                            <View style={styles.timeBlock}>
                                <Text style={styles.timeText}>{countdown.seconds}</Text>
                                <Text style={styles.label}>Seconds</Text>
                            </View>
                        </View>
                    </View>
                )}

                <View style={styles.inlineButtons}>
                    <TouchableOpacity onPress={toggleReminder} style={styles.inlineButton}>
                        <MaterialCommunityIcons
                            name={isReminderSet ? "bell-ring" : "bell-outline"}
                            size={18}
                            color="#333"
                        />
                        <Text style={styles.inlineButtonText}>
                            {isReminderSet ? "Reminder On" : "Set Reminder"}
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={shareFullMoonDate} style={styles.inlineButton}>
                        <FontAwesome5 name="share-alt" size={16} color="#333" />
                        <Text style={styles.inlineButtonText}>Share</Text>
                    </TouchableOpacity>
                </View>

                <Text style={styles.glanceHeading}>Girivalam At Glance</Text>
                <Text style={styles.glanceText}>
                    Arunachaleshwarar Temple is one of the pancha bhootha sthalam (Agni Sthalam)
                    at Tiruvannamalai, Tamil Nadu, India. It is believed that Lord Shiva Himself
                    is in the form of Hills and is also called Annamalaiyar. Devotees who practice
                    girivalam on every full moon day are blessed to have the darshan of Lord Shiva
                    in the form of Eight lingams.
                </Text>

                <Text style={styles.glanceHeading}>Ashta Lingam</Text>
                <View style={styles.lingamContainer}>
                    {Object.keys(lingamLinks).map((lingam, index) => (
                        <TouchableOpacity key={index} style={styles.lingamBox} onPress={() => openLingamDetails(lingam)}>
                            <Text style={styles.lingamText}>{lingam}</Text>
                        </TouchableOpacity>
                    ))}
                </View>

                <Text style={styles.glanceHeading}>Eternal Beauty of Arunachala </Text>
                <ScrollView
                    horizontal
                    pagingEnabled
                    showsHorizontalScrollIndicator={false}
                    style={styles.imageSliderContainer}
                    onScroll={(event) => {
                        const contentOffsetX = event.nativeEvent.contentOffset.x;
                        const viewWidth = Dimensions.get('window').width - 40;
                        const index = Math.floor(contentOffsetX / viewWidth);
                        setCurrentImageIndex(index);
                    }}
                    scrollEventThrottle={200}
                >
                    {imageSources.map((image, index) => (
                        <Image
                            key={index}
                            source={image}
                            style={styles.imageSlide}
                        />
                    ))}
                </ScrollView>

                <View style={styles.paginationContainer}>
                    {imageSources.map((_, index) => (
                        <View
                            key={index}
                            style={[
                                styles.paginationDot,
                                index === currentImageIndex ? styles.activePaginationDot : styles.inactivePaginationDot,
                            ]}
                        />
                    ))}
                </View>

                <View style={styles.deepamSection}>
                    <Text style={styles.glanceHeading}>Deepam Festival</Text>
                    <View style={styles.deepamTextContainer}>
                        <Text style={styles.glanceText}>
                            Tiruvannamalai Karthigai Deepam, an ancient Tamil festival, celebrates Lord Shiva's light manifestation on Arunachala Hill. It symbolizes light over darkness, with roots in Hindu mythology and ancient Tamil literature. The Deepam festival is celebrated for 10 days in the tamil month karthigai.
                        </Text>
                    </View>
                    <View style={styles.clickArrowContainer}>
                        <Text style={styles.clickArrowText}>click the arrow</Text>
                        <TouchableOpacity onPress={() => navigation.navigate("DeepamFestivalScreen")} style={styles.arrowButton}>
                            <Ionicons name="arrow-forward-circle" size={29} color="#4F6F52" />
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={{ marginBottom: 60 }}></View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default HomeScreen;
const styles = StyleSheet.create({
    inlineButtons: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginVertical: 15,
    },
    inlineButton: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#E0E0E0",
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 10,
        marginHorizontal: 10,
    },
    inlineButtonText: {
        fontSize: 16,
        fontWeight: "bold",
        marginLeft: 8,
    },
    safeContainer: { flex: 1, backgroundColor: "#F8F8F8" },
    container: { flex: 1, padding: 20, backgroundColor: "#F8F8F8" },
    scrollContent: { paddingBottom: 20 },
    heading: { fontSize: 24, fontWeight: "bold", marginBottom: 10 },
    weather: { fontSize: 18, marginBottom: 10 },
    date: { fontSize: 18, fontWeight: "bold", marginBottom: 10 },
    countdownContainer: { backgroundColor: "#E8F0E5", padding: 20, borderRadius: 15, alignItems: "center", marginTop: 20 },
    timerContainer: { flexDirection: "row", alignItems: "center", marginTop: 10 },
    timeBlock: { alignItems: "center", paddingHorizontal: 8 },
    timeText: { fontSize: 30, fontWeight: "bold" },
    label: { fontSize: 14 },
    separator: { fontSize: 30, fontWeight: "bold" },
    glanceHeading: { fontSize: 22, fontWeight: "bold", marginBottom: 5, borderBottomWidth: 3, borderBottomColor: "#4F6F52", paddingBottom: 3 },
    glanceText: { fontSize: 16, lineHeight: 26, textAlign: "justify", marginBottom: 15 },
    lingamContainer: { flexDirection: "row", flexWrap: "wrap", justifyContent: "center", marginTop: 10, marginBottom: 10 },
    lingamBox: { backgroundColor: "#E0E0E0", paddingVertical: 10, paddingHorizontal: 20, borderRadius: 10, margin: 5 },
    lingamText: { fontSize: 16, fontWeight: "bold", textAlign: "center" },
    image: { width: "100%", height: 200, resizeMode: "cover", marginTop: 20, borderRadius: 10 },
    deepamSection: { marginTop: 20 },
    deepamTextContainer: { marginBottom: 10 },
    clickArrowContainer: { flexDirection: 'row', alignItems: 'center', alignSelf: 'flex-end', marginTop: 5 },
    clickArrowText: { marginRight: 8, fontSize: 16 },
    arrowButton: { padding: 5 },
    imageSliderContainer: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        marginTop: 20,
        marginBottom: 10,
    },
    imageSlide: {
        width: Dimensions.get('window').width - 40,
        height: 200,
        resizeMode: "cover",
        borderRadius: 10,
        marginRight: 10,
    },
    paginationContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
    paginationDot: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 5,
    },
    activePaginationDot: {
        backgroundColor: '#4F6F52',
    },
    inactivePaginationDot: {
        backgroundColor: '#D3D3D3',
    },
});

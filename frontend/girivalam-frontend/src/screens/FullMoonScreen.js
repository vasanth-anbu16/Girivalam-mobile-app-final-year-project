import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const fullMoonDates = [
    {
        month: "April 2025",
        dates: [
            { from: "Sat, Apr 12", timeFrom: "03:22 AM", to: "Sun, Apr 13", timeTo: "05:53 AM" },
        ],
    },
    {
        month: "May 2025",
        dates: [
            { from: "Sun, May 11", timeFrom: "08:02 PM", to: "Mon, May 12", timeTo: "10:25 PM" },
        ],
    },
    {
        month: "June 2025",
        dates: [
            { from: "Tue, Jun 10", timeFrom: "11:36 AM", to: "Wed, Jun 11", timeTo: "01:13 PM" },
        ],
    },
    {
        month: "July 2025",
        dates: [
            { from: "Thu, Jul 10", timeFrom: "01:37 AM", to: "Fri, Jul 11", timeTo: "02:06 AM" },
        ],
    },
    {
        month: "August 2025",
        dates: [
            { from: "Fri, Aug 8", timeFrom: "02:12 PM", to: "Sat, Aug 9", timeTo: "01:25 PM" },
        ],
    },
    {
        month: "September 2025",
        dates: [
            { from: "Sun, Sep 7", timeFrom: "01:41 AM", to: "Sun, Sep 7", timeTo: "11:38 PM" },
        ],
    },
    {
        month: "October 2025",
        dates: [
            { from: "Mon, Oct 6", timeFrom: "02:24 PM", to: "Tue, oct 7", timeTo: "09:17 PM" },
        ],
    },
    {
        month: "November 2025",
        dates: [
            { from: "Tue, Nov 4", timeFrom: "10:36 AM", to: "Wed, Nov 5", timeTo: "06:49 PM" },
        ],
    },
    {
        month: "December 2025",
        dates: [
            { from: "Thu, Dec 4", timeFrom: "08:37 AM", to: "Fri, Dec 5", timeTo: "04:44 PM" },
        ],
    },
];

export default function FullMoonScreen() {
    return (
        <View style={styles.container}>
            <FlatList
                data={fullMoonDates}
                keyExtractor={(item) => item.month}
                renderItem={({ item }) => (
                    <View>
                        <Text style={styles.monthText}>{item.month}</Text>
                        <View style={styles.card}>
                            {item.dates.map((date, index) => (
                                <View key={index} style={styles.dateContainer}>
                                    <View style={styles.dateBlock}>
                                        <Text style={styles.dateText}>{date.from}</Text>
                                        <Text style={styles.timeText}>{date.timeFrom}</Text>
                                    </View>
                                    <Text style={styles.toText}>To</Text>
                                    <View style={styles.dateBlock}>
                                        <Text style={styles.dateText}>{date.to}</Text>
                                        <Text style={styles.timeText}>{date.timeTo}</Text>
                                    </View>
                                </View>
                            ))}
                        </View>
                    </View>
                )}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#F5F5F5",
        paddingHorizontal: 10,
        paddingTop: 10,
    },
    monthText: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#0A2F5A",
        marginVertical: 8,
        textAlign: "center",
    },
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        padding: 10,
        marginBottom: 10,
        elevation: 3,
    },
    dateContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingVertical: 10,
    },
    dateBlock: {
        alignItems: "center",
    },
    dateText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0A2F5A",
    },
    timeText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#4F6F52",
    },
    toText: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#333",
        paddingHorizontal: 10,
    },
});

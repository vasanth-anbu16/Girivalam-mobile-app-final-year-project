import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, SafeAreaView, StatusBar, Platform } from 'react-native';

const DeepamFestivalScreen = () => {
    return (
        <SafeAreaView style={styles.safeArea}>
            <ScrollView style={styles.container}>
                <Text style={styles.title}>Karthigai Deepam</Text>

                <View style={styles.eventCard}>
                    <Image source={require('../../assets/images/deepam/day1.jpg')} style={styles.eventImage} />
                    <Text style={styles.eventTitle}>Day 01</Text>
                    <Text style={styles.eventSubtitle}>FLAG HOISTING</Text>
                </View>

                <View style={styles.eventCard}>
                    <Image source={require('../../assets/images/deepam/day2.jpg')} style={styles.eventImage} />
                    <Text style={styles.eventTitle}>Day 02</Text>
                    <Text style={styles.eventSubtitle}>INDRA VIMANA</Text>
                </View>

                <View style={styles.eventCard}>
                    <Image source={require('../../assets/images/deepam/day3.jpg')} style={styles.eventImage} />
                    <Text style={styles.eventTitle}>Day 03</Text>
                    <Text style={styles.eventSubtitle}>SHIMA VAHANA</Text>
                </View>

                <View style={styles.eventCard}>
                    <Image source={require('../../assets/images/deepam/day4.jpg')} style={styles.eventImage} />
                    <Text style={styles.eventTitle}>Day 04</Text>
                    <Text style={styles.eventSubtitle}>KARPAGA VIRCHAHA</Text>
                </View>

                <View style={styles.eventCard}>
                    <Image source={require('../../assets/images/deepam/day5.jpg')} style={styles.eventImage} />
                    <Text style={styles.eventTitle}>Day 05</Text>
                    <Text style={styles.eventSubtitle}>RISHABA VAHANA</Text>

                    <View style={styles.eventCard}>
                        <Image source={require('../../assets/images/deepam/day6.jpg')} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>Day 06</Text>
                        <Text style={styles.eventSubtitle}>SILVER RADHAM</Text>
                    </View>

                    <View style={styles.eventCard}>
                        <Image source={require('../../assets/images/deepam/day7.jpg')} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>Day 07</Text>
                        <Text style={styles.eventSubtitle}>MAHA RADHAM </Text>
                    </View>

                    <View style={styles.eventCard}>
                        <Image source={require('../../assets/images/deepam/day8.jpg')} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>Day 08</Text>
                        <Text style={styles.eventSubtitle}>KUTHIRAI VAHANA </Text>
                    </View>

                    <View style={styles.eventCard}>
                        <Image source={require('../../assets/images/deepam/day9.jpg')} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>Day 09</Text>
                        <Text style={styles.eventSubtitle}>RAVANA VAHANA </Text>
                    </View>

                    <View style={styles.eventCard}>
                        <Image source={require('../../assets/images/deepam/day10.jpg')} style={styles.eventImage} />
                        <Text style={styles.eventTitle}>Day 10</Text>
                        <Text style={styles.eventSubtitle}>MAHA DEEPAM </Text>
                    </View>


                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0, // Adjust padding for Android
    },
    container: {
        padding: 15,
        backgroundColor: '#fff'
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
        color: '#333'
    },
    eventCard: {
        backgroundColor: '#fff',
        padding: 12,
        borderRadius: 12,
        marginBottom: 12,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    eventImage: {
        width: '100%',
        height: 150,
        borderRadius: 10
    },
    eventTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 8,
        textAlign: 'center'
    },
    eventSubtitle: {
        fontSize: 14,
        color: '#555',
        textAlign: 'center',
        marginTop: 4
    },
});

export default DeepamFestivalScreen;

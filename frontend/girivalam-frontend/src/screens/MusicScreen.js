import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    FlatList,
    TouchableOpacity,
    StyleSheet,
    StatusBar,
    Image,
} from 'react-native';
import { Audio } from 'expo-av';
import Slider from '@react-native-community/slider';
import { Ionicons } from '@expo/vector-icons';

const songs = [
    { id: '1', title: 'Om Namah Shivaya', file: require('../../assets/music/om_namah_shivaya.mp3') },
    { id: '2', title: 'Odi Odi Utkalantha', file: require('../../assets/music/Odi-Odi-Utkalantha.mp3') },
    { id: '3', title: 'Om Shiva Mantra', file: require('../../assets/music/om_mantra.mp3') },
];

export default function MusicScreen() {
    const [sound, setSound] = useState(null);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return () => {
            if (sound) {
                sound.unloadAsync();
            }
        };
    }, [sound]);

    async function playSong(song) {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
        }

        const { sound: newSound } = await Audio.Sound.createAsync(
            song.file,
            { shouldPlay: true },
            onPlaybackStatusUpdate
        );

        setSound(newSound);
        setCurrentSong(song.id);
        setIsPlaying(true);
    }

    function onPlaybackStatusUpdate(status) {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            setIsPlaying(status.isPlaying);
        } else {
            if (status.error) {
                console.log(`Playback error: ${status.error}`);
            }
        }
    }

    async function togglePlayPause() {
        if (!sound) return;

        if (isPlaying) {
            await sound.pauseAsync();
        } else {
            await sound.playAsync();
        }
    }

    async function stopSong() {
        if (sound) {
            await sound.stopAsync();
            await sound.unloadAsync();
            setSound(null);
            setCurrentSong(null);
            setIsPlaying(false);
            setPosition(0);
            setDuration(0);
        }
    }

    function formatTime(ms) {
        const totalSec = Math.floor(ms / 1000);
        const mins = Math.floor(totalSec / 60);
        const secs = totalSec % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    return (
        <View style={styles.container}>
            <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
            <Text style={styles.header}> Arunachala Songs  🎧🕉️✨</Text>

            <FlatList
                data={songs}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.songItem,
                            currentSong === item.id && styles.activeSong,
                        ]}
                        onPress={() => playSong(item)}
                    >
                        <Text style={styles.songTitle}>{item.title}</Text>
                    </TouchableOpacity>
                )}
                ListFooterComponent={<View style={{ height: 10 }} />}
            />

            {currentSong && (
                <>
                    <View style={styles.controls}>
                        <TouchableOpacity onPress={togglePlayPause}>
                            <Ionicons
                                name={isPlaying ? 'pause-circle' : 'play-circle'}
                                size={60}
                                color="#4CAF50"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={stopSong} style={styles.stopBtn}>
                            <Ionicons name="stop-circle" size={50} color="#FF5733" />
                        </TouchableOpacity>
                    </View>

                    <View style={styles.progressContainer}>
                        <Text style={styles.timeText}>{formatTime(position)}</Text>
                        <Slider
                            style={{ flex: 1 }}
                            minimumValue={0}
                            maximumValue={duration}
                            value={position}
                            minimumTrackTintColor="#4CAF50"
                            maximumTrackTintColor="#ccc"
                            thumbTintColor="#4CAF50"
                            disabled
                        />
                        <Text style={styles.timeText}>{formatTime(duration)}</Text>
                    </View>
                </>
            )}

            <Image
                source={require('../../assets/images/music_art.jpg')}
                style={styles.albumArt}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        paddingTop: StatusBar.currentHeight || 40,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center',
    },
    songItem: {
        padding: 15,
        backgroundColor: '#eee',
        borderRadius: 8,
        marginBottom: 10,
    },
    activeSong: {
        backgroundColor: '#d1c4e9',
    },
    songTitle: {
        fontSize: 16,
        fontWeight: '500',
        color: '#333',
    },
    controls: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        gap: 20,
    },
    stopBtn: {
        marginLeft: 10,
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
        gap: 10,
    },
    timeText: {
        width: 50,
        textAlign: 'center',
    },
    albumArt: {
        width: '100%',
        height: 220,
        resizeMode: 'cover',
        marginTop: 10,
        borderRadius: 10,
        alignSelf: 'center',
    },
});

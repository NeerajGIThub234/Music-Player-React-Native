import React from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import TrackPlayer, { State, usePlaybackState } from 'react-native-track-player';
import Icon from 'react-native-vector-icons/MaterialIcons';

const ControlCenter: React.FC = () => {
    const playbackState = usePlaybackState();

    // Ensure playbackState.state is defined and handle it accordingly
    const currentPlaybackState = playbackState.state;

    const skipToNext = async () => {
        try {
            await TrackPlayer.skipToNext();
        } catch (error) {
            console.error('Error skipping to next track:', error);
        }
    };

    const skipToPrevious = async () => {
        try {
            await TrackPlayer.skipToPrevious();
        } catch (error) {
            console.error('Error skipping to previous track:', error);
        }
    };

    const togglePlayback = async () => {
        const currentTrack = await TrackPlayer.getCurrentTrack();

        if (currentTrack !== null) {
            try {
                if (currentPlaybackState === State.Paused || currentPlaybackState === State.Ready) {
                    await TrackPlayer.play();
                } else if (currentPlaybackState === State.Playing) {
                    await TrackPlayer.pause();
                }
            } catch (error) {
                console.error('Error toggling playback:', error);
            }
        }
    };

    // Determine the icon name based on playback state
    const iconName = currentPlaybackState === State.Playing ? "pause" : "play-arrow";

    return (
        <View style={styles.container}>
            <Pressable onPress={skipToPrevious}>
                <Icon style={styles.icon} name="skip-previous" size={40} />
            </Pressable>
            <Pressable onPress={togglePlayback}>
                <Icon style={styles.icon} name={iconName} size={75} />
            </Pressable>
            <Pressable onPress={skipToNext}>
                <Icon style={styles.icon} name="skip-next" size={40} />
            </Pressable>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        marginBottom: 56,
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    },
    icon: {
        color: '#FFFFFF',
    },
});

export default ControlCenter;

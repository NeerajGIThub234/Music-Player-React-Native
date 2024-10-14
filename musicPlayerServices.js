import TrackPlayer, { RepeatMode } from 'react-native-track-player';
import { playListData } from './src/constants';

export async function setupPlayer() {
    let isSetup = false;
    try {
        await TrackPlayer.getCurrentTrack();
        isSetup = true;
    } catch (error) {
        await TrackPlayer.setupPlayer();
        isSetup = true;
    } finally {
        return isSetup;
    }
}

export async function addTrack() {
    await TrackPlayer.add(playListData);
    await TrackPlayer.setRepeatMode(RepeatMode.Queue); // Queue play the first song to six and then again first means in loops infinite time
}

export async function playbackService() {
    // Use event names as strings instead of Event constants
    TrackPlayer.addEventListener('remote-pause', () => {
        TrackPlayer.pause();
    });
    TrackPlayer.addEventListener('remote-play', () => {
        TrackPlayer.play();
    });
    TrackPlayer.addEventListener('remote-next', () => {
        TrackPlayer.skipToNext();
    });
    TrackPlayer.addEventListener('remote-previous', () => {
        TrackPlayer.skipToPrevious();
    });
}

import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, StatusBar, ActivityIndicator } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface VideoPlayerScreenProps {
  route: {
    params: {
      videoUrl: string;
    };
  };
  navigation: any;
}

const VideoPlayerScreen: React.FC<VideoPlayerScreenProps> = ({ route, navigation }) => {
  const { videoUrl } = route.params;
  const [loading, setLoading] = useState(true);
  const [paused, setPaused] = useState(false);

  const handleLoad = () => {
    setLoading(false);
  };

  const handleError = (error: any) => {
    console.error('Video error:', error);
  };

  const togglePlayPause = () => {
    setPaused(!paused);
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="close" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        activeOpacity={1}
        style={styles.videoContainer}
        onPress={togglePlayPause}
      >
        <Video
          source={{ uri: videoUrl }}
          style={styles.video}
          resizeMode="contain"
          onLoad={handleLoad}
          onError={handleError}
          paused={paused}
          repeat
        />

        {loading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#F7A10D" />
          </View>
        )}

        {paused && !loading && (
          <View style={styles.playButtonContainer}>
            <Ionicons name="play" size={50} color="#FFFFFF" />
          </View>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 100,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  videoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  playButtonContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
});

export default VideoPlayerScreen; 
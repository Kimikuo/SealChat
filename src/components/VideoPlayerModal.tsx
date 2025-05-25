import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Dimensions } from 'react-native';
import Video from 'react-native-video';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface VideoPlayerModalProps {
  videoUrl: string;
  visible: boolean;
  onClose: () => void;
}

const { width, height } = Dimensions.get('window');

const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({ videoUrl, visible, onClose }) => {
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
    <Modal
      visible={visible}
      animationType="fade"
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={onClose}
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
            controls={false}
            ignoreSilentSwitch="ignore"
            playInBackground={false}
            progressUpdateInterval={250}
            fullscreen={false}
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
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  backButton: {
    position: 'absolute',
    top: 50,
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

export default VideoPlayerModal; 
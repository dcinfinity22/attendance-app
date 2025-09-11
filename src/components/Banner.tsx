import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

// Define the props interface for Banner (optional props for customization)
interface BannerProps {
  imageUrl?: string; // Optional URL or local image path
  text?: string; // Optional text for the banner
  additionalText?: string; // Optional for extra details (e.g., date, location)
}

const Banner: React.FC<BannerProps> = ({ imageUrl = 'https://example.com/banner.jpg', text = 'International Health & Wellness Seminar', additionalText }) => {
  return (
    <View style={styles.container}>
      {/* Use a placeholder image or URI for the banner */}
      <Image
        source={{ uri: imageUrl }} // Replace with actual URL or require a local asset
        style={styles.image}
        resizeMode="cover" // Added for better image fitting
      />
      <Text style={styles.text}>{text}</Text>
      {additionalText && <Text style={styles.additionalText}>{additionalText}</Text>}
      {/* Add more details as in screenshot */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    margin: 10,
    borderRadius: 5,
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 150,
  },
  text: {
    position: 'absolute',
    color: '#000',
    fontSize: 16,
    padding: 10,
  },
  additionalText: {
    position: 'absolute',
    color: '#000',
    fontSize: 12,
    padding: 10,
    bottom: 10, // Position below the main text
    backgroundColor: 'rgba(255, 255, 255, 0.7)', // Semi-transparent background for readability
  },
});

export default Banner;
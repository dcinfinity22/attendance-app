import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { colors } from '../theme';

// Define the props interface for MenuItem
interface MenuItemProps {
  icon: any; // Type 'any' is used for FontAwesome icons; refine with specific types if needed
  title: string;
  onPress?: () => void; // Optional onPress handler for interactivity
}

const MenuItem: React.FC<MenuItemProps> = ({ icon, title, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <FontAwesomeIcon icon={icon} size={18} color="#fff" />
      <Text style={styles.title}>{title}</Text>
      <FontAwesomeIcon icon={faChevronRight} size={18} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.panel,
    paddingHorizontal: 16,
    paddingVertical: 10,
    marginVertical: 8,     // top & bottom margin
    marginHorizontal: 16, 
  },
  title: {
    color: '#fff',
    flex: 1,
    marginLeft: 10,
  },
});

export default MenuItem;
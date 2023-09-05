import React from 'react';
import { TouchableOpacity, StyleSheet, GestureResponderEvent, Text } from 'react-native';
import { MOB_COLORS } from '../common/styles';

const BlueButton: React.FC<{ onPress: (event: GestureResponderEvent) => void; text: string }> = ({ onPress, text }) => {
  return <TouchableOpacity onPress={onPress}>{<Text style={styles.text}>{text}</Text>}</TouchableOpacity>;
};
const styles = StyleSheet.create({
  text: {
    color: MOB_COLORS.blue,
    fontSize: 14,
    fontWeight: '500',
  },
});
export default BlueButton;

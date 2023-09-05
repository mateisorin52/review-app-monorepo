import React from 'react';
import { TextInput, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { MOB_COLORS } from '../common/styles';

const ReviewInput: React.FC<{
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
  styleProp?: StyleProp<TextStyle>;
}> = ({ onChangeText, value, styleProp, placeholder }) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline
      style={[styles.input, styleProp]}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    borderBottomWidth: 1,
    borderColor: MOB_COLORS.grey,
    paddingBottom: 5,
    width: '100%',
    minHeight: 50,
  },
});

export default ReviewInput;

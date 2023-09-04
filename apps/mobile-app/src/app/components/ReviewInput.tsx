import React from 'react';
import { TextInput, StyleSheet } from 'react-native';
import { MOB_COLORS } from '../common/styles';

const ReviewInput: React.FC<{ onChangeText: (value: string) => void }> = ({ onChangeText }) => {
  return <TextInput placeholder="Write an honest review" onChangeText={onChangeText} multiline style={styles.input} />;
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

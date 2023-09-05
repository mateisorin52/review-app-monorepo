import React, { useState } from 'react';
import { TextInput, View, Text, StyleSheet, TextInputChangeEventData, NativeSyntheticEvent } from 'react-native';
import { Icon } from 'react-native-vector-icons/Icon';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { MOB_COLORS } from '../common/styles';

const LoginInput: React.FC<{
  iconName: string;
  placeholder: string;
  onChangeText: (value: string) => void;
  value: string;
}> = ({ iconName, placeholder, onChangeText, value }) => {
  const [isFocused, setIsFocused] = useState(false);
  const handleFocus = () => {
    setIsFocused(true);
  };
  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
    <View
      style={[
        styles.inputContainer,
        {
          borderColor: isFocused ? MOB_COLORS.MobMainColor : MOB_COLORS.grey,
          borderWidth: 1.5,
          borderRadius: 5,
        },
      ]}
    >
      <View style={styles.iconContainer}>
        <MaterialCommunityIcons
          color={isFocused ? MOB_COLORS.MobMainColor : MOB_COLORS.darkGrey}
          name={iconName}
          size={24}
        />
      </View>
      <TextInput
        onChangeText={onChangeText}
        onFocus={handleFocus}
        onBlur={handleBlur}
        style={styles.input}
        placeholder={placeholder}
        autoCapitalize="none"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#c2c2c2',
    backgroundColor: '#F6F7F9',
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '90%',
    marginTop: 20,
  },
  iconContainer: {
    paddingRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 8,
    fontSize: 16,
  },
});
export default LoginInput;

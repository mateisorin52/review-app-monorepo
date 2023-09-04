import React from 'react';
import {
  Button,
  StyleSheet,
  TouchableOpacity,
  Text,
  ActivityIndicator,
  ButtonProps,
  StyleProp,
  RegisteredStyle,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { MOB_COLORS } from '../common/styles';

const BigButton: React.FC<{
  title: string;
  onPress: () => void;
  isLoading?: boolean;
  styleProp?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}> = ({ title, onPress, isLoading, styleProp, textStyle }) => {
  return (
    <TouchableOpacity style={[style.button, styleProp]} onPress={onPress}>
      {isLoading ? (
        <ActivityIndicator size={28} style={style.spinner} color="white" />
      ) : (
        <Text style={[style.buttonText, textStyle]}> {title}</Text>
      )}
    </TouchableOpacity>
  );
};
const style = StyleSheet.create({
  spinner: {
    paddingHorizontal: 20,
  },
  button: {
    marginTop: 20,
    paddingVertical: 15,
    paddingHorizontal: 100,
    backgroundColor: MOB_COLORS.MobMainColor,
    borderRadius: 200,
    height: 60,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 22,
    fontWeight: '600',
  },
});
export default BigButton;

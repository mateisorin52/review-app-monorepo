import { Alert } from 'react-native';

const OkDialog = ({ title, message, onConfirm }) => {
  const showOkDialog = () => {
    Alert.alert(
      title || 'Success',
      message || 'Operation completed successfully',
      [
        {
          text: 'OK',
          onPress: onConfirm || (() => {}),
        },
      ],
      { cancelable: false }
    );
  };

  return showOkDialog();
};

export default OkDialog;

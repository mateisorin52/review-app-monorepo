import { Alert } from 'react-native';

const ConfirmDialog = ({ title, message, onCancel, onConfirm }) => {
  const showConfirmationDialog = () => {
    Alert.alert(
      title || 'Confirmation',
      message || 'Are you sure?',
      [
        {
          text: 'Cancel',
          onPress: onCancel || (() => {}),
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: onConfirm || (() => {}),
        },
      ],
      { cancelable: false }
    );
  };

  return showConfirmationDialog();
};

export default ConfirmDialog;

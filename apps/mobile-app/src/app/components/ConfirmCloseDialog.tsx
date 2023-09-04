import React from 'react';
import { Alert } from 'react-native';

const ConfirmCloseDialog = ({ onCancel, onConfirm, onExitWithoutSave }) => {
  const showConfirmDialog = () => {
    Alert.alert(
      'Confirm',
      'Are you sure you want to exit without saving?',
      [
        { text: 'Cancel', onPress: () => onCancel() || (() => {}), style: 'cancel' },
        { text: 'Save and exit', onPress: () => onConfirm() || (() => {}) },
        {
          text: 'Exit without saving',
          onPress: () => onExitWithoutSave(),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };

  return showConfirmDialog();
};

export default ConfirmCloseDialog;

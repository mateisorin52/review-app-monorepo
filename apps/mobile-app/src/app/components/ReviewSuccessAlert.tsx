import React, { useEffect } from 'react';
import { Alert } from 'react-native';

const ReviewSuccessAlert = ({ onClose }) => {
  const showAlert = () => {
    Alert.alert(
      'Review Saved Successfully!',
      '',
      [
        {
          text: 'OK',
          onPress: () => {
            onClose();
          },
        },
      ],
      { cancelable: false }
    );
  };

  return showAlert(); // Return null because the custom alert won't render any UI
};

export default ReviewSuccessAlert;

import React from 'react';
import { View, StyleSheet } from 'react-native';

const Divider = ({ color, thickness, marginVertical }) => {
  return (
    <View
      style={[
        styles.divider,
        { backgroundColor: color || '#000', height: thickness || 1, marginVertical: marginVertical || 10 },
      ]}
    />
  );
};

const styles = StyleSheet.create({
  divider: {
    alignSelf: 'stretch',
  },
});

export default Divider;

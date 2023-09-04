import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Platform } from 'react-native';
import { MOB_COLORS } from '../common/styles';
import ConfirmDialog from '../components/ConfirmDialog';

const ReviewHeader: React.FC<{ onConfirm: () => void; onClose: () => void }> = ({ onClose, onConfirm }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        style={styles.headerButton}
        onPress={() => {
          onClose();
        }}
      >
        <Text style={styles.headerText}>Close</Text>
      </TouchableOpacity>
      <Text style={styles.headerTitle}>Write a review</Text>
      <TouchableOpacity
        onPress={() => {
          ConfirmDialog({
            message: 'Do you want to save the review?',
            onCancel: onClose,
            onConfirm: onConfirm,
            title: 'Save Review',
          });
        }}
        style={styles.headerButton}
      >
        <Text style={styles.headerText}>Save</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerTitle: {
    color: 'white',
  },
  headerButton: {
    paddingVertical: 15,
  },
  headerText: {
    color: 'white',
  },
  authorText: {
    fontSize: 16,
    textTransform: 'capitalize',
    color: 'black',
    fontWeight: '600',
  },
  submitStyle: {
    padding: 0,
    height: 'auto',
    margin: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  submitTextStyle: {
    fontSize: 14,
    margin: 0,
  },
  writeReviewSection: { width: '90%', marginVertical: 20 },
  ratingText: { marginTop: 10, fontSize: 16 },
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  header: {
    backgroundColor: MOB_COLORS.MobMainColor,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingTop: Platform.OS === 'ios' ? 40 : 10,
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default ReviewHeader;

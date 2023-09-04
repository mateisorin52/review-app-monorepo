import React from 'react';
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { MOB_COLORS } from '../common/styles';
import BlueButton from '../components/BlueButton';

const ReviewsHeader: React.FC<{ total: number; rating: number }> = ({ rating, total }) => {
  return (
    <View style={styles.container}>
      <View style={styles.ratingsBox}>
        <View style={styles.yellowBox}>
          <Text style={styles.ratingText}>{rating}</Text>
        </View>
        <Text style={styles.noRatingsText}>{total ? `from ${total} ratings` : 'No reviews'}</Text>
      </View>
      <BlueButton onPress={() => {}} text="View all reviews" />
    </View>
  );
};
const styles = StyleSheet.create({
  ratingsBox: { display: 'flex', flexDirection: 'row', alignItems: 'center' },
  noRatingsText: {
    color: MOB_COLORS.grey,
    marginLeft: 10,
    fontSize: 14,
  },
  ratingText: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: 'black',
  },
  yellowBox: {
    backgroundColor: MOB_COLORS.MobYellow,
    height: 50,
    width: 50,
    borderRadius: 10,
    margin: 5,
    display: 'flex',
    justifyContent: 'center',
  },
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
export default ReviewsHeader;

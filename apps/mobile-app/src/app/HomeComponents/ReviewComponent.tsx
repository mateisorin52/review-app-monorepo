import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MOB_COLORS } from '../common/styles';
import StarRating from './StarRating';
import TimeAgo from '@andordavoti/react-native-timeago';

const ReviewComponent: React.FC<{ author: string; stars: number; date: Date; reviewText }> = ({
  author,
  date,
  reviewText,
  stars,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image
          source={require('../assets/head2.jpg')} // Replace with the path to your image
          style={styles.image} // Customize the image styles as needed
        />
      </View>
      <View style={styles.reviewInfoContainer}>
        <Text style={styles.reviewAuthor}>{author}</Text>
        <View style={styles.authorReviewContainer}>
          <StarRating initialRating={stars} size={15} />
          <Text style={styles.timeAgoText}>
            <TimeAgo dateTo={date} />;
          </Text>
        </View>
        <Text style={styles.reviewText}>{reviewText}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  reviewText: {
    marginRight: 50,
    color: 'black',
    marginTop: 5,
  },
  timeAgoText: {
    marginLeft: 5,
    fontWeight: '300',
    color: MOB_COLORS.darkGrey,
  },
  authorReviewContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  reviewAuthor: {
    textTransform: 'capitalize',
    fontWeight: '600',
    fontSize: 16,
    color: 'black',
  },
  reviewInfoContainer: {
    flex: 7,
    flexDirection: 'column',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 100,
    width: '95%',
    alignSelf: 'center',
  },
  imgContainer: {
    flex: 1,
    borderRadius: 40,
    height: 50,
    justifyContent: 'center', // Center the image vertically
    alignItems: 'center', // Center the image horizontally   width: 50, // Customize the image width
    resizeMode: 'cover', // Adjust the image resizeMode as needed
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});

export default ReviewComponent;

import React, { useMemo } from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { MOB_COLORS } from '../common/styles';
import StarRating from './StarRating';
import TimeAgo from '@andordavoti/react-native-timeago';
import BlueButton from '../components/BlueButton';
import { reviewStore } from '../stores/ReviewStore';
import { Review } from '@prisma/client';
import { useGetSelf } from '../../providers/UserQuery';

const ReviewComponent: React.FC<{ review: Review; navigation: any }> = ({ review, navigation }) => {
  const { setSelectedReview } = reviewStore;
  const { data } = useGetSelf();
  const handleStartEditReview = () => {
    navigation.navigate('AddReview');
    setSelectedReview(review);
  };
  const selfReviewsIds = useMemo(() => {
    return data.reviews?.map((item) => item.id);
  }, [data]);
  return (
    <View style={styles.container}>
      <View style={styles.imgContainer}>
        <Image source={require('../assets/head2.jpg')} style={styles.image} />
      </View>
      <View style={styles.reviewInfoContainer}>
        <Text style={styles.reviewAuthor}>{review.displayedName || 'Anonymous'}</Text>
        <View style={styles.authorReviewContainer}>
          <StarRating initialRating={review.stars} size={15} />
          <Text style={styles.timeAgoText}>
            <TimeAgo dateTo={new Date(review.createdAt)} />
          </Text>
        </View>
        <Text style={styles.reviewText}>{review.message}</Text>
        {selfReviewsIds?.includes(review.id) && <BlueButton onPress={handleStartEditReview} text="Edit Review" />}
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
    width: '95%',
    alignSelf: 'center',
  },
  imgContainer: {
    flex: 1,
    borderRadius: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    resizeMode: 'cover',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40,
  },
});

export default ReviewComponent;

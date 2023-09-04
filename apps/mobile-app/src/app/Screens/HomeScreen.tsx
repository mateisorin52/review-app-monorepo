import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { useGetSelf } from '../../providers/UserQuery';
import { MOB_COLORS } from '../common/styles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import ReviewsHeader from '../HomeComponents/ReviewsHeader';
import Divider from '../components/Divider';
import StarRating from '../HomeComponents/StarRating';
import ReviewComponent from '../HomeComponents/ReviewComponent';
import { reviewStore } from '../stores/ReviewStore';
import { observer } from 'mobx-react-lite';
import { ReviewWithUser, useGetReviews } from '../../providers/ReviewQuery';
import BlueButton from '../components/BlueButton';
export const HomeScreen: React.FC<{ navigation; route }> = ({ navigation, route }) => {
  const a = [1, 2, 3];
  const { setSelectedRating, selectedRating, page, setPage } = reviewStore;
  const { data, isFetching } = useGetReviews({ page: page || 1 });
  const [allReviews, setAllReviews] = useState<ReviewWithUser[]>([]);
  const handleNavigateToAddReview = (e) => {
    navigation.navigate('AddReview');
    setSelectedRating(e);
  };
  useEffect(() => {
    if (page === 1 && data) setAllReviews(data.reviews);
    else if (data) setAllReviews((prev) => [...prev, ...data.reviews]);
  }, [data]);
  return (
    <ScrollView>
      <ReviewsHeader rating={data?.avgRating} total={data?.total} />
      <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.5} />
      <StarRating initialRating={selectedRating} onRatingChange={handleNavigateToAddReview} />
      <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.5} />
      {data &&
        (page > 1 ? allReviews : data.reviews)?.map((item, index) => {
          return (
            <View key={item.id}>
              <ReviewComponent
                author={item.user.name}
                date={new Date(item.createdAt)}
                reviewText={item.message}
                stars={item.stars}
              />
              <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.4} />
            </View>
          );
        })}

      {!isFetching && data.hasMore && (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <BlueButton onPress={() => setPage(page + 1)} text="Load More" />
        </View>
      )}
      {isFetching && (
        <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 40 }}>
          <ActivityIndicator />
        </View>
      )}
    </ScrollView>
  );
};

export default observer(HomeScreen);

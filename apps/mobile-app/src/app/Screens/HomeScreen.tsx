import React, { useEffect, useRef, useState } from 'react';
import { View, ScrollView, ActivityIndicator, RefreshControl } from 'react-native';

import { MOB_COLORS } from '../common/styles';
import ReviewsHeader from '../HomeComponents/ReviewsHeader';
import Divider from '../components/Divider';
import StarRating from '../HomeComponents/StarRating';
import ReviewComponent from '../HomeComponents/ReviewComponent';
import { reviewStore } from '../stores/ReviewStore';
import { observer } from 'mobx-react-lite';
import { ReviewWithUser, useGetReviews } from '../../providers/ReviewQuery';
import BlueButton from '../components/BlueButton';
export const HomeScreen: React.FC<{ navigation }> = ({ navigation }) => {
  const { setSelectedRating, selectedRating, page, setPage } = reviewStore;
  const { data, isFetching, isLoading } = useGetReviews({ page: page || 1 });
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
    <ScrollView refreshControl={<RefreshControl refreshing={isLoading} onRefresh={() => setPage(1)} />}>
      <ReviewsHeader rating={data?.avgRating} total={data?.total} />
      <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.5} />
      <StarRating initialRating={selectedRating} onRatingChange={handleNavigateToAddReview} />
      <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.5} />
      {data &&
        (page > 1 ? allReviews : data.reviews)?.map((item, index) => {
          return (
            <View key={item.id}>
              <ReviewComponent review={item} navigation={navigation} />
              <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={0.4} />
            </View>
          );
        })}

      {!isFetching && data?.hasMore && (
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

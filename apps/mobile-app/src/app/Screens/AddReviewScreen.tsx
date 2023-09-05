import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useGetSelf } from '../../providers/UserQuery';
import { MOB_COLORS } from '../common/styles';

import StarRating from '../HomeComponents/StarRating';
import { reviewStore } from '../stores/ReviewStore';
import { mapRatingToText } from '../common/utils';
import { observer } from 'mobx-react-lite';
import ReviewInput from '../components/ReviewInput';
import { useNavigation } from '@react-navigation/native';
import ReviewHeader from '../HomeComponents/ReviewHeader';
import { usePatch, usePost } from '../../providers/QueryClient';
import ReviewSuccessAlert from '../components/ReviewSuccessAlert';
import { useGetReviews } from '../../providers/ReviewQuery';
import ConfirmCloseDialog from '../components/ConfirmCloseDialog';

export const AddReviewScreen: React.FC<{ navigation }> = ({ navigation }) => {
  const { data, error } = useGetSelf();
  const { mutateAsync: postMutateAsync } = usePost(() => {});
  const { mutateAsync: patchMutateAsync } = usePatch(() => {});
  const { goBack } = useNavigation();
  const { refetch } = useGetReviews({ page: 1 });
  const [reviewText, setReviewText] = useState<string>('');
  const [reviewName, setReviewName] = useState<string>('');
  const { selectedRating, setSelectedRating, setPage, setSelectedReview, selectedReview } = reviewStore;
  useEffect(() => {
    if (selectedReview) {
      setReviewName(selectedReview.displayedName);
      setReviewText(selectedReview.message);
      setSelectedRating(selectedReview.stars);
    }
    return () => setSelectedReview(null);
  }, [selectedReview]);
  const confirmSaveReview = async () => {
    const res = selectedReview
      ? await patchMutateAsync({
          endpoint: 'review',
          body: { id: selectedReview.id, stars: selectedRating, message: reviewText, displayedName: reviewName },
        })
      : await postMutateAsync({
          endpoint: 'review',
          body: { stars: selectedRating, message: reviewText, displayedName: reviewName },
        });
    if (res) {
      ReviewSuccessAlert({ onClose: handleCloseSuccess });
    }
  };
  const handleChangeReviewText = (value: string) => setReviewText(value);

  const handleChangeReviewName = (value: string) => setReviewName(value);

  const handleCloseSuccess = async () => {
    setReviewText('');
    setReviewName('');
    setPage(1);
    await refetch();
    goBack();
  };
  const handleConfimClose = () => {
    ConfirmCloseDialog({ onConfirm: confirmSaveReview, onCancel: () => {}, onExitWithoutSave: goBack });
  };
  return (
    <View style={styles.container}>
      <ReviewHeader onClose={handleConfimClose} onConfirm={confirmSaveReview} />
      <StarRating initialRating={selectedRating} onRatingChange={(val) => setSelectedRating(val)} />
      <Text style={styles.ratingText}>{mapRatingToText(selectedRating)}</Text>
      <View style={styles.writeReviewSection}>
        <ReviewInput placeholder={'Name'} value={reviewName} onChangeText={handleChangeReviewName} />
        <ReviewInput placeholder={'Write an honest review'} value={reviewText} onChangeText={handleChangeReviewText} />
      </View>
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
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default observer(AddReviewScreen);

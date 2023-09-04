import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { useGetSelf } from '../../providers/UserQuery';
import { MOB_COLORS } from '../common/styles';
import Divider from '../components/Divider';
import StarRating from '../HomeComponents/StarRating';
import { reviewStore } from '../stores/ReviewStore';
import { mapRatingToText } from '../common/utils';
import { observer } from 'mobx-react-lite';
import ReviewInput from '../components/ReviewInput';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import ReviewHeader from '../HomeComponents/ReviewHeader';
import { usePost } from '../../providers/QueryClient';
import ReviewSuccessAlert from '../components/ReviewSuccessAlert';
import { useGetReviews } from '../../providers/ReviewQuery';
import ConfirmCloseDialog from '../components/ConfirmCloseDialog';

export const AddReviewScreen: React.FC<{ navigation }> = ({ navigation }) => {
  const { data, error } = useGetSelf();
  const { mutateAsync } = usePost(() => {});
  const { goBack } = useNavigation();
  const { refetch } = useGetReviews({ page: 1 });
  const [reviewText, setReviewText] = useState<string>('');
  const { selectedRating, setSelectedRating, setPage } = reviewStore;
  const confirmSaveReview = async () => {
    const res = await mutateAsync({ endpoint: 'review', body: { stars: selectedRating, message: reviewText } });
    if (res) {
      ReviewSuccessAlert({ onClose: handleCloseSuccess });
    }
  };
  const handleChangeReviewText = (value: string) => {
    setReviewText(value);
  };
  const handleCloseSuccess = async () => {
    setReviewText('');
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
      <StarRating
        initialRating={selectedRating}
        onRatingChange={(val) => {
          setSelectedRating(val);
        }}
      />
      <Text style={styles.ratingText}>{mapRatingToText(selectedRating)}</Text>
      <View style={styles.writeReviewSection}>
        <Text style={styles.authorText}>{data?.name}</Text>
        <Divider color={MOB_COLORS.grey} marginVertical={5} thickness={1} />
        <ReviewInput onChangeText={handleChangeReviewText} />
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
    alignItems: 'center',
    paddingHorizontal: 16,
  },
});

export default observer(AddReviewScreen);

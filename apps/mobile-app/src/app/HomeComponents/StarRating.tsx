import { observer } from 'mobx-react-lite';
import React, { useCallback, useEffect, useState } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const StarRating: React.FC<{ initialRating: number; onRatingChange?: (number) => void; size?: number }> = ({
  initialRating,
  onRatingChange,
  size,
}) => {
  const [rating, setRating] = useState(initialRating || 0);

  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleStarPress = (selectedRating: React.SetStateAction<number>) => {
    setRating(selectedRating);
    onRatingChange(selectedRating);
  };

  const renderStars = () => {
    const stars = [];

    for (let i = 1; i <= 5; i++) {
      const starIconName = i <= rating ? 'star' : 'star-o';

      stars.push(
        <TouchableOpacity
          style={{ paddingHorizontal: size / 8 || 7 }}
          key={i}
          onPress={() => onRatingChange && handleStarPress(i)}
          activeOpacity={0.4}
        >
          <Icon name={starIconName} size={size || 37} color="gold" />
        </TouchableOpacity>
      );
    }

    return stars;
  };

  return <View style={styles.starContainer}>{renderStars()}</View>;
};

const styles = StyleSheet.create({
  starContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default observer(StarRating);

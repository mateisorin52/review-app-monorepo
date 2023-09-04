import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';

import { reviewStore } from '../stores/ReviewStore';
import { observer } from 'mobx-react-lite';
import { useGetReviews } from '../../providers/ReviewQuery';
import BigButton from '../components/BigButton';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { useGetSelf } from '../../providers/UserQuery';

export const ProfileScreen: React.FC<{ navigation; route }> = ({ navigation, route }) => {
  const { removeItem } = useAsyncStorage('access_token');
  const { refetch } = useGetSelf();
  const handleLogOut = async () => {
    await removeItem();
    await refetch();
  };
  return (
    <View style={{ display: 'flex', alignItems: 'center' }}>
      <BigButton styleProp={{ width: '90%' }} onPress={handleLogOut} title="Log out" />
    </View>
  );
};

export default observer(ProfileScreen);

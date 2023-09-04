import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity } from 'react-native';
import { usePost } from '../../providers/QueryClient';
import { useGetSelf } from '../../providers/UserQuery';
import { MOB_COLORS } from '../common/styles';
import BigButton from '../components/BigButton';
import ConfirmDialog from '../components/ConfirmDialog';
import LoginInput from '../components/LoginInput';
import OkDialog from '../components/OkDialog';

export const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });
  const [errorFeedBack, setErrorFeebBack] = useState<string>('');
  const { mutateAsync } = usePost();
  const { goBack } = useNavigation();
  const handleRegister = async () => {
    setIsLoading(true);
    delete userData.confirmPassword;
    let res;
    try {
      res = await mutateAsync({ endpoint: 'user/create', body: userData });
    } catch (err) {
      setErrorFeebBack(JSON.parse(err?.message).message[0]);
    }
    if (res) {
      OkDialog({ title: 'Account created successfully!', message: 'Your account is ready.', onConfirm: goBack });
    }
    setIsLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.registerText}>Register</Text>
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, email: val })}
        placeholder="Email"
        iconName="email-outline"
      />
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, name: val })}
        placeholder="Name"
        iconName="account"
      />
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, password: val })}
        placeholder="Password"
        iconName="lock"
      />
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, confirmPassword: val })}
        placeholder="Confirm Password"
        iconName="lock"
      />
      <BigButton title="Register" isLoading={isLoading} onPress={handleRegister} />
      <Text style={styles.error}>{errorFeedBack}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  error: {
    color: 'red',
    margin: 10,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  registerText: {
    fontSize: 32,
    marginTop: 130,
    color: MOB_COLORS.MobMainColor,
  },
});

export default RegisterScreen;

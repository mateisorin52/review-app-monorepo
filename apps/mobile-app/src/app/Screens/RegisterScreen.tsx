import { User } from '@prisma/client';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { usePost } from '../../providers/QueryClient';
import { MOB_COLORS } from '../common/styles';
import BigButton from '../components/BigButton';
import LoginInput from '../components/LoginInput';
import OkDialog from '../components/OkDialog';

export const RegisterScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState<Pick<User, 'email' | 'name' | 'password'>>({
    email: '',
    name: '',
    password: '',
  });
  const [confirmPassword, setConfirmPassword] = useState<string>();
  const [errorFeedBack, setErrorFeebBack] = useState<string>('');
  const { mutateAsync } = usePost();
  const { goBack } = useNavigation();
  const handleRegister = async () => {
    if (userData.password !== confirmPassword) {
      return setErrorFeebBack("Password and confirm password don't match!");
    }
    setIsLoading(true);
    let res;
    res = await mutateAsync({ endpoint: 'user/create', body: userData });
    if (res.statusCode === 400) {
      setErrorFeebBack(res.message[0]);
      return setIsLoading(false);
    }

    if (res.id) {
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
        value={userData.name}
      />
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, name: val })}
        placeholder="Name"
        iconName="account"
        value={userData.name}
      />
      <LoginInput
        onChangeText={(val) => setUserData({ ...userData, password: val })}
        placeholder="Password"
        iconName="lock"
        value={userData.password}
      />
      <LoginInput
        onChangeText={(val) => setConfirmPassword(val)}
        placeholder="Confirm Password"
        iconName="lock"
        value={confirmPassword}
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

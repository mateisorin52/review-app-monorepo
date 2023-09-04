import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { usePost } from '../../providers/QueryClient';
import { useGetSelf } from '../../providers/UserQuery';
import BigButton from '../components/BigButton';
import ConfirmCloseDialog from '../components/ConfirmCloseDialog';
import ConfirmDialog from '../components/ConfirmDialog';
import LoginInput from '../components/LoginInput';

export const LoginScreen = ({ navigation, route }) => {
  const [credentials, setCredentials] = useState<{ name: string; password: string }>({ name: '', password: '' });
  const { setItem, getItem } = useAsyncStorage('access_token');
  const { refetch } = useGetSelf();
  const { mutateAsync, isLoading } = usePost(() => {
    console.log('😭');
  });
  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };

  const handleLogin = async () => {
    const res = await mutateAsync({ endpoint: 'auth/login', body: credentials });

    if (res?.access_token) {
      await setItem(res.access_token);
      await refetch();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      <LoginInput
        onChangeText={(value) =>
          setCredentials((prev) => {
            return { ...prev, name: value };
          })
        }
        placeholder="Email"
        iconName="account"
      />
      <LoginInput
        onChangeText={(value) =>
          setCredentials((prev) => {
            return { ...prev, password: value };
          })
        }
        placeholder="Password"
        iconName="lock"
      />

      <BigButton title="Login" isLoading={isLoading} onPress={handleLogin} />
      <TouchableOpacity style={styles.registerLink} onPress={handleGoToRegister}>
        <Text style={styles.registerText}>Nu ai încă un cont? Înregistrează-te</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  registerLink: {
    position: 'absolute',
    bottom: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  registerText: {
    fontSize: 16,
    color: 'black',
  },
  loginText: {
    fontSize: 32,
  },
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default LoginScreen;

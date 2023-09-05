import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { observer } from 'mobx-react-lite';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, Alert } from 'react-native';
import { usePost } from '../../providers/QueryClient';
import { useGetSelf } from '../../providers/UserQuery';
import BigButton from '../components/BigButton';
import LoginInput from '../components/LoginInput';

export const LoginScreen = ({ navigation, route }) => {
  const [credentials, setCredentials] = useState<{ name: string; password: string }>({ name: '', password: '' });
  const { setItem } = useAsyncStorage('access_token');
  const { refetch, isFetching: isLoadingSelf } = useGetSelf();
  const [feedbackError, setFeedbackError] = useState<string>('');
  const { mutateAsync, isLoading } = usePost(() => {
    console.log('😭');
  });
  const handleGoToRegister = () => {
    navigation.navigate('Register');
  };
  const handleLogin = async () => {
    setFeedbackError('');
    const res = await mutateAsync({ endpoint: 'auth/login', body: credentials });
    if (res?.access_token) {
      await setItem(res.access_token);
      await refetch();
    } else {
      setFeedbackError(res?.message);
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
        value={credentials.name}
        placeholder="Email"
        iconName="account"
      />
      <LoginInput
        onChangeText={(value) =>
          setCredentials((prev) => {
            return { ...prev, password: value };
          })
        }
        value={credentials.password}
        placeholder="Password"
        iconName="lock"
      />
      <BigButton title="Login" isLoading={isLoading || isLoadingSelf} onPress={handleLogin} />
      <Text style={styles.feedbackError}>{feedbackError}</Text>
      <TouchableOpacity style={styles.registerLink} onPress={handleGoToRegister}>
        <Text style={styles.registerText}>Don't have an account yet? Sign Up</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  feedbackError: {
    color: 'red',
    fontSize: 14,
    padding: 10,
  },
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

export default observer(LoginScreen);

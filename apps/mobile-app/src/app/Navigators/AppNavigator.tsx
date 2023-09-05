import React, { useEffect, useRef } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import * as Animatable from 'react-native-animatable';
import HomeScreen from '../Screens/HomeScreen';
import { StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { useGetSelf } from '../../providers/UserQuery';
import LoginScreen from '../Screens/LoginScreen';
import RegisterScreen from '../Screens/RegisterScreen';
import { MOB_COLORS } from '../common/styles';
import AddReviewScreen from '../Screens/AddReviewScreen';
import ProfileScree from '../Screens/ProfileScree';
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeStackNavigator = () => (
  <Stack.Navigator screenOptions={{ animation: 'fade' }}>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="AddReview" options={{ headerShown: false }} component={AddReviewScreen} />
  </Stack.Navigator>
);
const ProfileStackNavigator = () => (
  <Stack.Navigator screenOptions={{ animation: 'fade' }}>
    <Stack.Screen name="Home" component={ProfileScree} />
  </Stack.Navigator>
);
const AppNavigator = () => {
  const self = useGetSelf();
  return (
    <NavigationContainer>
      {self.data ? (
        <TabNavigator />
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};
const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);
  const textRef = useRef(null);
  useEffect(() => {
    if (focused) {
      viewRef.current.animate({
        0: { scale: 0 },
        1: { scale: 1 },
      });
      textRef.current.animate({
        0: { scale: 0 },
        1: { scale: 1 },
      });
    } else {
      viewRef.current.animate({
        0: { scale: 1 },
        1: { scale: 0 },
      });
      textRef.current.animate({
        0: { scale: 1 },
        1: { scale: 0 },
      });
    }
  }, [focused]);
  return (
    <TouchableOpacity activeOpacity={1} onPress={onPress} style={styles.container}>
      <View>
        <Animatable.View
          ref={viewRef}
          animation="zoomIn"
          duration={400}
          style={[StyleSheet.absoluteFillObject, { backgroundColor: MOB_COLORS.MobMainColor, borderRadius: 16 }]}
        />
        <View style={[styles.btn]}>
          <MaterialCommunityIcons name={item.iconName} size={26} color={focused ? 'white' : 'lightgrey'} />
          <Animatable.View duration={400} ref={textRef}>
            {focused && (
              <Text
                style={{
                  color: focused ? 'white' : MOB_COLORS.MobSecColor,
                  paddingHorizontal: 8,
                }}
              >
                {item.name}
              </Text>
            )}
          </Animatable.View>
        </View>
      </View>
    </TouchableOpacity>
  );
};
const tabsArr = [
  { name: 'Acasa', component: HomeStackNavigator, iconName: 'home', size: 32 },
  {
    name: 'Profil',
    component: ProfileStackNavigator,
    iconName: 'account',
    size: 32,
  },
];
const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarHideOnKeyboard: true,
        tabBarStyle: {
          bottom: 8,
          alignSelf: 'center',
          width: '90%',
          paddingBottom: 8,
          paddingTop: 8,
          height: 60,
          borderRadius: 16,
          position: 'relative',
          shadowColor: '#171717',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.3,
          shadowRadius: 3,
        },
      }}
    >
      {tabsArr.map((item) => {
        return (
          <Tab.Screen
            key={item.name}
            name={item.name}
            component={item.component}
            options={{
              headerShown: false,
              tabBarIcon: ({ color, size, focused }) => (
                <MaterialCommunityIcons
                  name={item.iconName}
                  color={focused ? MOB_COLORS.MobMainColor : MOB_COLORS.grey}
                  size={item.size}
                />
              ),
              tabBarButton: (props) => <TabButton {...props} item={item} />,
            }}
          />
        );
      })}
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderRadius: 16,
  },
});
export default AppNavigator;

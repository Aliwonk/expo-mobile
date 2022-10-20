/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer, DefaultTheme, DarkTheme, NavigationContainerRef, useNavigationContainerRef } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useRef } from 'react';
import { ColorSchemeName, Pressable, Text } from 'react-native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Colors from '../constants/Colors';
import useColorScheme from '../hooks/useColorScheme';
import ModalScreen from '../screens/ModalScreen';
import NotFoundScreen from '../screens/NotFoundScreen';
import { ProfileStackParamList, RootStackParamList, RootTabParamList, RootTabScreenProps } from '../types';
import LinkingConfiguration from './LinkingConfiguration';
import CartScreen from '../screens/CartScreen';
import HomeScreen from '../screens/HomeScreen';
import ShopsScreen from '../screens/ShopsScren';
import CartSVGIcon from '../assets/icons/Cart_alt.svg';
import HomeSVGIcon from '../assets/icons/Home_alt.svg';
import LocationSVGIcon from '../assets/icons/Location.svg';
import ProfileSVGIcon from '../assets/icons/User_male_circle.svg';
import CoinsSVGIcon from '../assets/icons/Coins.svg';
import MenuSVGIcon from '../assets/icons/Circle_menu.svg';
import ProfileScreen from '../screens/profileScreens/ProfileScreen';
import OrdersScreen from '../screens/profileScreens/OrdersScreen';
import { useAuth } from '../hooks/useAuth';
import AuthScreen from '../screens/AuthScreen';
import RegisterScreen from '../screens/Register';
import { useAppDispatch, useAppSelector } from '../hooks/reduxHooks';
import { RootState } from '../reduxStore/store';

export default function Navigation({ colorScheme }: { colorScheme: ColorSchemeName }) {
  const navigationRef = useNavigationContainerRef<RootStackParamList>();

  return (
    <NavigationContainer
      linking={LinkingConfiguration}
    >
      <RootNavigator />
    </NavigationContainer>
  );
}

/**
 * A root stack navigator is often used for displaying modals on top of all other content.
 * https://reactnavigation.org/docs/modal
 */
const Stack = createNativeStackNavigator<RootStackParamList>();

// type PropsRootNavigator = {
//   navigator: NavigationContainerRef<RootStackParamList> | null
// }

const RootNavigator: React.FC = () => {
  // const userData = useAppSelector((state: RootState) => state.auth.user);
  const userData = true;
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {userData ? (
        <>
          <Stack.Screen name='Root' component={BottomTabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name='NotFound' component={NotFoundScreen} options={{ title: 'Oops!' }} />
        </>
      ) : (
        <>
          <Stack.Group>
            <Stack.Screen name='Auth' component={AuthScreen} />
            <Stack.Screen name='Register' component={RegisterScreen} />
          </Stack.Group>
        </>
      )}
    </Stack.Navigator>
  );
}
const ProfileStack = createNativeStackNavigator<ProfileStackParamList>();

const ProfileNavigator: React.FC = () => {
  return (
    <ProfileStack.Navigator initialRouteName='Profile' >
      <ProfileStack.Group screenOptions={{headerShown: false}}>
        <ProfileStack.Screen name='Profile' component={ProfileScreen} />
        <ProfileStack.Screen name='Orders' component={OrdersScreen} />
      </ProfileStack.Group>
    </ProfileStack.Navigator>
  )
}

/**
 * A bottom tab navigator displays tab buttons on the bottom of the display to switch screens.
 * https://reactnavigation.org/docs/bottom-tab-navigator
 */
const BottomTab = createBottomTabNavigator<RootTabParamList>();
const iconSize = {
  width: 18,
  height: 18,
}
function BottomTabNavigator() {
  const colorScheme = useColorScheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 56
        }
      }}>
      <BottomTab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'ГЛАВНАЯ',
          tabBarIcon: () => <HomeSVGIcon width={iconSize.width} height={iconSize.width} />,
        }}
      />
      <BottomTab.Screen
        name="Shops"
        component={ShopsScreen}
        options={({ navigation }: RootTabScreenProps<'Shops'>) => ({
          title: 'ПИЦЕРИИ',
          tabBarIcon: () => <LocationSVGIcon width={iconSize.width} height={iconSize.height} />,
        })}
      />
      <BottomTab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          title: 'КОРЗИНА',
          tabBarIcon: () => {
            return (
              <>
                <Text style={{
                  position: 'absolute',
                  fontSize: 8,
                  top: 30,
                }}>1200</Text>
                <CartSVGIcon width={iconSize.width} height={iconSize.width} />
              </>
            )
          }
        }}
      />
      <BottomTab.Screen
        name='ProfileScreens'
        component={ProfileNavigator}
        options={{
          title: 'ПРОФИЛЬ',
          tabBarIcon: () => <ProfileSVGIcon width={iconSize.width} height={iconSize.height} />
        }}
      />
      <BottomTab.Screen
        name='More'
        component={OrdersScreen}
        options={{
          title: 'Еще',
          tabBarIcon: () => <MenuSVGIcon width={iconSize.width} height={iconSize.height} />
        }}
      />
    </BottomTab.Navigator>
  );
}

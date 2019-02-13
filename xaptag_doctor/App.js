import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator } from 'react-navigation';
import LoginScreen from './src/components/LoginScreen/LoginScreen'
import SignUpScreen from './src/components/SignUpScreen/SignUpScreen'
import ForgotPasswordScreen from './src/components/ForgotPasswordScreen/ForgotPasswordScreen'
import UserProfile from './src/components/UserProfile/UserProfile'
import InfoForm from './src/components/InfoForm/InfoForm'
import HomeScreenNew from './src/components/HomeScreen/HomeScreenNew'
import ScannedUserDetails from './src/components/ScannedUserDetails/ScannedUserDetails'
import ScannedUserDetailsTest from './src/components/ScannedUserDetails/ScannedUserDetailsTest'
import RawReports from './src/components/ScannedUserDetails/RawReports'
import Visits from './src/components/ScannedUserDetails/Visits'

const App = createStackNavigator({
  LoginScreen: {
    screen: LoginScreen
  },
  SignUpScreen: {
    screen: SignUpScreen
  },
  ForgotPasswordScreen: {
    screen: ForgotPasswordScreen
  },
  UserProfile: {
    screen: UserProfile
  },
  InfoForm: {
    screen: InfoForm
  },
  HomeScreenNew: {
    screen: HomeScreenNew
  },
  ScannedUserDetails: {
    screen: ScannedUserDetails
  },
  ScannedUserDetailsTest: {
    screen: ScannedUserDetailsTest
  },
  RawReports: {
    screen: RawReports
  },
  Visits: {
    screen: Visits
  },
})

export default App
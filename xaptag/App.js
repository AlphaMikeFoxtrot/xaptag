/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { createStackNavigator } from 'react-navigation';

/***********SCREENS ************/
import LoginScreen from './src/components/Login/LoginScreen';
import RegisterScreen from './src/components/Register/RegisterScreen';
import ForgotPassword from './src/components/Login/ForgotPassword';
import UserProfileNew from './src/components/UserProfile/UserProfileNew';
import InfoForm from './src/components/InfoForm/InfoForm';
import HomePageNew from './src/components/Home/HomePageNew';
import HomePageNewTwo from './src/components/Home/HomePageNewTwo';
import PreUploadDocument from './src/components/Home/PreUploadDocument'
import SingleCardItem from './src/components/Home/SingleCardItem'
import FormattedDocument from './src/components/FormattedDocs/FormattedDocument'
import MyReports from './src/components/Home/MyReports'
import Prescription from "./src/components/Prescription/Prescription";
import Visits from './src/components/Visits/Visits';

const App = createStackNavigator({
  LoginScreen: { screen: LoginScreen },
  RegisterScreen: { screen: RegisterScreen },
  ForgotPassword: { screen: ForgotPassword },
  UserProfileNew: { screen: UserProfileNew },
  InfoForm: { screen: InfoForm },
  HomePageNew: { screen: HomePageNew },
  HomePageNewTwo: { screen: HomePageNewTwo },
  PreUploadDocument: { screen: PreUploadDocument },
  SingleCardItem: { screen: SingleCardItem },
  FormattedDocument: { screen: FormattedDocument },
  MyReports: { screen: MyReports },
  Prescription: { screen: Prescription },
  Visits: { screen: Visits },
})

export default App;
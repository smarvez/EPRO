import React from 'react';
import { AppRegistry, View, StyleSheet, ScrollView, Text } from 'react-native';
import { Container, Header, Content, Footer, FooterTab, Button, Icon } from 'native-base';
import Home from './src/views/home';
import History from './src/views/history';
import Hormones from './src/views/hormones';
import Login from './src/views/login';
import Workout from './src/views/workout';
import SignUp from './src/views/signup';

const App = () => {

  return(
    <Container>

        <Login />

    </Container>
  )
}

AppRegistry.registerComponent('epro', () => App);

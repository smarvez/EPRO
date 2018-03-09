import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Submit from '../components/submit';
import InputBox from '../components/inputbox';
import SmallInputBox from '../components/smallinputbox';
import SliderVal from  '../components/slider';
import Head from  '../components/header';
import Banner from  '../components/banner';
import TopNav from '../components/topnav';
import BottomNav from '../components/bottomnav';
import ExerciseDetail from '../components/exercisedetail';
import HistoryTable from '../components/historytable';
import DatePicker from '../components/dropdown';
import LoginProgress from '../components/loginprogress';

class Home extends Component {
  constructor(props) {
     super(props)
     this.state = {

       }
  }

  render() {
    return (
        <Container>
          <TopNav />
          <Banner />
          <Content>
            <LoginProgress />
          </Content>
          <Footer>
            <BottomNav/>
          </Footer>
        </Container>
      )
  }

};


export default Home;

import React, { Component } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Container, Header, Left, Body, Right, Grid, Col} from 'native-base';

class PersonalRecords extends Component {

  constructor(props) {
     super(props)
     this.state = {}
  }

  render() {
    return (
        <Container
          style={{paddingTop: -10}}
          backgroundColor={'#FEFFFF'}>
          <Header backgroundColor={'#FEFFFF'}>
            <Grid backgroundColor={'#FEFFFF'}>
              <Col style={{ backgroundColor: '#FEFFFF', height: '100%' }}>
                <Text style={styles.title}>Completed Workouts:</Text>
                <Text style={styles.text}>24</Text>
              </Col>
              <Col style={{ backgroundColor: '#FEFFFF', height: '100%' }}>
                <Text style={styles.title}>Personal Record:</Text>
                <Text style={styles.text}>Pull-Up w/ 60lbs</Text>
              </Col>
            </Grid>
        </Header>
        </Container>
      )
    }
  };

const styles = StyleSheet.create({
  text: {
    textAlign: 'center',
    fontFamily: 'DidactGothic-Regular',
    fontSize: 14,
  },
  title: {
    textAlign: 'center',
    fontFamily: 'DidactGothic-Regular',
    fontSize: 16,
    fontWeight: '700'
  }
})

export default PersonalRecords;

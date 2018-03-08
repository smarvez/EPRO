import React from 'react';
import { Text, View } from 'react-native';

const Banner = () => {

  const {bannerStyle, bannerText} = styles;

  return (
    <View style = {styles.bannerStyle}>
      <Text style = {styles.bannerText}>Hello Ali</Text>
    </View>
  )
}

const styles = {
  bannerStyle: {
      backgroundColor: '#DEF2F1',
      justifyContent: 'center',
      alignItems: 'center',
      height: 53,
  },
  bannerText:{
    fontSize: 20,
    fontFamily: 'DidactGothic-Regular',
  }
}

export default Banner;

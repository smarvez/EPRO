import React, { Component } from 'react';
import { StyleSheet, View, ART, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Container, Header, Footer, Content } from 'native-base';
import Spinner from './spinner';

const {
  Surface,
  Group,
  Rectangle,
  ClippingRectangle,
  LinearGradient,
  Shape,
  Text,
  Path,
  Transform
} = ART;

import {
  max,
  ticks
} from 'd3-array';

import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import * as format from 'd3-format';
import * as axis from 'd3-axis';
import * as path from 'd3-path';

const d3 = {
    scale,
    shape,
    format,
    axis,
    path,
};

import {
    scaleLinear,
    scaleBand,
    scaleTime
}  from 'd3-scale';

const colors = {
    black: 'black',
    blue: 'steelblue',
    brown: 'brown'
}

// const data = [
//     {frequency: 5, letter: 'a'},
//     {frequency: 6, letter: 'b'},
//     {frequency: 4, letter: 'c'},
//     {frequency: 1, letter: 'd'},
//     {frequency: 2, letter: 'e'},
//     {frequency: 3, letter: 'f'}
// ];

class HormoneChart extends Component {
  constructor(props) {
     super(props)
     this.state = {
       isLoading: true,
       data: [],
       estrogen: [],
       progesterone: [],
       day: [],
     }
     this.createBarChart = this.createBarChart.bind(this);
     this.drawLine = this.drawLine.bind(this);
     this.getRandomColor = this.getRandomColor.bind(this);
   };

   async componentDidMount() {
    const response = await fetch('https://e-pro-api.herokuapp.com/hormones/non_hormonal')
    const json = await response.json()
    console.log(json);
    this.setState({
      data: json,
      estrogen: json.map(el => el.estrogen),
      progesterone: json.map(el => el.progesterone),
      day: json.map(el => el.day),
      isLoading: false,
    })
    console.log('yes', this.state.data);
  }

     getRandomColor() {
        return '#' + Math.random().toString(16).substr(-6);
      }

      drawLine(startPoint, endPoint) {
          var path = d3.path.path();
          path.lineTo(startPoint, endPoint);
          return path;
      }

      createBarChart(x, y, w, h) {
          var path = d3.path.path();
          path.rect(x, y, w, h);
          return path;
      }


  render() {
    if (this.state.isLoading === true) {
            return (
                <Spinner  />
            );
        }
    const data = this.state.data;
    // console.log(data);
    // console.log("the state ==" ,this.state.data);
    const screen = Dimensions.get('window');
    const margin = {top: 50, right: 25, bottom: 250, left: 25}
    const width = screen.width - margin.left - margin.right
    const height = screen.height - margin.top - margin.bottom

    const x = d3.scale.scaleBand()
            .rangeRound([0, width])
            .padding(0.1)
            .domain(data.map(d => d.letter))

    const maxFrequency = max(data, d => d.frequency)

    const y0 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

    const y1 = d3.scale.scaleLinear()
            .rangeRound([height, 0])
            .domain([0, maxFrequency])

    const firstLetterX = x(data[0].letter)
    const secondLetterX = x(data[1].letter)
    const lastLetterX = x(data[data.length - 1].letter)
    const labelDx = (secondLetterX - firstLetterX) / 2

    const bottomAxis = [firstLetterX - labelDx, lastLetterX + labelDx]

    const bottomAxisD = d3.shape.line()
                            .x(d => d + labelDx)
                            .y(() => 0)
                            (bottomAxis)

    const leftAxis = ticks(0, maxFrequency, 5)

    const leftAxisD = d3.shape.line()
                        .x(() => bottomAxis[0] + labelDx)
                        .y(d => y0(d) - height)
                        (leftAxis)

    const rightAxis = ticks(0, maxFrequency, 5)

    const rightAxisD = d3.shape.line()
                        .x(() => bottomAxis[1] + labelDx)
                        .y(d => y1(d) - height)
                        (rightAxis)

    const notch = 5
    const labelDistance = 9
    const emptySpace = "";

    return (
        <View>
        <Surface width={screen.width} height={screen.height}>
          <Group x={margin.left} y={margin.top}>
                    <Group x={0} y={height}>
                        <Group key={-1}>
                            <Shape d={bottomAxisD} stroke={colors.black} key="-1"/>
                              {
                                data.map((d, i) =>(
                                  <Group
                                      x={x(d.letter) + labelDx}
                                      y={0}
                                      key={i + 1}
                                  >
                                      <Shape d={this.drawLine(0, notch)} y2={notch} stroke={colors.black}/>
                                      <Text
                                        y={labelDistance}
                                        fill={colors.black}
                                        font="18px helvetica"
                                      >
                                        {d.letter}
                                      </Text>
                                  </Group>
                                ))
                              }
                        </Group>
                        <Group key={-2} >
                            <Shape stroke={colors.black} d={leftAxisD} key="-1"/>
                            {
                                leftAxis.map((d, i) => (
                                    <Group x={0} y={y0(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={-15}
                                            y={-labelDistance}
                                            font="18px helvetica"
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        <Group key={-3} >
                            <Shape stroke={colors.black} d={rightAxisD} key="-1"/>
                            {
                                rightAxis.map((d, i) => (
                                    <Group x={0} y={y1(d)-height} key={i + 1}>
                                        <Shape d={this.drawLine(notch, 0)} stroke={colors.black}/>
                                        <Text
                                            fill={colors.black}
                                            x={-15}
                                            y={-labelDistance}
                                            font="18px helvetica"
                                        >
                                            {d + emptySpace}
                                        </Text>
                                    </Group>
                                ))
                            }
                        </Group>
                        {
                            data.map((d, i) => (
                                <TouchableWithoutFeedback key={i} >
                                    <Shape
                                        d={this.createBarChart(x(d.letter), y0(d.frequency) - height, x.bandwidth(), height - y0(d.frequency))}
                                        fill={this.getRandomColor()}
                                        >
                                    </Shape>
                                </TouchableWithoutFeedback>
                            ))
                        }
                    </Group>
                </Group>

        </Surface>
        </View>
      )
  }
};

const styles = {
  container: {
    margin: 20,
  },
  label: {
    fontSize: 15,
    marginTop: 5,
    fontWeight: 'normal',
  }
};


export default HormoneChart;

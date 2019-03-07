import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'react-visjs-timeline';
import {CAROUSEL1} from './../shopData'

const options = {
    //width: '100%',
    //height: '100%',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 10000000,
    verticalScroll: true,
    autoResize: true,
    //type: 'background',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    },
    groupOrder: 'content',
    
    //editable: true
  }
  

class timeGraph extends Component {
    constructor(input) {
      super();
      this.timeLineItems = [];
      this.groups = [];
      this.state = {
        isLoading : true
      }
    }
    
    isEmpty(obj) {
      for(var key in obj) {
          if(obj.hasOwnProperty(key))
              return false;
      }
      return true;
    }

    convertData(rawDatas) {
      if (this.isEmpty(rawDatas)) return;
      rawDatas.forEach(rawData => {
        let macsn = rawData[0]
        let connectionTimelineDataArr = rawData[1]
        
        //add item to group
        this.groups.push({
          id: macsn,
          content: macsn,
          value: macsn
        })
        connectionTimelineDataArr.forEach(data => {
          let startTime = data[0]
          let endTime = data[1]

          //add item
          this.timeLineItems.push({
            start: new Date(startTime * 1000),
            end: new Date(endTime * 1000),
            //id: macsn,
            group: macsn,
            //content: macsn,
            //type: 'box'
            //type: 'point'
          });
        })
      });
      console.log("Loading finished")
      this.setState({
        isLoading : false
      })
    }

    componentDidMount() {
      this.convertData(this.props.data)
      ReactDOM.findDOMNode(this).children[0].style.visibility = 'visible';
    }

    render() {
      console.log("Render loading : " + this.state.isLoading)
      return (
        <div>
          <h1>Timeline Data</h1>
          {this.state.isLoading ? null : 
            <Timeline
            options={options} 
            items={this.timeLineItems}
            groups={this.groups}
            />
          }
        </div>
      )
    }
  }
  
  export default timeGraph;
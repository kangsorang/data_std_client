import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import Timeline from 'react-visjs-timeline';
const options = {
    //width: '100%',
    //height: '100%',
    stack: false,
    showMajorLabels: true,
    showCurrentTime: true,
    zoomMin: 1000000,
    verticalScroll: true,
    autoResize: true,
    //type: 'background',
    format: {
      minorLabels: {
        minute: 'h:mma',
        hour: 'ha'
      }
    },
    groupOrder: function (a, b) {
      return a.value - b.value;
    },
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
    
    convertData(rawDatas) {
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
import React, { Component } from 'react';
import Timeline from 'react-visjs-timeline';

const options = {
    //width: '100%',
    //height: '100%',
    stack: false,
    //showMajorLabels: true,
    //showCurrentTime: true,
    zoomMin: 1000000,
    //verticalScroll: true,
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
        let reportData = rawData[1];
        //add item to group
        this.groups.push({
          id: macsn,
          content: macsn,
          value: macsn
        })
        reportData.forEach(data => {
          //add item
          this.timeLineItems.push({
            start: new Date(parseInt(data + '000')),
            //end: new Date(parseInt(data + '000') + 80000),//1분 20초를 더한다
            //id: macsn,
            group: macsn,
            type: 'point'
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
      //debugger;
      /*
      var data = '1550879998'
      var data2 = '1550880123'
      this.timeLineItems.push({
        start: new Date(parseInt(data + '000')),
        end: new Date(parseInt(data + '000') + 115000),//1분 55초를 더한다
        id: 1,
        content: 'item 0',
        group: 10,
        //type: 'point'
      });
      this.timeLineItems.push({
        start: new Date(parseInt(data2 + '000')),
        end: new Date(parseInt(data2 + '000') + 115000),//1분 55초를 더한다
        id: 2,
        content: 'item 2',
        group: 10,
        //type: 'point'
      });
      this.timeLineItems.push({
        start: new Date(parseInt(data2 + '000')),
        end: new Date(parseInt(data2 + '000') + 115000),//1분 55초를 더한다
        id: 3,
        content: 'item 3',
        group: 10,
        //type: 'point'
      });
      this.groups = [
        {
          id: 10,
          content: 'Group 1 - a',
          value: 1
          // Optional: a field 'className', 'style', 'order', [properties]
        },
        {
          id: 20,
          content: 'Group 1 - b',
          value: 2
          // Optional: a field 'className', 'style', 'order', [properties]
        }
        // more groups...
      ];
      this.setState({
        isLoading : false
      })
      */
    }

    render() {
      console.log("Render loading : " + this.state.isLoading)
      return this.state.isLoading ? <div>Data Loading... </div> : (
          <div>
            Timeline Data
            <Timeline
                options={options} 
                items={this.timeLineItems}
                groups={this.groups}
            />
          </div>
        );
    }
  }
  
  export default timeGraph;
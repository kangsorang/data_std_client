import React, {
  Component
} from 'react';
import './App.css';
import TimeGraph from './components/timeGraph'
import ReactLoading from 'react-loading';

const GET_DATA_API_URL = "http://localhost:2000/getReportData"

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading : true
    }
  }
  componentDidMount() {
    fetch(`${GET_DATA_API_URL}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong")
        }
      })
      .then(response => {
        setTimeout(() => {
          this.setState({
            data: response,
            isLoading : false
          })  
        }, 1500)
      })
  }

  render() {
    console.log("Loading : " + this.state.isLoading)
    return (
      this.state.isLoading ? 
        (
          <div align="center" height={'100%'}>
            <h1>Data Loading.....</h1>
            <ReactLoading type="spinningBubbles" color="#777" height='400px' width='400px' />
          </div>  
        )
        : 
        (
          <div>
            <TimeGraph data = {this.state.data}></TimeGraph>
          </div>
        )
    )

  }
}

export default App;
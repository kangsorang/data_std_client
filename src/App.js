import React, {
  Component
} from 'react';
import './App.css';
import TimeGraph from './components/timeGraph'

const API_URL = "http://localhost:2000/test"

class App extends Component {
  constructor() {
    super();
    this.state = {
      data: {},
      isLoading : true
    }
  }
  componentDidMount() {
    fetch(API_URL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error("something went wrong")
        }
      })
      .then(response => this.setState({
        data: response,
        isLoading : false
      }))
  }

  render() {
    const reportData = this.state.data;
    return this.state.isLoading ? null : (
      <div className = "App" >
        <TimeGraph data = {reportData}
      /> 
      </div>
    );

  }
}

export default App;
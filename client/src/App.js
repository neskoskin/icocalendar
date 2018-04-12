import React, { Component } from 'react';
import Calendar from './containers/Calendar/Calendar';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">ICO Calendar</h1>
        </header>
        <div className="container">
          <div className="row justify-content-md-center">
            <div className="col-md-12">
              <Calendar />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;

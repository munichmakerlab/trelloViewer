import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    const test = 'Dies ist ein Test.';
    return (
      <div className="App">
        <SwimLane name="Backlog" />
        <SwimLane name="Work in Progress"/>
      </div>
    );
  }
}

class SwimLane extends Component {
  render() {
    return (
      <div className="SwimLane">
        <h1>{this.props.name}</h1>
        <Card />
        <Card />
      </div>
    );
  }
}

class Card extends Component {
  render() {
    return (
      <div className="Card"></div>
    );
  }
}

function User() {
  return (
    <div className="Avatar"></div>
  );
}

export default App;

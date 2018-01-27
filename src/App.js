import React, { Component } from 'react'
import './App.css'
import SwimLane from './components/SwimLane'
import Board from './Board.js'

class App extends Component {
  updateBoard(boardName) {
    this.updateBoardLists(boardName);
    this.updateBoardCards(boardName);
  }

  updateBoardLists(boardName) {
    this.getBoardByName(boardName).updateLists();
  }

  updateBoardCards(boardName) {
    this.getBoardByName(boardName).updateCards();
  }

  getBoardByName(boardName) {
    for (var boardNr in this.state.boards) {
      if (this.state.boards.hasOwnProperty(boardNr)) {
        var board = this.state.boards[boardNr];
        if (board.name === boardName) {
          return board;
        }
      }
    }
    return null;
  }

  constructor() {
    super();
    this.state = {
      boards: [
        new Board('ToDos', '587b4f79ba96ddc77423ec11', 'blue', () => this.forceUpdate()),
        new Board('Network/Servers', '587b5967108d9aca5b061fb7', 'green', () => this.forceUpdate()),
        new Board('3D Printer', '587b598685586f338399bbac', 'lightGreen', () => this.forceUpdate()),
        new Board('Our New Space', '58813467adccf2b6e6ea7200', 'cyan', () => this.forceUpdate()),
      ]
    }
  }

  render() {
    let lanes = [
      {
        name: 'Backlog',
        cards: []
      },
      {
        name: 'In Progress',
        cards: []
      }
    ];

    var lanesComponents = [];
    //Fill in the cards
    lanes.map((lane) => {
      this.state.boards.forEach((board) => {
        let newCards = board.getCardsOnList(lane.name);
        if (newCards) {
          lane.cards = lane.cards.concat(newCards);
        }
      });
      return lane;
    });
    //Generate Lane Components
    for (var laneNr = 0; laneNr < lanes.length; laneNr++) {
      var lane = lanes[laneNr];
      lanesComponents.push(<SwimLane lane={lane} />);
    }

    return (
      <div className="App">{lanesComponents}</div>
    );
  }
}

export default App;

import React, { Component } from 'react';
import './App.css';
import Board from './Board.js';
var NodeTrello = require("node-trello");
var t = new NodeTrello("0b1482a2c26f14282d38da1adeab8098");

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
        if (board.name == boardName) {
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

class SwimLane extends Component {
  render() {
    const lane = this.props.lane
    let cardsComponents = [];

    for (var cardNr = 0; cardNr < lane.cards.length; cardNr++) {
      var card = lane.cards[cardNr];
      cardsComponents.push(<Card card={card} />);
    }

    return (
      <div className="SwimLane">
        <h1>{lane.name}</h1>
        {cardsComponents}
      </div>
    );
  }
}

class Card extends Component {
  constructor() {
    super();
    this.state = {
      expanded: false
    }
  };

  toggleExpand() {
    this.setState({expanded: !this.state.expanded});
  }

  render() {
    const card = this.props.card;
    let expandedContent;
    if (this.state.expanded) {
      let usersComponents = []; 
      for (var memberIdNr = 0; memberIdNr < card.idMembers.length; memberIdNr++) {
        var memberId = card.idMembers[memberIdNr];
        usersComponents.push(<User id={memberId} />);
      }
      expandedContent = [];
      expandedContent.push(<span className="desc">{card.desc}</span>);
      expandedContent.push(<div className="Users">{usersComponents}</div>);
    }

    return (
      <div className={"Card " + card.color} onClick={() => this.toggleExpand()}>
        <span>{card.name}</span>
        {expandedContent}
      </div>
    );
  }
}

class User extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      avatarSource: '',
      userDataFetched: false
    }
  }

  fetchUserData() {
    if (!this.state.avatarSourceFetched) {
      t.get('/1/members/' + this.props.id, {fields: 'avatarHash,username'}, (err, data) => {
        let newStates = {};
        newStates.username = data.username;
        newStates.userDataFetched = true;
        if (data.avatarHash) {
          newStates.avatarSource = 'http://trello-avatars.s3.amazonaws.com/' + data.avatarHash + '/50.png';
        } else {
          newStates.avatarSource = 'https://www.gravatar.com/avatar/null.jpg?size=50';
        }

        this.setState(newStates);
      });
    }
  }

  render() {
    const id = this.props.id;
    this.fetchUserData();
    return (
      <div className="User"><img src={this.state.avatarSource} title={this.state.username}></img></div>
    );
  }
}

export default App;

import React, {Component} from 'react'
var NodeTrello = require("node-trello")
var t = new NodeTrello("0b1482a2c26f14282d38da1adeab8098")

export default class User extends Component {
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
        this.fetchUserData();
        return (
            <div className="User"><img src={this.state.avatarSource} title={this.state.username} alt={this.state.username}></img></div>
        );
    }
}

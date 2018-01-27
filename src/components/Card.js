import React, {Component} from 'react'
import User from './User'

export default class Card extends Component {
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
        if (!card.desc) {
            card.desc = "--No description yet.--";
        }

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

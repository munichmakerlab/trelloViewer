import React, {Component} from 'react'
import Card from './Card'



export default class SwimLane extends Component {
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

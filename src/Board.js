var NodeTrello = require("node-trello");
var t = new NodeTrello("0b1482a2c26f14282d38da1adeab8098");

export default class Board {
    constructor(name, id, color, refreshHandle) {
        this.name = name;
        this.id = id;
        this.color = color;
        this.refresh = refreshHandle;
        this.cards = [];
        this.lists = [];
        this.updateLists();
        this.updateCards();
    }

    updateLists() {
        t.get("1/boards/" + this.id, {lists: "open"}, (err, data) => {this.lists = data.lists; this.refresh()});
    }
    updateCards() {
        t.get("1/boards/" + this.id, {cards: "open"}, (err, data) => {
            this.cards = data.cards;
            for (var cardNr = 0; cardNr < this.cards.length; cardNr++) {
                var card = this.cards[cardNr];
                card.color = this.color;
            }
            this.refresh()
        });
    }

    getListByName(listName) {
        for (var listNr = 0; listNr < this.lists.length; listNr++) {
            var list = this.lists[listNr];
            if (list.name == listName) {
                return list;
            }
        }
        return null;
    }

    getCardsOnList(listName) {
        let list = this.getListByName(listName);
        if (!list) {
            return null;
        }
        let cards = [];
        for (var cardNr in this.cards) {
            if (this.cards.hasOwnProperty(cardNr)) {
                var card = this.cards[cardNr];
                    if (card.idList == list.id) {
                        cards.push(card);
                    }
            }
        }
        return cards;
    }
}

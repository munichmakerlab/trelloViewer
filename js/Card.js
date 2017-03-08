var Card = {
    newCard: function(id) {
        var card = {
            id: id,
            DOMNode: $('<div class="trelloCard"><div class="panel"><div class="panel-heading" data-toggle="collapse" data-target="#' + id + '"></div><div class="panel-body collapse" id="' + id +
                '"><h3>Associated Users:</h3><div class="members"></div><h3>Description:</h3><div class="desc">--no description set--</div><a class="trelloLink" href="">Open in Trello</a></div></div></div>'),
            addUser: function(user) { this.DOMNode.find('.members').append(user.getUserDisplay()); },
            appendTo: function(target) { this.DOMNode.appendTo(target); }
        };

        Object.defineProperty(card, 'name', {
            get: function() {
                return this._name;
            },
            set: function(name) {
                this._name = name;
                this.DOMNode.find('.panel-heading').text(name);
            }
        });

        Object.defineProperty(card, 'desc', {
            get: function() {
                return this._desc;
            },
            set: function(desc) {
                this._desc = desc;
                this.DOMNode.find('.desc').text(desc);
            }
        });

        Object.defineProperty(card, 'color', {
            get: function() {
                return this._color;
            },
            set: function(color) {
                this._color = color;
                this.DOMNode.children().addClass('panel-' + color);
            }
        });

        Object.defineProperty(card, 'shortUrl', {
            get: function() {
                return this._shortUrl;
            },
            set: function(shortUrl) {
                this._shortUrl = shortUrl;
                this.DOMNode.find('.trelloLink').attr("href", shortUrl);
            }
        });

        return card;
    }
}

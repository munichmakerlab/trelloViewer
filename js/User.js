var User = {
    allUsers: {},
    getUser: function(id) {
        var user = {
            id: id,
            fullName: '',
            username: '',
            fetched: false,
            fetch: function() {
                Trello.members.get(this.id, (member) => {
                    this.fullName = member.fullName;
                    this.username = member.username;
                    this.fetched = true;
                    this.updateDomNodes();
                });
            },
            updateDomNodes: function() {
                if (!this.fetched) {
                    this.fetch();
                } else {
                    $('.user-' + this.id).text(this.fullName + '(' + this.username + ')');
                }
            }
        };

        if (!User.allUsers[id]) {
            User.allUsers[id] = user;
        }

        return User.allUsers[id];
    }
};

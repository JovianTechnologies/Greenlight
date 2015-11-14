$(document).ready(function() {
    var model = {
        users: users,
        filteredUsers: users,
        searchTerm: ""
    }

    rivets.formatters.searchUsers = function (term) {
        model.filteredUsers= _.filter(model.users, function (user) {
            return user.FirstName.indexOf(model.searchTerm) >= 0
                    || user.FirstName.indexOf(model.searchTerm) >= 0;
        });

        return term;
    }

    var view = rivets.bind($('body'), model);
});
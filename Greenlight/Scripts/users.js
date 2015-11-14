$(document).ready(function() {
    var model = {
        users: users,
        filteredUsers: users,
        searchTerm: ""
    }
    rivets.formatters.role = function(role) {
        switch (role) {
        case 0:
            return "IBIS Management";
        case 1:
            return "Administrator";
        case 2:
            return "Reg - Reporter";
        default:
            return "Report Consumer";
        }
    }

    rivets.formatters.roleSrc = function(role) {
        switch (role) {
        case 0:
            return "../../Content/images/management.jpg";
        case 1:
            return "Administrator";
        case 2:
            return "Reg - Reporter";
        default:
            return "Report Consumer";
        }
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
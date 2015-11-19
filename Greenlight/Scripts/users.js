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
            return "../../Content/images/admin.jpg";
        case 2:
            return "../../Content/images/reporter.jpg";
        default:
            return "../../Content/images/consumer.jpg";
        }
    }
    rivets.formatters.searchUsers = function (term) {
        model.filteredUsers= _.filter(model.users, function (user) {
            return user.FirstName.toLowerCase().indexOf(model.searchTerm.toLowerCase()) >= 0
                    || user.LastName.toLowerCase().indexOf(model.searchTerm.toLowerCase()) >= 0;
        });

        return term;
    }

    var view = rivets.bind($('body'), model);

    $("#addUserBtn").click(function () {
        $('#addUserForm').submit();
    });

    $(".user-delete-btn").click(function () {
        var idElement = _.find($(this).siblings(), function(el) { return $(el).hasClass("id"); });
        var user = { Id: $(idElement).val() };

        customPrompt.create({
            isPrompt: true,
            messageTitle: "DELETE",
            message: "This action cannot be undone",
            bgcolor: "#E2747E",
            buttonClass: "btn btn-danger",
            buttonText: "Delete",
            iconClass: "fa-times-circle-o",
            success: function () {
                $.ajax({
                    type: "POST",
                    url: '/Administration/DeleteUser',
                    data: JSON.stringify(user),
                    contentType: 'application/json',
                    success: function (result) {
                        location.reload();
                    }
                });
            }
        });

        return false;
    });

});
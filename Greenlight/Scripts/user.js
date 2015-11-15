var model = {
    errors: [],
    test: "test"
}

$(document).ready(function () {

    var view = rivets.bind($('body'), model);

    $('form').submit(function () {
        if (validate()) return true;

        return false;
    });

    $('#clearBtn').click(function() {
        $('form').find("input").val("");
        return false;
    });

    function validate() {
        if ($("#password").val() === "" && model.errors.indexOf(ErrorType.passwordMissingError) === -1 && user.Id === "") {
            model.errors.push(ErrorType.passwordMissingError);
        }

        if ($("#passwordConfirm").val() !== $("#password").val() && model.errors.indexOf(ErrorType.passwordMatchError) === -1 && user.Id === "") {
            model.errors.push(ErrorType.passwordMatchError);
        }

        if ($("#username").val() === "" && model.errors.indexOf(ErrorType.usernameError) === -1) {
            model.errors.push(ErrorType.usernameError);
        }

        return _.isEmpty(model.errors);
    }
});
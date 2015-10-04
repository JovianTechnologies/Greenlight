function loginError() {
    $(document).ready(function() {
        var loginFields = $(".login-field");
        var errorMessagesList = $("#errorMessages");
        var errorMessages = [];
        _.forEach(loginFields, function(field) {
            if ($(field).val() === "") {
                errorMessages.push("The " + field.name + " field cannot be empty");
                $(field).addClass("error");
            } else {
                if ($(field).hasClass("error")) $(field).removeClass(error);
            }

            
        });

        if (_.isEmpty(errorMessages)) {
            $(errorMessagesList).append("<li>Credentials Entered Are Not Correct Please Try Again</li>");
            $(loginFields).addClass("error");
        } else {
            _.forEach(errorMessages, function(message) {
                $(errorMessagesList).append("<li>" + message + ".</li>");
            });
        }
    });
}
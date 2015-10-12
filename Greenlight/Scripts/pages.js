//rivets formatters

//formatter takes an array and returns
//a boolean
rivets.formatters.isEmpty = function (array) {
    if (array.constructor === Array) return _.isEmpty(array);

    return false;
}

rivets.formatters.date = function (value) {
    if (typeof value == "string") {
        var millis = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
        var date = new Date(parseInt(millis));
        if (date != "Invalid Date") {

            return date.customFormat("#YYYY#-#MM#-#DD#");
        }
    }
    return value;
};

//used so that null elements can be evaluated as booleans for rivets attributes
//such as rv-disabled
rivets.formatters.null = function (value) {
    return value == null;
};

//this formatter takes a row of data and removes any property that 
//is not specified in the users settings
rivets.formatters.selectedColumns = function (value) {
    for (var property in value) {
        if (value.hasOwnProperty(property)) {
            if (model.userSettings.headers.indexOf(property) === -1)
                delete value[property];
        }
    }
    return value;
}

//this formatter converts an object into an array
//used for the file data table, so that it can be iterated
//over when using rv-each
rivets.formatters.objectToArray = function (value) {
    var array = _.map(value, function (val) {
        return val;
    });
    return array;
}

//for nested objects
rivets.formatters.objectToArrayOfObjects = function (value) {
    var array = _.map(value, function (val) {
        return { value: val }
    });
    return array;
}

var ErrorType = {
    timePeriodMissingError: "A time period must be selected",
    fileMissingError: "A file must be selected"
}

$(document).ready(function () {
    if(window)
    document.timePeriod;
    //functionality for time period buttons
    $(".time-period").on('click', function () {
        //remove from all other buttons
        $(".time-period").removeClass("time-period-active");

        //attach to this button
        $(this).addClass("time-period-active");

        timePeriod = $(this).attr("id");

        //check to see if the current view has a model and if so, check if it contains
        //errors, if it does then remove them
        if (typeof model !== 'undefined' && typeof model.errors !== 'undefined' && !_.isEmpty(model.errors)) {
            model.errors = [];
        }
    });

    //file selection functionality
    var fileName = $("#fileName");
    var fileNameProxy = ($("#fileNameProxy"));

    $(fileName).trigger("click");
    $(fileName).on("change", function () {
        $(fileNameProxy).val(document.captureForm.fileName.files[0].name);
        $("#result").html("");
    });

    $(fileNameProxy).on("click", function () {
        document.captureForm.fileName.click();
    });

    $("tr").on("click", function () {
        $(this).addClass("row-selected");
        $(this).siblings().removeClass("row-selected");
    });
});

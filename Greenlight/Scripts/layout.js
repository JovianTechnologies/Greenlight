//rivets formatters
rivets.formatters.date = function (value) {
    var millis = value.substring(value.indexOf("(") + 1, value.indexOf(")"));
    var date = new Date(parseInt(millis));
    return date.customFormat("#YYYY#-#MM#-#DD#");
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


rivets.formatters.objectToArrayOfObjects = function (value) {
    var array = _.map(value, function (val) {
        return {value: val}
    });
    return array;
}

$(document).ready(function () {
//    function removeActiveClass() {
//        $('.active').removeClass("active");
//    }

    //highlight correct tab when new view loads
    //removeActiveClass();

    if (window.location.pathname.indexOf("capture") >= 0) {
        $("#captureLink").addClass("active");
    }else if (window.location.pathname.indexOf("viewdata") >= 0) {
        $("#viewDataLink").addClass("active");
        if (window.location.pathname.indexOf("settings") >= 0) {
            $("#manage").addClass("active");
        } else {
            $("#view").addClass("active");
        }
    }
    else if (window.location.pathname.indexOf("correctdata") >= 0) {
        $("#correctDataLink").addClass("active");
    } else {
        $("#homeLink").addClass("active");
    }

    $(document).resize(function() {
        $('.body-div').height(document.height);
    });

    $(".sub-menu > li").on('click', function() {
        $(this).addClass('active').siblings().removeClass("active");
    });
});


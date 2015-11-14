//rivets formatters
//formatter takes an array and returns
//a boolean
rivets.formatters.isEmpty = function (array) {
    if (array.constructor === Array) return _.isEmpty(array);

    return false;
}



rivets.formatters.oppositeBool = function(item) {
    return !item;
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

//date formatting utility function
Date.prototype.customFormat = function (formatString) {
    var YYYY, YY, MMMM, MMM, MM, M, DDDD, DDD, DD, D, hhhh, hhh, hh, h, mm, m, ss, s, ampm, AMPM, dMod, th;
    YY = ((YYYY = this.getFullYear()) + "").slice(-2);
    MM = (M = this.getMonth() + 1) < 10 ? ('0' + M) : M;
    MMM = (MMMM = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"][M - 1]).substring(0, 3);
    DD = (D = this.getDate()) < 10 ? ('0' + D) : D;
    DDD = (DDDD = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"][this.getDay()]).substring(0, 3);
    th = (D >= 10 && D <= 20) ? 'th' : ((dMod = D % 10) == 1) ? 'st' : (dMod == 2) ? 'nd' : (dMod == 3) ? 'rd' : 'th';
    formatString = formatString.replace("#YYYY#", YYYY).replace("#YY#", YY).replace("#MMMM#", MMMM).replace("#MMM#", MMM).replace("#MM#", MM).replace("#M#", M).replace("#DDDD#", DDDD).replace("#DDD#", DDD).replace("#DD#", DD).replace("#D#", D).replace("#th#", th);
    h = (hhh = this.getHours());
    if (h == 0) h = 24;
    if (h > 12) h -= 12;
    hh = h < 10 ? ('0' + h) : h;
    hhhh = h < 10 ? ('0' + hhh) : hhh;
    AMPM = (ampm = hhh < 12 ? 'am' : 'pm').toUpperCase();
    mm = (m = this.getMinutes()) < 10 ? ('0' + m) : m;
    ss = (s = this.getSeconds()) < 10 ? ('0' + s) : s;
    return formatString.replace("#hhhh#", hhhh).replace("#hhh#", hhh).replace("#hh#", hh).replace("#h#", h).replace("#mm#", mm).replace("#m#", m).replace("#ss#", ss).replace("#s#", s).replace("#ampm#", ampm).replace("#AMPM#", AMPM);
};

$(document).ready(function () {
    
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
    

    $("tr").on("click", function () {
        $(this).addClass("row-selected");
        $(this).siblings().removeClass("row-selected");
    });

    //functionality for input file selectors
    window.inputFileSelectorInit = function(fileElement, fileElementProxy) {

        $(fileElement).trigger("click");
        $(fileElement).on("change", function () {
            $(fileElementProxy).val(this.files[0].name);
            $("#result").html("");
        });

        $(fileElementProxy).on("click", function () {
           fileElement.click();
        });
    }
});


$(document).ready(function () {
    var timePeriod;
    //functionality for time period buttons
    $(".time-period").on('click', function () {
        //remove from all other buttons
        $(".time-period").removeClass("time-period-active");

        //attach to this button
        $(this).addClass("time-period-active");

        timePeriod = $(this).attr("id");
    });
    
    //file selection functionality
    var fileName = $("#fileName");
    var fileNameProxy = ($("#fileNameProxy"));

    $(fileName).trigger("click");
    $(fileName).on("change", function() {
        $(fileNameProxy).val(document.captureForm.fileName.files[0].name);
        $("#result").html("");
    });

    $(fileNameProxy).on("click", function() {
        document.captureForm.fileName.click();
    });


    //progress bar functionality
    $("#progressbar").progressbar({ value: 0 });

    var connectionProxy = $.connection.progressHub;
    connectionProxy.client.updatePage = updateProgress;
    var progressNotifier = $.connection.hub;
    
     
    $("#captureBtn").on("click", function () {
        if (validate()) {
            $(this).prop("disabled", true);
            $("#cancelBtn").prop("disabled", false);
            $(".data-log").addClass("no-show");
            progressNotifier.start()
                .done(function() { connectionProxy.server.callLongOperation(); })
                .fail(function() { console.log("Could not connect"); });

        }
    });

    $("#cancelBtn").on("click", function () {
        connectionProxy.server.cancelOperation();
        $("#result").html("");
        $("#captureBtn").prop("disabled", false);
        $(this).prop("disabled", true);
        $(".data-log").removeClass("no-show");
        progressNotifier.stop();
        $("#progressbar").progressbar({ value: 0 });
    });

    function updateProgress(num, message) {
        var result = $("#result");
        result.html(message);
        if (num === 100) {
            $("#captureBtn").prop("disabled", false);
            $("#cancelBtn").prop("disabled", true);
            $(".data-log").removeClass("no-show");
        }
        $("#progressbar").progressbar({ value: num });
    }

    function validate() {
        $("#errorList").html("");
        var errors = [];
        if ($("#fileNameProxy").val() === "") {
            errors.push("A file must be selected.");
        }

        if (timePeriod === undefined) {
            errors.push("A time period must be selected");
        }

        _.forEach(errors, function(error) {
            $("#errorList").append("<li>" + error + "</li>");
        });

        var isValid = _.isEmpty(errors);

        var errorContainer = $("#errors");
        if (!isValid) {
            if($(errorContainer).hasClass("no-show"))
                $(errorContainer).removeClass("no-show");
        } else {
            if (!$(errorContainer).hasClass("no-show"))
                $(errorContainer).addClass("no-show");
        }

        return isValid;
    }

});


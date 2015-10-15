var model = {
    errors: []
};

$(document).ready(function () {
    var view = rivets.bind($("body"), model);

    //progress bar functionality using signalr
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
        if ($("#fileNameProxy").val() === "" && model.errors.indexOf(ErrorType.fileMissingError) === -1) {
            model.errors.push(ErrorType.fileMissingError);
        }

        if (typeof timePeriod === 'undefined' && model.errors.indexOf(ErrorType.timePeriodMissingError) === -1) {
            model.errors.push(ErrorType.timePeriodMissingError);
        }

        return _.isEmpty(model.errors);
    }
});


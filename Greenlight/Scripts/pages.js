$(document).ready(function() {
    document.timePeriod;
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

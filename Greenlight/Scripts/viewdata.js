$(document).ready(function() {
    $('#searchTable').fixedHeaderTable('hide');
    var table = $("#searchTableContainer");
    var viewBtn = $("#viewBtn");
    var deleteBtn = $("#deleteBtn");
    $('#searchBtn').on("click", function () {
        if (validate()) {
            removeNoShow(table);
            removeNoShow(viewBtn);
            removeNoShow(deleteBtn);
        } else {
            addNoShow(table);
            addNoShow(viewBtn);
            addNoShow(deleteBtn);
        }
    });

    $("#cancelBtn").on("click", function() {
        if (!$(table).hasClass("no-show"))
            $(table).addClass("no-show");
    });

    $("tr").on("click", function() {
        $(viewBtn).prop("disabled", false);
    });

    function validate() {
        return $("#fileNameInput").val() !== "" && timePeriod !== undefined;
    }

    function removeNoShow(element) {
        if ($(element).hasClass('no-show'))
            $(element).removeClass("no-show");
    }

    function addNoShow(element) {
        if (!$(element).hasClass('no-show'))
            $(element).addClass("no-show");
    }
});
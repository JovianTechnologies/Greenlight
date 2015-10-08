var correctData = [
    { E1000: "1403 0701", R0000: "828", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "1016600", IE0015: "19867", IE0024: "Elvis Johnson", IE0059: "", IE0017: "", IE0018: "" },
    { E1000: "1403 0701", R0000: "843", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "7004200", IE0015: "28406", IE0024: "Lara Croft", IE0059: "", IE0017: "", IE0018: "" },
    { E1000: "1403 0701", R0000: "843", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "7009800", IE0015: "26573", IE0024: "Arya Stark", IE0059: "", IE0017: "", IE0018: "" }
];


var columnNames = Object.keys(correctData[0]);
model = {
    correctData: correctData,
    columnNames: columnNames
}
$(document).ready(function () {
    var view = rivets.bind($('body'), model);

    appendCorrectionRow();

    $('#searchBtn').on("click", function () {
        if ($("#fileNameInput").val() !== "") {
            $('#correctDataModal').modal('show');
        } else {
            
        }
    });

    $("#addRow").on("click", function () {
        appendCorrectionRow();
    });

    $("#cancelModalBtn").on("click", function () {
        $(".row .input-row").remove();
        $('#correctionForm')[0].reset();
        //add one set of inputs back
        appendCorrectionRow();
    });
    $("#correctModalBtn").on("click", function () {
        var inputRows = $(".input-row");
        var isUpdated = false;
        _.forEach(inputRows, function (row) {
            var dataRow = _.findWhere(model.correctData, { R0000: $(row.children[0]).children()[0].value });
            //check if the row exists
            if (typeof dataRow !== "undefined") {
                var rowIndex = model.correctData.indexOf(dataRow);
                var valueToModify = $(row.children[1]).children()[0].value;
                //check if the data value exists in this row
                if (valueToModify in dataRow) {
                    var newValue = $(row.children[2]).children()[0].value;
                    dataRow[valueToModify] = newValue;
                    var newRow = $.extend(true, {}, dataRow);
                    model.correctData.splice(rowIndex, 1, newRow);

                    isUpdated = true;
                }
            }
        });

        if (isUpdated) {
            prettyBoot.create({
                messageTitle: "Success!",
                message: "Data matched successfully",
                iconClass: "fa-check-circle-o"
            });
        }
        
    });
    $("#resetModalBtn").on("click", function () {
        $('#correctionForm')[0].reset();
    });

    function appendCorrectionRow() {
        var inputRow = document.createElement("div");
        $(inputRow).addClass("row input-row").css({ "margin-top": "10px" });

        $(inputRow).html("<div class='col-md-4'><input class='form-control' /></div>" +
                         "<div class='col-md-4'><input class='form-control' /></div>" +
                         "<div class='col-md-4'><input class='form-control' /></div>");
        $("#correctionForm").append($(inputRow));
        $('#modalBody').scrollTop($('#modalBody')[0].scrollHeight);
    }
});


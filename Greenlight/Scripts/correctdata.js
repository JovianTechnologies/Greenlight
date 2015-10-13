var correctData = [
    { E1000: "1403 0701", R0000: "828", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "1016600", IE0015: "19867", IE0024: "Elvis Johnson", IE0059: "", IE0017: "", IE0018: "" },
    { E1000: "1403 0701", R0000: "843", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "7004200", IE0015: "28406", IE0024: "Lara Croft", IE0059: "", IE0017: "", IE0018: "" },
    { E1000: "1403 0701", R0000: "843", M0001: "XYZ BANK", IE0006: "E0000601", IE0030: "E003001", IE0047: "", IE0035: "", IE0014: "7009800", IE0015: "26573", IE0024: "Arya Stark", IE0059: "", IE0017: "", IE0018: "" }
];


var columnNames = Object.keys(correctData[0]);
model = {
    correctData: correctData,
    columnNames: columnNames,
    logData: []
}

$(document).ready(function () {
    var view = rivets.bind($('body'), model);

    //add two rows of correction inputs
    appendCorrectionRow();
    appendCorrectionRow();

    //set modal to full size of screen
    

    //reset modal size if window changed
    $(window).resize(adjustModalSize);

    $('#searchBtn').on("click", function () {
        if ($("#fileNameInput").val() !== "") {
            $('#correctDataModal').modal('show');
            setTimeout(adjustModalSize, 170);
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

        //used to identify whether or not a row was updated
        //so that a pop up can be displayed after the for each 
        //has completed
        var isUpdated = false;
        _.forEach(inputRows, function (row) {
            var R0000 = $(row.children[0]).children()[0].value;
            var dataRow = _.findWhere(model.correctData, { R0000: R0000});
            //check if the row exists
            if (typeof dataRow !== "undefined") {
                var rowIndex = model.correctData.indexOf(dataRow);
                var valueToModify = $(row.children[1]).children()[0].value;
                //check if the data value exists in this row
                if (valueToModify in dataRow) {
                    var newValue = $(row.children[2]).children()[0].value;
                    dataRow[valueToModify] = newValue;

                    //update model
                    //rivets has issues with updating nested objects
                    //so the row needs to be cut out and a copied
                    //row inserted in its place
                    var newRow = $.extend(true, {}, dataRow);
                    model.correctData.splice(rowIndex, 1, newRow);
                    
                    //store which data was updated on the model
                    model.logData.push("Row modified: " + R0000 + ", Data value modified: " + valueToModify + ", New Value: " + newValue);

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

            //clear form
            $('#correctionForm')[0].reset();
        }
        
    });

    $("#resetModalBtn").on("click", function () {
        $('#correctionForm')[0].reset();
    });

    function appendCorrectionRow() {
        var inputRow = document.createElement("div");
        $(inputRow).addClass("row input-row").css({ "margin-top": "10px" });

        $(inputRow).html("<div class='col-md-4'><input class='form-control' placeholder='Row Id' /></div>" +
                         "<div class='col-md-4'><input class='form-control' placeholder='Data Value To Modify' /></div>" +
                         "<div class='col-md-4'><input class='form-control' placeholder='New Entry' /></div>");
        $("#correctionForm").append($(inputRow));
        $('#modalBody').scrollTop($('#modalBody')[0].scrollHeight);

        
    }

    function adjustModalSize() {
        $('body').css('overflow-x', 'hidden');
        $("#modalContent").width(window.innerWidth - 17);
        $("#modalContent").height(window.innerHeight - 5);
        var modalBodyHeight = window.innerHeight - $("#modalHeader")[0].offsetHeight - $("#modalFooter")[0].offsetHeight - 10;
        $("#modalBody").css('height', (modalBodyHeight) + "px");
        $("#modalBody").css('max-height', modalBodyHeight + "px");
        $("#tableDiv").height("60%");
    }
});


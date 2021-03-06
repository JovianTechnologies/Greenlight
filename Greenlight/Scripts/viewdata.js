﻿var files = [
{ Id: 9, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_1.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false },
{ Id: 94, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_2.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 93, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_3.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 44, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_4.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 37, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_5.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 41, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_6.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 42, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_7.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false},
{ Id: 3, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_8.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false },
{ Id: 7, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_9.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false },
{ Id: 32, "LoadYearMonth": 201412, "InsertDate": "\/Date(1444041150407)\/", "InsertName": "info@ibis-management.com", "UpdateDate": "\/Date(-62135582400000)\/", "UpdateName": null, "Bank_Id": 0, "TypeOfPeriod_Id": 2, "BankLoadStatus": 1, "DataFileName": "2014-12-01_XYZBANK_10.csv", "NumOfRecords": 1072, "ClientId": "XYZ Bank Curacao", delete: false }];

if (sessionStorage.getItem("configData") == null) {
    var dataObject = { headers: [] }
    sessionStorage.setItem("configData", JSON.stringify(dataObject));
}

var model = {
    disabled: true,
    selectedRow: null,
    filesList: _.sortBy(files, function(file) { return file.Id; }),
    fileData: fileData,
    selectedFileName: "",
    userSettings: $.parseJSON(sessionStorage.getItem("configData")),
    errors: [],
    dataLog: []
};

$(document).ready(function () {
   
    rivets.bind($("body"), model);
    
    var table = $("#searchTableContainer");
    var viewBtn = $("#viewBtn");
    var deleteBtn = $("#deleteBtn");
    $('#searchBtn').on("click", function () {
        if (validate()) {
            removeNoShow(table);
            removeNoShow(viewBtn);
            removeNoShow(deleteBtn);
        } else {
            clearData();
        }
    });
    
    $("#cancelBtn").on("click", function() {
        clearData();
    });

    $("tr").on("click", function () {
        $(this).addClass("row-selected");
        $(this).siblings().removeClass("row-selected");
        model.selectedRow = this;
        var row = this.rowIndex - 1;
        model.selectedFileName = model.filesList[row].DataFileName;
    });

    $('#deleteBtn').on('click', function () {
        customPrompt.create({
            isPrompt: true,
            messageTitle: "DELETE",
            message: "This action cannot be undone", 
            bgcolor: "#E2747E", 
            buttonClass: "btn btn-danger", 
            buttonText: "Delete",
            iconClass: "fa-times-circle-o",
            success: function() {
                model.filesList = _.filter(model.filesList, function(file) {
                    return !file.delete;
                });
                    
                if (model.filesList.indexOf(model.selectedRow) == -1) {
                    model.selectedRow = null;
                    $('#files').children().removeClass("row-selected");
                }
            }
        });
    });

    $(".view-type").on('click', function () {
        //remove from all other buttons
        $(".view-type").removeClass("view-type-active");

        //attach to this button
        $(this).addClass("view-type-active");

        timePeriod = $(this).attr("id");

        //check to see if the current view has a model and if so, check if it contains
        //errors, if it does then remove them
        if (typeof model !== 'undefined' && typeof model.errors !== 'undefined' && !_.isEmpty(model.errors)) {
            model.errors = [];
        }
    });

    function removeNoShow(element) {
        if ($(element).hasClass('no-show'))
            $(element).removeClass("no-show");
    }

    function addNoShow(element) {
        if (!$(element).hasClass('no-show'))
            $(element).addClass("no-show");
    }

    function clearData() {
        addNoShow(table);
        addNoShow(viewBtn);
        addNoShow(deleteBtn);
        model.selectedRow = null;
        $('#files').children().removeClass("row-selected");
    }

    function validate() {
        if (typeof timePeriod === 'undefined' && model.errors.indexOf(ErrorType.timePeriodMissingError) === -1) {
            model.errors.push(ErrorType.timePeriodMissingError);
        }

        return _.isEmpty(model.errors);
    }

    
});




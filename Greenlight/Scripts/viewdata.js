var files = [
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
    userSettings: $.parseJSON(sessionStorage.getItem("configData"))
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
        prettyBoot.create({
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

    function clearData() {
        addNoShow(table);
        addNoShow(viewBtn);
        addNoShow(deleteBtn);
        model.selectedRow = null;
        $('#files').children().removeClass("row-selected");
    }

    
});


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


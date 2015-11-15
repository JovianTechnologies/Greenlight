var reportTypes = [
    "Balance Sheet","Profit & loss","Contingent Liabilities ","Sub-report I","Sub-report II","Capital Adquacy Ratio ","Capital ","Risk Weighted Assets ","Risk Weighted Assets Contingent Liabilities ","Derivatives ","Operational Risk Basic Indicator Approach ","Operational Risk Standardized Approach ","Operational Risk Standardized Alternative Approach ","Market Risk Summary ","Interest Rate Specific ","Interest Rate General Market Risk ","Interest Rate General Market Risk Summary ","Equity Position Risk Per National Market - Country ","Equity Position Risk Summary ","Foreign Exchange Risk ","Commodities Risk - Simplified Approach ","Options Risk - Simplified Approach ","Large Exposures ","Large Exposure Branches ","Due From/ To Unconsolidated Affiliates ","Due From/ To Unconsolidated Affiliate Branches ","Credit Extension To Principal Shareholders, Supervisory Directors, Executive Officers And Employees","Credit Extension To Principal Shareholders, Supervisory Directors, Executive Officers And Employees ","Branches ","Liquidity Report ","Gross Net Balance","Maturity Schedule ","Large Depositors ","Savings Deposits ","Overdrawn Current Account Overdrafts ","Delinquent And Non-Performing Loans ","Pledged Assets ","Reserve Requirements ","Short Tem Net Foreign Assets ","Weekly Net Foreign Assets Position ","Domestic Loans ","New Domestic Loans ","Credit Cards and Car Loan","New Domestic Loans By Type And Acceptance ","Maturity Of Time Deposits ","Claims and Liabilities with Other Depository Corporations and Financial ","Institutions ","Break Down of Loans Granted by Collateral Type ","Allocated Loan Loss Provisions ","Interest Rate Reprising ","Country Risk Exposure ","Foreign Loans and Acceptances ","Interest Rates On New Loans ","Interest Rates On New Deposits"
];

var files = [
    { Id: 4301, "DataFileName": "XYZBANK1025010", "ReportName": "", "ReportModel": "MatchSubModelBS_110" },
    { Id: 4392, "DataFileName": "XYZBANK1025012", "ReportName": "", "ReportModel": "MatchSubModelBS_120" },
    { Id: 2303, "DataFileName": "XYZBANK1025013", "ReportName": "", "ReportModel": "MatchSubModelBS_130" },
    { Id: 4493, "DataFileName": "XYZBANK1025014", "ReportName": "", "ReportModel": "MatchSubModelBS_140" },
    { Id: 4305, "DataFileName": "XYZBANK1025015", "ReportName": "", "ReportModel": "MatchSubModelBS_220" },
    { Id: 4306, "DataFileName": "XYZBANK1025016", "ReportName": "", "ReportModel": "MatchSubModelBS_300" }
];

if (sessionStorage.getItem("configData") == null) {
    var dataObject = { headers: [] }
    sessionStorage.setItem("configData", JSON.stringify(dataObject));
}

var model = {
    reportTypes: reportTypes,
    filesList: _.sortBy(files, function (file) { return file.Id; }),
    
};

$(document).ready(function () {
    rivets.bind($("body"), model);

    var table = $("#searchTableContainer");
    var exportBtn = $("#exportBtn");
    var cancelBtn = $("#cancel2Btn");
    
    $('#searchBtn').on("click", function () {
        removeNoShow(table);
        removeNoShow(exportBtn);
        removeNoShow(cancelBtn);
    });

    $("#cancelBtn").on("click", function () {
        clearData();
    });

    $('#cancel2Btn').on('click', function () {
        clearData();
    });

    $("#exportBtn").on('click', function () {
        var string = "Data Load ID,	Data File Name,	Report Name,	Report Model\n";
        _.forEach(model.filesList, function (file) {
            string += file["Id"] + "," + file["DataFileName"] + "," + file["ReportName"] + "," + file["ReportModel"] + "\n";
        });
        download(Date.now().toString() + ".csv", string);
    });

    $("#selectReport").change(function() {
        var text = $("#selectReport :selected").text();
        _.forEach(model.filesList, function(file) {
            file.ReportName = text;
        });
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
        addNoShow(exportBtn);
        addNoShow(cancelBtn);
        model.selectedRow = null;
        $('#files').children().removeClass("row-selected");
    }

    //YearMonth pick
    $("#datepicker").datepicker({ dateFormat: "yymm" });

    $('#dateContainer').append($('#ui-datepicker-div'));

    $('#calendarIcon').click(function () {
        $("#datepicker").datepicker("show");
    });
   
    function download(filename, text) {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }
});




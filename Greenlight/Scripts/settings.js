var model = {
    dataConfigurations: [
        { Number: 1, Header: "R0000", Description: "Row Number", isSelected: false },
        { Number: 2, Header: "M0000", Description: "Client Number", isSelected: false },
        { Number: 3, Header: "M0001", Description: "Entity ID", isSelected: false },
        { Number: 4, Header: "M0002", Description: "Data and Time Data Supply", isSelected: false },
        { Number: 5, Header: "M0003", Description: "Year", isSelected: false },
        { Number: 6, Header: "M0004", Description: "Month", isSelected: false },
        { Number: 7, Header: "M0005", Description: "Week of Month", isSelected: false },
        { Number: 8, Header: "M0006", Description: "Sequential Number", isSelected: false },
        { Number: 9, Header: "E0004", Description: "Reporting Currency", isSelected: false },
        { Number: 10, Header: "E0005", Description: "Currency", isSelected: false },
        { Number: 11, Header: "E0006", Description: "Data Type", isSelected: false },
        { Number: 12, Header: "E0007", Description: "Entity Data Information", isSelected: false },
        { Number: 13, Header: "E0008", Description: "Country Code Entity Data Information", isSelected: false },
        { Number: 14, Header: "E0009", Description: "Approved Indicator", isSelected: false },
        { Number: 15, Header: "E0010", Description: "Category Issuers", isSelected: false },
        { Number: 16, Header: "E0011", Description: "Consolidation Level", isSelected: false },
        { Number: 17, Header: "E0012", Description: "Contingent Liabilities", isSelected: false },
        { Number: 18, Header: "E0013", Description: "Economic Sector", isSelected: false }
    ]
};

if (sessionStorage.getItem("configData") == null) {
    var dataObject = { headers: [] }
    sessionStorage.setItem("configData", JSON.stringify(dataObject));
} else {
    setSavedConfigs();
}

$(document).ready(function () {
    rivets.bind($("body"), model);

    $("#saveBtn").on("click", function () {
        var selectedItems = [];
        _.forEach(model.dataConfigurations, function(data) {
            if (data.isSelected) {
                selectedItems.push(data.Header);
            }
        });
        sessionStorage.setItem("configData", JSON.stringify({ headers: selectedItems }));

        var savedPopup = bootbox.confirm(" ", function() {});
        customModal(savedPopup, false, "Success!", "Settings saved successfully", "#1D9F75", "btn-danger", "fa-check-circle-o");
    });


    $("#cancelBtn").on('click', function() {
        setSavedConfigs();
    });

    
});

function setSavedConfigs() {
    _.forEach(model.dataConfigurations, function (data) {
        var currentSettings = $.parseJSON(sessionStorage.getItem("configData"));
        if (currentSettings.headers.indexOf(data.Header) >= 0) {
            data.isSelected = true;
        } else {
            data.isSelected = false;
        }
    });
}
//file selection functionality
$(document).ready(function() {
    var model = {
        isEditMode: false
    };
        
    rivets.bind($("body"), model);

    inputFileSelectorInit($("#companyLogo"), $("#companyLogoProxy"));

    $("input").prop("disabled", false);

    $('#saveBtn').click(function () {
        model.isEditMode = false;
        $("input").prop("disabled", true);
    });

    $('#cancelBtn').click(function () {
        model.isEditMode = false;
        $("input").prop("disabled", true);
    });

    $('#editBtn').click(function() {
        model.isEditMode = true;
        $("input").prop("disabled", false);
    });


});

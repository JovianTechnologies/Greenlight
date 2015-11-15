//file selection functionality
$(document).ready(function() {
    var model = {
        isEditMode: false
    };
        
    rivets.bind($("body"), model);

    inputFileSelectorInit($("#companyLogo"), $("#companyLogoProxy"));

    $("input[type=text]").prop("disabled", true);

    $('#cancelBtn').click(function () {
        model.isEditMode = false;
        $("input[type=text]").prop("disabled", true);
        return false;
    });

    $('#editBtn').click(function() {
        model.isEditMode = true;
        $("input[type=text]").prop("disabled", false);
        return false;
    });
});

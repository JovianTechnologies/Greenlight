$(document).ready(function () {
//    function removeActiveClass() {
//        $('.active').removeClass("active");
//    }

    //highlight correct tab when new view loads
    //removeActiveClass();

    if (window.location.pathname.indexOf("capture") >= 0) {
        $("#captureLink").addClass("active");
    }else if (window.location.pathname.indexOf("viewdata") >= 0) {
        $("#viewDataLink").addClass("active");
        if (window.location.pathname.indexOf("settings") >= 0) {
            $("#manage").addClass("active");
        } else {
            $("#view").addClass("active");
        }
    }
    else if (window.location.pathname.indexOf("correctdata") >= 0) {
        $("#correctDataLink").addClass("active");
    } else {
        $("#homeLink").addClass("active");
    }

    $(document).resize(function() {
        $('.body-div').height(document.height);
    });

    $(".sub-menu > li").on('click', function() {
        $(this).addClass('active').siblings().removeClass("active");
    });
});

var customModal = function (bootboxModal, isPrompt, messageTitle, message, bgcolor, buttonClass, faSymbol) {
    var modal = bootboxModal.find('.modal-dialog');
    var body = bootboxModal.find(".modal-body");
    var footer = bootboxModal.find('.modal-footer');

    modal.css({ "margin-top": "200px", "width": "300px" });

    //set body of cormirmation modal

    body.css({ "height": "120px", "background-color": bgcolor, "color": "white", "margin": "0", "border-top-left-radius": "5px", "border-top-right-radius": "5px" });
    var span = document.createElement("span");
    $(span).addClass("fa fa " + faSymbol).css({ "width": "100%", "text-align": "center", "font-size": "60px" });
    $(body).append($(span));

    //set footer of confirmation modal
    footer.css({ "margin": "0" });
    var confirmButton = footer.find(".btn-primary");
    var cancelButton = footer.find(".btn-default");
    $(cancelButton).remove();
    $(confirmButton).remove();
    var messageTitleDiv = document.createElement("div");
    $(messageTitleDiv).html(messageTitle);
    $(messageTitleDiv).css({ "font-size": "large", "font-weight": "bold", "text-align": "center" });
    $(footer).append($(messageTitleDiv));
    var messageDiv = document.createElement("div");
    $(messageDiv).html(message);
    $(messageDiv).css({ "font-size": "medium", "text-align": "center" });
    $(footer).append($(messageDiv));
    var deleteBtnDiv = document.createElement("div");
    $(deleteBtnDiv).css({ "text-align": "center", "margin-top": "10px" });

    if (isPrompt) {
        $(confirmButton).removeClass("btn-primary pull-right").addClass(buttonClass + " text-center").html("Delete");
        $(deleteBtnDiv).append($(confirmButton));
    }

    $(footer).append($(deleteBtnDiv));
};
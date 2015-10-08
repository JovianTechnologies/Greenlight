window.prettyBoot = new (function () {
    var isPrompt = false;
    var messageTitle = "";
    var message = "";
    var bgcolor = "#1D9F75";
    var buttonClass = "btn btn-default";
    var buttonText = "";
    var iconClass = "";
    var success = function () { };

    this.create = function (obj) {
        isPrompt = obj.isPrompt;
        messageTitle = obj.messageTitle;
        message = obj.message;
        buttonClass = obj.buttonClass ? obj.buttonClass : buttonClass;
        bgcolor = obj.bgcolor ? obj.bgcolor : bgcolor;
        buttonText = obj.buttonText;
        iconClass = obj.iconClass;
        success = obj.success ? obj.success : success;
        var bootboxModal = bootbox.confirm(" ", function () {
            success();
        });

        var modal = bootboxModal.find('.modal-dialog');
        var body = bootboxModal.find(".modal-body");
        var footer = bootboxModal.find('.modal-footer');
        bootboxModal.find('.modal-content').css({"border" : "2px solid black"});

        modal.css({ "margin-top": "200px", "width": "300px" });

        //set body of cormirmation modal

        body.css({ "height": "120px", "background-color": bgcolor, "color": "white", "margin": "0", "border-top-left-radius": "5px", "border-top-right-radius": "5px" });
        var span = document.createElement("span");
        $(span).addClass("fa fa " + iconClass).css({ "width": "100%", "text-align": "center", "font-size": "60px" });
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
            $(confirmButton).removeClass("btn-primary pull-right").addClass(buttonClass + " text-center").html(buttonText);
            $(deleteBtnDiv).append($(confirmButton));
        }

        $(footer).append($(deleteBtnDiv));
    }
})();
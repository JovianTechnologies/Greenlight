$(document).ready(function () {
    App.init();

    if (window.location.pathname.indexOf("capture") >= 0) {
        $("#captureLink").addClass("active");
    }else if (window.location.pathname.indexOf("viewdata") >= 0) {
        $("#viewDataLink").addClass("active");
        if (window.location.pathname.indexOf("settings") >= 0) {
            $("#manage").addClass("active");
        } else if (window.location.pathname.indexOf("analyze") >= 0) {
            $("#analyze").addClass("active");
        } else {
            $("#view").addClass("active");
        }
    }
    else if (window.location.pathname.indexOf("correctdata") >= 0) {
        $("#correctDataLink").addClass("active");
    } else if(window.location.pathname.indexOf("administration") >= 0){
        $("#adminLink").addClass("active");
        if (window.location.pathname.indexOf("company") >= 0) {
            $("#company").addClass("active");
        } else {
            $("#users").addClass("active");
        }
    }else {
        $("#homeLink").addClass("active");
    }

    $('#adminLink').click(function () {
        setTimeout(adjustLogoContainerHeight, 500);
    });

    $('#viewDataLink').click(function () {
        setTimeout(adjustLogoContainerHeight, 500);
    });

    $(window).resize(function() {
        adjustLogoContainerHeight();
    });

    $(".sub-menu > li").on('click', function() {
        $(this).addClass('active').siblings().removeClass("active");
    });

    adjustLogoContainerHeight();
    function adjustLogoContainerHeight() {
       $('.logodiv').width($('#sidebar').width());
        $('.logodiv').height(($('#sidebar').height()
                             - parseInt($('#sidebar').css("padding-top").replace("px", ""))
                            - $('#navMenu').height()) * .7);
    }
});


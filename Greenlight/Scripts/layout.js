$(document).ready(function () {
    App.init();

    if (window.location.pathname.indexOf("capture") >= 0) {
        $("#captureLink").addClass("active");
    }else if (window.location.pathname.indexOf("viewdata") >= 0) {
        $("#viewDataLink").addClass("active");
        if (window.location.pathname.indexOf("settings") >= 0) {
            $("#manage").addClass("active");
        }  else {
            $("#view").addClass("active");
        }
    }
    else if (window.location.pathname.indexOf("correctdata") >= 0) {
        $("#correctDataLink").addClass("active");
    } else if(window.location.pathname.indexOf("administration") >= 0){
        $("#adminLink").addClass("active");
        if (window.location.pathname.indexOf("company") >= 0) {
            $("#company").addClass("active");
        } else if (window.location.pathname.indexOf("analyze") >= 0) {
            $("#analyze").addClass("active");
        } else {
            $("#users").addClass("active");
        }
    }else {
        $("#homeLink").addClass("active");
    }

    $('#adminLink').click(function () {
        setTimeout(adjustLogoContainerWidth, 500);
    });

    $('#viewDataLink').click(function () {
        setTimeout(adjustLogoContainerWidth, 500);
    });

    $(window).resize(function() {
        adjustLogoContainerWidth();
    });

    $(".sub-menu > li").on('click', function() {
        $(this).addClass('active').siblings().removeClass("active");
    });

    adjustLogoContainerWidth();
    function adjustLogoContainerWidth() {
        $('.logo-div-container').width($('#sidebar').width());

    }
});


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
        if (window.location.pathname.indexOf("#") >= 0) {
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
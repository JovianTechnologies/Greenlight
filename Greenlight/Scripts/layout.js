$(document).ready(function () {
    function removeActiveClass() {
        $('.active').removeClass("active");
    }

    //highlight correct tab when new view loads
    removeActiveClass();

    if (window.location.pathname.indexOf("capture") >= 0) {
        $("#captureLink").addClass("active");
    }else if (window.location.pathname.indexOf("viewdata") >= 0) {
        $("#viewDataLink").addClass("active");
    }
    else if (window.location.pathname.indexOf("correctdata") >= 0) {
        $("#correctDataLink").addClass("active");
    } else {
        $("#homeLink").addClass("active");
    }
});